import { useState } from 'react';
import { Save, RotateCcw, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ExportButton from '../components/ExportButton';
import { useResume } from '../context/ResumeContext';
import { Link } from 'react-router-dom';

export default function Builder() {
  const { resetResume } = useResume();
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showMobileEditor, setShowMobileEditor] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetResume();
    setShowResetConfirm(false);
  };

  return (
    <div className="h-screen flex flex-col bg-darkBg overflow-hidden">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-14 border-b border-white/10 bg-darkBg/95 backdrop-blur-xl flex items-center justify-between px-4 z-30 shrink-0"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="CareerCraft" className="w-7 h-7" />
            <span className="font-heading text-lg font-bold text-textLight hidden sm:block">
              Career<span className="text-accent">Craft</span>
            </span>
          </Link>
          <div className="hidden sm:block h-6 w-px bg-white/10" />
          <TemplateSelector />
        </div>

        {/* Center - Mobile toggle */}
        <div className="flex sm:hidden gap-1 bg-surface rounded-lg p-0.5">
          <button
            onClick={() => setShowMobileEditor(true)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              showMobileEditor ? 'bg-accent text-white' : 'text-muted'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setShowMobileEditor(false)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              !showMobileEditor ? 'bg-accent text-white' : 'text-muted'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn-ghost text-xs py-1.5 px-2"
            title="Reset resume"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="btn-ghost text-xs py-1.5 px-2"
            title="Save (auto-saves)"
          >
            {saved ? (
              <>
                <CheckCircle size={14} className="text-green-400" />
                <span className="hidden sm:inline text-green-400">Saved!</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span className="hidden sm:inline">Save</span>
              </>
            )}
          </button>
          <ExportButton />
        </div>
      </motion.div>

      {/* Main Content - 2 Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel — Editor */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`${
            showMobileEditor ? 'flex' : 'hidden'
          } sm:flex w-full sm:w-[40%] lg:w-[38%] flex-col border-r border-white/10 bg-primary/50 overflow-hidden`}
        >
          <Sidebar />
        </motion.div>

        {/* Right Panel — Preview */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${
            !showMobileEditor ? 'flex' : 'hidden'
          } sm:flex flex-1 flex-col overflow-hidden bg-gray-900/50`}
        >
          <ResumePreview />
        </motion.div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 max-w-sm mx-4 text-center space-y-4"
          >
            <h3 className="font-heading text-xl font-semibold text-textLight">Reset Resume?</h3>
            <p className="text-sm text-muted">This will clear all your data. This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary text-sm py-2 px-5"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl transition-colors text-sm"
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
