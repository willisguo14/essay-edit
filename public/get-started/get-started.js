let linkValue = document.getElementById("linkValue");

//SUBMISSION METHOD
let submitOptions = $(".submission-method");
$(".file-upload").hide();
for (let i = 0; i < submitOptions.length; i++) {
  submitOptions[i].addEventListener("click", function () {
    if ($("#link-option").is(":checked")) {
      $(".doc-link").show();
      $(".file-upload").hide();
      $(".inputfile")[0].value = null;
      $("#file-label").html("Choose a file");
      //console.log($(".inputfile")[0].files.length);
    } else if ($("#file-option").is(":checked")) {
      $(".file-upload").show();
      $(".doc-link").hide();
      //console.log("file checked");
      linkValue.value = "";
      //console.log($(".inputfile")[0].files.length);
    }
  });
}

//FILE UPLOAD
$(".inputfile").each(function () {
  let $input = $(this);
  let $label = $("#file-label");
  let labelVal = $label.html();

  $input.on("change", function (e) {
    //console.log("change detected");
    let fileName = e.target.value.split("\\").pop();
    if (fileName.length > 0) {
      //console.log(fileName);
      $label.html(fileName);
    } else {
      $label.html("Choose a file");
    }
  });
});

//SAVE USEFUL INPUTS
let wordCount = document.getElementById("wordCount");
let baselineCost = document.getElementById("baselineCost");
let extraCost = document.getElementById("extraCost");
let finalCost = document.getElementById("finalCost");
//PRICING CALCULATOR
var slider = document.getElementById("cost-slider");
var selectValue = document.getElementById("selector-value");
var progressBar = document.getElementById("progress-bar");

var baseline = document.getElementById("baseline");
var additional = document.getElementById("additional");

var options = document.getElementsByClassName("checkbox-option-container");

for (var i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    if ($("#slow").is(":checked")) {
      cost.innerHTML = "$25.00";
      baseline.innerHTML = "$25.00";
      baselineCost.value = baseline.innerHTML;
      finalCost.value = baseline.innerHTML;
    } else if ($("#medium").is(":checked")) {
      cost.innerHTML = "$35.00";
      baseline.innerHTML = "$35.00";
      baselineCost.value = baseline.innerHTML;
      finalCost.value = baseline.innerHTML;
    } else if ($("#fast").is(":checked")) {
      cost.innerHTML = "$45.00";
      baseline.innerHTML = "$45.00";
      baselineCost.value = baseline.innerHTML;
      finalCost.value = baseline.innerHTML;
    }
  });
}

slider.oninput = function () {
  var value = this.value;

  selectValue.innerHTML = (slider.value * 100).toLocaleString("en") + " words";
  wordCount.value = selectValue.innerHTML;
  progressBar.style.width = value + "%";

  selectValue.style.left = value + "%";
  if (selectValue.offsetLeft <= 90) {
    selectValue.style.left = "90px";
  } else if (slider.offsetWidth - selectValue.offsetLeft <= 90) {
    selectValue.style.left = (slider.offsetWidth - 90).toString() + "px";
  }

  var additionalCost = ((value * 100 - 1000) / 100) * 1;

  //additional cost
  if (this.value < 10) {
    additional.innerHTML =
      "-$" + Math.abs(parseFloat(additionalCost)).toFixed(2);
    extraCost.value = additional.innerHTML;
    additional.style.color = "#8ee37e";
  } else {
    additional.innerHTML = "$" + parseFloat(additionalCost).toFixed(2);
    extraCost.value = additional.innerHTML;
    additional.style.color = "#333858";
  }

  //cost
  if ($("#slow").is(":checked")) {
    var costInt = 25 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
    finalCost.value = cost.innerHTML;
  } else if ($("#medium").is(":checked")) {
    var costInt = 35 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
    finalCost.value = cost.innerHTML;
  } else if ($("#fast").is(":checked")) {
    var costInt = 45 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
    finalCost.value = cost.innerHTML;
  }

  for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
      if ($("#slow").is(":checked")) {
        cost.innerHTML = "$25.00";
        cost.innerHTML = "$" + parseFloat(25 + additionalCost).toFixed(2);
        finalCost.value = cost.innerHTML;
      } else if ($("#medium").is(":checked")) {
        cost.innerHTML = "$35.00";
        cost.innerHTML = "$" + parseFloat(35 + additionalCost).toFixed(2);
        finalCost.value = cost.innerHTML;
      } else if ($("#fast").is(":checked")) {
        cost.innerHTML = "$45.00";
        cost.innerHTML = "$" + parseFloat(45 + additionalCost).toFixed(2);
        finalCost.value = cost.innerHTML;
      }
    });
  }
  console.log(finalCost.value);
  //console.log(parseFloat(cost.innerHTML.substring(1)));
};
