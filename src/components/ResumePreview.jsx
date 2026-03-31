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

export default function ResumePreview() {
  const { resume } = useResume();
  const Template = templateComponents[resume.template] || ModernTemplate;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto bg-gray-800/50 p-6 flex justify-center">
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
      </div>
    </div>
  );
}
