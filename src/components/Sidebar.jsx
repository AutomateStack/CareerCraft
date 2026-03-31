import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Bot } from 'lucide-react';
import PersonalInfo from './sections/PersonalInfo';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import AIPanel from './AIPanel';
import { useResume } from '../context/ResumeContext';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfo },
  { id: 'summary', label: 'Professional Summary', icon: Bot, component: null },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, component: WorkExperience },
  { id: 'education', label: 'Education', icon: GraduationCap, component: Education },
  { id: 'skills', label: 'Skills', icon: Wrench, component: Skills },
  { id: 'projects', label: 'Projects', icon: FolderOpen, component: Projects },
  { id: 'certifications', label: 'Certifications', icon: Award, component: Certifications },
];

export default function Sidebar() {
  const [openSection, setOpenSection] = useState('personal');
  const { resume, updateField, getCompletionPercentage } = useResume();
  const completion = getCompletionPercentage();

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const getSectionStatus = (id) => {
    switch (id) {
      case 'personal':
        return Object.values(resume.personalInfo).some(v => v.trim() !== '');
      case 'summary':
        return resume.summary.trim() !== '';
      case 'experience':
        return resume.experience.length > 0;
      case 'education':
        return resume.education.length > 0;
      case 'skills':
        return resume.skills.length > 0;
      case 'projects':
        return resume.projects.length > 0;
      case 'certifications':
        return resume.certifications.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 min-h-screen">
      {/* Progress Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Resume Progress</span>
          <span className="text-xs font-bold text-accent">{completion}%</span>
        </div>
        <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Sections Accordion */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-white">
        {sections.map((section) => {
          const Icon = section.icon;
          const isOpen = openSection === section.id;
          const hasContent = getSectionStatus(section.id);

          return (
            <div key={section.id} className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-xl ${
                  isOpen
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-white/5 text-textLight'
                }`}
              >
                <Icon size={18} className={isOpen ? 'text-accent' : 'text-muted'} />
                <span className="flex-1 text-sm font-medium">{section.label}</span>
                {hasContent && (
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-1" />
                )}
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3">
                      {section.id === 'summary' ? (
                        <SummarySection
                          summary={resume.summary}
                          onChange={(val) => updateField('summary', val)}
                          resume={resume}
                        />
                      ) : (
                        section.component && <section.component />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* AI Tools Panel */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <AIPanel />
        </div>
      </div>
    </div>
  );
}

function SummarySection({ summary, onChange, resume }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const { generateSummary } = await import('../utils/aiHelper.js');
      const result = await generateSummary(resume);
      onChange(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a brief professional summary..."
        rows={4}
        className="input-field resize-none"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="btn-secondary text-xs py-2 px-3 w-full justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          '✨ Generate with AI'
        )}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}


