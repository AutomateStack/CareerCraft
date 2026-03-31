import { useResume } from '../context/ResumeContext';
import { Layout, Columns2, AlignLeft, Briefcase, Palette, Code2, Feather } from 'lucide-react';

const templates = [
  { id: 'modern',    label: 'Modern',    icon: Columns2,   desc: 'Two-column dark' },
  { id: 'classic',  label: 'Classic',   icon: AlignLeft,  desc: 'Traditional' },
  { id: 'minimal',  label: 'Minimal',   icon: Layout,     desc: 'Clean & simple' },
  { id: 'executive',label: 'Executive', icon: Briefcase,  desc: 'Corporate navy' },
  { id: 'creative', label: 'Creative',  icon: Palette,    desc: 'Bold gradient' },
  { id: 'tech',     label: 'Tech',      icon: Code2,      desc: 'Developer style' },
  { id: 'elegant',  label: 'Elegant',   icon: Feather,    desc: 'Refined serif' },
];

export default function TemplateSelector() {
  const { resume, setTemplate } = useResume();

  return (
    <div className="relative group">
      <label htmlFor="template-selector" className="block text-xs font-semibold text-muted mb-1">Resume Template</label>
      <select
        value={resume.template}
        onChange={(e) => setTemplate(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2
                   text-sm text-textLight cursor-pointer hover:border-accent/30 focus:outline-none
                   focus:border-accent/50 transition-all pr-8 shadow-sm"
        id="template-selector"
      >
        {templates.map(t => (
          <option key={t.id} value={t.id}>
            {t.label} — {t.desc}
          </option>
        ))}
      </select>
      <Layout size={14} className="absolute right-2.5 top-8 text-muted pointer-events-none" />
      <div className="mt-2 grid grid-cols-2 gap-2">
        {templates.map(t => (
          <div key={t.id} className={`flex items-center gap-2 px-2 py-1 rounded border ${resume.template === t.id ? 'border-accent bg-accent/10' : 'border-gray-200 bg-white'}`}>
            <t.icon size={16} className="text-accent" />
            <span className="text-xs font-medium">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
