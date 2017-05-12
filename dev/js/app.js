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
    $(".button-collapse").sideNav();
    
    var carruselHeader = $(".carrusel-header");

    carruselHeader.on('initialized.owl.carousel ' + 'translated.owl.carousel', function (e) {
        var owlItemActivo = $('.carrusel').find('.owl-item.active');
        var owlItem = $('.carrusel').find('.owl-item').not('.owl-item.active');
        owlItemActivo.find('.texto').addClass('animacion');
        owlItem.find('.texto').removeClass('animacion');
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
});

$(window).on('load', function() {
    $(".contenedor-cargador").delay( 800 ).fadeOut("slow");
    if($('nav').hasClass('topbar-fixed')) {
        navFixed();
    }
});

$(window).resize(function() {
    if($('nav').hasClass('topbar-fixed')) {
        navFixed();
    }
});

/* ==============================================
TOPBAR FIXED
=============================================== */

function navFixed() {
    var heightNav = $('.topbar-fixed').outerHeight();
    $('.topbar-fixed').parent().css('height', heightNav);
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('.topbar-fixed').addClass("stick");
        } else {
            $('.topbar-fixed').removeClass("stick");
        }
    });
}