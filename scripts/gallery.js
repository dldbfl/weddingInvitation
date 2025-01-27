// Swiper 초기화
const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    on: {
        slideChange: updatePagination,
    }
});

const currentSlide = document.getElementById("current-slide");
const totalSlides = document.getElementById("total-slides");
const thumbnails = document.querySelectorAll(".thumbnail-grid img");

// 총 슬라이드 수 표시
totalSlides.textContent = swiper.slides.length;

// 페이지네이션 업데이트
function updatePagination() {
    currentSlide.textContent = swiper.activeIndex + 1;
}

// 이전/다음 버튼 이벤트
document.querySelector(".prev-slide").addEventListener("click", () => swiper.slidePrev());
document.querySelector(".next-slide").addEventListener("click", () => swiper.slideNext());

// 썸네일 클릭 시 슬라이드 변경
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        swiper.slideTo(index);
    });
});
