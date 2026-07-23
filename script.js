const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const themeToggle = document.querySelector(".theme-toggle");
const languageSwitch = document.querySelector(".lang-switch");

const isChinesePage = document.documentElement.lang.toLowerCase().startsWith("zh");
const siteRoot = "https://mingshichen.com/";

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

function injectCleanPortraitStyles() {
  if (document.querySelector("#clean-portrait-styles")) return;

  const style = document.createElement("style");
  style.id = "clean-portrait-styles";
  style.textContent = `
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

    .hero-photo-caption {
      padding: 16px 4px 3px;
    }

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

    #about .about-photo-card,
    #about .about-brain-card {
      display: none !important;
    }

    html[lang="zh-CN"] .hero-photo-name,
    html[lang="zh-CN"] .hero-photo-subname {
      letter-spacing: 0;
    }

    @media (max-width: 980px) {
      .hero-photo-visual { min-height: 525px; }
      .hero-photo-card { width: min(100%, 350px); }
    }

    @media (max-width: 760px) {
      .hero-photo-visual {
        min-height: auto;
        padding: 20px 0 8px;
      }
      .hero-photo-card {
        width: min(100%, 310px);
        padding: 12px;
        border-radius: 25px;
      }
      .hero-photo-frame { border-radius: 19px; }
      .hero-photo-accent-one {
        width: 250px;
        height: 250px;
        right: 5%;
      }
      .hero-photo-accent-two {
        width: 120px;
        height: 120px;
        left: 6%;
      }
    }
  `;
  document.head.appendChild(style);
}

function applyCleanPortraitLayout() {
  injectCleanPortraitStyles();

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
          <img src="mingshi-chen-photo.jpg" alt="${isChinesePage ? "陈明诗个人照片" : "Portrait of Mingshi Chen"}">
        </div>
        <figcaption class="hero-photo-caption">
          <p class="hero-photo-name">${isChinesePage ? "陈明诗" : "Mingshi Chen"}</p>
          <p class="hero-photo-subname">${isChinesePage ? "医学影像与人工智能研究者" : "陈明诗"}</p>
          <p class="hero-photo-role">${isChinesePage ? "博士研究员 · 阿姆斯特丹大学医学中心" : "PhD Researcher · Amsterdam UMC"}</p>
        </figcaption>
      </figure>
    `;
  }

  document.querySelectorAll("#about .about-photo-card, #about .about-brain-card").forEach((element) => {
    element.remove();
  });
}

function renamePublications() {
  const exactTitles = [
    {
      doi: "10.1038/s41598-026-56688-y",
      title: "On the value of radiomics in addition to clinical measures in emotional conflict fMRI for predicting sertraline response in major depressive disorder"
    },
    {
      doi: "10.1016/j.nicl.2024.103707",
      title: "Prediction of methylphenidate treatment response for ADHD using conventional and radiomics T1 and DTI features: Secondary analysis of a randomized clinical trial"
    },
    {
      doi: "10.1016/B978-0-443-14109-6.00014-6",
      title: "What is beyond the image? Machine learning for MR image analysis"
    },
    {
      doi: "10.1186/s40644-024-00798-1",
      title: "Assessing the intracranial metabolic score as a novel prognostic tool in primary CNS lymphoma with end of induction-chemotherapy 18F-FDG PET/CT and PET/MR"
    },
    {
      doi: "10.3390/cancers16152708",
      title: "The Prognostic Significance of Pontine-White Matter Score in Primary Central Nervous System Lymphoma Patients"
    },
    {
      doi: "10.1016/j.radonc.2023.109579",
      title: "Endonasopharyngeal ultrasound and magnetic resonance imaging features of recurrent retropharyngeal nodes in nasopharyngeal carcinoma patients: a radiologic-histopathologic study"
    }
  ];

  document.querySelectorAll(".work-item").forEach((item) => {
    const heading = item.querySelector("h3");
    if (!heading) return;

    const linkText = Array.from(item.querySelectorAll("a[href]"))
      .map((link) => link.href)
      .join(" ");

    const publication = exactTitles.find(({ doi }) => linkText.includes(doi));
    if (publication) {
      heading.textContent = publication.title;
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
      heading.textContent = "Language processing demands predict biological brain age: MRI evidence from bilinguals, translators, and interpreters";
    }
  });
}

updateSeoMetadata();
applyCleanPortraitLayout();
renamePublications();
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
