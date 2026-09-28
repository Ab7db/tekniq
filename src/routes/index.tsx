import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Instagram, Smartphone, Globe, Cpu, LayoutDashboard, Database, ArrowLeft } from "lucide-react";

import cta from "@/assets/cta.jpg.asset.json";
import { ProjectsSection } from "@/components/ProjectsSection";
import { useMediaAssets, useSiteContent, useSiteSettings } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تكنيك Tekniq | حلول برمجية وتطبيقات ومواقع" },
      {
        name: "description",
        content:
          "تكنيق Tekniq شركة متخصصة في تطوير تطبيقات الجوال، تصميم وبرمجة المواقع، الأنظمة المخصصة، وتصميم واجهات وتجربة المستخدم.",
      },
      { property: "og:title", content: "تكنيك Tekniq | حلول برمجية وتطبيقات ومواقع" },
      {
        property: "og:description",
        content: "تكنيق Tekniq شركة متخصصة في تطوير تطبيقات الجوال، تصميم وبرمجة المواقع، الأنظمة المخصصة، وتصميم واجهات وتجربة المستخدم.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://id-preview--dd76b832-744c-47c5-a595-c53d9927af70.lovable.app" + cta.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://id-preview--dd76b832-744c-47c5-a595-c53d9927af70.lovable.app" + cta.url },
    ],
  }),
  component: Index,
});

const serviceIcons = [Smartphone, Globe, Cpu, LayoutDashboard, Database];

function Index() {
  const { t, tEn } = useSiteContent();
  const { img } = useMediaAssets();
  const { settings, logoUrl, whatsapp, instagram, instagramHandle } = useSiteSettings();

  const siteName = settings.site_name_ar || "تكنيك";
  const phone = settings.contact_phone || "776567738";
  const heroImg = img("hero_logo_3d");
  const aboutImg = img("about_img");
  const servicesImg = img("services_img");
  const stagesImg = img("stages_img");
  const whyImg = img("why_img");
  const uiuxImg = img("uiux_img");
  const ctaImg = img("cta_banner");

  const services = serviceIcons.map((Icon, i) => ({
    Icon,
    title: t(`service_${i + 1}_title`),
    en: tEn(`service_${i + 1}_title`),
    body: t(`service_${i + 1}_body`),
  }));
  const stages = [1, 2, 3].map((n) => ({ stage: `Stage ${n}`, title: t(`stage_${n}`) }));
  const whyList = [1, 2, 3, 4].map((n) => t(`why_${n}`));
  const aboutPoints = [1, 2, 3].map((n) => t(`about_point_${n}`));

  return (
    <div className="min-h-screen bg-background text-foreground circuit-bg">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img loading="lazy" decoding="async" src={logoUrl} alt={`شعار ${siteName}`} className="h-11 w-11 rounded-full object-cover" />
            <span className="text-lg font-bold tracking-tight">{siteName}</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#about">{t("nav_about")}</a>
            <a className="transition-colors hover:text-primary" href="#services">{t("nav_services")}</a>
            <a className="transition-colors hover:text-primary" href="#why">{t("nav_why")}</a>
            <a className="transition-colors hover:text-primary" href="#projects">{t("projects_heading")}</a>
            <a className="transition-colors hover:text-primary" href="#contact">{t("nav_contact")}</a>
          </nav>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-4 py-2 text-sm font-semibold">
            {t("nav_cta")}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-14 pb-20">
        <div className="glow-orb" aria-hidden />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-right">
              <span className="chip">{t("hero_chip")}</span>
              <h1 className="mt-5 text-4xl leading-tight font-extrabold sm:text-5xl md:text-6xl">
                {t("hero_headline")} <span className="text-gradient">{t("hero_headline_accent")}</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg whitespace-pre-line">
                {t("hero_subtext")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <MessageCircle className="size-4" /> {t("hero_cta_whatsapp")}
                </a>
                <a href={instagram} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Instagram className="size-4" /> <span dir="ltr">{instagramHandle}</span>
                </a>
              </div>
            </div>
            <div className="tilt-card mx-auto max-w-sm md:max-w-none">
              {heroImg.src ? <img loading="lazy" decoding="async" src={heroImg.src} alt={heroImg.alt} className="w-full rounded-3xl" loading="eager" /> : null}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="glass-panel overflow-hidden">
            {aboutImg.src ? <img loading="lazy" decoding="async" src={aboutImg.src} alt={aboutImg.alt} className="w-full" loading="lazy" /> : null}
          </div>
          <div>
            <h2 className="section-title">{t("about_title")}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground whitespace-pre-line">{t("about_description")}</p>
            <ul className="mt-6 space-y-3">
              {aboutPoints.filter(Boolean).map((pt) => (
                <li key={pt} className="feature-row">
                  <span className="dot" aria-hidden />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="section-title">{t("services_heading")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("services_subtext")}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, en, body }, i) => (
              <article key={i} className="service-card">
                <span className="icon-3d">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <span className="mt-1 block text-xs tracking-widest text-primary/80 uppercase">{en}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{body}</p>
              </article>
            ))}
            {servicesImg.src ? (
              <article className="glass-panel overflow-hidden p-0">
                <img loading="lazy" decoding="async" src={servicesImg.src} alt={servicesImg.alt} className="h-full w-full object-cover" loading="lazy" />
              </article>
            ) : null}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title">{t("stages_heading")}</h2>
            <ol className="mt-8 space-y-4">
              {stages.map(({ stage, title }, i) => (
                <li key={stage} className="stage-row">
                  <span className="stage-num">{i + 1}</span>
                  <div>
                    <span className="text-xs tracking-widest text-primary/80 uppercase">{stage}</span>
                    <p className="text-base font-bold">{title}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass-panel overflow-hidden">
            {stagesImg.src ? <img loading="lazy" decoding="async" src={stagesImg.src} alt={stagesImg.alt} className="w-full" loading="lazy" /> : null}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="glass-panel overflow-hidden">
            {whyImg.src ? <img loading="lazy" decoding="async" src={whyImg.src} alt={whyImg.alt} className="w-full" loading="lazy" /> : null}
          </div>
          <div>
            <h2 className="section-title">{t("why_heading")}</h2>
            <p className="mt-3 text-lg font-semibold">{t("why_subtitle")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyList.filter(Boolean).map((w) => (
                <div key={w} className="why-card">{w}</div>
              ))}
            </div>
            {uiuxImg.src ? (
              <div className="glass-panel mt-6 overflow-hidden">
                <img loading="lazy" decoding="async" src={uiuxImg.src} alt={uiuxImg.alt} className="w-full" loading="lazy" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* Contact */}
      <section id="contact" className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70">
            <img loading="lazy" decoding="async" src={ctaImg.src || cta.url} alt={ctaImg.alt} className="h-full w-full object-cover" loading="lazy" />
            <div className="cta-overlay">
              <h2 className="text-2xl font-extrabold sm:text-4xl">{t("contact_heading")}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("contact_subtext")}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <MessageCircle className="size-4" /> {t("contact_whatsapp_label")} <span dir="ltr">{phone}</span>
                </a>
                <a href={instagram} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Instagram className="size-4" /> {t("contact_instagram_label")} <span dir="ltr">{instagramHandle}</span>
                </a>
              </div>
              {settings.contact_email ? (
                <a href={`mailto:${settings.contact_email}`} dir="ltr" className="mt-4 block text-sm text-muted-foreground hover:text-primary">
                  {settings.contact_email}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <img loading="lazy" decoding="async" src={logoUrl} alt={`شعار ${siteName}`} className="h-9 w-9 rounded-full object-cover" />
            <span>© {new Date().getFullYear()} {t("footer_copyright")}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={whatsapp} target="_blank" rel="noreferrer" dir="ltr" className="transition-colors hover:text-primary">{phone}</a>
            <a href={instagram} target="_blank" rel="noreferrer" dir="ltr" className="transition-colors hover:text-primary">{instagramHandle}</a>
            <Link to="/auth" className="transition-colors hover:text-primary">{t("footer_admin_label")}</Link>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
        <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل واتساب" className="fab fab-wa">
          <MessageCircle className="size-6" />
        </a>
        <a href={instagram} target="_blank" rel="noreferrer" aria-label="إنستقرام" className="fab fab-ig">
          <Instagram className="size-6" />
        </a>
      </div>
      <ArrowLeft className="hidden" aria-hidden />
    </div>
  );
}
