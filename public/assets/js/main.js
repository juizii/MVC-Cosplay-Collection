(function($){
  "use strict";
  
  /* sticky header - start*/
  
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.header-nav').addClass("sticky")
    } else {
      $('.header-nav').removeClass("sticky")
    }
  });
  /* sticky header - end */
  
  /* bg parallax - start */
  
  $('[data-parallax]').parallax({
    speed: .6,
  });
  /* bg parallax - end */
  
  /* hero sec start sec end */
  $('.hero-slider-wrap').slick({
    dots: false,
    speed: 1000,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplaySpeed: 6000,
   
  });
  
  /* hero sec start sec end */
  
  /* review sec start start */
  
  $('.review-card-items-wrap').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".main-left-arrow",
    nextArrow: ".main-right-arrow",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 1,
        }
      }
      
    ]
  });
  /* review sec start sec end */
  
// Function to fetch the countdown date from the server
async function getCountdownDate() {
  try {
    const response = await fetch("/countdown", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data.countdownDate;
  } catch (error) {
    console.error("Error retrieving countdown date:", error);
    return null;
  }
}

// Function to initialize the countdown with the retrieved date or default to 0
function initializeCountdown(countdownDate) {
  var countdownUl = document.querySelector(".counter-box");
  countdownUl.setAttribute("data-countdown", countdownDate || '');

  $('.counter-box[data-countdown]').countdown(countdownDate, function(event) {
    $(this).html(event.strftime(''
      + '<li class="days"><strong class="day2">%D</strong><span class="d-block">Days</span></li>'
      + '<li class="hours"><strong class="hours2">%H</strong><span class="d-block">Hours</span></li>'
      + '<li class="minutes"><strong class="min2">%M</strong><span class="d-block">Minutes</span></li>'
      + '<li class="seconds"><strong class="sec2">%S</strong><span class="d-block">Seconds</span></li>'
    ));
  }).on('finish.countdown', function() {
    alert("Today's the Day!");
  });
}



// Function to save the countdown date to local storage
function saveCountdownDateToLocal(countdownDate) {
  localStorage.setItem("countdownDate", countdownDate);
}

// Event listener for countdown form submission
var countdownSubmitButton = document.getElementById("countdown-submit");

countdownSubmitButton.addEventListener("click", async function(event) {
  event.preventDefault(); // Prevent form submission and page refresh

  var countdownDateInput = document.getElementById("countdown-date");
  var countdownDate = countdownDateInput.value;
  var countdownUl = document.querySelector(".counter-box");
  countdownUl.setAttribute("data-countdown", countdownDate);

  // Save the countdown date to the server
  try {
    const response = await fetch("/profile/countdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ countdownDate })
    });
    if (!response.ok) {
      throw new Error("Failed to save countdown date");
    }
  } catch (error) {
    console.error("Error saving countdown date:", error);
  }

  // Save the countdown date to local storage
  saveCountdownDateToLocal(countdownDate);

  // Restart countdown with new date
  initializeCountdown(countdownDate);
});

// Function to retrieve the countdown date from local storage
function getCountdownDateFromLocal() {
  return localStorage.getItem("countdownDate");
}

// Fetch the countdown date from the server or local storage and initialize the countdown
getCountdownDate().then(function(countdownDate) {
  if (!countdownDate) {
    // Try to retrieve countdown date from local storage
    countdownDate = getCountdownDateFromLocal();
  }

  if (countdownDate) {
    var countdownUl = document.querySelector(".counter-box");
    countdownUl.setAttribute("data-countdown", countdownDate);
    initializeCountdown(countdownDate);
  }
});

      
  $(document).on( 'click', '.mode', function(e){
    e.preventDefault();
    if($('body').hasClass('dark-version')) {
        $('body').removeClass('dark-version');
        $('.mode .fa-moon').show();
        $('.mode .fa-sun').hide();
    } else {
        $('body').addClass('dark-version');
        $('.mode .fa-moon').hide();
        $('.mode .fa-sun').show();
    }
  }); 



  AOS.init({

  });

  $(document) .ready(function(){
    $('.zoom-gallery').magnificPopup({
        delegate: '.item-thumb',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(element) {
                return element.find('img');
            }
        }
    });
  });

    
})(jQuery);

var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const pic = this.parentNode.parentNode.childNodes[1].innerText
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const media = this.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'pic': pic,
            'name': name,
            'media':media
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



