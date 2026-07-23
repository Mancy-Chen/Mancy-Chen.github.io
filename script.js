const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const themeToggle = document.querySelector(".theme-toggle");
const languageSwitch = document.querySelector(".lang-switch");

const isChinesePage = document.documentElement.lang.toLowerCase().startsWith("zh");
const siteRoot = "https://mingshichen.com/";

document.documentElement.classList.add("site-v6");

function upsertLink({ rel, href, hreflang }) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertMeta(property, content) {
  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateSeoMetadata() {
  const canonicalUrl = isChinesePage ? `${siteRoot}zh.html` : siteRoot;

  upsertLink({ rel: "canonical", href: canonicalUrl });
  upsertLink({ rel: "alternate", hreflang: "en", href: siteRoot });
  upsertLink({ rel: "alternate", hreflang: "zh-CN", href: `${siteRoot}zh.html` });
  upsertLink({ rel: "alternate", hreflang: "x-default", href: siteRoot });

  upsertMeta("og:url", canonicalUrl);
  upsertMeta("og:locale", isChinesePage ? "zh_CN" : "en_US");
  upsertMeta("og:locale:alternate", isChinesePage ? "en_US" : "zh_CN");

  let structuredData = document.head.querySelector("#person-structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.id = "person-structured-data";
    document.head.appendChild(structuredData);
  }

  structuredData.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mingshi Chen",
    alternateName: ["陈明诗", "Mancy Chen"],
    url: siteRoot,
    image: `${siteRoot}mingshi-chen-photo.jpg`,
    jobTitle: "PhD Researcher",
    affiliation: {
      "@type": "Organization",
      name: "Amsterdam UMC"
    },
    sameAs: [
      "https://www.linkedin.com/in/mingshi-chen/",
      "https://orcid.org/0000-0003-1224-8399",
      "https://scholar.google.com/citations?hl=en&user=pt1ozw4AAAAJ",
      "https://github.com/Mancy-Chen"
    ],
    knowsAbout: [
      "Medical imaging",
      "Neuroimaging",
      "Artificial intelligence",
      "Machine learning",
      "Radiomics",
      "Brain age"
    ]
  });
}

function replaceChineseName() {
  if (!isChinesePage) return;

  const cleanName = (value) => value
    .replaceAll("Mingshi Chen", "陈明诗")
    .replaceAll("陈明诗（陈明诗）", "陈明诗")
    .replaceAll("陈明诗 · 陈明诗", "陈明诗");

  document.title = cleanName(document.title);

  document.querySelectorAll("meta[content]").forEach((element) => {
    element.content = cleanName(element.content);
  });

  document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
    ["aria-label", "alt", "title"].forEach((attribute) => {
      if (element.hasAttribute(attribute)) {
        element.setAttribute(attribute, cleanName(element.getAttribute(attribute)));
      }
    });
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    node.nodeValue = cleanName(node.nodeValue);
  });
}

function injectLatestResponsiveStyles() {
  if (document.querySelector("#latest-responsive-styles")) return;

  const style = document.createElement("style");
  style.id = "latest-responsive-styles";
  style.textContent = `
    .desktop-title-break { display: none; }

    .hero-photo-visual {
      position: relative;
      min-height: 575px;
      display: grid;
      place-items: center;
      isolation: isolate;
    }

    .hero-photo-accent {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
    }

    .hero-photo-accent-one {
      width: 330px;
      height: 330px;
      right: 4%;
      top: 8%;
      background: color-mix(in srgb, var(--accent-soft) 68%, transparent);
    }

    .hero-photo-accent-two {
      width: 160px;
      height: 160px;
      left: 7%;
      bottom: 10%;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--surface) 55%, transparent);
    }

    .hero-photo-card {
      width: min(100%, 365px);
      margin: 0;
      padding: 14px;
      background: color-mix(in srgb, var(--surface-solid) 92%, transparent);
      border: 1px solid var(--line);
      border-radius: 30px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }

    .hero-photo-frame {
      overflow: hidden;
      aspect-ratio: 4 / 5;
      border-radius: 22px;
      background: var(--bg-soft);
    }

    .hero-photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .hero-photo-caption { padding: 16px 4px 3px; }

    .hero-photo-name {
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(27px, 2.8vw, 35px);
      font-weight: 600;
      line-height: 1.05;
      letter-spacing: -.035em;
    }

    .hero-photo-subname {
      margin: 6px 0 7px;
      color: var(--accent);
      font-size: 14px;
      font-weight: 700;
    }

    .hero-photo-role {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
    }

    .work-item h3 sup {
      position: relative;
      top: -.15em;
      font-size: .62em;
      line-height: 0;
      vertical-align: super;
    }

    #about .about-photo-card,
    #about .about-brain-card {
      display: none !important;
    }

    html[lang="zh-CN"] .hero-photo-name,
    html[lang="zh-CN"] .hero-photo-subname {
      letter-spacing: 0;
    }

    @media (min-width: 981px) {
      .desktop-title-break { display: block; }

      html[lang="en"] .hero h1 {
        max-width: 650px;
        font-size: clamp(49px, 4.1vw, 64px);
        line-height: 1.01;
      }

      html[lang="zh-CN"] .hero h1 {
        max-width: 680px;
        font-size: clamp(46px, 3.8vw, 59px);
        line-height: 1.14;
      }
    }

    @media (max-width: 980px) {
      .hero-photo-visual { min-height: 510px; }
      .hero-photo-card { width: min(100%, 340px); }
    }

    @media (max-width: 760px) {
      .container { width: min(100% - 32px, var(--container)); }
      .hero { padding-top: 112px; }

      .hero-grid {
        display: flex !important;
        flex-direction: column;
        gap: 34px;
      }

      .hero-copy { order: 1; }

      .hero-photo-visual {
        order: 2;
        min-height: auto;
        padding: 0 0 10px;
        width: 100%;
      }

      .hero-photo-accent { display: none; }

      .hero-photo-card {
        width: min(100%, 278px);
        padding: 10px;
        border-radius: 23px;
        box-shadow: 0 18px 44px rgba(20, 40, 36, .12);
      }

      .hero-photo-frame { border-radius: 17px; }
      .hero-photo-caption { padding: 13px 3px 2px; }
      .hero-photo-name { font-size: 27px; }
      .hero-photo-subname { margin: 4px 0 5px; font-size: 13px; }
      .hero-photo-role { font-size: 12px; }
      .hero h1 { font-size: clamp(40px, 12vw, 58px); line-height: .98; }
      html[lang="zh-CN"] .hero h1 { line-height: 1.12; }
      .hero-lead { font-size: 17px; }

      .hero-actions {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .hero-actions .button {
        width: 100%;
        justify-content: center;
      }

      .hero-meta { gap: 8px 14px; }
      .section { padding-block: 72px; }

      .two-column,
      .section-heading-wide,
      .contact-panel {
        grid-template-columns: 1fr !important;
      }

      .principles,
      .card-grid,
      .tool-groups {
        grid-template-columns: 1fr !important;
      }

      .work-item {
        grid-template-columns: 1fr !important;
        gap: 12px;
        padding-block: 26px;
      }

      .work-item h3 {
        font-size: clamp(21px, 6.2vw, 27px);
        line-height: 1.18;
        overflow-wrap: anywhere;
      }

      .work-year { margin-bottom: 0; }

      .work-item .text-link,
      .work-item .status-pill {
        justify-self: start;
      }

      .contact-actions {
        display: grid;
        grid-template-columns: 1fr;
        width: 100%;
      }

      .contact-actions .button {
        width: 100%;
        justify-content: center;
      }

      .footer-inner {
        align-items: flex-start;
        gap: 12px;
      }
    }

    @media (max-width: 390px) {
      .container { width: min(100% - 24px, var(--container)); }
      .hero { padding-top: 100px; }
      .hero h1 { font-size: 38px; }
      .hero-photo-card { width: min(100%, 250px); }
      .main-nav { padding-inline: 20px; }
      .work-item h3 { font-size: 21px; }
    }
  `;

  document.head.appendChild(style);
}

function applyLatestLayout() {
  injectLatestResponsiveStyles();

  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    heroTitle.innerHTML = isChinesePage
      ? `将复杂的大脑<span class="desktop-title-break"></span>数据转化为具有<span class="desktop-title-break"></span><em>临床意义的</em>见解。`
      : `Turning complex<span class="desktop-title-break"></span>brain data into<span class="desktop-title-break"></span><em>clinically meaningful</em><span class="desktop-title-break"></span>insight.`;
  }

  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    heroVisual.className = "hero-visual hero-photo-visual reveal";
    heroVisual.setAttribute(
      "aria-label",
      isChinesePage ? "陈明诗个人照片" : "Portrait of Mingshi Chen"
    );

    heroVisual.innerHTML = `
      <div class="hero-photo-accent hero-photo-accent-one" aria-hidden="true"></div>
      <div class="hero-photo-accent hero-photo-accent-two" aria-hidden="true"></div>
      <figure class="hero-photo-card">
        <div class="hero-photo-frame">
          <img src="mingshi-chen-photo.jpg?v=6" alt="${isChinesePage ? "陈明诗个人照片" : "Portrait of Mingshi Chen"}">
        </div>
        <figcaption class="hero-photo-caption">
          <p class="hero-photo-name">${isChinesePage ? "陈明诗" : "Mingshi Chen"}</p>
          <p class="hero-photo-subname">${isChinesePage ? "医学影像与人工智能研究者" : "陈明诗"}</p>
          <p class="hero-photo-role">${isChinesePage ? "博士研究员 · 阿姆斯特丹大学医学中心" : "PhD Researcher · Amsterdam UMC"}</p>
        </figcaption>
      </figure>
    `;
  }

  document
    .querySelectorAll("#about .about-photo-card, #about .about-brain-card")
    .forEach((element) => element.remove());
}

function renamePublications() {
  const titles = [
    {
      doi: "10.1038/s41598-026-56688-y",
      en: "On the value of radiomics in addition to clinical measures in emotional conflict fMRI for predicting sertraline response in major depressive disorder",
      zh: "情绪冲突 fMRI 中放射组学在临床指标之外对重度抑郁障碍舍曲林治疗反应预测的附加价值"
    },
    {
      doi: "10.1016/j.nicl.2024.103707",
      en: "Prediction of methylphenidate treatment response for ADHD using conventional and radiomics T1 and DTI features: Secondary analysis of a randomized clinical trial",
      zh: "基于常规及放射组学 T1 和 DTI 特征预测 ADHD 的哌甲酯治疗反应：随机临床试验的二次分析"
    },
    {
      doi: "10.1016/B978-0-443-14109-6.00014-6",
      en: "What is beyond the image? Machine learning for MR image analysis",
      zh: "图像之外是什么？用于磁共振图像分析的机器学习"
    },
    {
      doi: "10.1186/s40644-024-00798-1",
      en: "Assessing the intracranial metabolic score as a novel prognostic tool in primary CNS lymphoma with end of induction-chemotherapy <sup>18</sup>F-FDG PET/CT and PET/MR",
      zh: "评估颅内代谢评分作为原发性中枢神经系统淋巴瘤诱导化疗结束时 <sup>18</sup>F-FDG PET/CT 与 PET/MR 的新型预后工具"
    },
    {
      doi: "10.3390/cancers16152708",
      en: "The Prognostic Significance of Pontine-White Matter Score in Primary Central Nervous System Lymphoma Patients",
      zh: "脑桥-白质评分在原发性中枢神经系统淋巴瘤患者中的预后意义"
    },
    {
      doi: "10.1016/j.radonc.2023.109579",
      en: "Endonasopharyngeal ultrasound and magnetic resonance imaging features of recurrent retropharyngeal nodes in nasopharyngeal carcinoma patients: a radiologic-histopathologic study",
      zh: "鼻咽腔内超声与磁共振成像对鼻咽癌患者复发性咽后淋巴结的影像学特征：一项影像-组织病理学研究"
    }
  ];

  document.querySelectorAll(".work-item").forEach((item) => {
    const heading = item.querySelector("h3");
    if (!heading) return;

    const links = Array.from(item.querySelectorAll("a[href]"), (link) => link.href).join(" ");
    const match = titles.find(({ doi }) => links.includes(doi));

    if (match) {
      heading.innerHTML = isChinesePage ? match.zh : match.en;
      return;
    }

    const currentTitle = heading.textContent.toLowerCase();
    if (
      currentTitle.includes("brain age") ||
      currentTitle.includes("biological brain age") ||
      currentTitle.includes("脑龄") ||
      currentTitle.includes("bilingual") ||
      currentTitle.includes("双语")
    ) {
      heading.textContent = isChinesePage
        ? "语言加工需求可预测生物学脑龄：来自双语者、翻译者和口译者的 MRI 证据"
        : "Language processing demands predict biological brain age: MRI evidence from bilinguals, translators, and interpreters";
    }
  });
}

function localizeChineseWorkLabels() {
  if (!isChinesePage) return;

  document.querySelectorAll(".work-year").forEach((element) => {
    if (element.textContent.trim() === "Current") {
      element.textContent = "当前";
    }
  });

  document.querySelectorAll(".work-type").forEach((element) => {
    const label = element.textContent.trim();
    if (label === "研究论文" || label === "博士课题") {
      element.textContent = "博士研究项目";
    }
  });
}

updateSeoMetadata();
applyLatestLayout();
renamePublications();
localizeChineseWorkLabels();
replaceChineseName();

function updateLanguageSwitchHref() {
  if (!languageSwitch) return;
  const target = languageSwitch.dataset.languageTarget || languageSwitch.getAttribute("href");
  const baseTarget = target.split("#")[0];
  languageSwitch.setAttribute("href", `${baseTarget}${window.location.hash}`);
}

updateLanguageSwitchHref();
window.addEventListener("hashchange", updateLanguageSwitchHref);

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 18);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function closeMobileNav() {
  navToggle?.setAttribute("aria-expanded", "false");
  mainNav?.classList.remove("open");
  document.body.style.overflow = "";
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    closeMobileNav();
  } else {
    navToggle.setAttribute("aria-expanded", "true");
    mainNav?.classList.add("open");
    document.body.style.overflow = "hidden";
  }
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNav();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMobileNav();
});

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
