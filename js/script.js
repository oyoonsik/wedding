/* =========================================
   1. GSAP 애니메이션 (페이지 로드 후 실행)
   ========================================= */
gsap.registerPlugin(ScrollTrigger);

window.onload = () => {
    // 전체 타임라인 생성
    const masterTl = gsap.timeline();

    // [Step 1] 인트로 애니메이션
    masterTl
        .from(".intro-text", {
            opacity: 0,
            y: 30,
            duration: 1.5,
            ease: "power3.out"
        })
        .to("#intro", {
            delay: 0.5,
            duration: 0.8,
            yPercent: -100, // 인트로가 위로 슬라이드
            ease: "power4.inOut"
        })
        // [Step 2] 메인 비주얼 (#wrap) 등장
        .from("#wrap", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            clearProps: "all" 
        }, "-=0.8")
        // [Step 3] 메인 내부 요소들 순차적 등장
        .to(".wedding_date", { opacity: 1, y: -10, duration: 0.6 }, "-=0.4")
        .to(".wedding_names", { opacity: 1, y: -10, duration: 0.6 }, "-=0.7")
        .to(".img_frame", { opacity: 1, y: -10, duration: 0.8 }, "-=0.7")
        .to(".location", { opacity: 1, duration: 0.6 }, "-=0.6");

    // [Step 4] 스크롤 트리거 (하단 섹션 애니메이션)
    const revealEls = document.querySelectorAll('.reveal:not(.main_visual .reveal)');
    
    revealEls.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
};

/* =========================================
   2. 배경음악 컨트롤 (BGM)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-control');

    // 음악 버튼 클릭 시 재생/일시정지 토글
    if (musicBtn && bgm) {
        musicBtn.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play();
                musicBtn.classList.add('playing');
            } else {
                bgm.pause();
                musicBtn.classList.remove('playing');
            }
        });

        // 자동 재생 시도 (브라우저 정책 우회: 첫 클릭 시 재생)
        window.addEventListener('click', () => {
            if (bgm.paused && !musicBtn.classList.contains('manually-paused')) {
                bgm.play();
                musicBtn.classList.add('playing');
            }
        }, { once: true });
    }
});

/* =========================================
   3. 연락처 팝업 기능
   ========================================= */
const contactData = {
    groom: [
        { rel: "신랑", name: "오윤식", tel: "010-9961--6199" },
        { rel: "신랑 아버지", name: "오영철", tel: "010-3782-3442" },
        { rel: "신랑 어머니", name: "이금하", tel: "010-5000-1320" }
    ],
    bride: [
        { rel: "신부", name: "박혜미", tel: "010-9159-3303" },
        { rel: "신부 아버지", name: "박호철", tel: "010-1111-1111" },
        { rel: "신부 어머니", name: "장환순", tel: "010-1111-1111" }
    ]
};

function openContact(type) {
    const list = document.getElementById('contactList');
    list.innerHTML = ''; // 초기화
    document.getElementById('modalTitle').innerText = type === 'groom' ? '신랑측 연락처' : '신부측 연락처';

    contactData[type].forEach(person => {
        list.innerHTML += `
            <div class="contact-item-box">
                <div class="contact-info-text">
                    <span class="info-rel">${person.rel}</span>
                    <span class="info-name">${person.name}</span>
                </div>
                <div class="contact-actions">
                    <a href="tel:${person.tel}" class="action-link">📞</a>
                    <a href="sms:${person.tel}" class="action-link">✉️</a>
                </div>
            </div>
        `;
    });

    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
}

function closeContact() {
    document.getElementById('contactModal').classList.remove('active');
}

/* =========================================
   4. 인터뷰 팝업 기능
   ========================================= */
function openInterview() {
    document.getElementById('interviewModal').classList.add('active');
}

function closeInterview() {
    document.getElementById('interviewModal').classList.remove('active');
}

/* =========================================
   5. 갤러리 기능 (더보기 & 확대보기)
   ========================================= */
function expandGallery() {
    const grid = document.getElementById('galleryGrid');
    const btnWrap = document.getElementById('moreBtnWrap');
    
    // 높이 제한 해제
    grid.classList.add('expanded');
    // 버튼 숨김
    btnWrap.classList.add('hidden');
}

function viewPhoto(img) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = img.src;
    modal.classList.add('active');
}

function closePhoto() {
    document.getElementById('photoModal').classList.remove('active');
}

/* =========================================
   6. 약도 팝업 기능
   ========================================= */
function openMapModal() {
    document.getElementById('mapModal').classList.add('active');
}

function closeMapModal() {
    document.getElementById('mapModal').classList.remove('active');
}


/* =========================================
   7. 방명록 작성 팝업 기능
   ========================================= */
function openGuestbook() {
    const modal = document.getElementById('guestbookModal');
    modal.classList.add('active'); // 팝업 열기
}

function closeGuestbook() {
    const modal = document.getElementById('guestbookModal');
    modal.classList.remove('active'); // 팝업 닫기
}
