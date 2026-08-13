import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, Plus, Trash2, Upload, Eye, EyeOff, ShieldAlert } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { PROJECT_BUCKET, fetchAllProjects, signImageUrls, type Project } from "@/lib/projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة إدارة المشاريع | تكنيك Tekniq" },
      { name: "description", content: "لوحة خاصة لإضافة وتعديل مشاريع تكنيك مع الصور والمحتوى." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة إدارة المشاريع | تكنيك Tekniq" },
      { property: "og:description", content: "لوحة خاصة لإضافة وتعديل مشاريع تكنيك مع الصور والمحتوى." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    try {
      const rows = await fetchAllProjects();
      setProjects(rows);
      setUrls(await signImageUrls(rows));
    } catch (err) {
      console.error(err);
      setError("تعذر تحميل المشاريع.");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(data.session.user.email ?? null);
      const { data: claimed } = await supabase.rpc("claim_admin");
      setIsAdmin(claimed === true);
      if (claimed === true) await load();
      setChecking(false);
    })();
  }, [navigate, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      let imagePath: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from(PROJECT_BUCKET).upload(path, file);
        if (upErr) throw upErr;
        imagePath = path;
      }
      const { error: insErr } = await supabase.from("projects").insert({
        title,
        description,
        link_url: linkUrl || null,
        sort_order: sortOrder,
        image_path: imagePath,
      });
      if (insErr) throw insErr;

      setTitle("");
      setDescription("");
      setLinkUrl("");
      setSortOrder(0);
      setFile(null);
      await load();
    } catch (err) {
      console.error(err);
      setError("تعذر حفظ المشروع، حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (p: Project) => {
    await supabase.from("projects").update({ published: !p.published }).eq("id", p.id);
    await load();
  };

  const remove = async (p: Project) => {
    if (!window.confirm(`حذف المشروع "${p.title}"؟`)) return;
    if (p.image_path) await supabase.storage.from(PROJECT_BUCKET).remove([p.image_path]);
    await supabase.from("projects").delete().eq("id", p.id);
    await load();
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="circuit-bg flex min-h-screen items-center justify-center px-5">
        <div className="glass-panel max-w-md p-7 text-center">
          <div className="icon-3d mx-auto mb-4"><ShieldAlert className="size-5" /></div>
          <h1 className="section-title !text-2xl">هذه اللوحة خاصة بالمشرف</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            الحساب <span dir="ltr">{email}</span> لا يملك صلاحية الإدارة.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={signOut} className="btn-outline rounded-full px-5 py-2.5 text-sm font-semibold">تسجيل الخروج</button>
            <Link to="/" className="btn-glow rounded-full px-5 py-2.5 text-sm font-semibold">الموقع</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="circuit-bg min-h-screen px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title !text-2xl">لوحة إدارة المشاريع</h1>
            <p className="mt-1 text-sm text-muted-foreground" dir="ltr">{email}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn-outline rounded-full px-4 py-2 text-sm font-semibold">الموقع</Link>
            <button onClick={signOut} className="btn-outline flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
              <LogOut className="size-4" /> خروج
            </button>
          </div>
        </header>

        {error ? <p className="mt-6 text-sm font-semibold text-destructive">{error}</p> : null}

        <form onSubmit={addProject} className="glass-panel mt-8 space-y-4 p-6">
          <h2 className="text-lg font-extrabold text-primary">إضافة مشروع جديد</h2>

          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="title">اسم المشروع</label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="desc">المحتوى / الوصف</label>
            <textarea
              id="desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="link">رابط المشروع (اختياري)</label>
              <input
                id="link"
                dir="ltr"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="order">ترتيب العرض</label>
              <input
                id="order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="image">صورة المشروع</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-glow gap-2 rounded-full px-6 py-3 text-sm font-bold disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            حفظ المشروع
          </button>
        </form>

        <section className="mt-10">
          <h2 className="text-lg font-extrabold text-primary">المشاريع ({projects.length})</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <article key={p.id} className="service-card overflow-hidden !p-0">
                {p.image_path && urls[p.image_path] ? (
                  <img src={urls[p.image_path]} alt={p.title} className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted text-muted-foreground">
                    <Upload className="size-6" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-extrabold text-primary">{p.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => togglePublished(p)}
                      className="btn-outline flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                    >
                      {p.published ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                      {p.published ? "منشور" : "مخفي"}
                    </button>
                    <button
                      onClick={() => remove(p)}
                      className="flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-xs font-semibold text-destructive"
                    >
                      <Trash2 className="size-4" /> حذف
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {projects.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">لا توجد مشاريع بعد — أضف أول مشروع من الأعلى.</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
