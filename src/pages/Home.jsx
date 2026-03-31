import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Download, ArrowRight, FileText, Palette, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const features = [
  {
    icon: Sparkles,
    title: 'AI Enhancement',
    desc: 'Supercharge your bullet points and generate professional summaries with GPT-4o-mini.',
    gradient: 'from-accent to-pink-500',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    desc: 'See your resume update in real-time as you type. Choose from 3 premium templates.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Download,
    title: 'PDF Export',
    desc: 'Download your polished resume as a print-ready A4 PDF with one click.',
    gradient: 'from-emerald-500 to-teal-400',
  },
];

const steps = [
  { number: '01', title: 'Fill Your Details', desc: 'Enter your experience, education, skills, and projects.' },
  { number: '02', title: 'Enhance with AI', desc: 'Let AI polish your content and check ATS compatibility.' },
  { number: '03', title: 'Export & Apply', desc: 'Download your professional resume and start landing interviews.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-darkBg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-surface/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium text-accent">AI-Powered Resume Builder</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-textLight leading-tight mb-6"
          >
            Build Your{' '}
            <span className="text-gradient">Dream Resume</span>
            <br />
            with AI
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create stunning, ATS-optimized resumes in minutes. Let artificial intelligence
            enhance your content while you focus on what matters — landing your dream job.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/builder" className="btn-primary text-lg py-4 px-8 group">
              Start Building
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/templates" className="btn-secondary text-lg py-4 px-8">
              <Palette size={18} />
              View Templates
            </Link>
          </motion.div>

          {/* Floating resume mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            className="mt-16 relative"
          >
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent rounded-2xl blur-2xl" />
              <div className="relative glass-card p-1 rounded-2xl overflow-hidden">
                <div className="bg-white rounded-xl p-8 text-left shadow-inner">
                  <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-800 rounded" />
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span>email@example.com</span>
                      <span>•</span>
                      <span>+1 (555) 000-0000</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      <div className="h-3 w-full bg-gray-100 rounded" />
                      <div className="h-3 w-4/5 bg-gray-100 rounded" />
                      <div className="h-3 w-3/4 bg-gray-100 rounded" />
                    </div>
                    <div className="pt-2 space-y-3">
                      <div className="h-4 w-36 bg-accent/20 rounded" />
                      <div className="flex gap-8">
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-full bg-gray-100 rounded" />
                          <div className="h-3 w-5/6 bg-gray-100 rounded" />
                          <div className="h-3 w-4/6 bg-gray-100 rounded" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-full bg-gray-100 rounded" />
                          <div className="h-3 w-3/4 bg-gray-100 rounded" />
                          <div className="h-3 w-5/6 bg-gray-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textLight mb-4">
              Everything You Need
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Powerful features designed to make resume building effortless and results exceptional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                  custom={i}
                  className="glass-card-hover p-8 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-textLight mb-3">{feat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textLight mb-4">
              How It Works
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Three simple steps to your perfect resume.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-gradient-to-r from-accent/50 via-pink-500/50 to-accent/50" />

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={i}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-darkBg border-2 border-accent/30 flex items-center justify-center relative z-10">
                  <span className="text-2xl font-bold text-gradient">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-textLight mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-center mt-14"
          >
            <Link to="/builder" className="btn-primary text-lg py-4 px-10 group">
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="CareerCraft" className="w-6 h-6" />
            <span className="font-heading text-lg font-bold text-textLight">
              Career<span className="text-accent">Craft</span>
            </span>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} CareerCraft. Built with ❤️ and AI.
          </p>
          <div className="flex gap-6">
            <Link to="/builder" className="text-sm text-muted hover:text-accent transition-colors">Builder</Link>
            <Link to="/templates" className="text-sm text-muted hover:text-accent transition-colors">Templates</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
