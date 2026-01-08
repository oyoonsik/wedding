// ==========================================
// [디데이 카운트다운 기능]
// ==========================================
function startCountdown() {
    // 결혼식 날짜 설정 (월은 0부터 시작하므로 10월은 9로 입력해야 함, 혹은 문자열로 입력)
    const weddingDate = new Date("2026-10-10T12:30:00").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.querySelector(".countdown-area").innerHTML = "<p>결혼식이 진행되었습니다. 축하해주셔서 감사합니다!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // 숫자 업데이트
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = String(hours).padStart(2, "0");
        document.getElementById("mins").innerText = String(minutes).padStart(2, "0");
        document.getElementById("secs").innerText = String(seconds).padStart(2, "0");
        
        // 하단 텍스트 업데이트
        document.getElementById("d-day-count").innerText = days;
    }

    setInterval(updateTimer, 1000); // 1초마다 갱신
    updateTimer(); // 로딩 즉시 실행
}

// 페이지 로드 시 실행
window.addEventListener('load', startCountdown);