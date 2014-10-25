// Generated by CoffeeScript 1.7.1
(function() {
  var combinedStream, email, postFormData, regex, setEnabled, submit, validEmail, validateEmail;

  postFormData = function(data) {
    var url;
    url = "https://docs.google.com/forms/d/" + ENV['GOOGLE_FORM_KEY'] + "/formResponse";
    return $.ajax({
      url: url,
      type: "POST",
      dataType: "xml",
      data: data
    });
  };

  regex = /^.+\@.+\..+$/;

  validateEmail = function(email) {
    return regex.test(email);
  };

  setEnabled = function(element, enabled) {
    return element.attr("disabled", !enabled);
  };

  email = $("#email").asEventStream("keyup").map(function() {
    return $(event.target).val();
  });

  validEmail = email.map(validateEmail);

  validEmail.assign(setEnabled, $('button'));

  submit = $('form').asEventStream('submit').doAction('.preventDefault');

  combinedStream = Bacon.combineAsArray(email, validEmail, submit).filter(function(values) {
    return values[1];
  }).map(function(values) {
    return values[0];
  }).take(1);

  combinedStream.onValue(function(email) {
    var data;
    data = {};
    data[ENV['GOOGLE_FORM_INPUT_ID']] = email;
    return postFormData(data);
  });

}).call(this);