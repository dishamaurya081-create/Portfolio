/**
 * Disha Maurya Portfolio — CSE Engineering Architecture Background
 * Clean, structured Computer Science & Engineering architectural environment.
 * Replaces space/galaxy particles with a sophisticated blueprint & system circuit bus.
 * Zero scattered particles, zero star constellations, zero orbiting rings.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCSEArchitectureBackground() {
    let canvas = document.getElementById('cseNetworkCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'cseNetworkCanvas';
      document.body.prepend(canvas);
    }
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: -2 !important;
      pointer-events: none !important;
      display: block !important;
    `;

    const ctx = canvas.getContext('2d');
    let W, H;
    let animId = null;

    // Structured rectilinear bus tracks (orthogonal 90-degree lines inspired by IC board / system bus architecture)
    let buses = [];
    let pulses = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildBuses();
      drawStaticBase();
    }

    function buildBuses() {
      buses = [
        // Top margin bus (horizontal)
        { x1: 40, y1: 80, x2: W - 40, y2: 80, dir: 'h' },
        // Left margin bus (vertical)
        { x1: 60, y1: 80, x2: 60, y2: H - 80, dir: 'v' },
        // Right margin bus (vertical)
        { x1: W - 60, y1: 80, x2: W - 60, y2: H - 80, dir: 'v' },
        // Bottom margin bus (horizontal)
        { x1: 40, y1: H - 80, x2: W - 40, y2: H - 80, dir: 'h' },
        // Inner structural circuit conduit (horizontal middle)
        { x1: 120, y1: Math.floor(H * 0.48), x2: W - 120, y2: Math.floor(H * 0.48), dir: 'h' }
      ];

      pulses = [
        { busIndex: 0, progress: 0.1, speed: 0.0008, length: 36, color: '#38bdf8' },
        { busIndex: 1, progress: 0.5, speed: 0.0006, length: 28, color: '#6366f1' },
        { busIndex: 2, progress: 0.8, speed: 0.0007, length: 32, color: '#38bdf8' },
        { busIndex: 3, progress: 0.3, speed: 0.0009, length: 40, color: '#10b981' }
      ];
    }

    function drawStaticBase() {
      // Deep obsidian-slate background
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, W, H);

      // 1. Precise architectural engineering grid (fixed, static, calm)
      const gridSize = 56;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.022)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      ctx.beginPath();
      for (let x = 0; x < W; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      // Horizontal grid lines
      for (let y = 0; y < H; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // 2. Technical crosshairs '+' at major structural junctions
      ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.font = '10px "JetBrains Mono", monospace';
      const step = gridSize * 2;
      for (let x = step; x < W - step; x += step) {
        for (let y = step; y < H - step; y += step) {
          ctx.fillText('+', x - 3, y + 4);
        }
      }

      // 3. Rectilinear bus tracks
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
      ctx.lineWidth = 1;
      buses.forEach(b => {
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(b.x2, b.y2);
        ctx.stroke();

        // Terminal end caps (micro square pads)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(b.x1 - 2, b.y1 - 2, 4, 4);
        ctx.fillRect(b.x2 - 2, b.y2 - 2, 4, 4);
      });
    }

    function draw() {
      if (prefersReducedMotion) {
        drawStaticBase();
        return;
      }

      drawStaticBase();

      // 4. Subtle, purposeful data signal pulses moving strictly along rectilinear bus lines
      pulses.forEach(p => {
        const bus = buses[p.busIndex];
        if (!bus) return;

        p.progress += p.speed;
        if (p.progress > 1.2) {
          p.progress = -0.2;
        }

        const totalDist = bus.dir === 'h' ? (bus.x2 - bus.x1) : (bus.y2 - bus.y1);
        const curDist = totalDist * Math.max(0, Math.min(1, p.progress));

        let startX, startY, endX, endY;
        if (bus.dir === 'h') {
          startX = Math.max(bus.x1, bus.x1 + curDist - p.length);
          endX = Math.min(bus.x2, bus.x1 + curDist);
          startY = endY = bus.y1;
        } else {
          startX = endX = bus.x1;
          startY = Math.max(bus.y1, bus.y1 + curDist - p.length);
          endY = Math.min(bus.y2, bus.y1 + curDist);
        }

        if (endX > startX || endY > startY) {
          const grad = ctx.createLinearGradient(startX, startY, endX, endY);
          grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          grad.addColorStop(0.7, p.color === '#10b981' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(56, 189, 248, 0.4)');
          grad.addColorStop(1, p.color);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animId);
        resize();
        if (!prefersReducedMotion) animId = requestAnimationFrame(draw);
      }, 150);
    });

    resize();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(draw);
    } else {
      drawStaticBase();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCSEArchitectureBackground);
  } else {
    initCSEArchitectureBackground();
  }
})();
