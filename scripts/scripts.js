document.addEventListener("DOMContentLoaded", function () {
    const messages = [
        "따뜻한 마음으로",
        "저희를 축복해 주신",
        "모든 분들께 감사드리며,", 
        "앞으로도 늘 행복과 평안이",
        "함께하시길 바랍니다.",
        "from 누리, 보람."
    ];

    const typingSpeed = 80; // 타이핑 속도 (ms)
    const delayBetweenMessages = 300; // 메시지 간 대기 시간 (ms)
    const fadeOutDuration = 2000; // 페이드아웃 시간 (ms)

    let messageIndex = 0;
    let charIndex = 0;
    const typedTextElement = document.getElementById("typed-text");
    const overlayElement = document.getElementById("overlay");

    function typeMessage() {
        if (charIndex < messages[messageIndex].length) {
            typedTextElement.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, typingSpeed);
        } else {
            messageIndex++;
            charIndex = 0;
            if (messageIndex < messages.length) {
                setTimeout(() => {
                    typedTextElement.textContent += "\n"; // 줄바꿈 추가
                    typeMessage();
                }, delayBetweenMessages);
            } else {
                // 마지막 메시지가 출력된 후 페이드아웃 실행
                setTimeout(() => {
                    overlayElement.style.opacity = "0"; // 투명하게 만들기
                    setTimeout(() => {
                        overlayElement.style.display = "none"; // 화면에서 완전히 제거
                    }, fadeOutDuration);
                }, 1000); // 메시지 출력 완료 후 대기 시간
            }
        }
    }

    function fadeOutOverlay() {
        overlayElement.style.opacity = "0"; // 투명하게 만들기
        setTimeout(() => {
            overlayElement.style.display = "none"; // 요소 숨기기
        }, fadeOutDuration);
    }

    // 타이핑 시작
    typeMessage();

    /** 음악 기능 추가 **/
    const musicToggleButton = document.getElementById("music-toggle");
    const audio = document.getElementById("background-music");

    let isPlaying = true; // 초기 음악 재생 상태

    // 초기 상태: animation_music.json + 음악 재생
    document.getElementById("music-icon").src = "images/volume.svg";

    setTimeout(() => {
        audio.play();
    }, 10000);
  
    // 버튼 클릭 이벤트
    musicToggleButton.addEventListener("click", () => {
      if (isPlaying) {
        // 음악 정지 및 music_start.json으로 전환
        audio.pause();
        document.getElementById("music-icon").src = "images/volume-slash.svg";
        //loadLottieAnimation("./animations/music_start.json", false); // 한번만 재생
        isPlaying = false;
      } else {
        // 음악 재생 및 animation_music.json으로 전환
        audio.play();
        document.getElementById("music-icon").src = "images/volume.svg";
        //loadLottieAnimation("./animations/animation_music.json");
        isPlaying = true;
      }
    });
    /** 음악 기능 종료 **/
});

// 카운트다운 기능
function calculateTime() {
  const weddingDate = new Date("2025-02-25T00:00:00");
  const now = new Date();
  const diff = weddingDate - now;

  const countdownContainer = document.getElementById("countdown-container");
  const countdownMessage = document.getElementById("countdown-message"); 

  if (diff >= 0) {
    // 결혼 전: 남은 시간 계산
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownContainer.innerHTML = `
      <div class="countdown-box">
        <div class="countdown-value">${days}</div>
        <div class="countdown-label">일&nbsp;</div>
        <div class="countdown-value">${hours}</div>
        <div class="countdown-label">시간&nbsp;</div>
        <div class="countdown-value">${minutes}</div>
        <div class="countdown-label">분&nbsp;</div>
        <div class="countdown-value">${seconds}</div>
        <div class="countdown-label">초</div>
      </div>
    `;

    countdownMessage.innerHTML = `
      누리<span style="color: pink; font-size: 2.5rem;">&nbsp;♥&nbsp;</span>보람 결혼이 <strong>${days}</strong>일 남았습니다!
    `;

  } else {
    // 결혼 후: 경과 시간 계산
    const elapsed = Math.abs(diff);
    const totalDays = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;

    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);

    countdownContainer.innerHTML = `
      <div class="countdown-box">
        <div class="countdown-value">${totalDays}</div>
        <div class="countdown-label">일</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-value">${hours}</div>
        <div class="countdown-label">시간</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-value">${minutes}</div>
        <div class="countdown-label">분</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-value">${seconds}</div>
        <div class="countdown-label">초</div>
      </div>
    `;

    if (totalDays === 0) {
      countdownMessage.innerHTML = `
        오늘은 결혼하는 날이에요! 🎉
      `;
    } else if (years > 0) {
      countdownMessage.innerHTML = `
        누리<span style="color: gold;">★</span>보람이 결혼한 지 벌써 <strong>${years}</strong>년 <strong>${remainingDays}</strong>일 입니다!
      `;
    } else {
      countdownMessage.innerHTML = `
        누리<span style="color: gold;">★</span>보람이 결혼한 지 벌써 <strong>${totalDays}</strong>일 입니다!
      `;
    }
  }
}

// 1초마다 업데이트
setInterval(calculateTime, 1000);

// 초기 실행
calculateTime();



// 1초마다 업데이트
setInterval(calculateTime, 1000);

// 초기 실행
calculateTime();


// 캔버스 꽃잎 애니메이션
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const petals = [];
const imageElement = document.querySelector(".intro img");

// 캔버스 크기 조정
function resizeCanvas() {
    const rect = imageElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.8 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle);
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 192, 203, 0.8)";
        ctx.ellipse(this.x, this.y, this.size, this.size * 1.5, this.angle, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 160; i++) petals.push(new Petal());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((petal) => {
        petal.update();
    petal.draw();
});
    requestAnimationFrame(animate);
}

animate();

/** 날짜 공지기능 */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 배경색 및 텍스트 애니메이션
  gsap.fromTo(
    "#date-text",
    { opacity: 0, y: 50 }, // 초기 상태
    {
      opacity: 1,
      y: 0,
      duration: 0.8, // 전체 애니메이션 속도
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#date-announcement",
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
      },
    }
  );

  // 배경색 전환
  gsap.to("#date-announcement", {
    backgroundColor: "rgb(255 236 240)",
    ease: "power1.out",
    duration: 0.5,
    scrollTrigger: {
      trigger: "#date-announcement",
      start: "top center",
      end: "bottom center",
      toggleActions: "play reverse play reverse",
    },
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isOpen = content.style.display === "block";
  
      // 다른 열려 있는 아코디언 닫기
      document.querySelectorAll(".accordion-content").forEach(item => {
        if (item !== content) item.style.display = "none";
      });
  
      // 현재 아코디언 열기/닫기
      content.style.display = isOpen ? "none" : "block";
    });
  });

// 복사 버튼 동작
// Toast 메시지 표시 함수
function showToast(message) {
  const toastContainer = document.getElementById("toast-container");

  // 새 Toast 메시지 생성
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
    <span class="toast-icon">✔&nbsp;</span>
    <span>${message}</span>
  `;

  // Toast 메시지 컨테이너에 추가
  toastContainer.appendChild(toast);

  // 3초 후 메시지 투명도 감소 및 아래로 이동
  setTimeout(() => {
    toast.style.animation = "slideOutDown 3s forwards";
    // 3.5초 후 메시지 완전히 제거
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }, 2000);
}

// 복사 버튼 동작
document.querySelectorAll(".copy-button").forEach(button => {
  button.addEventListener("click", (e) => {
    // 부모 요소인 `.bank-info`를 찾아 해당 텍스트를 복사
    const bankInfo = e.target.closest(".bank-info").querySelector("span:first-child").textContent;
    navigator.clipboard.writeText(bankInfo).then(() => {
      showToast("계좌번호가 복사되었습니다.");
    });
  });
});

// 버튼 클릭 이벤트 처리
document.querySelectorAll(".pay-button").forEach(button => {
  button.addEventListener("click", () => {
    const paymentUrl = button.getAttribute("data-url"); // 버튼의 data-url 속성에서 URL 가져오기
    window.open(paymentUrl, "_blank"); // 송금 URL로 새 창 열기
  });
});
});


/** 연락하기 섹션  */
// 가족별 데이터
// 가족별 데이터
const familyData = {
  groom: {
      title: "신랑 측 가족",
      members: [
          { name: "이누리", role: "신랑", phone: "01096001861" },
          { name: "이기호", role: "아버지", phone: "01044006997" },
          { name: "이명숙", role: "어머니", phone: "01033991861" },
      ],
  },
  bride: {
      title: "신부 측 가족",
      members: [
          { name: "정보람", role: "신부", phone: "01090657177" },
          { name: "임성희", role: "어머니", phone: "01037909061" },
      ],
  },
};

// 모달 관련 요소
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const familyList = document.getElementById("family-list");
const closeButton = document.querySelector(".close");

// 모달 초기 함수

// 모달 표시 함수
document.querySelectorAll(".family-box").forEach(box => {
  box.addEventListener("click", () => {
      const familyType = box.id.replace("-box", ""); // groom 또는 bride
      const data = familyData[familyType];

      // 모달 내용 업데이트
      modalTitle.textContent = data.title;
      familyList.innerHTML = ""; // 기존 내용 초기화
      data.members.forEach(member => {
          const row = document.createElement("div");
          row.classList.add("family-row");

          row.innerHTML = `
              <span>${member.role} <strong>${member.name}</strong></span>
              <div class="action-buttons">
                  <button class="action-button sms-button" onclick="window.location.href='sms:${member.phone}'">문자하기</button>
                  <button class="action-button call-button" onclick="window.location.href='tel:${member.phone}'">전화하기</button>
              </div>
          `;
          familyList.appendChild(row);
      });

      // 모달 열기
      modal.style.display = "flex";
  });
});

// 모달 닫기 이벤트
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달 외부 클릭 시 닫기
window.addEventListener("click", event => {
  if (event.target === modal) {
      modal.style.display = "none";
  }
});


// 카카오 공유하기 버튼 동작
Kakao.init("07fda9cbee6f867b2ea8d1d3724fa72d"); // 카카오 앱 키 입력

// 버튼 이벤트
document.getElementById("send-kakao-invite").addEventListener("click", function () {
    Kakao.Link.sendDefault({
        objectType: "feed", // 카톡 메시지 타입: 피드형
      content: {
            title: "이누리 ♥ 정보람의 결혼알림장입니다.", // 제목
            description: "누리와 보람이의 결혼을 축하해주세요!", // 설명
            imageUrl: "https://dldbfl.github.io/weddingInvitation/images/thumbnail_kakao.jpg", // 청첩장 이미지 URL
          link: {
                mobileWebUrl: "https://dldbfl.github.io/weddingInvitation/", // 모바일 웹 청첩장 링크
                webUrl: "https://dldbfl.github.io/weddingInvitation/", // 웹 청첩장 링크
          },
      },
      buttons: [
          {
                title: "청첩장 보기", // 버튼 텍스트
              link: {
                    mobileWebUrl: "https://dldbfl.github.io/weddingInvitation/",
                    webUrl: "https://dldbfl.github.io/weddingInvitation/",
              },
          },
      ],
  });
});

const sharedUrl = "https://dldbfl.github.io/weddingInvitation/"; // 청첩장 URL

document.getElementById("copy-url-button").addEventListener("click", function () {
    // 클립보드에 URL 복사
    navigator.clipboard.writeText(sharedUrl).then(() => {
        alert("청첩장 URL이 복사되었습니다! 문자로 공유해보세요.");
    }).catch(err => {
        console.error("URL 복사 실패: ", err);
  });
});