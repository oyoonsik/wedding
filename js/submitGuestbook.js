/* =========================================================================
   [통합] 방명록(작성/삭제/리스트) + 스냅 사진(자동압축 업로드)
   ========================================================================= */

// ★ 진짜 주소 (앱스 스크립트 배포 후 바뀐 주소가 있다면 꼭 확인하세요!)
const scriptURL = "https://script.google.com/macros/s/AKfycbw1EiaOp2WKKlEJjlYwPiT47Kal80qqd0mRZq26PqZvOcRcxNW9-HiP3k2aGUH8vXj0/exec";

// 전역 변수
let allGuestbookData = []; 
let currentIndex = 0;      
const ITEMS_PER_PAGE = 5;  

window.addEventListener('load', function() {
    loadGuestbookData();
});

/* =========================================
   [기능 1] 스냅 사진 업로드 (자동 리사이징)
   ========================================= */
function triggerFileUpload() {
    document.getElementById('snapFile').click();
}

function uploadSnapPhoto() {
    const fileInput = document.getElementById('snapFile');
    const file = fileInput.files[0];
    if (!file) return;

    const btn = document.querySelector('.snap-upload-btn');
    const originalText = btn.innerText;
    btn.innerText = "압축 및 업로드 중... ⏳";
    btn.disabled = true;

    // 이미지 압축 (최대 너비 1280px, 품질 0.7)
    resizeImage(file, 1280, 0.7, function(base64Data) {
        // 압축된 데이터로 전송 시작
        const payload = {
            action: 'upload',
            fileName: file.name,
            mimeType: 'image/jpeg', // 압축하면 무조건 jpg가 됨
            fileData: base64Data
        };

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            mode: 'no-cors'
        })
        .then(response => {
            alert("사진이 성공적으로 전달되었습니다! 📸");
            btn.innerText = "업로드 완료!";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                fileInput.value = ''; 
            }, 2000);
        })
        .catch(error => {
            alert("업로드 실패 😭 다시 시도해주세요.");
            console.error(error);
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}

// [헬퍼 함수] 이미지를 캔버스에 그려서 리사이징하는 마법의 코드
function resizeImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 비율 유지하면서 크기 계산
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round(height * (maxWidth / width));
                width = maxWidth;
            }

            // 캔버스에 그리기
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // 압축된 Base64 문자열 뽑기 (앞에 'data:image/jpeg;base64,' 제거)
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const base64Data = dataUrl.split(',')[1];
            
            callback(base64Data);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/* =========================================
   [기능 2] 방명록 관련 (기존 코드 유지)
   ========================================= */

function loadGuestbookData() {
    const listContainer = document.getElementById('mainGuestbookList');
    const moreBtnArea = document.getElementById('moreBtnArea');

    fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
        allGuestbookData = data;
        currentIndex = 0;
        listContainer.innerHTML = '';

        if (allGuestbookData.length === 0) {
            listContainer.innerHTML = '<div style="text-align:center; color:#999; padding:30px;">아직 작성된 글이 없습니다.<br>첫 번째 주인공이 되어주세요! ✏️</div>';
            if(moreBtnArea) moreBtnArea.classList.add('hidden');
            return;
        }
        showMoreGuestbook();
    })
    .catch(error => {
        // console.error('로드 실패:', error);
        // listContainer.innerHTML = '...';
    });
}

function showMoreGuestbook() {
    const listContainer = document.getElementById('mainGuestbookList');
    const moreBtnArea = document.getElementById('moreBtnArea');
    const nextIndex = currentIndex + ITEMS_PER_PAGE;
    const itemsToShow = allGuestbookData.slice(currentIndex, nextIndex);
    
    let html = '';
    itemsToShow.forEach(item => {
        const safeName = escapeHtml(item.name);
        const safeMsg = escapeHtml(item.message);
        html += `
        <div class="main-guest-card">
            <div class="main-card-header">
                <span class="main-card-name">${safeName}</span>
                <button class="delete-btn" onclick="deleteMessage('${safeName}', '${safeMsg}')">✕</button>
            </div>
            <div class="main-card-msg">${safeMsg}</div>
        </div>
        `;
    });
    listContainer.insertAdjacentHTML('beforeend', html);
    currentIndex = nextIndex;

    if (moreBtnArea) {
        if (currentIndex >= allGuestbookData.length) {
            moreBtnArea.classList.add('hidden');
        } else {
            moreBtnArea.classList.remove('hidden');
        }
    }
}

function deleteMessage(name, message) {
    const password = prompt("작성할 때 입력한 비밀번호를 입력해주세요.");
    if (!password) return;

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ action: 'delete', name: name, password: password, message: message }),
        mode: 'no-cors'
    })
    .then(() => {
        alert("삭제 처리되었습니다. (비밀번호가 맞다면 삭제됨)");
        loadGuestbookData();
    })
    .catch(() => alert("오류가 발생했습니다."));
}

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
    .then(() => {
        alert("메시지가 등록되었습니다! 💌");
        document.getElementById('gName').value = '';
        document.getElementById('gPw').value = '';
        document.getElementById('gMsg').value = '';
        closeGuestbook();
        loadGuestbookData();
        btn.innerHTML = originalText;
        btn.disabled = false;
    })
    .catch(error => {
        alert("전송 실패. 다시 시도해 주세요.");
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

function openGuestbook() { document.getElementById('guestbookModal').classList.add('active'); }
function closeGuestbook() { document.getElementById('guestbookModal').classList.remove('active'); }
function escapeHtml(text) {
    if (text == null) return "";
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\n/g, "<br>");
}