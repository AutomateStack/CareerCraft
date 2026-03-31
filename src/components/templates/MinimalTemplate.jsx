export default function MinimalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div style={{
      padding: '56px 52px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '10pt',
      lineHeight: '1.65',
      color: '#2d2d2d',
      maxWidth: '100%',
    }}>
      {/* Header — minimal */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '30pt',
          fontWeight: '300',
          fontFamily: "'Playfair Display', serif",
          letterSpacing: '-0.5px',
          color: '#1a1a1a',
          marginBottom: '10px',
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {(() => {
          const cleanUrl = (url) => (url || '').replace(/^https?:\/\/(www\.)?/, '');
          const items = [
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin && `LinkedIn: ${cleanUrl(personalInfo.linkedin)}`,
            personalInfo.github && `GitHub: ${cleanUrl(personalInfo.github)}`,
            personalInfo.portfolio && `Portfolio: ${cleanUrl(personalInfo.portfolio)}`,
          ].filter(Boolean);
          return (
            <p style={{
              fontSize: '8.5pt',
              color: '#777',
              margin: 0,
              paddingBottom: '20px',
              borderBottom: '1px solid #e5e5e5',
              lineHeight: '1.7',
            }}>
              {items.join('  •  ')}
            </p>
          );
        })()}
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '10pt', color: '#555', lineHeight: '1.8', fontStyle: 'italic' }}>
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={sectionTitle}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <span style={{ fontSize: '11pt', fontWeight: '600', color: '#1a1a1a' }}>{exp.role}</span>
                <span style={{ fontSize: '8pt', color: '#999', letterSpacing: '0.5px' }}>
                  {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div style={{ fontSize: '9pt', color: '#888', marginBottom: '6px' }}>
                {exp.company}{exp.location ? ` · ${exp.location}` : ''}
              </div>
              {exp.bullets?.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '0', paddingLeft: '14px', listStyleType: 'none' }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                    <li key={j} style={{
                      fontSize: '9pt',
                      marginBottom: '2px',
                      color: '#555',
                      position: 'relative',
                      paddingLeft: '12px',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '7px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#ccc',
                      }} />
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={sectionTitle}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '10pt', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}</span>
                <span style={{ fontSize: '8pt', color: '#999' }}>{edu.year}</span>
              </div>
              <div style={{ fontSize: '9pt', color: '#888' }}>
                {edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={sectionTitle}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{
                fontSize: '8.5pt',
                padding: '4px 12px',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5',
                color: '#555',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={sectionTitle}>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '10pt', fontWeight: '600', color: '#1a1a1a' }}>{proj.title}</span>
              {proj.techStack && (
                <span style={{ fontSize: '8pt', color: '#aaa', marginLeft: '10px' }}>{proj.techStack}</span>
              )}
              {proj.description && (
                <p style={{ fontSize: '9pt', color: '#666', margin: '3px 0 0 0' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={sectionTitle}>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '6px', fontSize: '9.5pt' }}>
              <span style={{ fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#888' }}> — {cert.issuer}</span>}
              {cert.year && <span style={{ color: '#aaa' }}> ({cert.year})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const sectionTitle = {
  fontSize: '9pt',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '3px',
  color: '#999',
  marginBottom: '14px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e5e5e5',
  fontFamily: "'DM Sans', sans-serif",
};
