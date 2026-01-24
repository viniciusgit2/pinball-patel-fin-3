// Configuração do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Redimensionar canvas
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Variáveis do jogo
let score = 0;
let balls = 3;
let highScore = localStorage.getItem('pinballHighScore') || 0;
let gameStarted = false;
let gameOver = false;
let combo = 0;
let comboTimer = null;

// Física
const gravity = 0.3;
const friction = 0.99;
const bounceFactor = 0.8;

// Bola
let ball = {
    x: canvas.width - 60,
    y: canvas.height - 100,
    vx: 0,
    vy: 0,
    radius: 8,
    launched: false,
    trail: []
};

// Lançador (plunger)
let launcher = {
    x: canvas.width - 50,
    y: canvas.height - 150,
    width: 30,
    height: 100,
    compressed: 0,
    maxCompression: 60,
    active: false
};

// Flippers
let flippers = {
    left: {
        x: canvas.width * 0.10,
        y: canvas.height - 100,
        width: 150,
        height: 22,
        angle: 0.3,
        targetAngle: 0.3,
        active: false,
        pivot: 'left'
    },
    right: {
        x: canvas.width * 0.78,
        y: canvas.height - 100,
        width: 150,
        height: 22,
        angle: -0.3,
        targetAngle: -0.3,
        active: false,
        pivot: 'right'
    },
    center: {
        x: canvas.width * 0.5,
        y: canvas.height * 0.73,
        width: 110,
        height: 20,
        angle: 0,
        targetAngle: 0,
        active: false,
        pivot: 'center'
    }
};

// Bumpers (círculos que empurram a bola)
let bumpers = [
    { x: canvas.width * 0.25, y: canvas.height * 0.25, radius: 30, color: '#ff00ff', points: 100 },
    { x: canvas.width * 0.5, y: canvas.height * 0.2, radius: 30, color: '#00ffff', points: 100 },
    { x: canvas.width * 0.75, y: canvas.height * 0.25, radius: 30, color: '#ff00ff', points: 100 },
    { x: canvas.width * 0.35, y: canvas.height * 0.35, radius: 25, color: '#ffff00', points: 150 },
    { x: canvas.width * 0.65, y: canvas.height * 0.35, radius: 25, color: '#ffff00', points: 150 },
    { x: canvas.width * 0.15, y: canvas.height * 0.35, radius: 25, color: '#00ff00', points: 120 },
    { x: canvas.width * 0.85, y: canvas.height * 0.35, radius: 25, color: '#00ff00', points: 120 }
];

// Alvos (retângulos)
let targets = [
    { x: canvas.width * 0.15, y: canvas.height * 0.5, width: 60, height: 20, hit: false, color: '#00ff00', points: 50 },
    { x: canvas.width * 0.85 - 60, y: canvas.height * 0.5, width: 60, height: 20, hit: false, color: '#00ff00', points: 50 },
    { x: canvas.width * 0.2, y: canvas.height * 0.6, width: 50, height: 15, hit: false, color: '#ff6600', points: 75 },
    { x: canvas.width * 0.8 - 50, y: canvas.height * 0.6, width: 50, height: 15, hit: false, color: '#ff6600', points: 75 }
];

// Paredes
let walls = [
    { x1: 10, y1: 10, x2: canvas.width - 10, y2: 10 }, // topo
    { x1: 10, y1: 10, x2: 10, y2: canvas.height - 10 }, // esquerda
    { x1: canvas.width - 10, y1: 10, x2: canvas.width - 10, y2: canvas.height - 60 }, // direita
];

// Controles
const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    if (e.key === 'ArrowLeft') {
        flippers.left.active = true;
        flippers.left.targetAngle = -0.5;
        if (gameStarted) audioManager.playFlipperSound();
    }
    if (e.key === 'ArrowRight') {
        flippers.right.active = true;
        flippers.right.targetAngle = 0.5;
        if (gameStarted) audioManager.playFlipperSound();
    }
    if (e.key === 'ArrowUp') {
        flippers.center.active = true;
        flippers.center.targetAngle = -0.6;
        if (gameStarted) audioManager.playFlipperSound();
    }
    
    // Comprimir lançador com espaço
    if (e.key === ' ' && !ball.launched && gameStarted) {
        launcher.active = true;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    
    if (e.key === 'ArrowLeft') {
        flippers.left.active = false;
        flippers.left.targetAngle = 0.3;
    }
    if (e.key === 'ArrowRight') {
        flippers.right.active = false;
        flippers.right.targetAngle = -0.3;
    }
    if (e.key === 'ArrowUp') {
        flippers.center.active = false;
        flippers.center.targetAngle = 0;
    }
    
    // Soltar lançador e lançar bola
    if (e.key === ' ' && launcher.active && !ball.launched && gameStarted) {
        const power = launcher.compressed / launcher.maxCompression;
        ball.vx = -3;
        ball.vy = -20 * (0.5 + power * 0.5);
        ball.launched = true;
        launcher.active = false;
        launcher.compressed = 0;
        audioManager.playLaunchSound();
    }
});

// Função helper para verificar se ponto está sobre um flipper
function isPointOnFlipper(x, y, flipper) {
    // Criar retângulo de detecção ao redor do flipper
    const padding = 20; // Área extra para facilitar cliques/toques
    let hitBox;
    
    if (flipper.pivot === 'center') {
        hitBox = {
            x: flipper.x - flipper.width / 2 - padding,
            y: flipper.y - flipper.height / 2 - padding,
            width: flipper.width + padding * 2,
            height: flipper.height + padding * 2
        };
    } else if (flipper.pivot === 'left') {
        hitBox = {
            x: flipper.x - padding,
            y: flipper.y - flipper.height / 2 - padding,
            width: flipper.width + padding * 2,
            height: flipper.height + padding * 2
        };
    } else { // right
        hitBox = {
            x: flipper.x - padding,
            y: flipper.y - flipper.height / 2 - padding,
            width: flipper.width + padding * 2,
            height: flipper.height + padding * 2
        };
    }
    
    return x >= hitBox.x && x <= hitBox.x + hitBox.width &&
           y >= hitBox.y && y <= hitBox.y + hitBox.height;
}

// Função para ativar flipper
function activateFlipper(flipperName) {
    const flipper = flippers[flipperName];
    if (!flipper) return;
    
    flipper.active = true;
    
    if (flipperName === 'left') {
        flipper.targetAngle = -0.5;
    } else if (flipperName === 'right') {
        flipper.targetAngle = 0.5;
    } else if (flipperName === 'center') {
        flipper.targetAngle = -0.6;
    }
    
    if (gameStarted) audioManager.playFlipperSound();
}

// Função para desativar flipper
function deactivateFlipper(flipperName) {
    const flipper = flippers[flipperName];
    if (!flipper) return;
    
    flipper.active = false;
    
    if (flipperName === 'left') {
        flipper.targetAngle = 0.3;
    } else if (flipperName === 'right') {
        flipper.targetAngle = -0.3;
    } else if (flipperName === 'center') {
        flipper.targetAngle = 0;
    }
}

// Controles de mouse
let mouseDownFlippers = new Set();

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Verificar qual flipper foi clicado
    if (isPointOnFlipper(x, y, flippers.left)) {
        mouseDownFlippers.add('left');
        activateFlipper('left');
    }
    if (isPointOnFlipper(x, y, flippers.right)) {
        mouseDownFlippers.add('right');
        activateFlipper('right');
    }
    if (isPointOnFlipper(x, y, flippers.center)) {
        mouseDownFlippers.add('center');
        activateFlipper('center');
    }
});

canvas.addEventListener('mouseup', (e) => {
    // Desativar todos os flippers que estavam ativos pelo mouse
    mouseDownFlippers.forEach(flipperName => {
        deactivateFlipper(flipperName);
    });
    mouseDownFlippers.clear();
});

canvas.addEventListener('mouseleave', (e) => {
    // Desativar todos os flippers se o mouse sair do canvas
    mouseDownFlippers.forEach(flipperName => {
        deactivateFlipper(flipperName);
    });
    mouseDownFlippers.clear();
});

// Controles touchscreen
let activeTouches = new Map(); // touchId -> flipperName

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão
    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        // Verificar qual flipper foi tocado
        if (isPointOnFlipper(x, y, flippers.left)) {
            activeTouches.set(touch.identifier, 'left');
            activateFlipper('left');
        } else if (isPointOnFlipper(x, y, flippers.right)) {
            activeTouches.set(touch.identifier, 'right');
            activateFlipper('right');
        } else if (isPointOnFlipper(x, y, flippers.center)) {
            activeTouches.set(touch.identifier, 'center');
            activateFlipper('center');
        }
    }
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const flipperName = activeTouches.get(touch.identifier);
        
        if (flipperName) {
            deactivateFlipper(flipperName);
            activeTouches.delete(touch.identifier);
        }
    }
});

canvas.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const flipperName = activeTouches.get(touch.identifier);
        
        if (flipperName) {
            deactivateFlipper(flipperName);
            activeTouches.delete(touch.identifier);
        }
    }
});

// Funções de desenho
function drawNeonCircle(x, y, radius, color, glow = true) {
    if (glow) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawNeonRect(x, y, width, height, color, glow = true) {
    if (glow) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.shadowBlur = 0;
}

function drawFlipper(flipper) {
    ctx.save();
    
    let pivotX, pivotY, offsetX;
    
    if (flipper.pivot === 'center') {
        pivotX = flipper.x;
        pivotY = flipper.y;
        offsetX = -flipper.width / 2;
    } else {
        pivotX = flipper.pivot === 'left' ? flipper.x : flipper.x + flipper.width;
        pivotY = flipper.y;
        offsetX = flipper.pivot === 'left' ? 0 : -flipper.width;
    }
    
    ctx.translate(pivotX, pivotY);
    ctx.rotate(flipper.angle);
    
    ctx.shadowBlur = 20;
    ctx.shadowColor = flipper.active ? '#00ffff' : '#ff00ff';
    ctx.fillStyle = flipper.active ? '#00ffff' : '#ff00ff';
    ctx.fillRect(offsetX, -flipper.height / 2, flipper.width, flipper.height);
    ctx.shadowBlur = 0;
    
    ctx.restore();
}

function drawLauncher() {
    // Base do lançador
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#FFD700';
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(launcher.x - launcher.width, launcher.y + launcher.height + 20, launcher.width * 2, 10);
    
    // Plunger
    const plungerY = launcher.y + launcher.compressed;
    const gradient = ctx.createLinearGradient(launcher.x, plungerY, launcher.x, plungerY + launcher.height);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(1, '#FFA500');
    
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FFD700';
    ctx.fillStyle = gradient;
    ctx.fillRect(launcher.x - 10, plungerY, 20, launcher.height - launcher.compressed);
    ctx.shadowBlur = 0;
}

function drawBall() {
    // Rastro da bola
    if (ball.trail.length > 1) {
        for (let i = 0; i < ball.trail.length - 1; i++) {
            const alpha = i / ball.trail.length;
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.5})`;
            ctx.lineWidth = ball.radius * (1 - alpha);
            ctx.beginPath();
            ctx.moveTo(ball.trail[i].x, ball.trail[i].y);
            ctx.lineTo(ball.trail[i + 1].x, ball.trail[i + 1].y);
            ctx.stroke();
        }
    }
    
    // Bola principal
    const gradient = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 2, ball.x, ball.y, ball.radius);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.3, '#00ffff');
    gradient.addColorStop(1, '#0088ff');
    
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawBumpers() {
    bumpers.forEach(bumper => {
        // Anel externo pulsante
        const pulseRadius = bumper.radius + Math.sin(Date.now() / 200) * 3;
        ctx.shadowBlur = 30;
        ctx.shadowColor = bumper.color;
        ctx.beginPath();
        ctx.arc(bumper.x, bumper.y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = bumper.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Círculo principal
        const gradient = ctx.createRadialGradient(bumper.x, bumper.y, 0, bumper.x, bumper.y, bumper.radius);
        gradient.addColorStop(0, bumper.color);
        gradient.addColorStop(0.7, bumper.color + '88');
        gradient.addColorStop(1, bumper.color + '22');
        
        ctx.beginPath();
        ctx.arc(bumper.x, bumper.y, bumper.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function drawTargets() {
    targets.forEach(target => {
        if (!target.hit) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = target.color;
            ctx.fillStyle = target.color;
            ctx.fillRect(target.x, target.y, target.width, target.height);
            
            // Efeito de scanline
            ctx.strokeStyle = target.color + '66';
            ctx.lineWidth = 1;
            for (let i = 0; i < target.height; i += 4) {
                ctx.beginPath();
                ctx.moveTo(target.x, target.y + i);
                ctx.lineTo(target.x + target.width, target.y + i);
                ctx.stroke();
            }
            ctx.shadowBlur = 0;
        }
    });
}

function drawWalls() {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    
    walls.forEach(wall => {
        ctx.beginPath();
        ctx.moveTo(wall.x1, wall.y1);
        ctx.lineTo(wall.x2, wall.y2);
        ctx.stroke();
    });
    
    ctx.shadowBlur = 0;
}

// Física e colisões
function updateBall() {
    if (!ball.launched) return;
    
    // Aplicar gravidade
    ball.vy += gravity;
    
    // Aplicar fricção
    ball.vx *= friction;
    ball.vy *= friction;
    
    // Atualizar posição
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Rastro
    ball.trail.push({ x: ball.x, y: ball.y });
    if (ball.trail.length > 15) ball.trail.shift();
    
    // Colisão com paredes
    if (ball.x - ball.radius < 10) {
        ball.x = 10 + ball.radius;
        ball.vx *= -bounceFactor;
        createParticles(ball.x, ball.y, '#00ffff');
    }
    if (ball.x + ball.radius > canvas.width - 10) {
        ball.x = canvas.width - 10 - ball.radius;
        ball.vx *= -bounceFactor;
        createParticles(ball.x, ball.y, '#00ffff');
    }
    if (ball.y - ball.radius < 10) {
        ball.y = 10 + ball.radius;
        ball.vy *= -bounceFactor;
        createParticles(ball.x, ball.y, '#00ffff');
    }
    
    // Bola perdida
    if (ball.y > canvas.height) {
        balls--;
        audioManager.playBallLostSound();
        updateUI();
        
        if (balls > 0) {
            resetBall();
        } else {
            endGame();
        }
    }
    
    // Colisão com bumpers
    bumpers.forEach(bumper => {
        const dx = ball.x - bumper.x;
        const dy = ball.y - bumper.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ball.radius + bumper.radius) {
            const angle = Math.atan2(dy, dx);
            const force = 12;
            ball.vx = Math.cos(angle) * force;
            ball.vy = Math.sin(angle) * force;
            
            // Afastar bola do bumper
            const overlap = ball.radius + bumper.radius - distance;
            ball.x += Math.cos(angle) * overlap;
            ball.y += Math.sin(angle) * overlap;
            
            addScore(bumper.points);
            audioManager.playBumperSound(1.5);
            createParticles(ball.x, ball.y, bumper.color, 20);
            
            // Efeito de flash no bumper
            const originalRadius = bumper.radius;
            bumper.radius += 5;
            setTimeout(() => bumper.radius = originalRadius, 100);
        }
    });
    
    // Colisão com targets
    targets.forEach(target => {
        if (!target.hit &&
            ball.x + ball.radius > target.x &&
            ball.x - ball.radius < target.x + target.width &&
            ball.y + ball.radius > target.y &&
            ball.y - ball.radius < target.y + target.height) {
            
            target.hit = true;
            addScore(target.points);
            audioManager.playTargetSound();
            createParticles(target.x + target.width / 2, target.y + target.height / 2, target.color, 15);
            
            // Bounce
            if (ball.x < target.x || ball.x > target.x + target.width) {
                ball.vx *= -1;
            } else {
                ball.vy *= -1;
            }
            
            // Resetar target após 3 segundos
            setTimeout(() => target.hit = false, 3000);
        }
    });
    
    // Colisão com flippers
    checkFlipperCollision(flippers.left);
    checkFlipperCollision(flippers.right);
    checkFlipperCollision(flippers.center);
}

function checkFlipperCollision(flipper) {
    let pivotX, pivotY, offsetX;
    
    if (flipper.pivot === 'center') {
        pivotX = flipper.x;
        pivotY = flipper.y;
        offsetX = -flipper.width / 2;
    } else {
        pivotX = flipper.pivot === 'left' ? flipper.x : flipper.x + flipper.width;
        pivotY = flipper.y;
        offsetX = flipper.pivot === 'left' ? 0 : -flipper.width;
    }
    
    // Calcular os cantos do flipper após rotação
    const cos = Math.cos(flipper.angle);
    const sin = Math.sin(flipper.angle);
    
    const corners = [
        { x: offsetX, y: -flipper.height / 2 },
        { x: offsetX + flipper.width, y: -flipper.height / 2 },
        { x: offsetX + flipper.width, y: flipper.height / 2 },
        { x: offsetX, y: flipper.height / 2 }
    ];
    
    const rotatedCorners = corners.map(c => ({
        x: pivotX + c.x * cos - c.y * sin,
        y: pivotY + c.x * sin + c.y * cos
    }));
    
    // Verificar colisão com cada lado do flipper
    for (let i = 0; i < 4; i++) {
        const p1 = rotatedCorners[i];
        const p2 = rotatedCorners[(i + 1) % 4];
        
        const dx = ball.x - p1.x;
        const dy = ball.y - p1.y;
        const lineX = p2.x - p1.x;
        const lineY = p2.y - p1.y;
        
        const dot = dx * lineX + dy * lineY;
        const lenSq = lineX * lineX + lineY * lineY;
        const param = Math.max(0, Math.min(1, dot / lenSq));
        
        const closestX = p1.x + param * lineX;
        const closestY = p1.y + param * lineY;
        
        const distX = ball.x - closestX;
        const distY = ball.y - closestY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < ball.radius) {
            const angle = Math.atan2(distY, distX);
            const force = flipper.active ? 18 : 12;
            
            ball.vx = Math.cos(angle) * force;
            ball.vy = Math.sin(angle) * force - 5;
            
            // Afastar bola
            const overlap = ball.radius - distance;
            ball.x += Math.cos(angle) * overlap;
            ball.y += Math.sin(angle) * overlap;
            
            createParticles(ball.x, ball.y, flipper.active ? '#00ffff' : '#ff00ff', 10);
            break;
        }
    }
}

function updateFlippers() {
    // Animar flippers suavemente
    flippers.left.angle += (flippers.left.targetAngle - flippers.left.angle) * 0.3;
    flippers.right.angle += (flippers.right.targetAngle - flippers.right.angle) * 0.3;
    flippers.center.angle += (flippers.center.targetAngle - flippers.center.angle) * 0.3;
}

function updateLauncher() {
    // Comprimir lançador enquanto espaço estiver pressionado
    if (launcher.active && !ball.launched) {
        launcher.compressed = Math.min(launcher.compressed + 2, launcher.maxCompression);
    }
}

function resetBall() {
    ball.x = canvas.width - 60;
    ball.y = canvas.height - 100;
    ball.vx = 0;
    ball.vy = 0;
    ball.launched = false;
    ball.trail = [];
}

function addScore(points) {
    combo++;
    const multiplier = Math.min(combo, 5);
    const totalPoints = points * multiplier;
    score += totalPoints;
    
    if (combo > 1) {
        audioManager.playComboSound(combo);
        showComboText(combo, multiplier);
    }
    
    updateUI();
    
    // Reset combo timer
    if (comboTimer) clearTimeout(comboTimer);
    comboTimer = setTimeout(() => {
        combo = 0;
    }, 2000);
}

function showComboText(combo, multiplier) {
    const comboEl = document.createElement('div');
    comboEl.className = 'combo-text';
    const textoCombo = typeof tradutor !== 'undefined' ? tradutor.obter('combo') : 'COMBO x';
    comboEl.textContent = `${textoCombo}${multiplier}!`;
    comboEl.style.left = `${ball.x}px`;
    comboEl.style.top = `${ball.y}px`;
    
    document.getElementById('particles').appendChild(comboEl);
    
    setTimeout(() => comboEl.remove(), 1000);
}

function createParticles(x, y, color, count = 10) {
    const particleContainer = document.getElementById('particles');
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('balls').textContent = balls;
    document.getElementById('highScore').textContent = highScore;
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    balls = 3;
    combo = 0;
    
    resetBall();
    updateUI();
    
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    
    audioManager.init();
    audioManager.playBackgroundMusic();
    gameLoop();
}

function endGame() {
    gameOver = true;
    gameStarted = false;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('pinballHighScore', highScore);
    }
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'flex';
    
    audioManager.stopBackgroundMusic();
    audioManager.playGameOverSound();
}

function gameLoop() {
    if (!gameStarted || gameOver) return;
    
    // Limpar canvas
    ctx.fillStyle = 'rgba(10, 10, 15, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar elementos
    drawWalls();
    drawBumpers();
    drawTargets();
    drawFlipper(flippers.left);
    drawFlipper(flippers.right);
    drawFlipper(flippers.center);
    drawLauncher();
    drawBall();
    
    // Atualizar física
    updateBall();
    updateFlippers();
    updateLauncher();
    
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);

// Inicializar UI
updateUI();
