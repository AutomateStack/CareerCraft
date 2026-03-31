import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Sparkles, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyExperience = {
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  bullets: [''],
};

export default function WorkExperience() {
  const { resume, addEntry, updateEntry, removeEntry, reorderEntries } = useResume();
  const [enhancingIdx, setEnhancingIdx] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);

  const handleAdd = () => {
    addEntry('experience', { ...emptyExperience, id: Date.now() });
  };

  const handleBulletChange = (expIdx, bulletIdx, value) => {
    const newBullets = [...resume.experience[expIdx].bullets];
    newBullets[bulletIdx] = value;
    updateEntry('experience', expIdx, { bullets: newBullets });
  };

  const addBullet = (expIdx) => {
    const newBullets = [...resume.experience[expIdx].bullets, ''];
    updateEntry('experience', expIdx, { bullets: newBullets });
  };

  const removeBullet = (expIdx, bulletIdx) => {
    const newBullets = resume.experience[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    updateEntry('experience', expIdx, { bullets: newBullets.length ? newBullets : [''] });
  };

  const enhanceBullet = async (expIdx, bulletIdx) => {
    const bullet = resume.experience[expIdx].bullets[bulletIdx];
    if (!bullet.trim()) return;

    setEnhancingIdx(`${expIdx}-${bulletIdx}`);
    try {
      const { enhanceBullet: enhance } = await import('../../utils/aiHelper.js');
      const enhanced = await enhance(bullet);
      handleBulletChange(expIdx, bulletIdx, enhanced);
    } catch (err) {
      console.error('Enhancement failed:', err);
    } finally {
      setEnhancingIdx(null);
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {resume.experience.map((exp, idx) => (
          <motion.div
            key={exp.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            draggable
            onDragStart={() => setDragIdx(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIdx !== null && dragIdx !== idx) {
                reorderEntries('experience', dragIdx, idx);
              }
              setDragIdx(null);
            }}
            className="glass-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-muted cursor-grab" />
                <span className="text-xs font-medium text-muted">Experience {idx + 1}</span>
              </div>
              <button
                onClick={() => removeEntry('experience', idx)}
                className="text-muted hover:text-red-400 transition-colors p-1"
                aria-label="Remove experience"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Company</label>
                <input
                  value={exp.company}
                  onChange={(e) => updateEntry('experience', idx, { company: e.target.value })}
                  placeholder="Google"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Role</label>
                <input
                  value={exp.role}
                  onChange={(e) => updateEntry('experience', idx, { role: e.target.value })}
                  placeholder="Software Engineer"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Location</label>
                <input
                  value={exp.location}
                  onChange={(e) => updateEntry('experience', idx, { location: e.target.value })}
                  placeholder="Mountain View, CA"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">Start</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateEntry('experience', idx, { startDate: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">End</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateEntry('experience', idx, { endDate: e.target.value })}
                    disabled={exp.current}
                    className="input-field disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={exp.current || false}
                onChange={(e) => updateEntry('experience', idx, { current: e.target.checked, endDate: '' })}
                className="rounded border-white/20 bg-darkBg text-accent focus:ring-accent/25"
              />
              Currently working here
            </label>

            {/* Bullet Points */}
            <div className="space-y-2">
              <label className="label">Key Achievements</label>
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex gap-2 items-start">
                  <span className="text-muted mt-2.5 text-xs">•</span>
                  <textarea
                    value={bullet}
                    onChange={(e) => handleBulletChange(idx, bIdx, e.target.value)}
                    placeholder="Describe your achievement..."
                    rows={2}
                    className="input-field flex-1 resize-none text-xs"
                  />
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      onClick={() => enhanceBullet(idx, bIdx)}
                      disabled={enhancingIdx === `${idx}-${bIdx}`}
                      className="text-accent hover:text-accent/80 p-1 transition-colors"
                      title="Enhance with AI"
                    >
                      {enhancingIdx === `${idx}-${bIdx}` ? (
                        <span className="w-3.5 h-3.5 border-2 border-accent/30 border-t-accent rounded-full animate-spin block" />
                      ) : (
                        <Sparkles size={14} />
                      )}
                    </button>
                    {exp.bullets.length > 1 && (
                      <button
                        onClick={() => removeBullet(idx, bIdx)}
                        className="text-muted hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => addBullet(idx)}
                className="text-xs text-accent hover:text-accent/80 flex items-center gap-1 transition-colors"
              >
                <Plus size={12} /> Add bullet point
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button onClick={handleAdd} className="btn-secondary text-xs py-2 px-3 w-full justify-center">
        <Plus size={14} /> Add Experience
      </button>
    </div>
  );
}
