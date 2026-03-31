import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyEducation = {
  degree: '',
  institution: '',
  year: '',
  gpa: '',
};

export default function Education() {
  const { resume, addEntry, updateEntry, removeEntry } = useResume();

  const handleAdd = () => {
    addEntry('education', { ...emptyEducation, id: Date.now() });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {resume.education.map((edu, idx) => (
          <motion.div
            key={edu.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-muted cursor-grab" />
                <span className="text-xs font-medium text-muted">Education {idx + 1}</span>
              </div>
              <button
                onClick={() => removeEntry('education', idx)}
                className="text-muted hover:text-red-400 transition-colors p-1"
                aria-label="Remove education"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="label">Degree / Field of Study</label>
                <input
                  value={edu.degree}
                  onChange={(e) => updateEntry('education', idx, { degree: e.target.value })}
                  placeholder="B.S. Computer Science"
                  className="input-field"
                />
              </div>
              <div className="col-span-2">
                <label className="label">Institution</label>
                <input
                  value={edu.institution}
                  onChange={(e) => updateEntry('education', idx, { institution: e.target.value })}
                  placeholder="Stanford University"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Year</label>
                <input
                  value={edu.year}
                  onChange={(e) => updateEntry('education', idx, { year: e.target.value })}
                  placeholder="2020 - 2024"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">GPA (optional)</label>
                <input
                  value={edu.gpa}
                  onChange={(e) => updateEntry('education', idx, { gpa: e.target.value })}
                  placeholder="3.8 / 4.0"
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={handleAdd} className="btn-secondary text-xs py-2 px-3 w-full justify-center">
        <Plus size={14} /> Add Education
      </button>
    </div>
  );
}
