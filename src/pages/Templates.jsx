import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/Navbar';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import TechTemplate from '../components/templates/TechTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';

const sampleData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexj',
    github: 'github.com/alexj',
    portfolio: 'alexjohnson.dev',
  },
  summary: 'Innovative software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and leveraging AI to solve complex problems.',
  experience: [
    {
      company: 'TechCorp',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      bullets: [
        'Led development of microservices architecture serving 2M+ daily active users',
        'Reduced API response times by 40% through caching and query optimization',
      ],
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      bullets: [
        'Built React frontend and Node.js backend for SaaS platform from scratch',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Stanford University',
      year: '2015 - 2019',
      gpa: '3.8',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
  projects: [
    {
      title: 'AI Resume Builder',
      description: 'Full-stack resume builder with GPT integration',
      techStack: 'React, Node.js, OpenAI API',
      liveLink: '',
      githubLink: '',
    },
  ],
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon', year: '2023' },
  ],
};

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Bold two-column design with accent colors. Great for tech, marketing, and creative roles.',
    component: ModernTemplate,
    tags: ['Two-Column', 'Colorful', 'Eye-Catching'],
    accentColor: '#2563eb',
    category: 'Creative',
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional and timeless. Perfect for conservative industries like finance, law, and academia.',
    component: ClassicTemplate,
    tags: ['Traditional', 'Professional', 'ATS-Friendly'],
    accentColor: '#374151',
    category: 'Professional',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean and elegant with maximum whitespace. Ideal for design, UX, and senior positions.',
    component: MinimalTemplate,
    tags: ['Clean', 'Elegant', 'Whitespace'],
    accentColor: '#6b7280',
    category: 'Minimal',
  },
  {
    id: 'executive',
    name: 'Executive',
    desc: 'Corporate navy with gold accents. Commands authority — perfect for C-suite and directors.',
    component: ExecutiveTemplate,
    tags: ['Corporate', 'Navy & Gold', 'Leadership'],
    accentColor: '#1B2A4A',
    category: 'Professional',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Bold purple-to-pink gradient header. Designed to stand out in creative and startup environments.',
    component: CreativeTemplate,
    tags: ['Bold', 'Gradient', 'Standout'],
    accentColor: '#6C3FC5',
    category: 'Creative',
  },
  {
    id: 'tech',
    name: 'Tech',
    desc: 'Dark header with teal accents and code-inspired styling. Built for developers and engineers.',
    component: TechTemplate,
    tags: ['Developer', 'Dark Header', 'Teal Accent'],
    accentColor: '#0D9488',
    category: 'Technical',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    desc: 'Refined serif typography with centered header and fine lines. Perfect for senior academics and executives.',
    component: ElegantTemplate,
    tags: ['Serif', 'Centered', 'Refined'],
    accentColor: '#8B6914',
    category: 'Minimal',
  },
];

const categories = ['All', 'Professional', 'Creative', 'Technical', 'Minimal'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function Templates() {
  const { setTemplate } = useResume();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'All'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  const handleSelect = (templateId) => {
    setTemplate(templateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-textLight mb-4">
              Choose Your <span className="text-gradient">Template</span>
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto">
              {templates.length} professionally designed templates — all ATS-friendly and print-ready.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${activeCategory === cat
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-white text-muted border-gray-200 hover:border-accent/40 hover:text-accent'
                  }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    ({templates.filter(t => t.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Template Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((t, i) => {
                const TemplateComp = t.component;
                const isHovered = hoveredId === t.id;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    variants={fadeUp}
                    custom={i}
                    className="group flex flex-col"
                    onMouseEnter={() => setHoveredId(t.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="glass-card-hover flex flex-col h-full overflow-hidden">
                      {/* Template Preview */}
                      <div
                        className="relative bg-gray-50 overflow-hidden cursor-pointer"
                        style={{ height: '320px' }}
                        onClick={() => handleSelect(t.id)}
                      >
                        {/* Scaled template */}
                        <div
                          style={{
                            transform: 'scale(0.32)',
                            transformOrigin: 'top left',
                            width: '794px',
                            minHeight: '1123px',
                            pointerEvents: 'none',
                          }}
                        >
                          <TemplateComp resumeData={sampleData} />
                        </div>

                        {/* Accent color strip at top */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ backgroundColor: t.accentColor }}
                        />

                        {/* Hover overlay with CTA */}
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSelect(t.id); }}
                            className="btn-primary text-sm py-2 px-5 shadow-xl"
                          >
                            Use This Template
                          </button>
                          <span className="text-white/80 text-xs">Click anywhere to select</span>
                        </motion.div>
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: t.accentColor }}
                          />
                          <h3 className="font-heading text-base font-semibold text-textLight">{t.name}</h3>
                          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-muted border border-gray-200">
                            {t.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed mb-3 flex-1">{t.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {t.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[9px] px-2 py-0.5 rounded-full border font-medium"
                              style={{
                                backgroundColor: `${t.accentColor}12`,
                                color: t.accentColor,
                                borderColor: `${t.accentColor}30`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleSelect(t.id)}
                          className="w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200
                            border-2 hover:text-white"
                          style={{
                            borderColor: t.accentColor,
                            color: t.accentColor,
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = t.accentColor;
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = t.accentColor;
                          }}
                        >
                          Use This Template
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted text-sm mb-4">Already using a template? Jump back to your resume.</p>
            <Link to="/builder" className="btn-secondary text-sm py-2.5 px-6 inline-flex">
              ← Back to Builder
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
