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

function injectRefinedLayoutStyles() {
  if (document.querySelector("#refined-portrait-brain-styles")) return;

  const style = document.createElement("style");
  style.id = "refined-portrait-brain-styles";
  style.textContent = `
    .hero-photo-visual {
      position: relative;
      min-height: 610px;
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
      width: 360px;
      height: 360px;
      right: 1%;
      top: 7%;
      background: color-mix(in srgb, var(--accent-soft) 78%, transparent);
    }

    .hero-photo-accent-two {
      width: 190px;
      height: 190px;
      left: 3%;
      bottom: 8%;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--surface) 66%, transparent);
    }

    .hero-photo-card {
      width: min(100%, 410px);
      margin: 0;
      padding: 16px;
      background: color-mix(in srgb, var(--surface-solid) 90%, transparent);
      border: 1px solid var(--line);
      border-radius: 34px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }

    .hero-photo-frame {
      overflow: hidden;
      aspect-ratio: 4 / 5;
      border-radius: 25px;
      background: var(--bg-soft);
    }

    .hero-photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .hero-photo-caption {
      padding: 18px 5px 4px;
    }

    .hero-photo-name {
      margin: 0;
      font-family: var(--serif);
      font-size: clamp(29px, 3vw, 38px);
      font-weight: 600;
      line-height: 1.05;
      letter-spacing: -.035em;
    }

    .hero-photo-subname {
      margin: 6px 0 7px;
      color: var(--accent);
      font-size: 15px;
      font-weight: 700;
    }

    .hero-photo-role {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }

    .about-brain-card {
      width: min(100%, 340px);
      margin-top: 34px;
      padding: 28px;
      color: var(--accent);
      background: color-mix(in srgb, var(--surface-solid) 82%, transparent);
      border: 1px solid var(--line);
      border-radius: 30px;
      box-shadow: var(--shadow);
    }

    .about-brain-icon {
      width: 100%;
      aspect-ratio: 1 / 1;
    }

    .about-brain-icon .brain-disc {
      fill: var(--accent-soft);
      stroke: var(--line);
      stroke-width: 1.2;
    }

    .about-brain-icon .brain-line,
    .about-brain-icon .brain-detail {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .about-brain-icon .brain-line { stroke-width: 7; }
    .about-brain-icon .brain-detail { stroke-width: 5; opacity: .78; }

    .about-brain-caption {
      padding-top: 18px;
      border-top: 1px solid var(--line);
    }

    .about-brain-caption span {
      display: block;
      margin-bottom: 5px;
      color: var(--accent-2);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    .about-brain-caption strong {
      color: var(--ink);
      font-family: var(--serif);
      font-size: 23px;
      font-weight: 600;
    }

    html[lang="zh-CN"] .hero-photo-name,
    html[lang="zh-CN"] .hero-photo-subname,
    html[lang="zh-CN"] .about-brain-caption span {
      letter-spacing: 0;
    }

    @media (max-width: 980px) {
      .hero-photo-visual { min-height: 560px; }
      .hero-photo-card { width: min(100%, 380px); }
      .about-brain-card { max-width: 360px; }
    }

    @media (max-width: 760px) {
      .hero-photo-visual {
        min-height: auto;
        padding: 20px 0 8px;
      }
      .hero-photo-card {
        width: min(100%, 330px);
        padding: 13px;
        border-radius: 28px;
      }
      .hero-photo-frame { border-radius: 21px; }
      .hero-photo-accent-one {
        width: 280px;
        height: 280px;
        right: 3%;
      }
      .hero-photo-accent-two {
        width: 140px;
        height: 140px;
        left: 4%;
      }
      .about-brain-card {
        max-width: 300px;
        margin-top: 24px;
      }
    }
  `;
  document.head.appendChild(style);
}

function applyPortraitAndBrainLayout() {
  injectRefinedLayoutStyles();

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

  const aboutHeading = document.querySelector("#about .section-heading");
  if (aboutHeading) {
    aboutHeading.querySelector(".about-photo-card, .about-brain-card")?.remove();

    const brainCard = document.createElement("div");
    brainCard.className = "about-brain-card reveal";
    brainCard.setAttribute(
      "aria-label",
      isChinesePage
        ? "医学影像与人工智能脑图标"
        : "Minimal brain icon representing clinical imaging and AI"
    );
    brainCard.innerHTML = `
      <svg class="about-brain-icon" viewBox="0 0 320 320" aria-hidden="true">
        <circle class="brain-disc" cx="160" cy="160" r="132"></circle>
        <path class="brain-line" d="M154 76c-21-23-62-15-69 17-27 4-39 36-23 57-19 19-9 51 16 57-3 28 25 48 48 34 10 20 34 26 50 12V97c-2-10-9-17-22-21Z"></path>
        <path class="brain-line" d="M166 76c21-23 62-15 69 17 27 4 39 36 23 57 19 19 9 51-16 57 3 28-25 48-48 34-10 20-34 26-50 12V97c2-10 9-17 22-21Z"></path>
        <path class="brain-detail" d="M111 104c20 1 32 14 33 33M88 148c21-7 42 2 47 21M91 201c20-14 43-11 57 4M123 239c-3-20 6-35 23-44"></path>
        <path class="brain-detail" d="M209 104c-20 1-32 14-33 33M232 148c-21-7-42 2-47 21M229 201c-20-14-43-11-57 4M197 239c3-20-6-35-23-44"></path>
      </svg>
      <div class="about-brain-caption">
        <span>${isChinesePage ? "临床视角" : "Clinical perspective"}</span>
        <strong>${isChinesePage ? "影像 · 数据 · 人工智能" : "Imaging · Data · AI"}</strong>
      </div>
    `;
    aboutHeading.appendChild(brainCard);
  }
}

updateSeoMetadata();
replaceChineseName();
applyPortraitAndBrainLayout();
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
  header.classList.toggle("scrolled", window.scrollY > 18);
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
    mainNav.classList.add("open");
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
