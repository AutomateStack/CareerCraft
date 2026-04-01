import { useResume } from '../context/ResumeContext';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import TechTemplate from './templates/TechTemplate';
import ElegantTemplate from './templates/ElegantTemplate';

const templateComponents = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  tech: TechTemplate,
  elegant: ElegantTemplate,
};

function getMissingSections(resume) {
  const checks = [
    { key: 'summary', label: 'Add a short summary', isMissing: !resume.summary?.trim() },
    { key: 'experience', label: 'Add work experience', isMissing: !resume.experience?.length },
    { key: 'education', label: 'Add education', isMissing: !resume.education?.length },
    { key: 'skills', label: 'Add your skills', isMissing: !resume.skills?.length },
    { key: 'projects', label: 'Add projects', isMissing: !resume.projects?.length },
  ];

  return checks.filter((item) => item.isMissing).slice(0, 3);
}

export default function ResumePreview() {
  const { resume, getCompletionPercentage } = useResume();
  const Template = templateComponents[resume.template] || ModernTemplate;
  const completion = getCompletionPercentage();
  const missingSections = getMissingSections(resume);
  const shouldShowCoach = completion < 35 && missingSections.length > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-1 overflow-y-auto bg-gray-800/50 p-6 flex justify-center">
        <div
          id="resume-preview-content"
          className="resume-paper w-[794px] min-h-[1123px] shadow-2xl"
          style={{
            width: '794px',
            minHeight: '1123px',
            transform: 'scale(var(--resume-scale, 0.7))',
            transformOrigin: 'top center',
          }}
        >
          <Template resumeData={resume} />
        </div>

        {shouldShowCoach && (
          <div className="absolute right-7 bottom-7 max-w-xs rounded-2xl border border-white/15 bg-slate-900/85 backdrop-blur-md p-4 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-2">Preview Tip</p>
            <p className="text-sm leading-relaxed text-slate-100 mb-3">
              Your resume is {completion}% complete. Add these sections to make this template shine:
            </p>
            <ul className="space-y-1.5 mb-3">
              {missingSections.map((item) => (
                <li key={item.key} className="text-xs text-slate-200 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-200 text-[10px]">
                    +
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-400">Use the editor on the left. The preview updates instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
