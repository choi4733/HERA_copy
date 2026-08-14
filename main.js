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

// 헤더와 nav
const header = document.querySelector("#header");
const nav = document.querySelector(".nav_swiper");

let lastScrollY = window.scrollY;

function handleHeaderScroll() {
  if (!header || !nav) return;

  const currentScrollY = window.scrollY;
  const scrollDifference = currentScrollY - lastScrollY;

  // 기존 헤더 색상 변경
  header.classList.toggle("is_scrolled", currentScrollY > 20);

  // 맨 위에서는 nav 표시
  if (currentScrollY <= 20) {
    nav.style.display = "block";
    lastScrollY = currentScrollY;
    return;
  }

  // 너무 작은 움직임은 무시
  if (Math.abs(scrollDifference) < 5) return;

  if (scrollDifference > 0) {
    // 아래로 스크롤하면 nav 숨김
    nav.style.display = "none";
  } else {
    // 위로 스크롤하면 nav 표시
    nav.style.display = "block";
  }

  lastScrollY = currentScrollY;
}

handleHeaderScroll();

window.addEventListener("scroll", handleHeaderScroll, {
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
    prevEl: ".banner_prev",
    nextEl: ".banner_next",
  },

  on: {
    init() {
      changeBannerContent(this.realIndex);
    },

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

// 썸네일 클릭
bannerThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const slideIndex = Number(thumb.dataset.slide);

    bannerSwiper.slideToLoop(slideIndex);
    restartBannerAutoplay();
  });
});

// shop swiper
const shopSwiper = new Swiper(".shop_swiper", {
  slidesPerView: 4.5,
  spaceBetween: 12,

  navigation: {
    prevEl: ".shop_prev",
    nextEl: ".shop_next",
  },
});
