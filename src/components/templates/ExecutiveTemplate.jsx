// Executive Template - Corporate Professional Style

export default function ExecutiveTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const navy = '#1B2A4A';
  const gold = '#B8860B';

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '10.5pt', color: '#1a1a1a', backgroundColor: '#fff', minHeight: '100%' }}>
      {/* Top border bar */}
      <div style={{ height: '6px', backgroundColor: navy }} />

      {/* Header */}
      <div style={{ padding: '36px 52px 24px', borderBottom: `1px solid ${navy}` }}>
        <h1 style={{ fontSize: '28pt', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 6px 0', color: navy }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {experience.length > 0 && experience[0].role && (
          <p style={{ fontSize: '11pt', color: gold, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 10px 0', fontStyle: 'italic' }}>
            {experience[0].role}
          </p>
        )}
        {(() => {
          const cleanUrl = (url) => (url || '').replace(/^https?:\/\/(www\.)?/, '');
          const items = [
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin && `linkedin.com/${cleanUrl(personalInfo.linkedin).replace(/^linkedin\.com\//, '')}`,
            personalInfo.github && cleanUrl(personalInfo.github),
            personalInfo.portfolio && cleanUrl(personalInfo.portfolio),
          ].filter(Boolean);
          return (
            <p style={{ fontSize: '8.5pt', color: '#555', letterSpacing: '0.5px', margin: 0, fontFamily: "'Arial', sans-serif" }}>
              {items.join('   |   ')}
            </p>
          );
        })()}
      </div>

      <div style={{ padding: '0 52px 40px' }}>
        {/* Executive Summary */}
        {summary && (
          <Section title="Executive Summary" navy={navy} gold={gold}>
            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#333', margin: 0, fontStyle: 'italic' }}>{summary}</p>
          </Section>
        )}

        {/* Core Competencies */}
        {skills.length > 0 && (
          <Section title="Core Competencies" navy={navy} gold={gold}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px 16px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ fontSize: '9.5pt', color: '#333', paddingLeft: '14px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: gold }}>▸</span>
                  {skill}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <Section title="Professional Experience" navy={navy} gold={gold}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: '700', margin: 0, color: navy }}>{exp.role}</h3>
                  <span style={{ fontSize: '9pt', color: '#666', fontFamily: "'Arial', sans-serif", whiteSpace: 'nowrap' }}>
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div style={{ fontSize: '10pt', color: gold, fontStyle: 'italic', marginBottom: '6px' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.bullets?.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '18px' }}>
                    {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                      <li key={j} style={{ fontSize: '9.5pt', color: '#333', marginBottom: '4px', lineHeight: '1.6', fontFamily: "'Arial', sans-serif" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education" navy={navy} gold={gold}>
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '10.5pt', fontWeight: '700', color: navy }}>{edu.degree}</div>
                  <div style={{ fontSize: '9.5pt', color: '#555', fontStyle: 'italic' }}>{edu.institution}</div>
                  {edu.gpa && <div style={{ fontSize: '9pt', color: '#777' }}>GPA: {edu.gpa}</div>}
                </div>
                <div style={{ fontSize: '9pt', color: '#666', textAlign: 'right', fontFamily: "'Arial', sans-serif" }}>{edu.year}</div>
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Key Projects" navy={navy} gold={gold}>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '10.5pt', fontWeight: '700', color: navy }}>{proj.title}</span>
                  {proj.techStack && <span style={{ fontSize: '8.5pt', color: '#888', fontFamily: "'Arial', sans-serif" }}>({proj.techStack})</span>}
                </div>
                {proj.description && <p style={{ fontSize: '9.5pt', color: '#444', margin: '3px 0 0', lineHeight: '1.6', fontFamily: "'Arial', sans-serif" }}>{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section title="Certifications & Credentials" navy={navy} gold={gold}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{ fontSize: '9.5pt' }}>
                  <span style={{ fontWeight: '700', color: navy }}>{cert.name}</span>
                  <span style={{ color: '#666', fontFamily: "'Arial', sans-serif" }}> — {cert.issuer}{cert.year ? ` (${cert.year})` : ''}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* Bottom border bar */}
      <div style={{ height: '4px', backgroundColor: gold }} />
    </div>
  );
}

function Section({ title, navy, gold, children }) {
  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: navy, margin: 0, whiteSpace: 'nowrap' }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: gold }} />
      </div>
      {children}
    </div>
  );
}
