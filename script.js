(() => {
  const coreScript = document.createElement("script");
  coreScript.src = "script-core.js?v=7";
  coreScript.async = false;

  coreScript.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const isDutchPage = params.get("lang") === "nl";
    const isChinesePage = !isDutchPage && document.documentElement.lang.toLowerCase().startsWith("zh");

    function setText(selector, text) {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    }

    function setHtml(selector, html) {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = html;
    }

    function addDutchLanguageButton() {
      const nav = document.querySelector(".main-nav");
      if (!nav) return;

      if (isDutchPage) {
        const existingLanguageLink = nav.querySelector(".lang-switch");
        if (existingLanguageLink) {
          existingLanguageLink.href = `zh.html${window.location.hash}`;
          existingLanguageLink.dataset.languageTarget = "zh.html";
          existingLanguageLink.hreflang = "zh-CN";
          existingLanguageLink.lang = "zh-CN";
          existingLanguageLink.setAttribute("aria-label", "Overschakelen naar Chinees");
          existingLanguageLink.textContent = "中文";
        }

        const englishLink = document.createElement("a");
        englishLink.className = "lang-switch lang-switch-en";
        englishLink.href = `index.html${window.location.hash}`;
        englishLink.hreflang = "en";
        englishLink.lang = "en";
        englishLink.setAttribute("aria-label", "Switch to English");
        englishLink.textContent = "EN";

        if (existingLanguageLink) nav.insertBefore(englishLink, existingLanguageLink);
        else nav.appendChild(englishLink);
        return;
      }

      if (nav.querySelector(".lang-switch-nl")) return;

      const dutchLink = document.createElement("a");
      dutchLink.className = "lang-switch lang-switch-nl";
      dutchLink.href = `index.html?lang=nl${window.location.hash}`;
      dutchLink.hreflang = "nl";
      dutchLink.lang = "nl";
      dutchLink.setAttribute("aria-label", "Switch to Dutch");
      dutchLink.textContent = "NL";
      nav.appendChild(dutchLink);
    }

    addDutchLanguageButton();

    if (isChinesePage) {
      const heroTitle = document.querySelector(".hero h1");
      if (heroTitle) {
        heroTitle.innerHTML = `将复杂的大脑<span class="desktop-title-break"></span>数据转化为具有<span class="desktop-title-break"></span><strong class="hero-highlight-zh">临床意义</strong>的见解`;
      }

      const contactTitle = document.querySelector("#contact h2");
      if (contactTitle) {
        contactTitle.innerHTML = `让研究、影像与<br>临床价值相互连接`;
      }
    } else if (isDutchPage) {
      document.documentElement.lang = "nl";
      document.title = "Mingshi Chen | Medische beeldvorming & AI";
      setText('meta[name="description"]', "Mingshi Chen — onderzoeker in medische beeldvorming en kunstmatige intelligentie, met een focus op neuroimaging, hersengezondheid en klinisch onderbouwde machine learning.");

      const navLinks = document.querySelectorAll(".main-nav > a:not(.lang-switch)");
      ["Over mij", "Onderzoek", "Selectie", "Ervaring", "Contact"].forEach((label, index) => {
        if (navLinks[index]) navLinks[index].textContent = label;
      });

      setText(".hero .eyebrow", "Medische beeldvorming · Neuroimaging · Kunstmatige intelligentie");
      setHtml(".hero h1", 'Complexe hersendata omzetten in <em class="hero-highlight-en">klinisch betekenisvolle</em> inzichten.');
      setText(".hero-lead", "Ik ben Mingshi Chen (陈明诗), promovendus bij Amsterdam UMC. Mijn onderzoek combineert medische beeldvorming, machine learning en klinische kennis om hersengezondheid te bestuderen en methoden te ontwikkelen die ook buiten het model zelf bruikbaar blijven.");
      setText(".hero-actions .button-primary", "Bekijk mijn onderzoek");
      setText(".hero-actions .button-secondary", "Neem contact op");
      const heroMeta = document.querySelectorAll(".hero-meta li");
      ["Amsterdam, Nederland", "Promovendus", "Beschikbaar voor postdoctorale en medisch-AI-functies"].forEach((text, index) => {
        if (heroMeta[index]) heroMeta[index].textContent = text;
      });

      setText("#about .section-heading .eyebrow", "Over mij");
      setText("#about .section-heading h2", "Een klinisch perspectief op computationeel onderzoek.");
      setText(".about-photo-role", "Promovendus · Amsterdam UMC");
      const aboutParagraphs = document.querySelectorAll("#about .about-copy > p");
      if (aboutParagraphs[0]) aboutParagraphs[0].textContent = "Mijn achtergrond omvat klinische geneeskunde, medische beeldvorming en datawetenschap. Die combinatie bepaalt mijn vragen: niet alleen of een model goed presteert, maar ook of de uitkomst interpreteerbaar, reproduceerbaar en betekenisvol is voor patiënten en onderzoekers.";
      if (aboutParagraphs[1]) aboutParagraphs[1].textContent = "Bij Amsterdam UMC werk ik met structurele MRI, diffusie-MRI, functionele MRI, radiomics, hersenleeftijdsmodellen en longitudinale statistiek. Ik bouw graag complete onderzoekspijplijnen, van kwaliteitscontrole en feature engineering tot validatie, visualisatie en wetenschappelijke communicatie.";
      const principles = document.querySelectorAll("#about .principles article");
      const principleText = [
        ["Klinisch onderbouwd", "Onderzoeksvragen beginnen bij biologische en klinische relevantie."],
        ["Methodologisch zorgvuldig", "Validatie, sensitiviteitsanalyses en duidelijke beperkingen horen bij het resultaat."],
        ["Helder gecommuniceerd", "Complexe analyses moeten begrijpelijk bewijs opleveren, geen black box."]
      ];
      principles.forEach((article, index) => {
        const title = article.querySelector("h3");
        const body = article.querySelector("p");
        if (title) title.textContent = principleText[index][0];
        if (body) body.textContent = principleText[index][1];
      });

      setText("#research .section-heading .eyebrow", "Onderzoeksthema’s");
      setText("#research .section-heading h2", "Vragen die ik onderzoek");
      setText("#research .section-heading-wide > p", "Mijn projecten verbinden kwantitatieve neuroimaging met cognitie, psychiatrische behandeling, middelengebruik en individuele verschillen.");
      const researchCards = document.querySelectorAll("#research .research-card");
      const researchText = [
        ["Hersenleeftijd & individuele verschillen", "Evaluatie van meerdere hersenleeftijdsmodellen voor grijze en witte stof, en onderzoek naar de relatie tussen taalervaring en schijnbare hersenveroudering.", "<li>T1-MRI</li><li>DTI</li><li>Biascorrectie</li><li>Normatieve modellering</li>"],
        ["Longitudinale neuroimaging", "Onderzoek naar structurele hersenveranderingen vóór en na eerste XTC-blootstelling, inclusief regionale volumes, patronen in het hele brein, dosis en geheugen.", "<li>Longitudinale MRI</li><li>PCA</li><li>Gemengde modellen</li><li>RAVLT</li>"],
        ["Voorspelling in de psychiatrie", "Gebruik van vroege klinische en taak-fMRI-signalen om uitkomsten bij depressie te voorspellen, en structurele T1- en diffusie-MRI-kenmerken om respons op methylfenidaat bij ADHD te voorspellen.", "<li>fMRI</li><li>Structurele MRI</li><li>Radiomics</li><li>Machine learning</li><li>Depressie &amp; ADHD</li>"]
      ];
      researchCards.forEach((card, index) => {
        setText(`#research .research-card:nth-child(${index + 1}) h3`, researchText[index][0]);
        setText(`#research .research-card:nth-child(${index + 1}) p`, researchText[index][1]);
        setHtml(`#research .research-card:nth-child(${index + 1}) .tag-list`, researchText[index][2]);
      });

      setText("#work .section-heading .eyebrow", "Selectie van werk");
      setText("#work .section-heading h2", "Onderzoek over methoden en klinische vraagstukken heen.");
      document.querySelectorAll("#work .text-link").forEach((link) => {
        link.innerHTML = 'Bekijk DOI <span aria-hidden="true">↗</span>';
      });
      setText("#work .edit-note", "Bekijk Google Scholar of download mijn cv voor het volledige en meest actuele publicatieoverzicht.");
      const statusPills = document.querySelectorAll("#work .status-pill");
      ["Onder beoordeling", "In voorbereiding", "Wordt ingediend"].forEach((text, index) => {
        if (statusPills[index]) statusPills[index].textContent = text;
      });

      setText("#experience .section-heading .eyebrow", "Ervaring & vaardigheden");
      setHtml("#experience .section-heading h2", 'Van beelden<br class="mobile-title-break"> naar bewijs.');
      const timelineDates = document.querySelectorAll(".timeline-date");
      if (timelineDates[0]) timelineDates[0].textContent = "2022 — heden";
      const timelineArticles = document.querySelectorAll("#experience .timeline article");
      if (timelineArticles[0]) {
        timelineArticles[0].querySelector("h3").textContent = "Promovendus · Amsterdam UMC";
        timelineArticles[0].querySelector("p:last-child").textContent = "Neuroimaging, medische AI, psychiatrische beeldvorming, longitudinale modellering, wetenschappelijk schrijven en begeleiding van studenten.";
      }
      if (timelineArticles[1]) {
        timelineArticles[1].querySelector("h3").textContent = "Klinische geneeskunde, beeldvorming en nucleaire geneeskunde";
        timelineArticles[1].querySelector("p:last-child").textContent = "Opleiding klinische geneeskunde, gevolgd door een master in beeldvorming en nucleaire geneeskunde aan Sun Yat-sen University en SYSU Cancer Center.";
      }
      setText("#experience .toolkit > h3", "Geselecteerde methoden en tools");
      const toolGroupTitles = document.querySelectorAll("#experience .tool-groups > div > p");
      ["Beeldvorming", "Datawetenschap", "Analyse"].forEach((text, index) => {
        if (toolGroupTitles[index]) toolGroupTitles[index].textContent = text;
      });

      setText("#contact .eyebrow", "Contact");
      setText("#contact h2", "Laten we onderzoek, beeldvorming en klinische impact verbinden.");
      setText("#contact .contact-panel > div:first-child > p:last-child", "Ik ben geïnteresseerd in postdoctoraal onderzoek en medisch-AI-functies rond neuroimaging, modelvalidatie, klinische vertaling en multimodale data.");
      setText('#contact a[href^="mailto:"]', "E-mail mij");
      setText('#contact a[href="Mingshi_Chen_CV.pdf"]', "Download cv");
      setText(".site-footer a[href='#top']", "Terug naar boven ↑");
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
    if (predictionCard && !isDutchPage) {
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

    if (!document.querySelector("#headline-v11-fixes")) {
      const style = document.createElement("style");
      style.id = "headline-v11-fixes";
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

          .main-nav {
            align-items: flex-start !important;
            text-align: left !important;
          }

          .main-nav > a,
          .main-nav > button {
            align-self: flex-start !important;
            text-align: left !important;
          }

          .main-nav > a:not(.lang-switch) {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 0.65rem;
          }

          .main-nav > a:not(.lang-switch)::before {
            content: "•";
            color: var(--accent);
            font-size: 1.15em;
            line-height: 1;
            flex: 0 0 auto;
          }
        }
      `;
      document.head.appendChild(style);
    }
  });

  document.head.appendChild(coreScript);
})();
