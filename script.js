var ws = new WebSocket("ws://192.168.0.200:81/");
var statusElement = document.getElementById("status");
var messageElement = document.getElementById("message");
var voiceSelect = document.getElementById("voice");
var toggleSoundButton = document.getElementById("toggle-sound");

var soundEnabled = false; // O som começa desativado
var activeMessages = [];

// Função para tocar o som correspondente
function playSound(sensor) {
  if (soundEnabled) { // Verifica se o som está ativado
    var selectedVoice = voiceSelect.value;
    var soundPath = `Sons/${selectedVoice}/${sensor}.mp3`;
    var audio = new Audio(soundPath);
    audio.play();
  }
}

// Função para mostrar a mensagem por 10 segundos
function showMessage(sensor, text) {
  if (!activeMessages.includes(sensor)) {
    activeMessages.push(sensor);
    messageElement.innerText = text;
    playSound(sensor);

    setTimeout(function() {
      messageElement.innerText = '';
      activeMessages = activeMessages.filter(function(item) { return item !== sensor; });
    }, 10000);
  }
}

// Lógica para o botão de Ativar/Desativar som
toggleSoundButton.addEventListener("click", function() {
  soundEnabled = !soundEnabled; // Alterna o estado do som

  // Atualiza o texto do botão
  toggleSoundButton.innerText = soundEnabled ? "Desativar Som" : "Ativar Som";
});

// Função para converter os valores dos sensores para graus
function convertToDegrees(sensorValue) {
  var degrees = (sensorValue / 1023) * 90; // Converte para uma escala de 0 a 90 graus
  return degrees.toFixed(2); // Retorna o valor arredondado a 2 casas decimais
}

// Alternar entre a visualização dos dados e o gráfico
var toggleViewButton = document.getElementById("toggle-view");
var sensorDataView = document.getElementById("sensor-data-view");
var sensorChartView = document.getElementById("sensor-chart-view");

toggleViewButton.addEventListener("click", function() {
  if (sensorDataView.style.display === "none") {
    sensorDataView.style.display = "block";
    sensorChartView.style.display = "none";
    toggleViewButton.innerText = "Alternar para Gráfico";
  } else {
    sensorDataView.style.display = "none";
    sensorChartView.style.display = "block";
    toggleViewButton.innerText = "Alternar para Dados";
  }
});

// Inicializa o gráfico
var ctx = document.getElementById('sensorChart').getContext('2d');
var sensorChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'],
    datasets: [{
      label: 'Ângulo dos Sensores (em graus)',
      data: [0, 0, 0, 0, 0], // Dados iniciais (vão ser atualizados)
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 90 // Define o limite máximo em 90 graus
      }
    }
  }
});

// Função para atualizar os dados do gráfico
function updateChart(sensorDegrees) {
  sensorChart.data.datasets[0].data = sensorDegrees;
  sensorChart.update();
}

// Quando a conexão for estabelecida
ws.onopen = function() {
  statusElement.innerText = "Conectado";
  statusElement.classList.remove("disconnected");
  statusElement.classList.add("connected");
};

// Quando a conexão for encerrada
ws.onclose = function() {
  statusElement.innerText = "Desconectado";
  statusElement.classList.remove("connected");
  statusElement.classList.add("disconnected");
};

// Quando receber dados do servidor
ws.onmessage = function(event) {
  var sensorValues = event.data.split(",");

  // Convertemos os valores dos sensores para graus
  var sensorDegrees = sensorValues.map(function(value) {
    return convertToDegrees(parseInt(value));
  });

  document.getElementById("sensor1").innerText = "Sensor 1: " + sensorDegrees[0] + "°";
  document.getElementById("sensor2").innerText = "Sensor 2: " + sensorDegrees[1] + "°";
  document.getElementById("sensor3").innerText = "Sensor 3: " + sensorDegrees[2] + "°";
  document.getElementById("sensor4").innerText = "Sensor 4: " + sensorDegrees[3] + "°";
  document.getElementById("sensor5").innerText = "Sensor 5: " + sensorDegrees[4] + "°";

  // Exibe as mensagens baseadas nos valores dos sensores
  if (parseInt(sensorValues[0]) < 400) {
    showMessage("1", "Estou com SEDE");
  }
  if (parseInt(sensorValues[1]) < 400) {
    showMessage("2", "Estou com FOME");
  }
  if (parseInt(sensorValues[2]) < 400) {
    showMessage("3", "Preciso ir ao BANHEIRO");
  }
  if (parseInt(sensorValues[3]) < 400) {
    showMessage("4", "Sinto DOR");
  }
  if (parseInt(sensorValues[4]) < 400) {
    showMessage("5", "EU TE AMO");
  }

  // Atualiza os gráficos com os valores convertidos
  updateChart(sensorDegrees);
};
