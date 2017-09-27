'use-strict'

function jsonCallback(response) {
  console.log("handle results called", response)
}

function submitForm(event) {
  event.preventDefault()
  const station = $(this).serializeArray()[0].value

  $.ajax({
    url: `http://developer.itsmarta.com/NextTrainService/RestServiceNextTrain.svc/GetNextTrain/${station}`,
    dataType: "jsonp",
  })
}

$(function() {
  $('form').submit(submitForm)
})
