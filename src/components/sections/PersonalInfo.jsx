import { useResume } from '../../context/ResumeContext';
import { MapPin, Mail, Phone, Link, GitBranch, Globe } from 'lucide-react';

const fields = [
  { key: 'fullName', label: 'Full Name', placeholder: 'John Doe', icon: null, type: 'text' },
  { key: 'email', label: 'Email', placeholder: 'john@example.com', icon: Mail, type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567', icon: Phone, type: 'tel' },
  { key: 'location', label: 'Location', placeholder: 'San Francisco, CA', icon: MapPin, type: 'text' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe', icon: Link, type: 'url' },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/johndoe', icon: GitBranch, type: 'url' },
  { key: 'portfolio', label: 'Portfolio', placeholder: 'johndoe.dev', icon: Globe, type: 'url' },
];

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume();

  return (
    <div className="space-y-3">
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key}>
            <label className="label">{field.label}</label>
            <div className="relative">
              {Icon && (
                <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/60" />
              )}
              <input
                type={field.type}
                value={resume.personalInfo[field.key] || ''}
                onChange={(e) => updatePersonalInfo(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={`input-field ${Icon ? 'pl-9' : ''}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
