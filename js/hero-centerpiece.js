/**
 * Disha Maurya Portfolio — Hero Software Engineering Workspace Visualization
 * CSE digital architecture centerpiece: code editor, modular systems, flowchart & dev terminal.
 * Zero celestial/galaxy graphics. Pure Computer Science & Engineering.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CODE_SNIPPETS = {
    runtime: {
      filename: 'architecture.ts',
      filepath: 'src/core/',
      lang: 'TYPESCRIPT',
      lines: [
        { num: 1, html: '<span class="tok-kwd">import</span> { <span class="tok-type">GraphEngine</span>, <span class="tok-type">GeminiVision</span> } <span class="tok-kwd">from</span> <span class="tok-str">\'@disha/core\'</span>;' },
        { num: 2, html: '' },
        { num: 3, html: '<span class="tok-kwd">export class</span> <span class="tok-class">SystemRuntime</span> {' },
        { num: 4, html: '  <span class="tok-kwd">readonly</span> <span class="tok-prop">solvedProblems</span> = <span class="tok-num">1049</span>; <span class="tok-cmt">// CodeChef Diamond</span>' },
        { num: 5, html: '  <span class="tok-kwd">readonly</span> <span class="tok-prop">gssocMergedPRs</span> = <span class="tok-num">21</span>;   <span class="tok-cmt">// GSSoC Top 2%</span>' },
        { num: 6, html: '' },
        { num: 7, html: '  <span class="tok-kwd">async</span> <span class="tok-fn">executePipeline</span>(<span class="tok-param">task</span>: <span class="tok-type">TaskPayload</span>): <span class="tok-type">Promise</span>&lt;<span class="tok-type">PipelineResult</span>&gt; {' },
        { num: 8, html: '    <span class="tok-kwd">const</span> <span class="tok-var">topoSort</span> = <span class="tok-type">GraphEngine</span>.<span class="tok-fn">topologicalSort</span>(<span class="tok-param">task</span>.<span class="tok-prop">graph</span>);' },
        { num: 9, html: '    <span class="tok-kwd">const</span> <span class="tok-var">audit</span> = <span class="tok-kwd">await</span> <span class="tok-type">GeminiVision</span>.<span class="tok-fn">audit</span>(<span class="tok-param">task</span>.<span class="tok-prop">payload</span>);' },
        { num: 10, html: '    <span class="tok-kwd">return</span> { <span class="tok-prop">status</span>: <span class="tok-num">200</span>, <span class="tok-prop">order</span>: <span class="tok-var">topoSort</span>, <span class="tok-prop">verified</span>: <span class="tok-bool">true</span> };' },
        { num: 11, html: '  }' },
        { num: 12, html: '}' }
      ]
    },
    ai: {
      filename: 'nagar_ai.py',
      filepath: 'ai/services/',
      lang: 'PYTHON / GEMINI',
      lines: [
        { num: 1, html: '<span class="tok-kwd">import</span> <span class="tok-var">google.generativeai</span> <span class="tok-kwd">as</span> <span class="tok-var">genai</span>' },
        { num: 2, html: '<span class="tok-kwd">from</span> <span class="tok-var">core.vision</span> <span class="tok-kwd">import</span> <span class="tok-type">RoadHazardAuditor</span>' },
        { num: 3, html: '' },
        { num: 4, html: '<span class="tok-kwd">class</span> <span class="tok-class">NagarAIEngine</span>:' },
        { num: 5, html: '    <span class="tok-kwd">def</span> <span class="tok-fn">__init__</span>(<span class="tok-param">self</span>, <span class="tok-param">api_key</span>: <span class="tok-type">str</span>):' },
        { num: 6, html: '        <span class="tok-var">genai</span>.<span class="tok-fn">configure</span>(<span class="tok-prop">api_key</span>=<span class="tok-param">api_key</span>)' },
        { num: 7, html: '        <span class="tok-param">self</span>.<span class="tok-prop">model</span> = <span class="tok-var">genai</span>.<span class="tok-fn">GenerativeModel</span>(<span class="tok-str">\'gemini-2.5-flash\'</span>)' },
        { num: 8, html: '' },
        { num: 9, html: '    <span class="tok-kwd">async def</span> <span class="tok-fn">audit_civic_report</span>(<span class="tok-param">self</span>, <span class="tok-param">image_bytes</span>: <span class="tok-type">bytes</span>) -&gt; <span class="tok-type">dict</span>:' },
        { num: 10, html: '        <span class="tok-var">analysis</span> = <span class="tok-kwd">await</span> <span class="tok-param">self</span>.<span class="tok-prop">model</span>.<span class="tok-fn">generate_content</span>([' },
        { num: 11, html: '            <span class="tok-str">"Audit hazard severity & ward priority"</span>, <span class="tok-param">image_bytes</span>' },
        { num: 12, html: '        ])' },
        { num: 13, html: '        <span class="tok-kwd">return</span> {<span class="tok-str">"priority"</span>: <span class="tok-str">"HIGH"</span>, <span class="tok-str">"confidence"</span>: <span class="tok-num">0.984</span>}' }
      ]
    },
    dsa: {
      filename: 'dsa_graph.cpp',
      filepath: 'algorithms/',
      lang: 'C++ / DSA',
      lines: [
        { num: 1, html: '<span class="tok-cmt">// 1,049+ Problems Solved | CodeChef Diamond</span>' },
        { num: 2, html: '<span class="tok-kwd">#include</span> <span class="tok-str">&lt;vector&gt;</span>' },
        { num: 3, html: '<span class="tok-kwd">#include</span> <span class="tok-str">&lt;queue&gt;</span>' },
        { num: 4, html: '' },
        { num: 5, html: '<span class="tok-type">vector</span>&lt;<span class="tok-type">int</span>&gt; <span class="tok-fn">topologicalSort</span>(<span class="tok-type">int</span> <span class="tok-param">V</span>, <span class="tok-kwd">const</span> <span class="tok-type">vector</span>&lt;<span class="tok-type">vector</span>&lt;<span class="tok-type">int</span>&gt;&gt;&amp; <span class="tok-param">adj</span>) {' },
        { num: 6, html: '    <span class="tok-type">vector</span>&lt;<span class="tok-type">int</span>&gt; <span class="tok-var">inDegree</span>(<span class="tok-param">V</span>, <span class="tok-num">0</span>), <span class="tok-var">order</span>;' },
        { num: 7, html: '    <span class="tok-kwd">for</span> (<span class="tok-type">int</span> <span class="tok-var">u</span> = <span class="tok-num">0</span>; <span class="tok-var">u</span> &lt; <span class="tok-param">V</span>; ++<span class="tok-var">u</span>)' },
        { num: 8, html: '        <span class="tok-kwd">for</span> (<span class="tok-type">int</span> <span class="tok-var">v</span> : <span class="tok-param">adj</span>[<span class="tok-var">u</span>]) <span class="tok-var">inDegree</span>[<span class="tok-var">v</span>]++;' },
        { num: 9, html: '    <span class="tok-type">queue</span>&lt;<span class="tok-type">int</span>&gt; <span class="tok-var">q</span>;' },
        { num: 10, html: '    <span class="tok-kwd">for</span> (<span class="tok-type">int</span> <span class="tok-var">i</span> = <span class="tok-num">0</span>; <span class="tok-var">i</span> &lt; <span class="tok-param">V</span>; ++<span class="tok-var">i</span>) <span class="tok-kwd">if</span> (!<span class="tok-var">inDegree</span>[<span class="tok-var">i</span>]) <span class="tok-var">q</span>.<span class="tok-fn">push</span>(<span class="tok-var">i</span>);' },
        { num: 11, html: '    <span class="tok-kwd">while</span> (!<span class="tok-var">q</span>.<span class="tok-fn">empty</span>()) { <span class="tok-cmt">/* O(V + E) Amortized */</span> }' },
        { num: 12, html: '    <span class="tok-kwd">return</span> <span class="tok-var">order</span>;' },
        { num: 13, html: '}' }
      ]
    }
  };

  const TERMINAL_LOGS = [
    { type: 'cmd', text: '$ npm run build:verify' },
    { type: 'cyan', text: '✓ [ALGORITHMS] 1,049 DSA problems solved (CodeChef Diamond • 29 Contests)' },
    { type: 'emerald', text: '✓ [OPEN_SOURCE] 21 merged PRs in GSSoC 2026 across 8 production repositories' },
    { type: 'indigo', text: '✓ [PRACTICAL_AI] Gemini Vision & civic models deployed on Nagar AI & Privacy Guardian' },
    { type: 'cyan', text: '✓ [SYSTEM_STACK] React + TypeScript + Node.js distributed pipelines online' }
  ];

  function initHeroWorkspace() {
    const container = document.getElementById('heroWorkspaceVisual');
    if (!container) return;

    const viewport = document.getElementById('codeViewport');
    const pathFile = document.getElementById('activeFileLabel');
    const langLabel = document.getElementById('activeLangLabel');
    const tabs = container.querySelectorAll('.ws-tab');
    const terminalEl = document.getElementById('terminalConsole');

    let currentTab = 'runtime';
    let autoRotateTimer = null;
    let isUserInteracting = false;

    // Render code snippet into editor
    function renderSnippet(tabKey) {
      const data = CODE_SNIPPETS[tabKey];
      if (!data || !viewport) return;

      if (pathFile) pathFile.textContent = data.filename;
      if (langLabel) langLabel.textContent = data.lang;

      let html = '<div class="code-lines-wrapper">';
      data.lines.forEach((line, index) => {
        const isHighlight = (tabKey === 'runtime' && (line.num === 8 || line.num === 9)) ||
                            (tabKey === 'ai' && line.num === 10) ||
                            (tabKey === 'dsa' && line.num === 11);
        const hlClass = isHighlight ? ' code-line-highlight' : '';
        html += `<div class="code-line${hlClass}">` +
                `<span class="line-number mono">${line.num}</span>` +
                `<span class="line-code mono">${line.html}</span>` +
                `</div>`;
      });
      html += '</div>';

      viewport.innerHTML = html;
    }

    // Tab switcher
    function switchTab(tabKey, userTriggered = false) {
      currentTab = tabKey;
      tabs.forEach(t => {
        const isActive = t.getAttribute('data-tab') === tabKey;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      renderSnippet(tabKey);

      if (userTriggered) {
        isUserInteracting = true;
        // Resume rotation after 18 seconds of idle
        clearTimeout(autoRotateTimer);
        autoRotateTimer = setTimeout(() => {
          isUserInteracting = false;
          scheduleNextRotation();
        }, 18000);
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-tab');
        if (key && key !== currentTab) {
          switchTab(key, true);
        }
      });
    });

    // Auto rotation across tabs every 7.5 seconds
    const tabKeys = ['runtime', 'ai', 'dsa'];
    function scheduleNextRotation() {
      if (prefersReducedMotion || isUserInteracting) return;
      clearTimeout(autoRotateTimer);
      autoRotateTimer = setTimeout(() => {
        if (!isUserInteracting) {
          const nextIdx = (tabKeys.indexOf(currentTab) + 1) % tabKeys.length;
          switchTab(tabKeys[nextIdx], false);
          scheduleNextRotation();
        }
      }, 7500);
    }

    // Pause auto-rotation on mouse enter
    container.addEventListener('mouseenter', () => {
      isUserInteracting = true;
    });

    container.addEventListener('mouseleave', () => {
      isUserInteracting = false;
      scheduleNextRotation();
    });

    // Interactive flowchart step pulse
    const flowStep2 = document.getElementById('flowStep2');
    const flowStep3 = document.getElementById('flowStep3');
    let flowToggle = false;
    if (!prefersReducedMotion && flowStep2 && flowStep3) {
      setInterval(() => {
        flowToggle = !flowToggle;
        if (flowToggle) {
          flowStep2.classList.remove('active-step');
          flowStep3.classList.add('active-step');
        } else {
          flowStep3.classList.remove('active-step');
          flowStep2.classList.add('active-step');
        }
      }, 3200);
    }

    // Periodic terminal log heartbeat
    if (!prefersReducedMotion && terminalEl) {
      let logIndex = 0;
      setInterval(() => {
        logIndex = (logIndex + 1) % TERMINAL_LOGS.length;
        const item = TERMINAL_LOGS[logIndex];
        const rows = terminalEl.querySelectorAll('.term-row:not(.active-cmd)');
        if (rows.length > 0) {
          const targetRow = rows[logIndex % rows.length];
          targetRow.style.opacity = '0.3';
          setTimeout(() => {
            targetRow.innerHTML = item.type === 'cmd'
              ? `<span class="term-dim">$</span> ${item.text.replace('$ ', '')}`
              : item.text;
            targetRow.style.opacity = '1';
          }, 200);
        }
      }, 5000);
    }

    // Initial render
    renderSnippet('runtime');
    scheduleNextRotation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroWorkspace);
  } else {
    initHeroWorkspace();
  }
})();
