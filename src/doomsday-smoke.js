/**
 * Advanced Bilateral Green Smoke Particle Simulation
 * Emits billowing volumetric smoke puffs from the left and right screen edges
 * emerging towards the center with smooth cubic easing and turbulent motion curves.
 */
export function initBilateralSmokeSimulation(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return { destroy: () => { }, triggerBurst: () => { } };
    }
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const resizeHandler = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);
    // Pre-render multi-layer volumetric radial smoke puff textures for smooth GPU drawing
    function createPuffTexture(innerColor, midColor, outerColor) {
        const size = 160;
        const pCanvas = document.createElement('canvas');
        pCanvas.width = size;
        pCanvas.height = size;
        const pCtx = pCanvas.getContext('2d');
        if (!pCtx)
            return pCanvas;
        const rad = size / 2;
        const grad = pCtx.createRadialGradient(rad, rad, 0, rad, rad, rad);
        grad.addColorStop(0, innerColor);
        grad.addColorStop(0.25, midColor);
        grad.addColorStop(0.55, outerColor);
        grad.addColorStop(0.82, 'rgba(6, 78, 59, 0.04)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = grad;
        pCtx.beginPath();
        pCtx.arc(rad, rad, rad, 0, Math.PI * 2);
        pCtx.fill();
        return pCanvas;
    }
    const puffTextures = [
        createPuffTexture('rgba(110, 231, 183, 0.38)', 'rgba(52, 211, 153, 0.28)', 'rgba(16, 185, 129, 0.12)'),
        createPuffTexture('rgba(74, 222, 128, 0.35)', 'rgba(34, 197, 94, 0.24)', 'rgba(21, 128, 61, 0.10)'),
        createPuffTexture('rgba(167, 243, 208, 0.32)', 'rgba(74, 222, 128, 0.22)', 'rgba(5, 150, 105, 0.08)'),
        createPuffTexture('rgba(5, 223, 114, 0.28)', 'rgba(22, 101, 52, 0.18)', 'rgba(2, 44, 34, 0.05)'),
    ];
    // Smooth Hermite / Cubic Bézier motion curve helper
    function smoothstep(edge0, edge1, x) {
        const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
        return t * t * (3 - 2 * t);
    }
    function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    class SmokeParticle {
        constructor(side, isBurst = false) {
            this.side = side || (Math.random() > 0.5 ? 'left' : 'right');
            this.isBurst = isBurst;
            this.dead = false;
            this.startX = 0;
            this.startY = 0;
            this.targetX = 0;
            this.targetY = 0;
            this.x = 0;
            this.y = 0;
            this.size = 120;
            this.startSize = 100;
            this.endSize = 320;
            this.angle = 0;
            this.rotSpeed = 0;
            this.life = 0;
            this.maxLife = 260;
            this.maxAlpha = 0.28;
            this.swayFreq = 0.015;
            this.swayAmp = 28;
            this.swayPhase = 0;
            this.textureIndex = 0;
            this.reset(this.side, isBurst, true);
        }
        reset(side, isBurst = false, initial = false) {
            this.isBurst = isBurst;
            this.dead = false;
            this.textureIndex = Math.floor(Math.random() * puffTextures.length);
            this.angle = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.008;
            if (isBurst) {
                // Breakthrough burst emitting radially from center
                this.startX = width * 0.5 + (Math.random() - 0.5) * 60;
                this.startY = height * 0.46 + (Math.random() - 0.5) * 60;
                const bAngle = Math.random() * Math.PI * 2;
                const bDist = Math.max(width, height) * (0.35 + Math.random() * 0.45);
                this.targetX = this.startX + Math.cos(bAngle) * bDist;
                this.targetY = this.startY + Math.sin(bAngle) * bDist;
                this.startSize = 140 + Math.random() * 120;
                this.endSize = 380 + Math.random() * 260;
                this.maxLife = 140 + Math.floor(Math.random() * 80);
                this.life = 0;
                this.maxAlpha = 0.45 + Math.random() * 0.35;
                this.swayFreq = 0.02;
                this.swayAmp = 20;
                this.swayPhase = Math.random() * Math.PI * 2;
                this.x = this.startX;
                this.y = this.startY;
                this.size = this.startSize;
                return;
            }
            this.side = side !== undefined ? side : Math.random() > 0.5 ? 'left' : 'right';
            const isLeft = this.side === 'left';
            // Spawn on edges with slight bleed-in
            this.startX = isLeft
                ? -60 - Math.random() * (width * 0.08)
                : width + 60 + Math.random() * (width * 0.08);
            // Distribute along vertical edge, denser around middle thirds
            const vertRand = (Math.random() + Math.random()) * 0.5;
            this.startY = height * 0.08 + vertRand * (height * 0.84);
            // Target convergence near the center of the screen
            const centerSpreadX = (Math.random() - 0.5) * (width * 0.28);
            const centerSpreadY = (Math.random() - 0.5) * (height * 0.32);
            this.targetX = width * 0.5 + centerSpreadX;
            this.targetY = height * 0.46 + centerSpreadY;
            this.startSize = 110 + Math.random() * 90;
            this.endSize = 260 + Math.random() * 220;
            this.maxLife = 240 + Math.floor(Math.random() * 180);
            this.life = initial ? Math.floor(Math.random() * this.maxLife * 0.8) : 0;
            this.maxAlpha = 0.22 + Math.random() * 0.26;
            this.swayFreq = 0.012 + Math.random() * 0.016;
            this.swayAmp = 18 + Math.random() * 34;
            this.swayPhase = Math.random() * Math.PI * 2;
            this.updatePosition();
        }
        updatePosition() {
            const progress = Math.min(1, Math.max(0, this.life / this.maxLife));
            // Smooth motion curve towards center
            const ease = easeInOutCubic(progress);
            // Base linear interpolation along trajectory
            const baseX = this.startX + (this.targetX - this.startX) * ease;
            const baseY = this.startY + (this.targetY - this.startY) * ease;
            // Billowing sinusoidal curling turbulence
            const curlOffset = Math.sin(this.life * this.swayFreq + this.swayPhase) * this.swayAmp * (1 - progress * 0.4);
            const vertCurl = Math.cos(this.life * (this.swayFreq * 0.8) + this.swayPhase) * (this.swayAmp * 0.6);
            this.x = baseX + (this.side === 'left' ? -curlOffset * 0.3 : curlOffset * 0.3);
            this.y = baseY + vertCurl - (progress * 30); // slight natural thermal rise
            this.size = this.startSize + (this.endSize - this.startSize) * smoothstep(0, 1, progress);
            this.angle += this.rotSpeed;
        }
        update() {
            this.life++;
            if (this.life >= this.maxLife) {
                if (this.isBurst) {
                    this.dead = true;
                    return;
                }
                this.reset(this.side, false, false);
                return;
            }
            this.updatePosition();
        }
        draw(c) {
            if (this.dead)
                return;
            const progress = this.life / this.maxLife;
            // Smooth alpha envelope: fade in from edge, sustain, soft fade out near center
            let alpha = 0;
            if (progress < 0.22) {
                alpha = smoothstep(0, 0.22, progress) * this.maxAlpha;
            }
            else if (progress > 0.62) {
                alpha = (1 - smoothstep(0.62, 1.0, progress)) * this.maxAlpha;
            }
            else {
                alpha = this.maxAlpha;
            }
            if (alpha <= 0.005)
                return;
            const pTex = puffTextures[this.textureIndex];
            c.save();
            c.translate(this.x, this.y);
            c.rotate(this.angle);
            c.globalAlpha = Math.max(0, Math.min(1, alpha));
            c.drawImage(pTex, -this.size / 2, -this.size / 2, this.size, this.size);
            c.restore();
        }
    }
    // Create initial emitter particles pool from both sides
    const isMobile = width < 640;
    const particleCount = isMobile ? 38 : 68;
    const smokeParticles = [];
    for (let i = 0; i < particleCount; i++) {
        const side = i % 2 === 0 ? 'left' : 'right';
        smokeParticles.push(new SmokeParticle(side, false));
    }
    let animId = null;
    let isRunning = true;
    function renderLoop() {
        if (!isRunning)
            return;
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const p = smokeParticles[i];
            p.update();
            if (p.dead) {
                smokeParticles.splice(i, 1);
                continue;
            }
            p.draw(ctx);
        }
        animId = requestAnimationFrame(renderLoop);
    }
    renderLoop();
    const triggerBurst = () => {
        for (let i = 0; i < 45; i++) {
            smokeParticles.push(new SmokeParticle(undefined, true));
        }
    };
    const destroy = () => {
        isRunning = false;
        if (animId !== null) {
            cancelAnimationFrame(animId);
            animId = null;
        }
        window.removeEventListener('resize', resizeHandler);
    };
    return {
        destroy,
        triggerBurst,
    };
}