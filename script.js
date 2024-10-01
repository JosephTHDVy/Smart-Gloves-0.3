// Função para converter o valor do sensor em graus
function mapToDegrees(sensorValue) {
  // Mapeia o valor do sensor (500 a 0) para graus (0 a 180)
  var degrees = (sensorValue / 500) * 180;
  return Math.round(degrees); // Arredonda para o número inteiro mais próximo
}

// Quando receber dados do servidor
ws.onmessage = function(event) {
  var sensorValues = event.data.split(",");

  // Converte os valores dos sensores para graus e exibe na tela
  document.getElementById("sensor1").innerText = "Sensor 1: " + mapToDegrees(sensorValues[0]) + "°";
  document.getElementById("sensor2").innerText = "Sensor 2: " + mapToDegrees(sensorValues[1]) + "°";
  document.getElementById("sensor3").innerText = "Sensor 3: " + mapToDegrees(sensorValues[2]) + "°";
  document.getElementById("sensor4").innerText = "Sensor 4: " + mapToDegrees(sensorValues[3]) + "°";
  document.getElementById("sensor5").innerText = "Sensor 5: " + mapToDegrees(sensorValues[4]) + "°";

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
};
