function openTab(tabName) {
  var i, tabcontent, tabbuttons;
  
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }

  tabbuttons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  event.currentTarget.classList.add("active");
}

// Modifique a parte que mostra os dados dos sensores
ws.onmessage = function(event) {
  var sensorValues = event.data.split(",");
  var graus = sensorValues.map(value => (parseInt(value) * (5.0 / 1023.0) * 100).toFixed(2)); // Exemplo de conversão

  document.getElementById("sensor1").innerText = "Sensor 1: " + graus[0] + " °C";
  document.getElementById("sensor2").innerText = "Sensor 2: " + graus[1] + " °C";
  document.getElementById("sensor3").innerText = "Sensor 3: " + graus[2] + " °C";
  document.getElementById("sensor4").innerText = "Sensor 4: " + graus[3] + " °C";
  document.getElementById("sensor5").innerText = "Sensor 5: " + graus[4] + " °C";

  // As mensagens continuam iguais
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
};
