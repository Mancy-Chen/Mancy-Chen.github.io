(() => {
  const coreScript = document.createElement("script");
  coreScript.src = "script-core.js?v=7";
  coreScript.async = false;

  coreScript.addEventListener("load", () => {
    if (!document.documentElement.lang.toLowerCase().startsWith("zh")) return;

    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
      heroTitle.innerHTML = `将复杂的大脑<span class="desktop-title-break"></span>数据转化为具有<span class="desktop-title-break"></span><strong class="hero-highlight-zh">临床意义</strong>的见解`;
    }

    if (!document.querySelector("#headline-v8-fixes")) {
      const style = document.createElement("style");
      style.id = "headline-v8-fixes";
      style.textContent = `
        html[lang="zh-CN"] .hero h1 .hero-highlight-zh {
          color: var(--accent);
          font-weight: 700;
          font-style: normal;
        }
      `;
      document.head.appendChild(style);
    }
  });

  document.head.appendChild(coreScript);
})();
