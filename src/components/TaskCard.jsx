import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

function badge(priority) {
  if (priority === "High") return "bg-red-600/20 text-red-300 border border-red-600/30";
  if (priority === "Med") return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
}

function daysDiff(due) {
  if (!due) return null;
  const today = new Date();
  const d = new Date(due);
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - today) / (1000 * 60 * 60 * 24));
}

function dueStyle(diff) {
  if (diff === null) return "text-slate-300";
  if (diff < 0) return "text-red-300 font-semibold";
  if (diff <= 2) return "text-amber-300 font-semibold";
  return "text-slate-300";
}

function dueLabel(diff) {
  if (diff === null) return "—";
  if (diff < 0) return `Overdue ${Math.abs(diff)} hari`;
  if (diff === 0) return "Hari ini";
  return `${diff} hari lagi`;
}

function formatDue(due) {
  if (!due) return "—";
  return new Date(due).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TaskCard({ task, onMove, onDelete, onEdit }) {
  const diff = daysDiff(task.due);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [project, setProject] = useState(task.project);
  const [due, setDue] = useState(task.due || "");
  const [priority, setPriority] = useState(task.priority);

  function saveEdit() {
    onEdit(task.id, { title, project, due, priority });
    setIsEdit(false);
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3 shadow-lg ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      {/* Top bar: drag + priority */}
      <div className="mb-2 flex items-center justify-between">
        <div
          className="cursor-grab select-none text-xs text-slate-300"
          {...attributes}
          {...listeners}
          title="Drag"
        >
          ⠿ Drag
        </div>

        <span className={`rounded-full border px-2 py-1 text-xs ${badge(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {!isEdit ? (
        <>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-100">{task.title}</div>
            <div className="mt-1 text-xs">
              <span className="text-slate-300">{task.project} • </span>
              <span className={dueStyle(diff)}>
                Deadline: {formatDue(task.due)} ({dueLabel(diff)})
              </span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {task.status !== "backlog" && (
              <button onClick={() => onMove(task.id, "backlog")} className="btn">
                ⬅ Backlog
              </button>
            )}
            {task.status !== "doing" && (
              <button onClick={() => onMove(task.id, "doing")} className="btn">
                ▶ Doing
              </button>
            )}
            {task.status !== "done" && (
              <button onClick={() => onMove(task.id, "done")} className="btn">
                ✅ Done
              </button>
            )}

            <button onClick={() => setIsEdit(true)} className="btn">
              ✏️ Edit
            </button>

            <button onClick={() => onDelete(task.id)} className="btn ml-auto">
              Hapus
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
            <input value={project} onChange={(e) => setProject(e.target.value)} className="input" />
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="input" />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input">
              <option>Low</option>
              <option>Med</option>
              <option>High</option>
            </select>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={saveEdit} className="btn-primary">
              Simpan
            </button>
            <button onClick={() => setIsEdit(false)} className="btn">
              Batal
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}