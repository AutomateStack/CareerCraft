import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Bot, Link2, WandSparkles, XCircle, CheckCircle } from 'lucide-react';
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
  { id: 'linkedin-import', label: 'LinkedIn Import', icon: Link2, component: null },
  { id: 'summary', label: 'Professional Summary', icon: Bot, component: null },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, component: WorkExperience },
  { id: 'education', label: 'Education', icon: GraduationCap, component: Education },
  { id: 'skills', label: 'Skills', icon: Wrench, component: Skills },
  { id: 'projects', label: 'Projects', icon: FolderOpen, component: Projects },
  { id: 'certifications', label: 'Certifications', icon: Award, component: Certifications },
];

export default function Sidebar() {
  const [openSection, setOpenSection] = useState('personal');
  const { resume, updateField, getCompletionPercentage, dispatch } = useResume();
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
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted">Resume Progress</span>
          <span className="text-xs font-bold text-accent">{completion}%</span>
        </div>
        <div className="w-full h-2 bg-darkBg rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Sections Accordion */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
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
                      ) : section.id === 'linkedin-import' ? (
                        <LinkedInImportSection resume={resume} dispatch={dispatch} />
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
        <div className="mt-4 pt-4 border-t border-white/10">
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

function LinkedInImportSection({ resume, dispatch }) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [profileText, setProfileText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [replaceExisting, setReplaceExisting] = useState(true);

  const toArray = (v) => (Array.isArray(v) ? v : []);
  const text = (v) => (typeof v === 'string' ? v.trim() : '');
  const withIds = (items) =>
    toArray(items).map((item, idx) => ({ ...item, id: item?.id || Date.now() + idx }));

  const normalizeDraft = (draft) => ({
    personalInfo: {
      fullName: text(draft?.personalInfo?.fullName),
      email: text(draft?.personalInfo?.email),
      phone: text(draft?.personalInfo?.phone),
      linkedin: text(draft?.personalInfo?.linkedin),
      github: text(draft?.personalInfo?.github),
      location: text(draft?.personalInfo?.location),
      portfolio: text(draft?.personalInfo?.portfolio),
    },
    summary: text(draft?.summary),
    experience: withIds(
      toArray(draft?.experience).map((exp) => ({
        company: text(exp?.company),
        role: text(exp?.role),
        location: text(exp?.location),
        startDate: text(exp?.startDate),
        endDate: text(exp?.endDate),
        current: Boolean(exp?.current),
        bullets: toArray(exp?.bullets).map((b) => text(b)).filter(Boolean),
      }))
    ),
    education: withIds(
      toArray(draft?.education).map((edu) => ({
        degree: text(edu?.degree),
        institution: text(edu?.institution),
        year: text(edu?.year),
        gpa: text(edu?.gpa),
      }))
    ),
    skills: toArray(draft?.skills).map((s) => text(s)).filter(Boolean),
    projects: withIds(
      toArray(draft?.projects).map((proj) => ({
        title: text(proj?.title),
        description: text(proj?.description),
        techStack: text(proj?.techStack),
        liveLink: text(proj?.liveLink),
        githubLink: text(proj?.githubLink),
      }))
    ),
    certifications: withIds(
      toArray(draft?.certifications).map((cert) => ({
        name: text(cert?.name),
        issuer: text(cert?.issuer),
        year: text(cert?.year),
      }))
    ),
  });

  const handleImport = async () => {
    if (!linkedinUrl.trim() && !profileText.trim()) {
      setError('Please enter a LinkedIn URL or paste your profile text.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { importResumeFromLinkedIn } = await import('../utils/aiHelper.js');
      const rawDraft = await importResumeFromLinkedIn(linkedinUrl, profileText);
      const normalized = normalizeDraft(rawDraft);
      const nextResume = replaceExisting
        ? { ...resume, ...normalized }
        : {
            ...resume,
            personalInfo: { ...resume.personalInfo, ...Object.fromEntries(Object.entries(normalized.personalInfo).filter(([, v]) => v)) },
            summary: normalized.summary || resume.summary,
            experience: [...(resume.experience || []), ...(normalized.experience || [])],
            education: [...(resume.education || []), ...(normalized.education || [])],
            skills: Array.from(new Set([...(resume.skills || []), ...(normalized.skills || [])])),
            projects: [...(resume.projects || []), ...(normalized.projects || [])],
            certifications: [...(resume.certifications || []), ...(normalized.certifications || [])],
          };
      dispatch({ type: 'LOAD', data: nextResume });
      setSuccess('Resume draft applied! Review and edit the sections below.');
      setLinkedinUrl('');
      setProfileText('');
    } catch (err) {
      setError(err.message || 'Import failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted leading-relaxed">
        Paste your LinkedIn URL and copy-paste your profile text (About, Experience, Skills, Education) to auto-generate a resume draft.
      </p>
      <input
        value={linkedinUrl}
        onChange={(e) => setLinkedinUrl(e.target.value)}
        placeholder="https://linkedin.com/in/your-profile"
        className="input-field text-xs"
      />
      <textarea
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
        placeholder="Paste your profile text here (About, Experience, Skills, Education sections)..."
        rows={6}
        className="input-field resize-none text-xs"
      />
      <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
        <input
          type="checkbox"
          checked={replaceExisting}
          onChange={(e) => setReplaceExisting(e.target.checked)}
          className="rounded border-white/20 bg-darkBg text-accent focus:ring-accent/25"
        />
        Replace current resume content
      </label>
      <button
        onClick={handleImport}
        disabled={loading || (!linkedinUrl.trim() && !profileText.trim())}
        className="btn-primary text-xs py-2 px-4 w-full justify-center disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Draft...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <WandSparkles size={14} /> Generate Resume Draft
          </span>
        )}
      </button>
      {error && (
        <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
          <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
          <CheckCircle size={14} className="text-green-400 mt-0.5 shrink-0" />
          <p className="text-xs text-green-300">{success}</p>
        </div>
      )}
    </div>
  );
}
