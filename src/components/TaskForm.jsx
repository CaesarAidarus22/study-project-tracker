import { useMemo, useState } from "react";

export default function TaskForm({ onAdd, projects }) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState(projects?.[0] ?? "Umum");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Med");

  const canSubmit = useMemo(() => title.trim().length >= 3, [title]);

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    onAdd({
      title: title.trim(),
      project: project.trim() || "Umum",
      due,
      priority,
      status: "backlog",
    });

    setTitle("");
    setDue("");
    setPriority("Med");
  }

  return (
    <form onSubmit={submit}>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-xs text-slate-200">Judul task</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Revisi BAB 1 laporan"
            className="input mt-1"
          />
        </div>

        <div>
          <label className="text-xs text-slate-200">Project / MK</label>
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            list="project-list"
            className="input mt-1"
          />
          <datalist id="project-list">
            {projects.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="text-xs text-slate-200">Deadline</label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="input mt-1"
          />
        </div>

        <div>
          <label className="text-xs text-slate-200">Prioritas</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input mt-1"
          >
            <option>Low</option>
            <option>Med</option>
            <option>High</option>
          </select>
        </div>

        <div className="md:col-span-3" />
        <button type="submit" disabled={!canSubmit} className="btn-primary disabled:opacity-40">
          Tambah Task
        </button>
      </div>
    </form>
  );
}