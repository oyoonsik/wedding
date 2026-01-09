/* =========================================================================
   [통합] 방명록 기능: 작성(POST), 실시간 반영, 배경색 랜덤, 슬라이드/전체보기
   ========================================================================= */

// ★ 진짜 주소 유지
const scriptURL = "https://script.google.com/macros/s/AKfycbwMvXZ7J5HaCwJVLqVCfmC9zShatJI1BNDIRh7Huh4oks2sAeFjMIMBRKXqLFcU7fDHDQ/exec";

// 1. 페이지가 로드되면 바로 슬라이드 데이터(최신글) 가져오기
window.addEventListener('load', function() {
    loadSliderData();
});

// --- [기능 1] 방명록 전송 (작성하기 + 실시간 반영 + 랜덤색) ---
function submitGuestbook() {
    const name = document.getElementById('gName').value;
    const pw = document.getElementById('gPw').value;
    const msg = document.getElementById('gMsg').value;

    if (!name || !pw || !msg) {
        alert("이름, 비밀번호, 내용을 모두 입력해 주세요!");
        return;
    }

    const btn = document.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = "전송 중입니다...";
    btn.disabled = true;

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ name: name, password: pw, message: msg }),
        mode: 'no-cors'
    })
    .then(response => {
        alert("소중한 축하 메시지가 전달되었습니다! 💌");
        
        // --- [실시간 화면 추가] ---
        const sliderContainer = document.querySelector('.guest-slider');
        
        if (sliderContainer) {
            const icon = getRandomIcon();   // 랜덤 아이콘
            const color = getRandomColor(); // ★ 랜덤 배경색
            
            // 새 카드 HTML (배경색 적용)
            const newCardHTML = `
                <div class="guest-card" style="background-color: ${color}; animation: fadeIn 1s;">
                    <span class="card-flower">${icon}</span>
                    <p class="card-msg">${escapeHtml(msg)}</p>
                    <span class="card-name">- ${escapeHtml(name)} -</span>
                </div>
            `;
            
            sliderContainer.insertAdjacentHTML('afterbegin', newCardHTML);
        }

        // 초기화
        document.getElementById('gName').value = '';
        document.getElementById('gPw').value = '';
        document.getElementById('gMsg').value = '';
        closeGuestbook();
        
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

// --- [기능 2] 메인 슬라이드 데이터 불러오기 (랜덤색 적용) ---
function loadSliderData() {
    const sliderContainer = document.querySelector('.guest-slider');
    
    fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) return;

        let html = '';
        
        data.slice(0, 10).forEach(item => {
            const icon = getRandomIcon();
            const color = getRandomColor(); // ★ 저장된 글들도 랜덤색 적용
            
            html += `
            <div class="guest-card" style="background-color: ${color};">
                <span class="card-flower">${icon}</span>
                <p class="card-msg">${escapeHtml(item.message)}</p>
                <span class="card-name">- ${escapeHtml(item.name)} -</span>
            </div>
            `;
        });

        sliderContainer.innerHTML = html;
    })
    .catch(error => {
        console.error('슬라이드 로드 실패:', error);
    });
}

// --- [기능 3] 전체보기 팝업 (여기는 깔끔하게 흰색 유지) ---
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
            listArea.innerHTML = '<div class="loading-msg">아직 작성된 글이 없습니다.</div>';
            return;
        }

        let html = '';
        data.forEach(item => {
            html += `
                <div class="guest-list-item">
                    <div class="list-top-row">
                        <span class="list-name">${escapeHtml(item.name)}</span>
                        <button class="list-del-btn" onclick="alert('삭제 기능은 추후 지원됩니다!')">✕</button>
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

// --- [기능 4] 유틸리티 (랜덤 색상 추가됨) ---

function openGuestbook() {
    document.getElementById('guestbookModal').classList.add('active');
}
function closeGuestbook() {
    document.getElementById('guestbookModal').classList.remove('active');
}

function escapeHtml(text) {
    if (text == null) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getRandomIcon() {
    const icons = ['🌸', '💐', '🌷', '🌹', '🌻', '🌺', '💖', '💍'];
    return icons[Math.floor(Math.random() * icons.length)];
}

// ★ [신규] 파스텔 톤 랜덤 색상 추출기
function getRandomColor() {
    const colors = [
        '#FFF5F5', // 연한 핑크
        '#F5F9FF', // 연한 하늘
        '#FCFFF5', // 연한 연두
        '#FFFBF5', // 연한 노랑
        '#F5F0FF', // 연한 보라
        '#FFFFFF'  // 기본 화이트
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}