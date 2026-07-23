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
      const heroHighlight = document.querySelector(".hero h1 em");
      if (heroHighlight) {
        heroHighlight.classList.add("hero-highlight-en");
      }

      const researchTitle = document.querySelector("#research .section-heading h2");
      if (researchTitle) {
        researchTitle.textContent = "Questions I explore";
      }

      const experienceTitle = document.querySelector("#experience .section-heading h2");
      if (experienceTitle) {
        experienceTitle.innerHTML = `From images<br class="mobile-title-break"> to evidence.`;
      }
    }

    const predictionCard = document.querySelectorAll("#research .research-card")[2];
    if (predictionCard) {
      const description = predictionCard.querySelector("p");
      const tags = predictionCard.querySelector(".tag-list");

      if (isChinesePage) {
        if (description) {
          description.textContent = "利用早期临床信息与任务态fMRI预测抑郁症疗效，并利用结构T1与弥散MRI特征预测ADHD的哌甲酯治疗反应。";
        }
        if (tags) {
          tags.innerHTML = "<li>fMRI</li><li>结构MRI</li><li>影像组学</li><li>机器学习</li><li>抑郁症与ADHD</li>";
        }
      } else {
        if (description) {
          description.textContent = "Using early clinical and task-fMRI signals to predict depression outcomes, and structural T1 and diffusion MRI features to predict methylphenidate response in ADHD.";
        }
        if (tags) {
          tags.innerHTML = "<li>fMRI</li><li>Structural MRI</li><li>Radiomics</li><li>Machine learning</li><li>Depression &amp; ADHD</li>";
        }
      }
    }

    if (!document.querySelector("#headline-v9-fixes")) {
      const style = document.createElement("style");
      style.id = "headline-v9-fixes";
      style.textContent = `
        html[lang="zh-CN"] .hero h1 .hero-highlight-zh {
          color: var(--accent);
          font-weight: 700;
          font-style: normal;
        }

        .hero h1 .hero-highlight-en {
          color: var(--accent);
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          font-style: normal;
          line-height: inherit;
          letter-spacing: normal;
          word-spacing: normal;
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
