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
        .to(".typing-text", {
            width: "auto",
            duration: 0.8,
            ease: "steps(14)",
            delay: 0.3
        })
        .to(".typing-text", {
            borderRightColor: "transparent",
            duration: 0.5,
            repeat: 3,
            yoyo: true
        })
        .to("#intro", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById("intro").style.display = "none";
            }
        }, "+=0")
        .from("#wrap", { 
            opacity: 0, 
            y: 30, 
            duration: 0.8, 
            clearProps: "all" 
        }, "-=0.5");
        
    // [Part B] 스크롤 애니메이션
    const revealEls = document.querySelectorAll('.reveal:not(.main_visual .reveal):not(.greeting):not(.family-section):not(.interview-section):not(.gallery-section):not(.calendar-section):not(.location-section):not(.guestbook):not(.snap-section):not(.middle-visual)');
    revealEls.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out"
        });
    });

    if(document.querySelector('.greeting')) {
        gsap.from(".greeting > *", {
            scrollTrigger: { trigger: ".greeting", start: "top 75%", toggleActions: "play none none reverse" },
            y: 60, opacity: 0, duration: 1.5, stagger: 0.3, ease: "power3.out"
        });
    }

    if(document.querySelector('.family-section')) {
        gsap.from(".family-section > *", {
            scrollTrigger: { trigger: ".family-section", start: "top 80%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 1.2, stagger: 0.3, ease: "power3.out"
        });
    }

    if(document.querySelector('.interview-section')) {
        const interviewTl = gsap.timeline({
            scrollTrigger: { trigger: ".interview-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        interviewTl
            .from(".interview-header > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
            .from(".photo-box", { y: 50, opacity: 0, duration: 0.8, stagger: 0.3, ease: "back.out(1.2)" }, "-=0.4")
            .from(".interview-btn", { scale: 0.8, opacity: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" }, "-=0.2");
    }

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

    if(document.querySelector('.calendar-section')) {
        const calTl = gsap.timeline({
            scrollTrigger: { trigger: ".calendar-section", start: "top 75%", toggleActions: "play none none reverse" }
        });
        calTl
            .from(".calendar-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(".calendar-wrap", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .from(".countdown-area", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");
    }

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

    if(document.querySelector('.account-section')) {
        const accTl = gsap.timeline({
            scrollTrigger: { trigger: ".account-section", start: "top 80%", toggleActions: "play none none reverse" }
        });
        accTl
            .from(".account-section .title-area", { y: 30, opacity: 0, duration: 0.8 })
            .from(".account-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
            .from(".acc-box", { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.4");
    }

    if(document.querySelector('.middle-visual')) {
        gsap.from(".middle-visual .img-box", {
            scrollTrigger: { trigger: ".middle-visual", start: "top 80%", toggleActions: "play none none reverse" },
            scale: 1.1, opacity: 0, duration: 1.5, ease: "power2.out"
        });
    }

    if(document.querySelector('.guestbook')) {
        const gbTl = gsap.timeline({
            scrollTrigger: { trigger: ".guestbook", start: "top 95%", toggleActions: "play none none none" }
        });
        gbTl
            .from(".guestbook .title-area", { y: 30, opacity: 0, duration: 0.8, clearProps: "all" })
            .from(".guestbook-main-list", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all" }, "-=0.6")
            .from(".guest-more-area", { opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.4")
            .from(".write-floating-btn", { scale: 0.3, opacity: 0, duration: 0.6, ease: "elastic.out(1, 0.5)", clearProps: "all" }, "-=0.2");
    }

    if(document.querySelector('.snap-section')) {
        const snapTl = gsap.timeline({
            scrollTrigger: { trigger: ".snap-section", start: "top 90%", toggleActions: "play none none none" }
        });
        snapTl
            .from(".snap-anim-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
            .from(".snap-anim-photo", { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)", clearProps: "all" }, "-=0.5") 
            .from(".snap-anim-text", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
            .from(".snap-anim-btn", { scale: 0.3, opacity: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", clearProps: "all" }, "-=0.2");
    }

    initBGM();
};

/* 2. 기능 함수들 */

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

function openInterview() { document.getElementById('interviewModal').classList.add('active'); }
function closeInterview() { document.getElementById('interviewModal').classList.remove('active'); }

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

function openMapModal() { document.getElementById('mapModal').classList.add('active'); }
function closeMapModal() { document.getElementById('mapModal').classList.remove('active'); }

// [수정된 계좌번호 토글: GSAP 애니메이션 적용]
function toggleAccount(id, btn) {
    const content = document.getElementById(id);
    const isActive = btn.classList.contains("active");

    if (!isActive) {
        // 열기
        btn.classList.add("active");
        gsap.set(content, { display: "block", height: 0, opacity: 0 });
        gsap.to(content, { 
            height: "auto", 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out" 
        });
    } else {
        // 닫기
        btn.classList.remove("active");
        gsap.to(content, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.in", 
            onComplete: () => {
                gsap.set(content, { display: "none" });
            }
        });
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const toast = document.getElementById("toast-msg");
    toast.classList.add("show");
    
    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}

/* =========================================
   3. 카카오톡 공유 기능
   ========================================= */
if (!Kakao.isInitialized()) {
    // 카카오 개발자 센터에서 발급받은 JavaScript 키를 입력하세요.
    Kakao.init('03146ec5263f1b8199ad84c7268b683a'); 
}

function shareKakao() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '윤식♥혜미 결혼합니다',
            description: '저희 두 사람의 결혼식에 소중한 분들을 초대합니다.',
            imageUrl: 'https://oyoonsik.github.io/wedding/img/gallery2.jpg',
            link: {
                mobileWebUrl: 'https://oyoonsik.github.io/wedding/',
                webUrl: 'https://oyoonsik.github.io/wedding/',
            },
        },
        buttons: [
            {
                title: '모바일 청첩장 보기',
                link: {
                    mobileWebUrl: 'https://oyoonsik.github.io/wedding/',
                    webUrl: 'https://oyoonsik.github.io/wedding/',
                },
            },
        ],
    });
}