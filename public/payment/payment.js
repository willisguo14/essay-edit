$(document).ready(function () {
  let firstLetter = $("#additional").text().charAt(0);
  if (firstLetter == "-") {
    $("#additional").css("color", "#8ee37e");
  }
});
