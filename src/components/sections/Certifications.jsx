import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyCert = {
  name: '',
  issuer: '',
  year: '',
};

export default function Certifications() {
  const { resume, addEntry, updateEntry, removeEntry } = useResume();

  const handleAdd = () => {
    addEntry('certifications', { ...emptyCert, id: Date.now() });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {resume.certifications.map((cert, idx) => (
          <motion.div
            key={cert.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-muted cursor-grab" />
                <span className="text-xs font-medium text-muted">Certificate {idx + 1}</span>
              </div>
              <button
                onClick={() => removeEntry('certifications', idx)}
                className="text-muted hover:text-red-400 transition-colors p-1"
                aria-label="Remove certification"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label">Certification Name</label>
                <input
                  value={cert.name}
                  onChange={(e) => updateEntry('certifications', idx, { name: e.target.value })}
                  placeholder="AWS Solutions Architect"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Issuing Organization</label>
                  <input
                    value={cert.issuer}
                    onChange={(e) => updateEntry('certifications', idx, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Year</label>
                  <input
                    value={cert.year}
                    onChange={(e) => updateEntry('certifications', idx, { year: e.target.value })}
                    placeholder="2024"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={handleAdd} className="btn-secondary text-xs py-2 px-3 w-full justify-center">
        <Plus size={14} /> Add Certification
      </button>
    </div>
  );
}
