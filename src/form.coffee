$ = require('jquery')

Bacon = require("imports?jQuery=jquery!bacon")

postFormData = (url, data) ->

    $.ajax({
        url: url,
        type: "POST",
        dataType: "xml",
        data: data
    })

regex = /^.+\@.+\..+$/

validateEmail = (email) -> regex.test(email)

setEnabled = (element, enabled) -> element.attr("disabled", !enabled)

init = (config) ->

    url = "https://docs.google.com/forms/d/#{config['GOOGLE_FORM_KEY']}/formResponse"

    email = $("#email")
                .asEventStream("keyup")
                .map -> $(event.target).val()

    validEmail = email.map(validateEmail)

    validEmail.assign(setEnabled, $('button'))

    submit = $('form')
                .asEventStream('submit')
                .doAction('.preventDefault')

    combinedStream = Bacon
                        .combineAsArray(email, validEmail, submit)
                        .filter((values) -> values[1])
                        .map((values) -> values[0])
                        .take(1)

    combinedStream.onValue (email) ->

        data = {}
        data[config['GOOGLE_FORM_INPUT_ID']] = email

        postFormData url, data

exports.init = init
