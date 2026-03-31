// Elegant Template - Refined minimal with centered header and thin lines

export default function ElegantTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const charcoal = '#2C2C2C';
  const accent = '#8B6914';
  const lineColor = '#D4C5A9';

  return (
    <div style={{ fontFamily: "'Garamond', 'Georgia', serif", fontSize: '10.5pt', color: charcoal, backgroundColor: '#fff', minHeight: '100%', padding: '52px 64px' }}>
      {/* Centered elegant header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h1 style={{
          fontSize: '30pt', fontWeight: '400', letterSpacing: '6px',
          textTransform: 'uppercase', margin: '0 0 8px 0',
          color: charcoal, fontFamily: "'Garamond', 'Georgia', serif",
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {experience.length > 0 && experience[0].role && (
          <p style={{ fontSize: '10pt', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px 0', color: accent, fontStyle: 'italic', fontWeight: '400' }}>
            {experience[0].role}
          </p>
        )}
        {/* Decorative divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{ width: '60px', height: '1px', backgroundColor: accent }} />
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: accent }} />
          <div style={{ width: '60px', height: '1px', backgroundColor: accent }} />
        </div>
        {/* Contact */}
        {(() => {
          const cleanUrl = (url) => (url || '').replace(/^https?:\/\/(www\.)?/, '');
          const items = [
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.linkedin && cleanUrl(personalInfo.linkedin),
            personalInfo.github && cleanUrl(personalInfo.github),
          ].filter(Boolean);
          return (
            <p style={{ fontSize: '8.5pt', color: '#666', letterSpacing: '0.8px', margin: '0 0 4px', fontFamily: "'Arial', sans-serif" }}>
              {items.join('   ·   ')}
            </p>
          );
        })()}
      </div>

      <HRule lineColor={lineColor} />

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Left narrow column */}
        <div style={{ width: '175px', flexShrink: 0 }}>
          {skills.length > 0 && (
            <ElegantSideSection title="Skills" accent={accent} lineColor={lineColor}>
              {skills.map((skill, i) => (
                <div key={i} style={{ fontSize: '9.5pt', color: '#444', marginBottom: '5px', paddingLeft: '10px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: accent }}>–</span>
                  {skill}
                </div>
              ))}
            </ElegantSideSection>
          )}

          {education.length > 0 && (
            <ElegantSideSection title="Education" accent={accent} lineColor={lineColor}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '9.5pt', fontWeight: '700', color: charcoal }}>{edu.degree}</div>
                  <div style={{ fontSize: '9pt', fontStyle: 'italic', color: '#555' }}>{edu.institution}</div>
                  <div style={{ fontSize: '8.5pt', color: accent }}>{edu.year}</div>
                  {edu.gpa && <div style={{ fontSize: '8pt', color: '#777' }}>GPA {edu.gpa}</div>}
                </div>
              ))}
            </ElegantSideSection>
          )}

          {certifications.length > 0 && (
            <ElegantSideSection title="Certifications" accent={accent} lineColor={lineColor}>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9pt', fontWeight: '700', color: charcoal }}>{cert.name}</div>
                  <div style={{ fontSize: '8.5pt', fontStyle: 'italic', color: '#666' }}>{cert.issuer}</div>
                  {cert.year && <div style={{ fontSize: '8pt', color: accent }}>{cert.year}</div>}
                </div>
              ))}
            </ElegantSideSection>
          )}
        </div>

        {/* Right main content */}
        <div style={{ flex: 1 }}>
          {summary && (
            <ElegantMainSection title="Profile" accent={accent} lineColor={lineColor}>
              <p style={{ fontSize: '10pt', lineHeight: '1.85', color: '#444', margin: 0, fontStyle: 'italic' }}>{summary}</p>
            </ElegantMainSection>
          )}

          {experience.length > 0 && (
            <ElegantMainSection title="Experience" accent={accent} lineColor={lineColor}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10.5pt', fontWeight: '700', margin: 0, fontStyle: 'normal' }}>{exp.role}</h3>
                    <span style={{ fontSize: '8.5pt', color: '#888', fontStyle: 'italic', whiteSpace: 'nowrap', fontFamily: "'Arial', sans-serif" }}>
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '10pt', color: accent, fontStyle: 'italic', marginBottom: '6px' }}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.bullets?.filter(b => b.trim()).length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '18px' }}>
                      {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                        <li key={j} style={{ fontSize: '9.5pt', color: '#444', marginBottom: '4px', lineHeight: '1.6', fontFamily: "'Arial', sans-serif" }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ElegantMainSection>
          )}

          {projects.length > 0 && (
            <ElegantMainSection title="Projects" accent={accent} lineColor={lineColor}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '10pt', fontWeight: '700' }}>{proj.title}</span>
                    {proj.techStack && <span style={{ fontSize: '8.5pt', color: '#888', fontStyle: 'italic', fontFamily: "'Arial', sans-serif" }}>{proj.techStack}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '9.5pt', color: '#444', margin: '3px 0 0', lineHeight: '1.6', fontFamily: "'Arial', sans-serif" }}>{proj.description}</p>}
                </div>
              ))}
            </ElegantMainSection>
          )}
        </div>
      </div>
    </div>
  );
}

function HRule({ lineColor }) {
  return <div style={{ borderTop: `1px solid ${lineColor}`, margin: '14px 0 20px' }} />;
}

function ElegantSideSection({ title, lineColor, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{
        fontSize: '8pt', fontWeight: '700', textTransform: 'uppercase',
        letterSpacing: '2.5px', color: charcoalColor, margin: '0 0 8px 0',
        paddingBottom: '6px', borderBottom: `1px solid ${lineColor}`,
        fontFamily: "'Arial', sans-serif",
      }}>{title}</h2>
      {children}
    </div>
  );
}

function ElegantMainSection({ title, lineColor, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <h2 style={{
          fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase',
          letterSpacing: '2.5px', color: '#2C2C2C', margin: 0, whiteSpace: 'nowrap',
          fontFamily: "'Arial', sans-serif",
        }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: lineColor }} />
      </div>
      {children}
    </div>
  );
}

// Needed for sub-component
const charcoalColor = '#2C2C2C';
