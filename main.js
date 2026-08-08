// 네비 스와이프
const navSwiper = new Swiper(".nav_swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  freeMode: true,
  watchOverflow: true,
});

// 네비 클릭 이벤트
const navLinks = document.querySelectorAll(".nav_list a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});

// 헤더 스크롤 이벤트 (색상변경)
const header = document.querySelector("#header");

function changeHeaderColor() {
  header.classList.toggle("is_scrolled", window.scrollY > 20);
}

changeHeaderColor();

window.addEventListener("scroll", changeHeaderColor, {
  passive: true,
});

// 배너 스와이프
const bannerSwiper = new Swiper(".banner_swiper", {
  slidesPerView: 1,
  loop: true,
  speed: 700,

  autoplay: {
    delay: 4000,
    disanleOnInteraction: false,
  },
  navigation: {
    nextE1: ".banner_next",
    prevE1: ".banner_prev",
  },
});
