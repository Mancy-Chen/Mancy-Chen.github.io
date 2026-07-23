(() => {
  const coreScript = document.createElement("script");
  coreScript.src = "script-core.js?v=7";
  coreScript.async = false;

  coreScript.addEventListener("load", () => {
    const isChinesePage = document.documentElement.lang.toLowerCase().startsWith("zh");

    if (isChinesePage) {
      const heroTitle = document.querySelector(".hero h1");
      if (heroTitle) {
        heroTitle.innerHTML = `将复杂的大脑<span class="desktop-title-break"></span>数据转化为具有<span class="desktop-title-break"></span><strong class="hero-highlight-zh">临床意义</strong>的见解`;
      }

      const contactTitle = document.querySelector("#contact h2");
      if (contactTitle) {
        contactTitle.innerHTML = `让研究、影像与<br>临床价值相互连接`;
      }
    } else {
      const researchTitle = document.querySelector("#research .section-heading h2");
      if (researchTitle) {
        researchTitle.textContent = "Questions I explore";
      }

      const experienceTitle = document.querySelector("#experience .section-heading h2");
      if (experienceTitle) {
        experienceTitle.innerHTML = `From images<br class="mobile-title-break"> to evidence.`;
      }
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

        .mobile-title-break {
          display: none;
        }

        @media (max-width: 760px) {
          .mobile-title-break {
            display: block;
          }
        }
      `;
      document.head.appendChild(style);
    }
  });

  document.head.appendChild(coreScript);
})();
