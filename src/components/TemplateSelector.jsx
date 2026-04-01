import { useState, useRef, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { ChevronDown, Columns2, AlignLeft, Layout, Briefcase, Palette, Code2, Feather, Check } from 'lucide-react';

const templates = [
  { id: 'modern',    label: 'Modern',    icon: Columns2,  desc: 'Two-column dark',   color: '#2563eb' },
  { id: 'classic',  label: 'Classic',   icon: AlignLeft, desc: 'Traditional',        color: '#374151' },
  { id: 'minimal',  label: 'Minimal',   icon: Layout,    desc: 'Clean & simple',     color: '#6b7280' },
  { id: 'executive',label: 'Executive', icon: Briefcase, desc: 'Corporate navy',     color: '#1B2A4A' },
  { id: 'creative', label: 'Creative',  icon: Palette,   desc: 'Bold gradient',      color: '#6C3FC5' },
  { id: 'tech',     label: 'Tech',      icon: Code2,     desc: 'Developer style',    color: '#0D9488' },
  { id: 'elegant',  label: 'Elegant',   icon: Feather,   desc: 'Refined serif',      color: '#8B6914' },
];

export default function TemplateSelector() {
  const { resume, setTemplate } = useResume();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = templates.find(t => t.id === resume.template) || templates[0];
  const Icon = current.icon;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5
                   text-sm font-medium text-textLight hover:border-accent/40 hover:shadow-sm
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: current.color }}
        />
        <Icon size={13} className="text-muted shrink-0" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          size={13}
          className={`text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200
                     rounded-xl shadow-xl z-50 overflow-hidden"
          role="listbox"
        >
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] font-semibold text-muted uppercase tracking-widest">
              Choose Template
            </p>
          </div>
          <div className="p-2 grid grid-cols-2 gap-1.5 max-h-80 overflow-y-auto">
            {templates.map(t => {
              const TIcon = t.icon;
              const isActive = resume.template === t.id;
              return (
                <button
                  key={t.id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => { setTemplate(t.id); setOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left w-full
                    transition-all duration-150 group
                    ${isActive
                      ? 'bg-accent text-white shadow-sm shadow-accent/30'
                      : 'hover:bg-gray-50 text-textLight'
                    }`}
                >
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${t.color}18` }}
                  >
                    <TIcon size={13} style={{ color: isActive ? '#fff' : t.color }} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold leading-tight truncate">{t.label}</div>
                    <div className={`text-[10px] leading-tight truncate ${isActive ? 'text-white/70' : 'text-muted'}`}>
                      {t.desc}
                    </div>
                  </div>
                  {isActive && <Check size={12} className="ml-auto shrink-0 text-white" />}
                </button>
              );
            })}
          </div>
          <div className="border-t border-gray-100 px-3 py-2">
            <a
              href="/templates"
              onClick={() => setOpen(false)}
              className="text-[11px] text-accent hover:underline font-medium"
            >
              Browse all templates with preview →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
