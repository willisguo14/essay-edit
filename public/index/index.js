let navHeight = $(".nav-container").outerHeight();
//NAV
function scrollTo(target) {
  $("html,body").animate(
    {
      scrollTop: $("." + target).offset().top - navHeight,
    },
    "slow"
  );
}
function openNav() {
  $(".nav-overlay").addClass("nav-overlay-visible");
}
function closeNav() {
  $(".nav-overlay").removeClass("nav-overlay-visible");
}

$(document).ready(function () {
  //nav overlay (small devices)
  $("#open-nav").on("click", function () {
    openNav();
  });
  $("#close-nav").on("click", function () {
    closeNav();
  });
  //scrol to
  $(".process-nav").click(function () {
    scrollTo("process-container");
    closeNav();
  });
  $(".about-us-nav").click(function () {
    scrollTo("about-us-container");
    closeNav();
  });
  $(".testimonials-nav").click(function () {
    scrollTo("testimonials-container");
    closeNav();
  });
  $(".pricing-nav").click(function () {
    scrollTo("pricing-container");
    closeNav();
  });
});
$(document).on("scroll", function () {
  let windowTop = $(document).scrollTop() + navHeight + 2;
  let processTop = $(".process-container").offset().top;
  let aboutTop = $(".about-us-container").offset().top;
  let testimonialTop = $(".testimonials-container").offset().top;
  let pricingTop = $(".pricing-container").offset().top;

  if (pricingTop <= windowTop) {
    $(".pricing-nav")
      .addClass("active-nav")
      .siblings()
      .removeClass("active-nav");
  } else if (testimonialTop <= windowTop) {
    $(".testimonials-nav")
      .addClass("active-nav")
      .siblings()
      .removeClass("active-nav");
  } else if (aboutTop <= windowTop) {
    $(".about-us-nav")
      .addClass("active-nav")
      .siblings()
      .removeClass("active-nav");
  } else if (processTop <= windowTop) {
    $(".process-nav")
      .addClass("active-nav")
      .siblings()
      .removeClass("active-nav");
  } else {
    $(".process-nav").removeClass("active-nav");
  }
});

//FADE-IN
$(document).ready(function () {
  let fadeLeft = $(".fade-left");
  $(fadeLeft[0]).addClass("visible");

  let fadeRight = $(".fade-right");
  $(fadeRight[0]).addClass("visible");
});

$(document).on("scroll", function () {
  let windowBottom = $(document).scrollTop() + $(window).height();
  let fadeUp = $(".fade-up");
  let fadeLeft = $(".fade-left");

  for (let i = 0; i < fadeUp.length; i++) {
    if (
      $(fadeUp[i]).offset().top + $(fadeUp[i]).outerHeight() / 2 <
      windowBottom
    ) {
      $($(fadeUp[i])).addClass("visible");
    } else {
      $(fadeUp[i]).removeClass("visible");
    }
  }

  for (let i = 0; i < fadeLeft.length; i++) {
    if (
      $(fadeLeft[i]).offset().top + $(fadeLeft[i]).outerHeight() / 2 <
      windowBottom
    ) {
      $($(fadeLeft[i])).addClass("visible");
    }
    // else {
    //   $(fadeLeft[i]).removeClass("visible");
    // }
  }
});

// TYPING ANIMATION
new TypeIt("#type-animation", {
  strings: "affordable",
  speed: 100,
  deleteSpeed: 55,
  loop: true,
  lifelike: true,
})
  .pause(800)
  .delete()
  .pause(500)
  .type("high-quality")
  .pause(800)
  .delete()
  .pause(500)
  .type("professional")
  .pause(800)
  .go();

//PROCESS
let timelineItems = $(".timeline-item");
for (let i = 0; i < timelineItems.length; i++) {
  timelineItems[i].addEventListener("mouseover", function () {
    $(this)
      .addClass("active-timeline")
      .siblings()
      .removeClass("active-timeline");
  });
}

//STATS
let countOptions = {
  useEasing: true,
  separator: ",",
};
let counter1 = new CountUp("counter1", 0, 361, 0, 2, countOptions);
let counter2 = new CountUp("counter2", 0, 12496, 0, 2, countOptions);
let counter3 = new CountUp("counter3", 0, 79, 0, 2, countOptions);
$(window).scroll(function () {
  let bottom1 = $("#counter1").offset().top + $("#counter1").outerHeight() / 2;
  let bottom2 = $("#counter2").offset().top + $("#counter2").outerHeight() / 2;
  let bottom3 = $("#counter3").offset().top + $("#counter3").outerHeight() / 2;
  let windowBottom = $(window).scrollTop() + $(window).height();

  if (bottom3 < windowBottom) {
    counter3.start();
  }
  if (bottom2 < windowBottom) {
    counter2.start();
  }
  if (bottom1 < windowBottom) {
    counter1.start();
  }
});

let flkty = $(".main-carousel").flickity({
  // options
  cellAlign: "center",
  contain: true,
  wrapAround: true,
  autoPlay: true,
  fade: true,
  pageDots: false,
  prevNextButtons: false,
});

//prev-next button
$(".flkty-next").on("click", function () {
  flkty.flickity("next");
});
$(".flkty-prev").on("click", function () {
  flkty.flickity("previous");
});

//carousel status
let flktyInstance = flkty.data("flickity");

let flktyStatus = document.querySelector(".flkty-status");
let flktyLength = document.querySelector(".flkty-length");

flktyLength.textContent = " / 0" + flktyInstance.slides.length;

function updateStatus() {
  let slideNumber = flktyInstance.selectedIndex + 1;
  flktyStatus.textContent = "0" + slideNumber + " ";
}
updateStatus();
flktyInstance.on("select", updateStatus);

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
    } else if ($("#medium").is(":checked")) {
      cost.innerHTML = "$35.00";
      baseline.innerHTML = "$35.00";
    } else if ($("#fast").is(":checked")) {
      cost.innerHTML = "$45.00";
      baseline.innerHTML = "$45.00";
    }
  });
}

// selectValue.style.left = slider.value + "%";
// if (selectValue.offsetLeft <= 90) {
//   selectValue.style.left = "90px";
// }

slider.oninput = function () {
  var value = this.value;

  selectValue.innerHTML = (slider.value * 100).toLocaleString("en") + " words";
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
    additional.style.color = "#8ee37e";
  } else {
    additional.innerHTML = "$" + parseFloat(additionalCost).toFixed(2);
    additional.style.color = "#333858";
  }

  //cost
  if ($("#slow").is(":checked")) {
    var costInt = 25 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
  } else if ($("#medium").is(":checked")) {
    var costInt = 35 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
  } else if ($("#fast").is(":checked")) {
    var costInt = 45 + additionalCost;
    cost.innerHTML = "$" + parseFloat(costInt).toFixed(2);
  }

  for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function () {
      if ($("#slow").is(":checked")) {
        cost.innerHTML = "$25.00";
        cost.innerHTML = "$" + parseFloat(25 + additionalCost).toFixed(2);
      } else if ($("#medium").is(":checked")) {
        cost.innerHTML = "$35.00";
        cost.innerHTML = "$" + parseFloat(35 + additionalCost).toFixed(2);
      } else if ($("#fast").is(":checked")) {
        cost.innerHTML = "$45.00";
        cost.innerHTML = "$" + parseFloat(45 + additionalCost).toFixed(2);
      }
    });
  }
};

let teamCards = $(".team-card");
for (let i = 0; i < teamCards.length; i++) {
  teamCards[i].addEventListener("mouseover", function () {
    $(this).addClass("active-card").siblings().removeClass("active-card");
  });
}
function sarahBack() {
  $(".front-sarah").fadeOut("fast", function () {
    $(".back-sarah").fadeIn("fast");
  });
}
function sarahFront() {
  $(".back-sarah").fadeOut("fast", function () {
    $(".front-sarah").fadeIn("fast");
  });
}

function willisBack() {
  $(".front-willis").fadeOut("fast", function () {
    $(".back-willis").fadeIn("fast");
  });
}
function willisFront() {
  $(".back-willis").fadeOut("fast", function () {
    $(".front-willis").fadeIn("fast");
  });
}
