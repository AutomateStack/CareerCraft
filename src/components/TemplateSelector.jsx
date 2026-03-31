import { useResume } from '../context/ResumeContext';
import { Layout, Columns2, AlignLeft } from 'lucide-react';

const templates = [
  { id: 'classic', label: 'Classic', icon: AlignLeft, desc: 'Traditional' },
  { id: 'modern', label: 'Modern', icon: Columns2, desc: 'Two-column' },
  { id: 'minimal', label: 'Minimal', icon: Layout, desc: 'Clean' },
];

export default function TemplateSelector() {
  const { resume, setTemplate } = useResume();

  return (
    <div className="relative group">
      <select
        value={resume.template}
        onChange={(e) => setTemplate(e.target.value)}
        className="appearance-none bg-surface border border-white/10 rounded-lg px-3 py-2
                   text-sm text-textLight cursor-pointer hover:border-accent/30 focus:outline-none
                   focus:border-accent/50 transition-all pr-8"
        id="template-selector"
      >
        {templates.map(t => (
          <option key={t.id} value={t.id}>
            {t.label} — {t.desc}
          </option>
        ))}
      </select>
      <Layout size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
    </div>
  );
}
