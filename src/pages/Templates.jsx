import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import Navbar from '../components/Navbar';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';

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
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional and timeless. Perfect for conservative industries like finance, law, and academia.',
    component: ClassicTemplate,
    tags: ['Traditional', 'Professional', 'ATS-Friendly'],
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Bold two-column design with accent colors. Great for tech, marketing, and creative roles.',
    component: ModernTemplate,
    tags: ['Two-Column', 'Colorful', 'Eye-Catching'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean and elegant with maximum whitespace. Ideal for design, UX, and senior positions.',
    component: MinimalTemplate,
    tags: ['Clean', 'Elegant', 'Whitespace'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Templates() {
  const { setTemplate } = useResume();
  const navigate = useNavigate();

  const handleSelect = (templateId) => {
    setTemplate(templateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-darkBg">
      <Navbar />

      <div className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-textLight mb-4">
              Choose Your <span className="text-gradient">Template</span>
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto">
              Pick a design that matches your style. Every template is optimized for ATS and looks stunning in PDF.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {templates.map((t, i) => {
              const TemplateComp = t.component;
              return (
                <motion.div
                  key={t.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={i + 1}
                  className="group"
                >
                  <div className="glass-card-hover overflow-hidden">
                    {/* Template Preview */}
                    <div className="relative bg-white overflow-hidden" style={{ height: '380px' }}>
                      <div
                        style={{
                          transform: 'scale(0.38)',
                          transformOrigin: 'top left',
                          width: '794px',
                          minHeight: '1123px',
                          pointerEvents: 'none',
                        }}
                      >
                        <TemplateComp resumeData={sampleData} />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleSelect(t.id)}
                          className="btn-primary opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg"
                        >
                          Use This Template
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-heading text-xl font-semibold text-textLight mb-2">{t.name}</h3>
                      <p className="text-sm text-muted mb-3 leading-relaxed">{t.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
