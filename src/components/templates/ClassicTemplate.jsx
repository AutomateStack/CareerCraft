// Classic Template - Traditional Resume Layout

export default function ClassicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div style={{
      padding: '48px 56px',
      fontFamily: "'Times New Roman', 'Georgia', serif",
      fontSize: '11pt',
      lineHeight: '1.5',
      color: '#1a1a1a',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #1a1a1a', paddingBottom: '16px' }}>
        <h1 style={{
          fontSize: '26pt',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0',
          fontFamily: "'Times New Roman', serif",
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '9pt', color: '#444' }}>
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Professional Summary</h2>
          <p style={{ fontSize: '10.5pt', color: '#333', lineHeight: '1.6' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Professional Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '11pt' }}>{exp.role}</strong>
                <span style={{ fontSize: '9pt', color: '#666' }}>
                  {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '10pt', color: '#555', fontStyle: 'italic' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </div>
              {exp.bullets?.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                    <li key={j} style={{ fontSize: '10pt', marginBottom: '3px', color: '#333' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '11pt' }}>{edu.degree}</strong>
                <span style={{ fontSize: '9pt', color: '#666' }}>{edu.year}</span>
              </div>
              <div style={{ fontSize: '10pt', color: '#555', fontStyle: 'italic' }}>
                {edu.institution}
                {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Skills</h2>
          <p style={{ fontSize: '10pt', color: '#333' }}>{skills.join('  •  ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <strong style={{ fontSize: '11pt' }}>{proj.title}</strong>
              {proj.techStack && (
                <span style={{ fontSize: '9pt', color: '#666', marginLeft: '8px' }}>
                  ({proj.techStack})
                </span>
              )}
              {proj.description && (
                <p style={{ fontSize: '10pt', color: '#333', margin: '2px 0 0 0' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={sectionHeading}>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '4px', fontSize: '10pt' }}>
              <strong>{cert.name}</strong>
              {cert.issuer && <span style={{ color: '#555' }}> — {cert.issuer}</span>}
              {cert.year && <span style={{ color: '#666' }}> ({cert.year})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const sectionHeading = {
  fontSize: '13pt',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  borderBottom: '1px solid #ccc',
  paddingBottom: '4px',
  marginBottom: '10px',
  color: '#1a1a1a',
  fontFamily: "'Times New Roman', serif",
};
