type Role = "student" | "teacher" | "parent" | "admin";

const ROLE_DOT: Record<Role, string> = {
  student: "bg-mint-500",
  teacher: "bg-sky-500",
  parent: "bg-lavender-500",
  admin: "bg-sun-500",
};

const ROLE_LABEL: Record<Role, string> = {
  student: "학생",
  teacher: "교원",
  parent: "학부모",
  admin: "관리자",
};

interface KPI {
  v: string | number;
  l: string;
}

interface FunBadge {
  id: string;
}

export default function RolePageHeader({
  role,
  title,
  subtitle,
  kpis,
  funBadges,
  actions,
}: {
  role: Role;
  title: string;
  subtitle?: string;
  kpis?: KPI[];
  funBadges?: FunBadge[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5 md:p-6 lg:p-7 mb-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-ink-700 px-2 py-0.5 rounded-full bg-paper-grey border border-ink-100">
              <span className={`w-1.5 h-1.5 rounded-full ${ROLE_DOT[role]}`} />
              {ROLE_LABEL[role].toUpperCase()}
            </span>
            {funBadges?.map((b) => (
              <span
                key={b.id}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-500 px-1.5 py-0.5 rounded border border-ink-100 bg-white"
              >
                <span className="w-1 h-1 rounded-full bg-mint-500" />
                {b.id}
              </span>
            ))}
          </div>
          <h1 className="text-xl md:text-2xl lg:text-[1.75rem] font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-ink-600 mt-1.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>

      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-ink-100">
          {kpis.map((k) => (
            <div key={k.l}>
              <div className="text-2xl font-bold text-ink-900 tabular-nums tracking-tight">{k.v}</div>
              <div className="text-[11px] text-ink-600 mt-1 font-medium">{k.l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
