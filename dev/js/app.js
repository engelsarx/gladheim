var App = (function (window, document, undefined) {

  "use strict";

  var SETTINGS = {};

  var st = {};

  var dom = {};

  var catchDom = function () { };

  var susbscribeEvents = function () { };

  var events = {};

  var fn = {};

  var init = function () {
  };

  return {
    init: init
  };

}(window, document));

jQuery(document).ready(function($) {
    //jQuery time
    $('select').material_select();
    $('.select-wrapper .caret').empty();
    $(".side-nav__boton-sideNav").sideNav({
        closeOnClick: false
    });
    
    $(".side-nav__boton-sideNav").click(function () {
    $('.hamburger').toggleClass("is-active");
    });
    $('body').on('click', '.drag-target', function () {
        $('.hamburger').removeClass("is-active");
    });

    var carruselHeader = $(".carrusel-header");
    var carruselServicios = $(".carrusel-servicios");

    carruselHeader.on('initialized.owl.carousel ' + 'translated.owl.carousel', function (e) {
        var owlItemActivo = $('.carrusel').find('.owl-item.active');
        var owlItem = $('.carrusel').find('.owl-item').not('.owl-item.active');
        owlItemActivo.find('.carrusel-header__description').addClass('animacion');
        owlItem.find('.carrusel-header__description').removeClass('animacion');
    });

    carruselHeader.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 900,
        navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
        center: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
                loop: true,
                stagePadding: 0,
                autoplay: true
            },
            768: {
                items: 1,
                nav: true,
                dots: true,
                loop: true,
                stagePadding: 0,
                autoplay: true
            }
        }
    });

    carruselServicios.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 900,
        navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
        center: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
                loop: true,
                stagePadding: 0,
                autoplay: true
            },
            768: {
                items: 1,
                nav: true,
                dots: true,
                loop: true,
                stagePadding: 0,
                autoplay: true
            }
        }
    });
});

$(window).on('load', function() {
    $(".contenedor-cargador").delay( 800 ).fadeOut("slow");
    if ($('nav').hasClass('topbar-absolute')) {
      navFixed();
    }
});

$(window).resize(function() {
    if($('nav').hasClass('topbar-absolute')) {
        navFixed();
    }
});

/* ==============================================
TOPBAR FIXED
=============================================== */

function navFixed() {
  var heightNav = $('.topbar-fixed').outerHeight();
  var heightTopBar = $('.topbar-absolute').outerHeight(true);
  $('.topbar-absolute').parent().css('height', heightNav);
  var topHambu = parseInt($('.side-nav__boton-sideNav').css('top'), 10);
  var scrollPx = $(this).scrollTop();

  $('.side-nav__boton-sideNav').css({
    'top': topHambu - scrollPx,
    'right': '-64px'
  });

  $(window).scroll(function () {
    var scrollPx = $(this).scrollTop();
    if (scrollPx >= 16) {
      $('.topbar-absolute').addClass("stick");
      $('.side-nav').addClass("stick");
      $('.side-nav__boton-sideNav').css({
        'top': 0,
        'right': '-56px'
      });
      $('.topbar-helper').height(heightTopBar);
    } else {
      $('.topbar-absolute').removeClass("stick");
      $('.side-nav').removeClass("stick");
      $('.side-nav__boton-sideNav').css({
        'top': '16px',
        // 'top': topHambu - scrollPx,
        'right': '-64px'
      });
      $('.topbar-helper').height(0);
    }
  });
}