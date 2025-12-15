import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import BoardColumn from "./components/BoardColumn";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import GlowCard from "./components/GlowCard";

import GridScanBG from "./components/backgrounds/GridScanBG";

import useLocalStorage from "./hooks/useLocalStorage";
import { seedTasks } from "./data/seed";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function uid() {
  return "t_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const COLS = ["backlog", "doing", "done"];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("study-tracker.tasks", seedTasks);

  const projects = Array.from(new Set(tasks.map((t) => t.project))).sort();

  const [q, setQ] = useLocalStorage("study-tracker.q", "");
  const [project, setProject] = useLocalStorage("study-tracker.project", "ALL");

  // filter by search + project
  const filtered = tasks.filter((t) => {
    const matchQ = (t.title + " " + t.project).toLowerCase().includes(q.toLowerCase());
    const matchProject = project === "ALL" ? true : t.project === project;
    return matchQ && matchProject;
  });

  // sorting: deadline terdekat di atas, tanpa deadline di bawah, tie-breaker priority
  const byStatus = (status) =>
    filtered
      .filter((t) => t.status === status)
      .sort((a, b) => {
        const da = a.due ? new Date(a.due).getTime() : Infinity;
        const db = b.due ? new Date(b.due).getTime() : Infinity;

        if (da !== db) return da - db;

        const p = { High: 0, Med: 1, Low: 2 };
        return (p[a.priority] ?? 9) - (p[b.priority] ?? 9);
      });

  function addTask(partial) {
    const next = {
      id: uid(),
      createdAt: Date.now(),
      ...partial,
    };
    setTasks((prev) => [next, ...prev]);
  }

  function moveTask(id, status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, updates) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }

  // DnD: reorder dalam kolom + pindah kolom (drop ke area kolom)
  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // ✅ CASE A: drop ke AREA KOLOM (overId adalah id kolom)
    if (COLS.includes(overId)) {
      const targetStatus = overId;

      setTasks((prev) => {
        // update status
        const updated = prev.map((t) =>
          t.id === activeId ? { ...t, status: targetStatus } : t
        );

        // taruh task yang dipindah ke paling bawah kolom target
        const movedTask = updated.find((t) => t.id === activeId);
        if (!movedTask) return prev;

        const others = updated.filter((t) => t.id !== activeId);

        const outside = others.filter((t) => t.status !== targetStatus);
        const inside = others.filter((t) => t.status === targetStatus);

        return [...outside, ...inside, movedTask];
      });

      return;
    }

    // ✅ CASE B: drop ke CARD lain (overId adalah id task)
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    // reorder dalam kolom yang sama
    if (activeTask.status === overTask.status) {
      const status = activeTask.status;

      const items = tasks.filter((t) => t.status === status);
      const oldIndex = items.findIndex((t) => t.id === activeId);
      const newIndex = items.findIndex((t) => t.id === overId);

      if (oldIndex === -1 || newIndex === -1) return;

      const moved = arrayMove(items, oldIndex, newIndex);

      setTasks((prev) => {
        const others = prev.filter((t) => t.status !== status);
        return [...others, ...moved];
      });
      return;
    }

    // pindah kolom via drop ke card kolom lain
    moveTask(activeId, overTask.status);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BACKGROUND (GridScan) */}
      <GridScanBG />
      

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl p-5">
        <Header />

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <GlowCard className="p-4" blobSize={260} intensity={0.26}>
              <TaskForm onAdd={addTask} projects={projects.length ? projects : ["Umum"]} />
            </GlowCard>
          </div>

          <GlowCard className="p-4" blobSize={220} intensity={0.20}>
            <Stats tasks={tasks} />
          </GlowCard>
        </div>

        <div className="mt-3">
          <GlowCard className="p-3" blobSize={220} intensity={0.18}>
            <Filters
              q={q}
              setQ={setQ}
              project={project}
              setProject={setProject}
              projects={projects}
            />
          </GlowCard>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          measuring={{ droppable: { strategy: "Always" } }}
        >
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <BoardColumn
              id="backlog"
              title="Backlog"
              tasks={byStatus("backlog")}
              onMove={moveTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
            <BoardColumn
              id="doing"
              title="In Progress"
              tasks={byStatus("doing")}
              onMove={moveTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
            <BoardColumn
              id="done"
              title="Done"
              tasks={byStatus("done")}
              onMove={moveTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </div>
        </DndContext>

        <div className="mt-6 text-xs text-slate-200">
          Data tersimpan otomatis di browser (localStorage).
        </div>
      </div>
    </div>
  );
}