import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const { resume, updateField } = useResume();
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!resume.skills.includes(input.trim())) {
        updateField('skills', [...resume.skills, input.trim()]);
      }
      setInput('');
    }
  };

  const removeSkill = (skill) => {
    updateField('skills', resume.skills.filter(s => s !== skill));
  };

  const suggestedSkills = [
    'JavaScript', 'React', 'Python', 'TypeScript', 'Node.js', 'SQL',
    'Git', 'AWS', 'Docker', 'Figma', 'Agile', 'REST APIs',
  ].filter(s => !resume.skills.includes(s));

  return (
    <div className="space-y-3">
      <div>
        <label className="label">Add Skills</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter..."
          className="input-field"
        />
      </div>

      {/* Current Skills */}
      <div className="flex flex-wrap gap-2 min-h-[32px]">
        <AnimatePresence>
          {resume.skills.map((skill) => (
            <motion.span
              key={skill}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-accent/15 text-accent
                         text-xs font-medium rounded-full border border-accent/20"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-white transition-colors ml-0.5"
                aria-label={`Remove ${skill}`}
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {suggestedSkills.length > 0 && (
        <div>
          <label className="label text-xs">Suggestions</label>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.slice(0, 8).map((skill) => (
              <button
                key={skill}
                onClick={() => updateField('skills', [...resume.skills, skill])}
                className="text-[11px] px-2.5 py-1 rounded-full border border-white/10
                           text-muted hover:text-textLight hover:border-accent/30
                           transition-all duration-200 hover:bg-accent/5"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
