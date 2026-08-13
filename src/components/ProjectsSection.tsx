import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import { fetchPublishedProjects, signImageUrls, type Project } from "@/lib/projects";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const rows = await fetchPublishedProjects();
        if (!active) return;
        setProjects(rows);
        const signed = await signImageUrls(rows);
        if (active) setUrls(signed);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <span className="chip">أعمالنا</span>
        <h2 className="section-title mt-4">مشاريعنا</h2>
        <p className="mt-3 text-muted-foreground">نماذج من المشاريع التي نفذناها لعملائنا.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.id} className="service-card overflow-hidden !p-0">
              {p.image_path && urls[p.image_path] ? (
                <img
                  src={urls[p.image_path]}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h3 className="text-lg font-extrabold text-primary">{p.title}</h3>
                {p.description ? (
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                ) : null}
                {p.link_url ? (
                  <a
                    href={p.link_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    زيارة المشروع <ExternalLink className="size-4" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
