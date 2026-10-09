import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Download, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectRow({ title, items, onOpen }: { title: string; items: Project[]; onOpen: (p: Project) => void }) {
  if (!items.length) return null;
  return (
    <div className="mb-8">
      <h3 className="mb-3 px-6 text-xl font-bold md:px-14">{title}</h3>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-6 pb-4 md:px-14">
        {items.map((p) => (
          <motion.button
            key={p.id}
            whileHover={{ scale: 1.06 }}
            onClick={() => onOpen(p)}
            className="group relative flex h-40 w-72 shrink-0 flex-col justify-end overflow-hidden rounded-md bg-card p-4 text-left ring-primary hover:ring-2"
          >
            <span className="absolute right-3 top-3 max-w-[85%] truncate rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 font-display text-sm tracking-widest text-primary/80">{p.tool.toUpperCase()}</span>
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.category}</span>
            <span className="font-bold leading-tight">{p.title}</span>
            <span className="mt-1 line-clamp-1 text-xs text-muted-foreground">{p.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-label={project.title}
            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-md bg-popover p-8 shadow-glow"
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-secondary p-2 hover:bg-accent"><X size={18} /></button>
            <p className="text-sm uppercase tracking-widest text-primary">{project.tool}{project.date && ` · ${project.date}`}</p>
            <h3 className="mt-1 font-display text-4xl">{project.title}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {project.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => <span key={t} className="rounded-sm bg-secondary px-2 py-1 text-xs">{t}</span>)}
            </div>
            <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-bold text-primary-foreground hover:shadow-glow">
              {project.linkType === "repo" ? <><ExternalLink size={18} />View Repository</> : <><Download size={18} />Download Project Files (ZIP)</>}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
