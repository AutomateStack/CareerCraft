import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyProject = {
  title: '',
  description: '',
  techStack: '',
  liveLink: '',
  githubLink: '',
};

export default function Projects() {
  const { resume, addEntry, updateEntry, removeEntry } = useResume();

  const handleAdd = () => {
    addEntry('projects', { ...emptyProject, id: Date.now() });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {resume.projects.map((proj, idx) => (
          <motion.div
            key={proj.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-muted cursor-grab" />
                <span className="text-xs font-medium text-muted">Project {idx + 1}</span>
              </div>
              <button
                onClick={() => removeEntry('projects', idx)}
                className="text-muted hover:text-red-400 transition-colors p-1"
                aria-label="Remove project"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="label">Project Title</label>
                <input
                  value={proj.title}
                  onChange={(e) => updateEntry('projects', idx, { title: e.target.value })}
                  placeholder="E-Commerce Platform"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateEntry('projects', idx, { description: e.target.value })}
                  placeholder="Built a full-stack e-commerce platform with..."
                  rows={2}
                  className="input-field resize-none text-xs"
                />
              </div>
              <div>
                <label className="label">Tech Stack</label>
                <input
                  value={proj.techStack}
                  onChange={(e) => updateEntry('projects', idx, { techStack: e.target.value })}
                  placeholder="React, Node.js, MongoDB, Stripe"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label flex items-center gap-1">
                    <ExternalLink size={11} /> Live Link
                  </label>
                  <input
                    value={proj.liveLink}
                    onChange={(e) => updateEntry('projects', idx, { liveLink: e.target.value })}
                    placeholder="https://myproject.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">GitHub Link</label>
                  <input
                    value={proj.githubLink}
                    onChange={(e) => updateEntry('projects', idx, { githubLink: e.target.value })}
                    placeholder="github.com/user/project"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={handleAdd} className="btn-secondary text-xs py-2 px-3 w-full justify-center">
        <Plus size={14} /> Add Project
      </button>
    </div>
  );
}
