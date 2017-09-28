'use-strict'

function addStationsToDropdown(response) {
  const $stationSelect = $('#station-select')
  $stationSelect.empty()
  response.stations.forEach(station => $stationSelect.append(new Option(station, station)))
}

function getStationList() {
  $.get('/api/stations').then(addStationsToDropdown)
}

function createTableRowsAndAppendToDom(train, direction) {
  const $trainRow = $(
    `<tr>
      <td>${train.ROUTE}</td>
      <td>${train.HEAD_SIGN}</td>
      <td>${train.WAITING_TIME}</td>
      <td>${train.NEXT_ARR}</td>
    </tr>`
  )
  $(`#${direction}`).append($trainRow)
}

function displayResults(response) {
  const trains = JSON.parse(response)
  console.log(trains)
  trains.forEach(train => {
    switch (train.DIRECTION) {
      case "N":
        createTableRowsAndAppendToDom(train, 'northbound')
        break;
      case "E":
        createTableRowsAndAppendToDom(train, 'eastbound')
        break;
      case "S":
        createTableRowsAndAppendToDom(train, 'southbound')
        break;
      case "W":
        createTableRowsAndAppendToDom(train, 'westbound')
        break;
    }
  })
}

function updateTitle(stationName) {
  $('#station-title').html(stationName)
}

function emptyTables() {
  $('#northbound').empty()
  $("#eastbound").empty()
  $("#southbound").empty()
  $("#westbound").empty()
}

function submitForm(event) {
  event.preventDefault()
  const station = $(this).serializeArray()[0].value
  $.get(`/api/stations/${station}`)
    .then(response => {
      emptyTables()
      displayResults(response)
      updateTitle(station)
    })
}

$(function () {
  getStationList()
  $('form').submit(submitForm)
})
