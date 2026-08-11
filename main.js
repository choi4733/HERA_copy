// 네비게이션 Swiper
const navSwiper = new Swiper(".nav_swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  freeMode: true,
  watchOverflow: true,
});

// 네비게이션 클릭 이벤트
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

// 헤더 스크롤 이벤트
const header = document.querySelector("#header");

function changeHeaderColor() {
  if (!header) return;

  header.classList.toggle("is_scrolled", window.scrollY > 20);
}

changeHeaderColor();

window.addEventListener("scroll", changeHeaderColor, {
  passive: true,
});

// 배너 텍스트와 썸네일
const bannerTexts = document.querySelectorAll(".banner_text");
const bannerThumbs = document.querySelectorAll(".banner_thumb");

// 현재 배너에 맞춰 텍스트와 썸네일 변경
function changeBannerContent(index) {
  bannerTexts.forEach((text, textIndex) => {
    text.classList.toggle("active", textIndex === index);
  });

  bannerThumbs.forEach((thumb) => {
    const thumbIndex = Number(thumb.dataset.slide);
    const isActive = thumbIndex === index;

    thumb.classList.toggle("active", isActive);
    thumb.setAttribute("aria-pressed", String(isActive));
  });
}

// 메인 배너 Swiper
const bannerSwiper = new Swiper(".banner_swiper", {
  slidesPerView: 1,
  loop: true,
  speed: 450,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".banner_next",
    prevEl: ".banner_prev",
  },

  // Swiper가 처음 실행될 때
  on: {
    init() {
      changeBannerContent(this.realIndex);
    },

    // 실제 이미지 번호가 변경될 때
    realIndexChange() {
      changeBannerContent(this.realIndex);
    },
  },
});

// 자동재생 시간을 처음부터 다시 계산
function restartBannerAutoplay() {
  if (!bannerSwiper.autoplay) return;

  bannerSwiper.autoplay.stop();
  bannerSwiper.autoplay.start();
}

// 썸네일 클릭 시 해당 이미지로 이동
bannerThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const slideIndex = Number(thumb.dataset.slide);

    bannerSwiper.slideToLoop(slideIndex);
    restartBannerAutoplay();
  });
});

// 이전·다음 버튼 클릭 후 자동재생 다시 시작
const bannerPrev = document.querySelector(".banner_prev");
const bannerNext = document.querySelector(".banner_next");

bannerPrev?.addEventListener("click", restartBannerAutoplay);
bannerNext?.addEventListener("click", restartBannerAutoplay);
