/**
 * Disha Maurya Portfolio — CSE Engineering Architecture Background
 * 
 * Living Software Engineering Architecture Canvas:
 * - Structured orthogonal circuit traces & system bus conduits (90-degree IC bends)
 * - Restrained data packets travelling along designated bus routes
 * - Faint technical coordinate grid with subtle parallax response to scroll & pointer
 * - Softly pulsating architectural connection nodes with breathing halos
 * - Slow-drifting subtle ambient gradient spotlights behind content
 * - Restrained telemetry annotations (hex addresses, bus clocks, system sync)
 * 
 * Performance & Accessibility:
 * - Full prefers-reduced-motion support (renders calm static architectural blueprint)
 * - Mobile / coarse-pointer detection disables pointer parallax on touch screens
 * - Automatic pause via Page Visibility API when tab is hidden
 * - Zero WebGL overhead, zero galaxy/space particles, 100% accessible contrast
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

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
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animId = null;
    let startTime = performance.now();

    // Parallax tracking variables with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    // Structured architectural nodes
    let nodes = [];
    // Multi-segment orthogonal circuit paths
    let paths = [];
    // Data packets travelling along the paths
    let packets = [];

    function setupArchitecture() {
      // Base layout grid parameters
      const cols = Math.max(4, Math.floor(W / 260));
      const colW = W / cols;

      // Define logical system nodes at structural coordinates
      nodes = [
        {
          id: 'BUS_CTRL',
          x: Math.round(colW * 0.45),
          y: Math.round(H * 0.18),
          label: 'SYS_BUS // 0x1A',
          color: '#38bdf8',
          accent: 'cyan',
          phase: 0.0
        },
        {
          id: 'ALGO_CORE',
          x: Math.round(colW * 1.8),
          y: Math.round(H * 0.28),
          label: 'ALGO_CORE [100MHz]',
          color: '#6366f1',
          accent: 'indigo',
          phase: 1.2
        },
        {
          id: 'MEM_BANK',
          x: Math.round(colW * (cols - 0.7)),
          y: Math.round(H * 0.22),
          label: 'MEM_BANK // 0x4F',
          color: '#38bdf8',
          accent: 'cyan',
          phase: 2.1
        },
        {
          id: 'BRIDGE_IO',
          x: Math.round(colW * 0.7),
          y: Math.round(H * 0.58),
          label: 'IO_PORT: READY',
          color: '#10b981',
          accent: 'emerald',
          phase: 0.8
        },
        {
          id: 'PIPELINE_SYNC',
          x: Math.round(colW * (cols - 1.5)),
          y: Math.round(H * 0.64),
          label: 'SYNC_DAEMON: OK',
          color: '#6366f1',
          accent: 'indigo',
          phase: 3.4
        },
        {
          id: 'TERM_ROUTER',
          x: Math.round(colW * 1.25),
          y: Math.round(H * 0.86),
          label: 'PACKET_ROUTER',
          color: '#38bdf8',
          accent: 'cyan',
          phase: 4.2
        },
        {
          id: 'NET_GATE',
          x: Math.round(colW * (cols - 0.5)),
          y: Math.round(H * 0.88),
          label: 'GATEWAY_LINK',
          color: '#10b981',
          accent: 'emerald',
          phase: 1.9
        }
      ];

      // Build structured orthogonal circuit paths with 90-degree bends
      // Points format: array of [x, y] coordinates
      paths = [
        // Path 0: Top left bus to Algo Core
        {
          id: 'PATH_SYS_ALGO',
          points: [
            [nodes[0].x, nodes[0].y],
            [nodes[1].x, nodes[0].y],
            [nodes[1].x, nodes[1].y]
          ],
          color: '#38bdf8'
        },
        // Path 1: Algo Core across to Mem Bank
        {
          id: 'PATH_ALGO_MEM',
          points: [
            [nodes[1].x, nodes[1].y],
            [nodes[1].x + Math.round(colW * 0.4), nodes[1].y],
            [nodes[1].x + Math.round(colW * 0.4), nodes[2].y],
            [nodes[2].x, nodes[2].y]
          ],
          color: '#6366f1'
        },
        // Path 2: Left trunk from Bus Ctrl down to Bridge IO
        {
          id: 'PATH_BUS_BRIDGE',
          points: [
            [nodes[0].x, nodes[0].y],
            [nodes[0].x - 30, nodes[0].y],
            [nodes[0].x - 30, nodes[3].y],
            [nodes[3].x, nodes[3].y]
          ],
          color: '#38bdf8'
        },
        // Path 3: Bridge IO across to Pipeline Sync
        {
          id: 'PATH_BRIDGE_SYNC',
          points: [
            [nodes[3].x, nodes[3].y],
            [Math.round(W * 0.45), nodes[3].y],
            [Math.round(W * 0.45), nodes[4].y],
            [nodes[4].x, nodes[4].y]
          ],
          color: '#10b981'
        },
        // Path 4: Pipeline Sync to Net Gateway
        {
          id: 'PATH_SYNC_GATE',
          points: [
            [nodes[4].x, nodes[4].y],
            [nodes[6].x, nodes[4].y],
            [nodes[6].x, nodes[6].y]
          ],
          color: '#6366f1'
        },
        // Path 5: Lower bridge from Bridge IO to Term Router
        {
          id: 'PATH_BRIDGE_TERM',
          points: [
            [nodes[3].x, nodes[3].y],
            [nodes[3].x, nodes[5].y],
            [nodes[5].x, nodes[5].y]
          ],
          color: '#38bdf8'
        },
        // Path 6: Term Router to Net Gate
        {
          id: 'PATH_TERM_GATE',
          points: [
            [nodes[5].x, nodes[5].y],
            [nodes[5].x + Math.round(colW * 0.5), nodes[5].y],
            [nodes[5].x + Math.round(colW * 0.5), nodes[6].y],
            [nodes[6].x, nodes[6].y]
          ],
          color: '#10b981'
        }
      ];

      // Pre-compute path lengths and segment breakdowns
      paths.forEach(path => {
        let total = 0;
        const segments = [];
        for (let i = 0; i < path.points.length - 1; i++) {
          const p1 = path.points[i];
          const p2 = path.points[i + 1];
          const dx = p2[0] - p1[0];
          const dy = p2[1] - p1[1];
          const len = Math.hypot(dx, dy);
          segments.push({
            p1,
            p2,
            len,
            startDist: total,
            endDist: total + len
          });
          total += len;
        }
        path.totalLength = Math.max(1, total);
        path.segments = segments;
      });

      // Initialize small data packets travelling with staggered speeds
      packets = [
        { pathIndex: 0, progress: 0.15, speed: 0.00065, length: 24, color: '#38bdf8' },
        { pathIndex: 1, progress: 0.60, speed: 0.00050, length: 30, color: '#6366f1' },
        { pathIndex: 2, progress: 0.35, speed: 0.00075, length: 22, color: '#38bdf8' },
        { pathIndex: 3, progress: 0.80, speed: 0.00045, length: 36, color: '#10b981' },
        { pathIndex: 4, progress: 0.20, speed: 0.00060, length: 28, color: '#6366f1' },
        { pathIndex: 5, progress: 0.45, speed: 0.00070, length: 20, color: '#38bdf8' },
        { pathIndex: 6, progress: 0.10, speed: 0.00055, length: 32, color: '#10b981' }
      ];
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      targetMouseX = mouseX = W / 2;
      targetMouseY = mouseY = H / 2;
      setupArchitecture();
    }

    // Helper: find point at distance along segmented path
    function getPointOnPath(path, dist) {
      const clamped = Math.max(0, Math.min(path.totalLength, dist));
      for (let i = 0; i < path.segments.length; i++) {
        const seg = path.segments[i];
        if (clamped >= seg.startDist && clamped <= seg.endDist) {
          const segRatio = (clamped - seg.startDist) / (seg.len || 1);
          return [
            seg.p1[0] + (seg.p2[0] - seg.p1[0]) * segRatio,
            seg.p1[1] + (seg.p2[1] - seg.p1[1]) * segRatio
          ];
        }
      }
      return path.points[path.points.length - 1];
    }

    // Main rendering routine
    function render(currentTime) {
      const elapsed = currentTime - startTime;

      // Smooth parallax lerping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.06;

      const parallaxX = (mouseX - W / 2) * 0.015;
      const parallaxY = (mouseY - H / 2) * 0.015 + (scrollY % 60) * 0.2;

      // 1. Base Dark Slate Obsidian Canvas
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, W, H);

      // 2. Subtle, slow-moving ambient gradient spotlights behind content
      // Gentle harmonic motion: keeps background alive without any distraction
      const t = elapsed * 0.00025;
      const glow1X = W * 0.25 + Math.sin(t) * 90;
      const glow1Y = H * 0.30 + Math.cos(t * 0.8) * 60;
      const glow2X = W * 0.75 + Math.cos(t * 0.7) * 110;
      const glow2Y = H * 0.65 + Math.sin(t * 0.9) * 80;

      // Glow 1: Deep Cyan Ambient Halo
      const g1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, Math.max(280, W * 0.35));
      g1.addColorStop(0, 'rgba(56, 189, 248, 0.045)');
      g1.addColorStop(0.5, 'rgba(56, 189, 248, 0.018)');
      g1.addColorStop(1, 'rgba(8, 12, 20, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Glow 2: Deep Indigo Ambient Halo
      const g2 = ctx.createRadialGradient(glow2X, glow2Y, 10, glow2X, glow2Y, Math.max(320, W * 0.38));
      g2.addColorStop(0, 'rgba(99, 102, 241, 0.038)');
      g2.addColorStop(0.6, 'rgba(99, 102, 241, 0.012)');
      g2.addColorStop(1, 'rgba(8, 12, 20, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // 3. Faint Technical Grid with Parallax Shift
      const gridSize = 56;
      const offsetX = (parallaxX * 0.5) % gridSize;
      const offsetY = (parallaxY * 0.5) % gridSize;

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.022)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = offsetX; x < W + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = offsetY; y < H + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // Major Coordinate Crosshairs '+' at interval intersections
      ctx.fillStyle = 'rgba(56, 189, 248, 0.038)';
      ctx.font = '9px "JetBrains Mono", Consolas, monospace';
      const step = gridSize * 3;
      for (let x = offsetX + step; x < W; x += step) {
        for (let y = offsetY + step; y < H; y += step) {
          ctx.fillText('+', x - 3, y + 3);
        }
      }
      ctx.restore();

      // Apply subtle parallax to the architecture layer
      ctx.save();
      ctx.translate(parallaxX * 0.4, (parallaxY * 0.3) % 20);

      // 4. Structured Circuit Paths (Orthogonal System Conduits)
      paths.forEach(path => {
        ctx.beginPath();
        path.points.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt[0], pt[1]);
          else ctx.lineTo(pt[0], pt[1]);
        });
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Terminal end pads (micro 3x3 square solder contacts)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        const start = path.points[0];
        const end = path.points[path.points.length - 1];
        ctx.fillRect(start[0] - 1.5, start[1] - 1.5, 3, 3);
        ctx.fillRect(end[0] - 1.5, end[1] - 1.5, 3, 3);
      });

      // 5. Data Packets Travelling Along Selected Paths
      if (!prefersReducedMotion) {
        packets.forEach(p => {
          const path = paths[p.pathIndex];
          if (!path) return;

          p.progress += p.speed;
          if (p.progress > 1.15) {
            p.progress = -0.15;
          }

          const curDist = path.totalLength * Math.max(0, Math.min(1, p.progress));
          const tailDist = Math.max(0, curDist - p.length);

          const head = getPointOnPath(path, curDist);
          const tail = getPointOnPath(path, tailDist);

          // Render linear packet stroke with soft gradient tail
          const packetGrad = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
          packetGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          if (p.color === '#10b981') {
            packetGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.35)');
            packetGrad.addColorStop(1, '#10b981');
          } else if (p.color === '#6366f1') {
            packetGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.35)');
            packetGrad.addColorStop(1, '#818cf8');
          } else {
            packetGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.35)');
            packetGrad.addColorStop(1, '#38bdf8');
          }

          ctx.beginPath();
          ctx.moveTo(tail[0], tail[1]);
          ctx.lineTo(head[0], head[1]);
          ctx.strokeStyle = packetGrad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Bright packet head dot
          ctx.beginPath();
          ctx.arc(head[0], head[1], 1.25, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      }

      // 6. Softly Animated Connection Nodes with Breathing Halos
      nodes.forEach(node => {
        const pulse = prefersReducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(elapsed * 0.0018 + node.phase);

        // Outer breathing halo (soft low-contrast glow)
        const haloRadius = 7 + pulse * 5;
        const haloAlpha = 0.05 + pulse * 0.09;

        ctx.beginPath();
        ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
        if (node.accent === 'emerald') {
          ctx.fillStyle = `rgba(16, 185, 129, ${haloAlpha * 0.7})`;
        } else if (node.accent === 'indigo') {
          ctx.fillStyle = `rgba(99, 102, 241, ${haloAlpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${haloAlpha})`;
        }
        ctx.fill();

        // Node outline ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Restrained technical code annotation
        ctx.fillStyle = 'rgba(148, 163, 184, 0.16)';
        ctx.font = '9px "JetBrains Mono", Consolas, monospace';
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      });

      ctx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    // Interactive pointer parallax (desktop only)
    if (!isTouchDevice) {
      window.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
      }, { passive: true });
    }

    // Scroll parallax listener
    window.addEventListener('scroll', () => {
      targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
    }, { passive: true });

    // Page visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
      } else if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    });

    // Debounced resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (animId) cancelAnimationFrame(animId);
        resize();
        if (!prefersReducedMotion) animId = requestAnimationFrame(render);
        else render(performance.now());
      }, 150);
    }, { passive: true });

    // Initialize
    resize();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCSEArchitectureBackground);
  } else {
    initCSEArchitectureBackground();
  }
})();
