/* =========================================================================
   [통합] UI 및 애니메이션 스크립트 (윤식♥혜미 결혼식)
   ========================================================================= */

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

/* 1. 페이지 로드 완료 시 실행되는 메인 로직 */
window.onload = () => {
  // [Part A] 인트로 애니메이션 (타이핑 효과)
    const masterTl = gsap.timeline();

    masterTl
        // 1. 0.5초 대기 후 타이핑 시작
        .to(".typing-text", {
            width: "auto",       // 글자 길이만큼 늘어남
            duration: 2.0,       // 2초 동안 타이핑
            ease: "steps(14)",   // 글자 수(14자)만큼 딱딱 끊어서 (타자기 느낌)
            delay: 0.5
        })
        // 2. 타이핑 끝나면 커서 3번 깜빡이고 사라짐
        .to(".typing-text", {
            borderRightColor: "transparent",
            duration: 0.5,
            repeat: 3,
            yoyo: true
        })
        // 3. 인트로 전체가 부드럽게 사라짐 (페이드 아웃)
        .to("#intro", {
            opacity: 0,
            duration: 1.0,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById("intro").style.display = "none";
            }
        }, "+=0.3") // 커서 깜빡임 끝나고 0.3초 뒤에 실행
        
        // 4. 메인 화면 등장
        .from("#wrap", { 
            opacity: 0, 
            y: 30, 
            duration: 1.0, 
            clearProps: "all" 
        }, "-=0.5");
        
    // [Part B] 스크롤 애니메이션 (섹션별 분기 처리)

    // 1. 일반 섹션 (특수 효과가 있는 섹션들은 모두 제외)
    // -> 제외 목록에 .middle-visual 추가됨
    const revealEls = document.querySelectorAll('.reveal:not(.main_visual .reveal):not(.greeting):not(.family-section):not(.interview-section):not(.gallery-section):not(.calendar-section):not(.location-section):not(.guestbook):not(.snap-section):not(.middle-visual)');
    revealEls.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out"
        });
    });

    // 2. 인사말 (Greeting)
    if(document.querySelector('.greeting')) {
        gsap.from(".greeting > *", {
            scrollTrigger: { trigger: ".greeting", start: "top 75%", toggleActions: "play none none reverse" },
            y: 60, opacity: 0, duration: 1.5, stagger: 0.3, ease: "power3.out"
        });
    }

    // 3. 가족 (Family)
    if(document.querySelector('.family-section')) {
        gsap.from(".family-section > *", {
            scrollTrigger: { trigger: ".family-section", start: "top 80%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 1.2, stagger: 0.3, ease: "power3.out"
        });
    }

    // 4. 인터뷰 (Interview)
    if(document.querySelector('.interview-section')) {
        const interviewTl = gsap.timeline({
            scrollTrigger: { trigger: ".interview-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        interviewTl
            .from(".interview-header > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
            .from(".photo-box", { y: 50, opacity: 0, duration: 0.8, stagger: 0.3, ease: "back.out(1.2)" }, "-=0.4")
            .from(".interview-btn", { scale: 0.8, opacity: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" }, "-=0.2");
    }

    // 5. 갤러리 (Gallery)
    if(document.querySelector('.gallery-section')) {
        const galleryTl = gsap.timeline({
            scrollTrigger: { trigger: ".gallery-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        galleryTl
            .from(".gallery-header > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
            .from(".gallery-item", { 
                scale: 0.8, opacity: 0, duration: 0.6, 
                stagger: { amount: 0.6, grid: "auto", from: "center" }, 
                ease: "back.out(1.2)" 
            }, "-=0.4")
            .from(".more-btn-wrap", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2");
    }

    // 6. 캘린더 (Calendar)
    if(document.querySelector('.calendar-section')) {
        const calTl = gsap.timeline({
            scrollTrigger: { trigger: ".calendar-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        calTl
            .from(".calendar-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(".calendar-wrap", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".countdown-area", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");
    }

    // 7. 오시는 길 (Location)
    if(document.querySelector('.location-section')) {
        const locTl = gsap.timeline({
            scrollTrigger: { trigger: ".location-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        locTl
            .from(".location-header", { y: 30, opacity: 0, duration: 0.8 })
            .from(".venue-info > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6")
            .from("#map", { scale: 0.95, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
            .from(".static-map-btn, .navi-section", { y: 30, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.4")
            .from(".trans-row", { x: -20, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.2");
    }

    // 8. [추가] 중간 비주얼 (Middle Visual) - 웅장한 줌아웃 등장
    if(document.querySelector('.middle-visual')) {
        gsap.from(".middle-visual .img-box", {
            scrollTrigger: {
                trigger: ".middle-visual",
                start: "top 80%",           // 화면 80% 지점에서 시작
                toggleActions: "play none none reverse"
            },
            scale: 1.1,         // 1.1배 크기에서 시작해서
            opacity: 0,         // 투명하다가
            duration: 1.5,      // 1.5초 동안 서서히
            ease: "power2.out"  // 원래 크기(1.0)로 돌아옴 (우아한 느낌)
        });
    }

// 9. 방명록 (Guestbook) - 버튼 안 보임 해결 버전
    if(document.querySelector('.guestbook')) {
        const gbTl = gsap.timeline({
            scrollTrigger: { 
                trigger: ".guestbook", 
                start: "top 95%",            // [수정] 화면 하단에 닿자마자 즉시 시작
                toggleActions: "play none none none" // [수정] 한 번 뜨면 절대 안 사라짐
            }
        });
        gbTl
            .from(".guestbook .title-area", { 
                y: 30, opacity: 0, duration: 0.8, 
                clearProps: "all" 
            })
            .from(".guestbook-main-list", { 
                y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
                clearProps: "all"
            }, "-=0.6")
            .from(".guest-more-area", { 
                opacity: 0, duration: 0.5,
                clearProps: "all"
            }, "-=0.4")
            .from(".write-floating-btn", { 
                scale: 0.3, 
                opacity: 0, 
                duration: 0.6, 
                ease: "elastic.out(1, 0.5)",
                clearProps: "all" // [수정] 애니메이션 끝나면 무조건 보이게 강제 설정
            }, "-=0.2");
    }

    // 10. 스냅 (Snap) - 버튼 안 보임 해결 버전
        if(document.querySelector('.snap-section')) {
            const snapTl = gsap.timeline({
                scrollTrigger: { 
                    trigger: ".snap-section", 
                    start: "top 90%",           // [수정] 화면 하단에 닿자마자 시작 (더 빨리 뜸)
                    toggleActions: "play none none none" // [수정] 한 번 뜨면 절대 다시 안 사라짐
                }
            });
            snapTl
                .from(".snap-anim-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".snap-anim-photo", { 
                    y: 60, opacity: 0, duration: 0.8, stagger: 0.15, 
                    ease: "back.out(1.7)",
                    clearProps: "all" // [수정] 애니메이션 끝나면 스타일 찌꺼기 제거 (안전장치)
                }, "-=0.5") 
                .from(".snap-anim-text", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".snap-anim-btn", { 
                    scale: 0.3, 
                    opacity: 0, 
                    duration: 0.5, 
                    ease: "elastic.out(1, 0.5)",
                    clearProps: "all" // [수정] 버튼 애니메이션 끝나면 강제로 투명도 100% 고정
                }, "-=0.2");
        }
    // [Part C] BGM 초기화 실행
    initBGM();
};


/* =========================================
   2. 기능 함수들 (팝업, 지도, BGM 등)
   ========================================= */

// [BGM]
function initBGM() {
    const bgm = document.getElementById('bgm');
    const musicBtn = document.getElementById('music-control');
    if (musicBtn && bgm) {
        musicBtn.addEventListener('click', () => {
            if (bgm.paused) { bgm.play(); musicBtn.classList.add('playing'); } 
            else { bgm.pause(); musicBtn.classList.remove('playing'); }
        });
        window.addEventListener('click', () => {
            if (bgm.paused) { bgm.play(); musicBtn.classList.add('playing'); }
        }, { once: true });
    }
}

// [연락처]
const contactData = {
    groom: [
        { rel: "신랑", name: "오윤식", tel: "010-9961-6199" },
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
    list.innerHTML = ''; 
    document.getElementById('modalTitle').innerText = type === 'groom' ? '신랑측 연락처' : '신부측 연락처';
    contactData[type].forEach(person => {
        list.innerHTML += `
            <div class="contact-item-box">
                <div class="contact-info-text"><span class="info-rel">${person.rel}</span><span class="info-name">${person.name}</span></div>
                <div class="contact-actions"><a href="tel:${person.tel}" class="action-link">📞</a><a href="sms:${person.tel}" class="action-link">✉️</a></div>
            </div>`;
    });
    document.getElementById('contactModal').classList.add('active');
}
function closeContact() { document.getElementById('contactModal').classList.remove('active'); }

// [인터뷰]
function openInterview() { document.getElementById('interviewModal').classList.add('active'); }
function closeInterview() { document.getElementById('interviewModal').classList.remove('active'); }

// [갤러리]
function expandGallery() {
    document.getElementById('galleryGrid').classList.add('expanded');
    document.getElementById('moreBtnWrap').classList.add('hidden');
}
function viewPhoto(img) {
    const modal = document.getElementById('photoModal');
    document.getElementById('modalImg').src = img.src;
    modal.classList.add('active');
}
function closePhoto() { document.getElementById('photoModal').classList.remove('active'); }

// [약도]
function openMapModal() { document.getElementById('mapModal').classList.add('active'); }
function closeMapModal() { document.getElementById('mapModal').classList.remove('active'); }