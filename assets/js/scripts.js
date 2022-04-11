/*---------------------------------------------
Template name:  jironis
Version:        1.0
Author:         layerdrops
Author Email:   layerdrops@gmail.com

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]

01: Main menu
02: Background image
03: Parsley form validation
04: Back to top button
05: Changing svg color
06: Ajax Contact Form
 07: Preloader
08: Content animation
09: counter up
10: Parallax
11: Google map
12: testimonial carousel
13: partner carousel
14: banner carouser 3
15: testimonial carousel2
16: video popup


----------------------------------------------*/

(function ($) {
  "use strict";

  /* 01: Main menu
            ==============================================*/

  $('.header-menu a[href="#"]').on("click", function (event) {
    event.preventDefault();
  });

  $(".header-menu").menumaker({
    title: '<i class="fa fa-bars"></i>',
    format: "multitoggle",
  });

  var mainHeader = $(".main-header");

  if ($(window).scrollTop() > 100)
    $(".main-header").addClass("sticky fadeInDown");
  $(window).on("scroll", function (e) {
    if ($(this).scrollTop() < 100) {
      $(".main-header").removeClass("sticky fadeInDown");
    } else $(".main-header").addClass("sticky fadeInDown");
  });

  /* 02: Background image
            ==============================================*/

  var bgImg = $("[data-bg-img]");

  bgImg.css("background", function () {
    return "url(" + $(this).data("bg-img") + ") center center";
  });

  /* 03: Parsley form validation
            ==============================================*/

  $(".parsley-validate, .parsley-validate form").parsley();

  /*============================================
                04: Back to top button
            ==============================================*/

  var $backToTopBtn = $(".back-to-top");

  if ($backToTopBtn.length) {
    var scrollTrigger = 400, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $backToTopBtn.addClass("show");
        } else {
          $backToTopBtn.removeClass("show");
        }
      };

    backToTop();

    $(window).on("scroll", function () {
      backToTop();
    });

    $backToTopBtn.on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        700
      );
    });
  }

  /*==========================================
    14: feature-carousel
===========================================*/

  $(".feature-carousel").owlCarousel({
    loop: false,
    margin: 30,
    dots: true,
    autoplay: false,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 1,
      },
      768: {
        items: 2,
      },
      991: {
        items: 4,
      },
      992: {
        items: 4,
      },
    },
  });

  /* =================================================
    app carousel
================================================= */

  $(".app-carousel").owlCarousel({
    loop: true,
    margin: 30,
    center: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      575: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  /*=============================================
        05: Changing svg color
    ==============================================*/

  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Check if the viewport is set, else we gonna set it if we can.
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  /*=============================================
            06: Ajax Contact Form
        ==============================================*/

  $(".contact-form").on("submit", "form", function (e) {
    e.preventDefault();

    var $el = $(this);

    $.post($el.attr("action"), $el.serialize(), function (res) {
      res = $.parseJSON(res);
      $el
        .parent(".contact-page-form")
        .find(".form-response")
        .html("<span>" + res[1] + "</span>");
    });
  });

  /*============================================
        07: Preloader
    ==============================================*/

  
    function removePreloader() {
      var preLoader = $(".preLoader");
      preLoader.fadeOut();
    }
    setTimeout(removePreloader, 550);


  /* 08: Content animation
    ==============================================*/

  $(window).on("load", function () {
    var $animateEl = $("[data-animate]");

    $animateEl.each(function () {
      var $el = $(this),
        $name = $el.data("animate"),
        $duration = $el.data("duration"),
        $delay = $el.data("delay");

      $duration = typeof $duration === "undefined" ? "0.6" : $duration;
      $delay = typeof $delay === "undefined" ? ".1" : $delay;

      $el.waypoint(
        function () {
          $el.addClass("animated " + $name).css({
            "animation-duration": $duration + "s",
            "animation-delay": $delay + "s",
          });
        },
        { offset: "93%" }
      );
    });
  });

  /*=========================================================
        09: counter up
    =========================================================*/
  $(".counter").counterUp({});

  /*====================================================
        10: Parallax
    ====================================================*/
  var $parallaxLayers = $('[data-trigger="parallax_layers"]');

  if ($parallaxLayers.length) {
    $parallaxLayers.each(function () {
      new Parallax($(this)[0], {
        selector: "[data-depth]",
      });
    });
  }

  /* 16: video popup */
  var t = $(".video-btn");
  t.length &&
    t.magnificPopup({
      type: "iframe",
    });

  // parice tabele
  // $(".single-price-plan").on("mouseenter", function () {
  //   $(this)
  //     .addClass("active")
  //     .parent()
  //     .siblings()
  //     .find(".single-price-plan")
  //     .removeClass("active");
  // });

  /*=====================================================
    13: partner carousel
=====================================================*/
  $(".partner-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
    },
  });

  /* scroll */

  $(".header-menu ul li a").on("click", function (t) {
    var c = $(this.hash);

    $(".header-menu ul").slideUp("fast").removeClass("open");
    if (c.length !== 0) {
      $("html,body").animate(
        {
          scrollTop: c.offset().top,
        },
        700
      );
    }
  });

  /* testimonial */
  /*=====================================================
   13: partner carousel
=====================================================*/

  let author_cumment = $(".author-comment-carousel");
  author_cumment.owlCarousel({
    loop: true,
    margin: 20,
    autoheight: true,
    nav: true,
    navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  $(".author-comment-carousel .owl-next").on("click", function () {
    $(".author-carousel .owl-next").click();
  });

  $(".author-comment-carousel .owl-prev").on("click", function () {
    $(".author-carousel .owl-prev").click();
  });

  // banner 2 logo bgs
  $(window).on("resize", () => {
    if ($(window).width() >= 975) {
      $(".main-header.header-2 .logo .main-logo2").attr(
        "src",
        "assets/img/logo2.png"
      );
    } else if ($(window).width() <= 975) {
      $(".main-header.header-2 .logo .main-logo2").attr(
        "src",
        "assets/img/logo.png"
      );
    }
  });
  if ($(window).width() >= 975) {
    $(".main-header.header-2 .logo .main-logo2").attr(
      "src",
      "assets/img/logo2.png"
    );
  } else if ($(window).width() <= 975) {
    $(".main-header.header-2 .logo .main-logo2").attr(
      "src",
      "assets/img/logo.png"
    );
  }

  let flipped = 0;

  $(window).on("load", function () {
    $(window)
      .scroll(function () {
        var windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $(".fade-section").each(function () {
          /* Check the location of each desired element */
          var objectBottom =
            $(this).offset().top +
            $(this).outerHeight() -
            $(this).outerHeight() * 0.5;

          /* If the element is completely within bounds of the window, fade it in */
          if (objectBottom < windowBottom) {
            //object comes into view (scrolling down)
            if ($(this).css("opacity") == 0) {
              $(this).fadeTo(500, 1);
            }
          } else {
            //object goes out of view (scrolling up)
            if ($(this).css("opacity") == 1) {
              $(this).fadeTo(500, 0);
            }
          }
        });

        var cards = document.querySelectorAll(".card");

        $(".card").each(function () {
          if ($(window).width() > 975) {
            $(this).mouseenter(function () {
              if (!$(this).hasClass("is-flipped")) {
                $(this).addClass("is-flipped");
              }
            });
            $(this).mouseleave(function () {
              if ($(this).hasClass("is-flipped")) {
                $(this).removeClass("is-flipped");
              }
            });
          }
          if ($(window).width() <= 975) {
            /* Check the location of each desired element */
            var objectBottom =
              $(this).offset().top +
              $(this).outerHeight() -
              $(this).outerHeight() * 0.5;

            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom) {
              //object comes into view (scrolling down)
              if (!$(this).hasClass("is-flipped") && flipped < 3) {
                $(this).addClass("is-flipped");
                flipped++;
              }
            }
          }
        });
      })
      .scroll(); //invoke scroll-handler on page-load

    /**
     * Header scroll control
     * When the user scrolls down the page hide the header, when they scroll up show it.
     */
    var lastScrollPosition;

    $(document).scroll(function () {
      var scrollPosition = $(this).scrollTop();

      // Scrolling down
      if ( scrollPosition + lastScrollPosition > 10 && scrollPosition > lastScrollPosition) {
        // If the header is currently showing
        if ($("header.header").length) {
          $("header").fadeOut();
        }
      }
      // Scrolling up
      else {
        // If the header is currently hidden
        if ($("header.header").length) {
          $("header").fadeIn();
        }
      }

      lastScrollPosition = scrollPosition;
    });
  });

  var cards = document.querySelectorAll(".card");

  if ($(window).width() <= 975) {
    [...cards].forEach((card) => {
      card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
      });
    });
  }

  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', appHeight)
  appHeight()

})(jQuery);


