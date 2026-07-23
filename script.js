const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const themeToggle = document.querySelector(".theme-toggle");

const languageSwitch = document.querySelector(".lang-switch");

// Add absolute canonical and language-alternate URLs for search engines.
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
  const siteRoot = "https://mingshichen.com/";
  const isChinesePage = document.documentElement.lang.toLowerCase().startsWith("zh");
  const canonicalUrl = isChinesePage ? `${siteRoot}zh.html` : siteRoot;

  upsertLink({ rel: "canonical", href: canonicalUrl });
  upsertLink({ rel: "alternate", hreflang: "en", href: siteRoot });
  upsertLink({ rel: "alternate", hreflang: "zh-CN", href: `${siteRoot}zh.html` });
  upsertLink({ rel: "alternate", hreflang: "x-default", href: siteRoot });

  upsertMeta("og:url", canonicalUrl);
  upsertMeta("og:locale", isChinesePage ? "zh_CN" : "en_US");
  upsertMeta("og:locale:alternate", isChinesePage ? "en_US" : "zh_CN");
}

updateSeoMetadata();

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

document.querySelector("#year").textContent = new Date().getFullYear();

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
