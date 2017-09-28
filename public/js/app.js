'use-strict'

function addStationsToDropdown(response) {
  const $stationSelect = $('#station-select')
  $stationSelect.empty()
  response.stations.forEach(station => $stationSelect.append(new Option(station, station)))
}

function getStationList() {
  $.get('/api/stations').then(addStationsToDropdown)
}

function sortTrainsByDirection(trains) {
  const sortedTrains = {
    northbound: [],
    eastbound: [],
    southbound: [],
    westbound: [],
  }

  trains.forEach(train => {
    switch (train.DIRECTION) {
      case "N":
        sortedTrains.northbound.push(train);
        break;
      case "E":
        sortedTrains.eastbound.push(train);
        break;
      case "S":
        sortedTrains.southbound.push(train);
        break;
      case "W":
        sortedTrains.westbound.push(train);
        break;
    }
  })
  return sortedTrains
}

function displayResults(response) {
  const trains = sortTrainsByDirection(JSON.parse(response))
  console.log(trains)
}

function updateTitle(stationName) {
  $('#station-title').html(stationName)
}

function submitForm(event) {
  event.preventDefault()
  const station = $(this).serializeArray()[0].value
  $.get(`/api/stations/${station}`)
    .then(response => {
      displayResults(response)
      updateTitle(station)
    })
}

$(function () {
  getStationList()
  $('form').submit(submitForm)
})
