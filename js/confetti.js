
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    // 개수는 적당히 (30~40개)
    const particleCount = 40; 

    class Firefly {
        constructor() {
            this.init(true);
        }

        init(firstTime = false) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // 크기: 1px ~ 2.5px (아주 작게)
            this.radius = Math.random() * 1.5 + 1;
            
            // 움직임: 아주 천천히 위나 옆으로 흐르듯
            this.speedX = (Math.random() - 0.5) * 0.5; 
            this.speedY = (Math.random() - 0.5) * 0.5;
            
            // [핵심] 반짝임 효과를 위한 변수
            // t는 시간, speedT는 반짝이는 속도
            this.t = Math.random() * Math.PI * 2;
            this.speedT = Math.random() * 0.03 + 0.02; 
            
            // 최대 밝기 (0.3 ~ 0.8)
            this.maxOpacity = Math.random() * 0.5 + 0.3; 
        }

        draw() {
            // 사인파(Sin)를 이용해 투명도가 부드럽게 변함 (깜빡임 효과)
            const opacity = (Math.sin(this.t) + 1) / 2 * this.maxOpacity;
            
            // 너무 어두우면 그리지 않음 (성능 최적화)
            if (opacity < 0.05) return;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            
            // 색상: 웜화이트
            ctx.fillStyle = `rgba(255, 253, 230, ${opacity})`;
            
            // 빛 번짐 효과 (크기에 비해 과하지 않게)
            ctx.shadowColor = "rgba(255, 255, 255, 1)";
            ctx.shadowBlur = 4; 
            
            ctx.fill();
            ctx.closePath();
            
            // 그림자 초기화
            ctx.shadowBlur = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.t += this.speedT; // 반짝임 사이클 진행

            // 화면 밖으로 나가면 반대편으로 이동
            if (this.x > width + 10) this.x = -10;
            if (this.x < -10) this.x = width + 10;
            if (this.y > height + 10) this.y = -10;
            if (this.y < -10) this.y = height + 10;

            this.draw();
        }
    }

    function init() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Firefly());
        }
    }

    function animate() {
        // [중요] 이전 프레임을 깨끗하게 지움 (잔상 제거)
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    });
});
