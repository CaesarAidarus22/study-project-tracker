import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import GlowCard from "./GlowCard";

export default function BoardColumn({ id, title, tasks, onMove, onDelete, onEdit }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <GlowCard className="p-3" blobSize={200} intensity={0.22}>
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-slate-200">
            {tasks.length}
          </span>
        </div>

        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div
            ref={setNodeRef}
            className={`grid gap-2 min-h-[140px] rounded-xl p-2 border border-dashed transition ${
              isOver ? "bg-white/10 border-indigo-400 ring-2 ring-indigo-400/30" : "border-white/10"
            }`}
          >
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} onMove={onMove} onDelete={onDelete} onEdit={onEdit} />
            ))}

            {tasks.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                Drop task di sini ✨
              </div>
            )}
          </div>
        </SortableContext>
      </GlowCard>
    </motion.div>
  );
}