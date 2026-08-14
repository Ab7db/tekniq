import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, Users, CalendarDays, TrendingUp } from "lucide-react";

import { buildStats, type PageView } from "@/lib/analytics";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--ring))",
  "hsl(var(--secondary))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--destructive))",
];

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="glass-panel flex items-center gap-4 p-5">
      <div className="icon-3d">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="text-2xl font-extrabold text-primary" dir="ltr">
          {value.toLocaleString("ar")}
        </p>
      </div>
    </div>
  );
}

const axisProps = {
  stroke: "hsl(var(--muted-foreground))",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 12,
    fontSize: 12,
    direction: "rtl" as const,
  },
} as const;

export function StatsDashboard({ views }: { views: PageView[] }) {
  const stats = useMemo(() => buildStats(views, 30), [views]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Eye className="size-5" />} label="إجمالي الزيارات (30 يوم)" value={stats.total} />
        <StatCard icon={<Users className="size-5" />} label="عدد الزوار (جلسات)" value={stats.sessions} />
        <StatCard icon={<CalendarDays className="size-5" />} label="زيارات اليوم" value={stats.today} />
        <StatCard icon={<TrendingUp className="size-5" />} label="آخر 7 أيام" value={stats.last7} />
      </div>

      <div className="glass-panel p-5">
        <h3 className="mb-4 text-sm font-extrabold text-primary">الزيارات اليومية</h3>
        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.daily}>
              <defs>
                <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="views"
                name="زيارات"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#viewsFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-5">
          <h3 className="mb-4 text-sm font-extrabold text-primary">الزوار مقابل الزيارات</h3>
          <div className="h-60 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="views" name="زيارات" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sessions" name="زوار" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="mb-4 text-sm font-extrabold text-primary">مصادر الزيارات</h3>
          <div className="h-60 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.sources} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {stats.sources.map((entry, i) => (
                    <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, direction: "rtl" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="mb-4 text-sm font-extrabold text-primary">أكثر الصفحات زيارة</h3>
          <div className="h-60 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.pages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" {...axisProps} allowDecimals={false} />
                <YAxis type="category" dataKey="path" width={90} {...axisProps} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="views" name="زيارات" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="mb-4 text-sm font-extrabold text-primary">التوزيع حسب ساعات اليوم</h3>
          <div className="h-60 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.hours}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="hour" {...axisProps} interval={2} />
                <YAxis {...axisProps} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="views" name="زيارات" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
