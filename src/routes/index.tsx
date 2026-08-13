import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Instagram, Smartphone, Globe, Cpu, LayoutDashboard, Database, ArrowLeft } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";
import about from "@/assets/about.png.asset.json";
import services from "@/assets/services.png.asset.json";
import stages from "@/assets/stages.png.asset.json";
import uiux from "@/assets/uiux.png.asset.json";
import why from "@/assets/why.png.asset.json";
import cta from "@/assets/cta.jpg.asset.json";

const WHATSAPP = "https://wa.me/967776567738";
const INSTAGRAM = "https://instagram.com/tekniq";

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

const serviceList = [
  {
    icon: Smartphone,
    title: "تطوير تطبيقات الجوال",
    en: "Mobile Apps",
    body: "نصمم ونبرمج تطبيقات ذكية وسريعة لنظامي iOS و Android بأحدث التقنيات لضمان أداء سلس وتجربة مستخدم لا تُنسى.",
  },
  {
    icon: Globe,
    title: "تصميم وبرمجة المواقع والمنصات",
    en: "Web Development",
    body: "موقع تعريفي، متجر إلكتروني، أو منصة سحابية معقدة — نضمن لك موقعاً متجاوباً مع جميع الشاشات وسريع التحميل.",
  },
  {
    icon: Cpu,
    title: "الأنظمة والحلول البرمجية المخصصة",
    en: "Custom Software",
    body: "نحل مشكلات أعمالك البرمجية ونساعدك على أتمتة عملياتك اليومية بأنظمة مخصصة تناسب حجم ونشاط مؤسستك.",
  },
  {
    icon: LayoutDashboard,
    title: "تصميم واجهات وتجربة المستخدم",
    en: "UI / UX Design",
    body: "واجهات عصرية جذابة وبسيطة تضمن وصول زوار مشروعك للخدمة المطلوبة بكل سهولة وفاعلية.",
  },
  {
    icon: Database,
    title: "إدارة وقواعد البيانات",
    en: "Database & Backend",
    body: "بنية تحتية برمجية صلبة وآمنة لضمان حماية بياناتك وسرعة معالجتها واستدعائها في أي وقت.",
  },
];

const stageList = [
  { stage: "Stage 1", title: "الفكرة العادية" },
  { stage: "Stage 2", title: "تكنيك متقن" },
  { stage: "Stage 3", title: "واقع رقمي قوي ومستدام" },
];

const whyList = [
  "ندرس مشروعاتكم بعناية",
  "أداء سريع",
  "تجربة مستخدم سلسة",
  "نمو وتميز الأعمال",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground circuit-bg">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="شعار شركة تكنيك Tekniq" className="h-11 w-11 rounded-full object-cover" />
            <span className="text-lg font-bold tracking-tight">تكنيك</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-primary" href="#about">من نحن</a>
            <a className="transition-colors hover:text-primary" href="#services">خدماتنا</a>
            <a className="transition-colors hover:text-primary" href="#why">لماذا تكنيك</a>
            <a className="transition-colors hover:text-primary" href="#contact">تواصل</a>
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-4 py-2 text-sm font-semibold">
            ابدأ مشروعك
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-14 pb-20">
        <div className="glow-orb" aria-hidden />
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-right">
              <span className="chip">حيث تبدأ أفكارك الرقمية</span>
              <h1 className="mt-5 text-4xl leading-tight font-extrabold sm:text-5xl md:text-6xl">
                لنصنع <span className="text-gradient">واقعك الرقمي.</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                في عالم يتحرك بسرعة التقنية، لا تكفي الفكرة العادية. نحن شركة متخصصة في تقديم الحلول البرمجية
                وتطوير تطبيقات الجوال والمواقع الإلكترونية.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <MessageCircle className="size-4" /> تواصل معنا واتساب
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Instagram className="size-4" /> <span dir="ltr">@tekniq</span>
                </a>
              </div>
            </div>
            <div className="tilt-card mx-auto max-w-sm md:max-w-none">
              <img src={logo.url} alt="هوية تكنيك Tekniq ثلاثية الأبعاد" className="w-full rounded-3xl" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="glass-panel overflow-hidden">
            <img src={about.url} alt="عرض ثلاثي الأبعاد يوضح تصميم وأمان وجودة حلول تكنيك" className="w-full" loading="lazy" />
          </div>
          <div>
            <h2 className="section-title">من نحن؟</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              نحن شركة متخصصة في تقديم الحلول البرمجية وتطوير تطبيقات الجوال والمواقع الإلكترونية، نجمع بين
              التصميم العصري والمهارة التقنية العالية.
            </p>
            <ul className="mt-6 space-y-3">
              {["التصميم العصري", "حلول تُبنى بأعلى معايير الجودة والأمان", "المهارة التقنية العالية"].map((t) => (
                <li key={t} className="feature-row">
                  <span className="dot" aria-hidden />
                  {t}
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
            <h2 className="section-title">ماذا نقدم لك؟</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              نصنع لك حلولاً رقمية تتكيف مع تطلعاتك.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map(({ icon: Icon, title, en, body }) => (
              <article key={title} className="service-card">
                <span className="icon-3d">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <span className="mt-1 block text-xs tracking-widest text-primary/80 uppercase">{en}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
            <article className="glass-panel overflow-hidden p-0">
              <img src={services.url} alt="رسم ثلاثي الأبعاد لخدمات تكنيك البرمجية" className="h-full w-full object-cover" loading="lazy" />
            </article>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title">في عالم يتحرك بسرعة التقنية، لا تكفي الفكرة العادية.</h2>
            <ol className="mt-8 space-y-4">
              {stageList.map(({ stage, title }, i) => (
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
            <img src={stages.url} alt="مراحل تحويل الفكرة إلى واقع رقمي" className="w-full" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="glass-panel overflow-hidden">
            <img src={why.url} alt="لماذا تكنيك: أداء سريع ونمو للأعمال" className="w-full" loading="lazy" />
          </div>
          <div>
            <h2 className="section-title">لماذا Tekniq؟</h2>
            <p className="mt-3 text-lg font-semibold">لأننا لا نكتفي بكتابة الأكواد.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyList.map((t) => (
                <div key={t} className="why-card">{t}</div>
              ))}
            </div>
            <div className="glass-panel mt-6 overflow-hidden">
              <img src={uiux.url} alt="تصميم واجهات وتجربة المستخدم UI UX" className="w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* Contact */}

      <section id="contact" className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70">
            <img src={cta.url} alt="تكنيك Tekniq — لنصنع واقعك الرقمي" className="h-full w-full object-cover" loading="lazy" />
            <div className="cta-overlay">
              <h2 className="text-2xl font-extrabold sm:text-4xl">لنصنع واقعك الرقمي.</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">تواصل معنا لبدء مشروعك</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-glow flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <MessageCircle className="size-4" /> واتساب <span dir="ltr">776567738</span>
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                  <Instagram className="size-4" /> إنستقرام <span dir="ltr">@tekniq</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="شعار تكنيك" className="h-9 w-9 rounded-full object-cover" />
            <span>© {new Date().getFullYear()} تكنيك Tekniq</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">776567738</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" dir="ltr" className="transition-colors hover:text-primary">@tekniq</a>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="تواصل واتساب" className="fab fab-wa">
          <MessageCircle className="size-6" />
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="إنستقرام تكنيك" className="fab fab-ig">
          <Instagram className="size-6" />
        </a>
      </div>
      <ArrowLeft className="hidden" aria-hidden />
    </div>
  );
}
