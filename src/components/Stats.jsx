export default function Stats({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const doing = tasks.filter((t) => t.status === "doing").length;
  const backlog = tasks.filter((t) => t.status === "backlog").length;

  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-slate-200">Progress</div>
          <div className="text-3xl font-semibold text-white">{pct}%</div>
        </div>

        <div className="text-xs text-slate-200 text-right">
          <div>Total: {total}</div>
          <div>Backlog: {backlog}</div>
          <div>Doing: {doing}</div>
          <div>Done: {done}</div>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-indigo-400/80 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}