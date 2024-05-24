$(document).ready(function () {
  "use strict";

  // =====================
  // Membership Navigation
  // Add current class to
  // the current page
  // =====================

  var pathname = window.location.pathname;

  $('.js-nav__link-membership[href="' + pathname + '"]').addClass(
    "c-nav__link--current"
  );

  // =====================
  // Navigation
  // =====================

  $(".js-nav-toggle").click(function (e) {
    e.preventDefault();
    $(".c-nav-wrap").toggleClass("is-active");
    $(this).toggleClass("c-nav-toggle--close");
    $("body").toggleClass("e-mode-mobile");
  });

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll(".kg-gallery-image img");

  gallery_images.forEach(function (image) {
    var container = image.closest(".kg-gallery-image");
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + " 1 0%";
  });

  // =====================
  // Decode HTML entities returned by Ghost translations
  // Input: Plus d&#x27;articles
  // Output: Plus d'articles
  // =====================

  function decoding_translation_chars(string) {
    return $("<textarea/>").html(string).text();
  }

  // =====================
  // Responsive videos
  // =====================

  $(".c-content").fitVids({
    customSelector: [
      'iframe[src*="ted.com"]',
      'iframe[src*="player.twitch.tv"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="facebook.com"]',
    ],
  });

  // =====================
  // Images zoom
  // =====================

  $(".c-content img").attr("data-action", "zoom");

  // If the image is inside a link, remove zoom
  $(".c-content a img").removeAttr("data-action");

  // =====================
  // Clipboard URL Copy
  // =====================

  var clipboard = new ClipboardJS(".js-share__link--clipboard");

  clipboard.on("success", function (e) {
    var element = $(e.trigger);

    element.addClass("tooltipped tooltipped-s");
    element.attr("aria-label", clipboard_copied_text);

    element.mouseleave(function () {
      $(this).removeAttr("aria-label");
      $(this).removeClass("tooltipped tooltipped-s");
    });
  });

  // =====================
  // Ajax Load More
  // =====================

  var pagination_next_url = $("link[rel=next]").attr("href"),
    $load_posts_button = $(".js-load-posts");

  $load_posts_button.click(function (e) {
    e.preventDefault();

    var request_next_link =
      pagination_next_url.split(/page/)[0] +
      "page/" +
      pagination_next_page_number +
      "/";

    $.ajax({
      url: request_next_link,
      beforeSend: function () {
        $load_posts_button.text("더보기"
        );
        $load_posts_button.addClass("c-btn--loading");
      },
    }).done(function (data) {
      var posts = $(".js-post-card__wrap", data);

      $(".js-grid").append(posts);

      $load_posts_button.text("더보기"
      );
      $load_posts_button.removeClass("c-btn--loading");

      pagination_next_page_number++;

      // If you are on the last pagination page, hide the load more button
      if (pagination_next_page_number > pagination_available_pages_number) {
        $load_posts_button.addClass("c-btn--disabled").attr("disabled", true);
      }
    });
  });

  // =====================
  // Mobile Drawer
  // =====================

  $('.js-nav-toggle').click(function(e) {
    e.preventDefault();
    $('.c-header-drawer').toggleClass('is-active');

    // $(this).toggleClass('c-nav-toggle--close');

    $('body').toggleClass('e-mode-mobile');
  });

  // =====================
  // Mobile Search form
  // =====================
  var mSearchForm = document.getElementById("c-search");
  if (mSearchForm) {
    mSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var searchParam = $(this).find(".c-search__stx")[0].value;
      window.location.href =
        "/search/" + encodeURIComponent(searchParam.trim());
      return false;
    });
  }

  // =====================
  // Swiper
  // =====================
  for (let i = 0; i < 100; i++) {
    const containerClass = `swiper-${i}`;
    const nextClass = `swiper-button-next-${i}`;
    const prevClass = `swiper-button-prev-${i}`;
    var mySwiper = new Swiper(`.${containerClass}`, {
      // 슬라이드를 버튼으로 움직일 수 있습니다.
      navigation: {
        nextEl: `.${nextClass}`,
        prevEl: `.${prevClass}`,
      },
    });
  }

  for (let i = 0; i < 100; i++) {
    const containerClass = `swiper2-${i}`;
    const nextClass = `swiper2-button-next-${i}`;
    const prevClass = `swiper2-button-prev-${i}`;
    var mySwiper2 = new Swiper(`.${containerClass}`, {
      slidesPerView : '3',
      spaceBetween: 20,
      // 슬라이드를 버튼으로 움직일 수 있습니다.
      navigation: {
        nextEl: `.${nextClass}`,
        prevEl: `.${prevClass}`,
      },
    });
  }
  var mySwiper = new Swiper(".swiper-banner", {
    pagination: {
      el: ".swiper-page",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });



  
  // Stibee
  $(".stb_form_set_input")
    .focus(function () {
      $(this).prev("label").addClass("u-hidden");
    })
    .blur(function () {
      var n = $(this).val();
      if (n.length < 1) {
        $(this).prev("label").removeClass("u-hidden");
      } else {
        $(this).prev("label").addClass("u-hidden");
      }
    });
});
