import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ChevronDown, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { isAIConfigured } from '../utils/aiHelper';

export default function AIPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { resume } = useResume();

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
