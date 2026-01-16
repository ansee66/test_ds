$(function () {
  // FAQ accordion
  $('.faq__toggle').on('click', function () {
    var target = $(this).data('target');
    var $content = $(target);
    var isOpen = $content.hasClass('show');

    $('.faq__list .collapse').slideUp(200).removeClass('show');
    $('.faq__toggle .toggle-icon').removeClass('open');

    if (!isOpen) {
      $content.slideDown(200).addClass('show');
      $(this).find('.toggle-icon').addClass('open');
    }
  });

  // Paints popup
  var $popup = $('.materials__popup');
  $('.materials__btn').on('click', function (e) {
    e.stopPropagation();
    $popup.toggleClass('show');
  });

  $popup.on('click', function (e) {
    e.stopPropagation();
  });

  $(document).on('click', function () {
    $popup.removeClass('show');
  });

  // Mobile nav toggle with slide animation
  var $menu = $('#menu');
  function syncNav() {
    if ($(window).width() >= 768) {
      $menu.show().addClass('show');
    } else {
      $menu.hide().removeClass('show');
    }
  }

  $('.menu-toggler').on('click', function () {
    $menu.stop(true, true).slideToggle(200, function () {
      $(this).toggleClass('show', $(this).is(':visible'));
    });
  });

  $(window).on('resize', syncNav);
  syncNav();

  // Currency toggle
  var RATE_RUB_PER_USD = 70;
  var currency = 'RUB';

  function formatPrice(rub) {
    if (currency === 'USD') {
      var usd = Math.round(Number(rub) / RATE_RUB_PER_USD);
      return '$' + usd.toLocaleString('en-US');
    }
    return Number(rub).toLocaleString('ru-RU') + ' ₽';
  }

  function updatePrices() {
    $('.pricing-card__price').each(function () {
      var rub = $(this).data('rub');
      $(this).text(formatPrice(rub));
    });
    $('.currency-btn').each(function () {
      var cur = $(this).data('currency');
      $(this).toggleClass('active', cur === currency);
      $(this).toggleClass('faded', cur !== currency);
    });
  }

  $('.currency-btn').on('click', function () {
    currency = $(this).data('currency');
    updatePrices();
  });

  updatePrices();
});
