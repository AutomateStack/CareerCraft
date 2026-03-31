import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ChevronDown, CheckCircle, AlertCircle, XCircle, Link2, WandSparkles } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { isAIConfigured } from '../utils/aiHelper';

export default function AIPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [profileText, setProfileText] = useState('');
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [replaceExisting, setReplaceExisting] = useState(true);
  const { resume, dispatch } = useResume();

  const toArray = (value) => (Array.isArray(value) ? value : []);
  const text = (value) => (typeof value === 'string' ? value.trim() : '');

  const withIds = (items) => toArray(items).map((item, idx) => ({
    ...item,
    id: item?.id || Date.now() + idx,
  }));

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

  const mergeResume = (current, imported) => {
    const mergedSkills = Array.from(new Set([...(current.skills || []), ...(imported.skills || [])]));

    return {
      ...current,
      personalInfo: {
        ...current.personalInfo,
        ...Object.fromEntries(
          Object.entries(imported.personalInfo || {}).map(([key, val]) => [
            key,
            val || current.personalInfo?.[key] || '',
          ])
        ),
      },
      summary: imported.summary || current.summary || '',
      experience: [...(current.experience || []), ...(imported.experience || [])],
      education: [...(current.education || []), ...(imported.education || [])],
      skills: mergedSkills,
      projects: [...(current.projects || []), ...(imported.projects || [])],
      certifications: [...(current.certifications || []), ...(imported.certifications || [])],
    };
  };

  const handleATSCheck = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { checkATS } = await import('../utils/aiHelper.js');
      const data = await checkATS(resume, jobDesc);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInImport = async () => {
    setImportLoading(true);
    setImportError('');
    setImportSuccess('');

    try {
      const { importResumeFromLinkedIn } = await import('../utils/aiHelper.js');
      const rawDraft = await importResumeFromLinkedIn(linkedinUrl, profileText);
      const normalized = normalizeDraft(rawDraft);

      const nextResume = replaceExisting
        ? { ...resume, ...normalized }
        : mergeResume(resume, normalized);

      dispatch({ type: 'LOAD', data: nextResume });
      setImportSuccess('Resume draft generated and applied successfully.');
    } catch (err) {
      setImportError(err.message || 'Import failed. Please try again.');
    } finally {
      setImportLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl
                   bg-gradient-to-r from-accent/10 to-pink-500/10 border border-accent/20
                   hover:border-accent/40 transition-all duration-200"
      >
        <Sparkles size={18} className="text-accent" />
        <span className="flex-1 text-sm font-medium text-accent">AI Tools</span>
        <ChevronDown
          size={16}
          className={`text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              {!isAIConfigured() && (
                <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-yellow-300/80">
                    Add your OpenAI API key to <code className="text-yellow-200">.env</code> file as{' '}
                    <code className="text-yellow-200">VITE_OPENAI_API_KEY</code> to enable AI features.
                  </p>
                </div>
              )}

              {/* LinkedIn/Profile Import */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Link2 size={16} className="text-accent" />
                  <h4 className="text-sm font-semibold text-textLight">LinkedIn to Resume Draft</h4>
                </div>
                <p className="text-xs text-muted">
                  Paste your LinkedIn URL and profile text (About, Experience, Skills) to auto-generate a resume draft.
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
                  placeholder="Paste profile text here (About, Experience, Skills, Education)..."
                  rows={5}
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
                  onClick={handleLinkedInImport}
                  disabled={importLoading || (!linkedinUrl.trim() && !profileText.trim())}
                  className="btn-primary text-xs py-2 px-4 w-full justify-center disabled:opacity-50"
                >
                  {importLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Draft...
                    </span>
                  ) : (
                    <>
                      <WandSparkles size={14} /> Generate Resume Draft
                    </>
                  )}
                </button>

                {importError && (
                  <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <XCircle size={14} className="text-red-400 mt-0.5" />
                    <p className="text-xs text-red-300">{importError}</p>
                  </div>
                )}

                {importSuccess && (
                  <div className="flex items-start gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle size={14} className="text-green-400 mt-0.5" />
                    <p className="text-xs text-green-300">{importSuccess}</p>
                  </div>
                )}
              </div>

              {/* ATS Checker */}
              <div className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-accent" />
                  <h4 className="text-sm font-semibold text-textLight">ATS Keyword Checker</h4>
                </div>
                <p className="text-xs text-muted">
                  Paste a job description to check how well your resume matches.
                </p>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={4}
                  className="input-field resize-none text-xs"
                />
                <button
                  onClick={handleATSCheck}
                  disabled={loading || !jobDesc.trim()}
                  className="btn-primary text-xs py-2 px-4 w-full justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      <Search size={14} /> Check ATS Match
                    </>
                  )}
                </button>

                {error && (
                  <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <XCircle size={14} className="text-red-400 mt-0.5" />
                    <p className="text-xs text-red-300">{error}</p>
                  </div>
                )}

                {/* ATS Results */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 pt-2"
                    >
                      {/* Score */}
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${
                          result.score >= 70 ? 'text-green-400' :
                          result.score >= 40 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {result.score}%
                        </div>
                        <span className="text-xs text-muted">ATS Match Score</span>
                      </div>
                      <div className="w-full h-2 bg-darkBg rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            result.score >= 70 ? 'bg-green-400' :
                            result.score >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Missing Keywords */}
                      {result.missingKeywords?.length > 0 && (
                        <div>
                          <h5 className="text-xs font-medium text-red-400 mb-1.5">Missing Keywords</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {result.missingKeywords.map((kw, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/20">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Present Keywords */}
                      {result.presentKeywords?.length > 0 && (
                        <div>
                          <h5 className="text-xs font-medium text-green-400 mb-1.5">Matched Keywords</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {result.presentKeywords.map((kw, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/20">
                                <CheckCircle size={10} className="inline mr-1" />{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      {result.suggestions?.length > 0 && (
                        <div>
                          <h5 className="text-xs font-medium text-accent mb-1.5">Suggestions</h5>
                          <ul className="space-y-1">
                            {result.suggestions.map((s, i) => (
                              <li key={i} className="text-[11px] text-muted flex items-start gap-1.5">
                                <Sparkles size={10} className="text-accent mt-0.5 shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
