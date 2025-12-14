export default function Filters({ q, setQ, project, setProject, projects }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search judul / project…"
        className="input w-64"
      />

      <select
        value={project}
        onChange={(e) => setProject(e.target.value)}
        className="input w-56"
      >
        <option value="ALL">Semua Project</option>
        {projects.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="ml-auto hidden sm:block text-xs text-slate-200">
        Tip: ketik nama MK di field Project/MK untuk nambah MK baru.
      </div>
    </div>
  );
}