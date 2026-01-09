/* =========================================================================
   [통합] 방명록 기능: 작성(POST), 실시간 반영, 슬라이드/전체보기 불러오기(GET)
   ========================================================================= */

// ★ 여기가 진짜 주소입니다 (지우지 마세요!)
const scriptURL = "https://script.google.com/macros/s/AKfycbwMvXZ7J5HaCwJVLqVCfmC9zShatJI1BNDIRh7Huh4oks2sAeFjMIMBRKXqLFcU7fDHDQ/exec";

// 1. 페이지가 로드되면 바로 슬라이드 데이터(최신글) 가져오기
window.addEventListener('load', function() {
    loadSliderData();
});

// --- [기능 1] 방명록 전송 (작성하기 + 실시간 반영) ---
function submitGuestbook() {
    const name = document.getElementById('gName').value;
    const pw = document.getElementById('gPw').value;
    const msg = document.getElementById('gMsg').value;

    // 빈칸 체크
    if (!name || !pw || !msg) {
        alert("이름, 비밀번호, 내용을 모두 입력해 주세요!");
        return;
    }

    const btn = document.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = "전송 중입니다...";
    btn.disabled = true;

    // 서버로 전송
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ name: name, password: pw, message: msg }),
        mode: 'no-cors'
    })
    .then(response => {
        alert("소중한 축하 메시지가 전달되었습니다! 💌");
        
        // ---------------------------------------------------------
        // ★ [핵심] 서버 기다리지 말고 화면에 바로 띄우기 (실시간 효과)
        // ---------------------------------------------------------
        const sliderContainer = document.querySelector('.guest-slider');
        
        // 슬라이드가 비어있을 경우(초기 상태) 대비
        if (!sliderContainer) return;

        const icon = getRandomIcon(); // 랜덤 아이콘
        
        // 새 카드 HTML 만들기 (애니메이션 효과 포함)
        const newCardHTML = `
            <div class="guest-card" style="animation: fadeIn 1s; background-color: #fff4f4;">
                <span class="card-flower">${icon}</span>
                <p class="card-msg">${escapeHtml(msg)}</p>
                <span class="card-name">- ${escapeHtml(name)} -</span>
            </div>
        `;
        
        // 슬라이드 맨 앞('afterbegin')에 강제로 추가!
        sliderContainer.insertAdjacentHTML('afterbegin', newCardHTML);
        // ---------------------------------------------------------

        // 입력창 초기화 및 닫기
        document.getElementById('gName').value = '';
        document.getElementById('gPw').value = '';
        document.getElementById('gMsg').value = '';
        closeGuestbook();
        
        // 버튼 원상복구
        btn.innerHTML = originalText;
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

// --- [기능 2] 메인 슬라이드 데이터 불러오기 ---
function loadSliderData() {
    const sliderContainer = document.querySelector('.guest-slider');
    
    fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        // 데이터가 없으면 종료
        if (data.length === 0) return;

        let html = '';
        
        // 최신 글 10개만 보여주기
        data.slice(0, 10).forEach(item => {
            const icon = getRandomIcon();
            html += `
            <div class="guest-card">
                <span class="card-flower">${icon}</span>
                <p class="card-msg">${escapeHtml(item.message)}</p>
                <span class="card-name">- ${escapeHtml(item.name)} -</span>
            </div>
            `;
        });

        // 슬라이드 내용 교체
        sliderContainer.innerHTML = html;
    })
    .catch(error => {
        console.error('슬라이드 로드 실패:', error);
    });
}

// --- [기능 3] 전체보기 팝업 데이터 불러오기 ---
function openAllGuestbook() {
    const modal = document.getElementById('allGuestbookModal');
    modal.classList.add('active');
    loadListData(); 
}

function closeAllGuestbook() {
    document.getElementById('allGuestbookModal').classList.remove('active');
}

function loadListData() {
    const listArea = document.getElementById('guestbookListArea');
    listArea.innerHTML = '<div class="loading-msg">소중한 글들을 불러오는 중... ⏳</div>';

    fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            listArea.innerHTML = '<div class="loading-msg">아직 작성된 글이 없습니다.<br>첫 번째 주인공이 되어주세요! 😊</div>';
            return;
        }

        let html = '';
        data.forEach(item => {
            html += `
                <div class="guest-list-item">
                    <div class="list-top-row">
                        <span class="list-name">${escapeHtml(item.name)}</span>
                        <button class="list-del-btn" onclick="alert('삭제 기능은 추후 지원됩니다! (비밀번호 확인 필요)')">✕</button>
                    </div>
                    <div class="list-msg">${escapeHtml(item.message)}</div>
                </div>
            `;
        });
        listArea.innerHTML = html;
    })
    .catch(error => {
        listArea.innerHTML = '<div class="loading-msg">불러오기 실패 😭</div>';
    });
}

// --- [기능 4] 공통 유틸리티 ---

// 팝업 열기/닫기 (작성하기)
function openGuestbook() {
    document.getElementById('guestbookModal').classList.add('active');
}
function closeGuestbook() {
    document.getElementById('guestbookModal').classList.remove('active');
}

// 특수문자 변환 (보안 + 숫자 에러 방지 버전)
function escapeHtml(text) {
    if (text == null) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 카드 아이콘 랜덤 반환 함수
function getRandomIcon() {
    const icons = ['🌸', '💐', '🌷', '🌹', '🌻', '🌺', '💖', '💍'];
    return icons[Math.floor(Math.random() * icons.length)];
}