// Tech Template - Developer-focused clean grid layout

export default function TechTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const teal = '#0D9488';
  const dark = '#0F172A';
  const slate = '#334155';
  const lightBg = '#F8FAFC';

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: '9.5pt', color: dark, backgroundColor: '#fff', minHeight: '100%' }}>
      {/* Header bar with code-inspired styling */}
      <div style={{ backgroundColor: dark, padding: '32px 44px 28px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '9pt', color: teal, fontFamily: "'Courier New', monospace", marginBottom: '4px' }}>
              {'<developer>'}
            </div>
            <h1 style={{ fontSize: '26pt', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px', color: '#F1F5F9' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {experience.length > 0 && experience[0].role && (
              <p style={{ fontSize: '10pt', color: teal, margin: '0 0 4px 0', fontWeight: '500' }}>
                {experience[0].role}
              </p>
            )}
            <div style={{ fontSize: '9pt', color: teal, fontFamily: "'Courier New', monospace" }}>
              {'</developer>'}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '8pt', color: '#94A3B8', lineHeight: '1.8' }}>
            {personalInfo.email && <div>✉ {personalInfo.email}</div>}
            {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.linkedin && <div>🔗 {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</div>}
            {personalInfo.github && <div>⌨ {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</div>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        {/* Left column */}
        <div style={{ width: '200px', flexShrink: 0, backgroundColor: lightBg, padding: '28px 20px', borderRight: '1px solid #E2E8F0' }}>
          {/* Tech Stack */}
          {skills.length > 0 && (
            <TechSideBlock title="Tech Stack" teal={teal} dark={dark}>
              {skills.map((skill, i) => (
                <div key={i} style={{
                  fontSize: '8pt', padding: '3px 8px', marginBottom: '4px',
                  backgroundColor: '#fff', border: `1px solid ${teal}33`,
                  borderRadius: '3px', color: slate, fontFamily: "'Courier New', monospace",
                  display: 'inline-block', marginRight: '4px',
                }}>
                  {skill}
                </div>
              ))}
            </TechSideBlock>
          )}

          {/* Education */}
          {education.length > 0 && (
            <TechSideBlock title="Education" teal={teal} dark={dark}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: '700', color: dark }}>{edu.degree}</div>
                  <div style={{ fontSize: '8pt', color: slate }}>{edu.institution}</div>
                  <div style={{ fontSize: '7.5pt', color: teal, fontFamily: "'Courier New', monospace" }}>{edu.year}</div>
                  {edu.gpa && <div style={{ fontSize: '7.5pt', color: '#888' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </TechSideBlock>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <TechSideBlock title="Certifications" teal={teal} dark={dark}>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: '600', color: dark }}>{cert.name}</div>
                  <div style={{ fontSize: '7.5pt', color: slate }}>{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</div>
                </div>
              ))}
            </TechSideBlock>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '28px 36px' }}>
          {/* Summary */}
          {summary && (
            <TechMainBlock title="About" teal={teal} dark={dark}>
              <p style={{ fontSize: '9.5pt', lineHeight: '1.7', color: slate, margin: 0, paddingLeft: '12px', borderLeft: `3px solid ${teal}` }}>{summary}</p>
            </TechMainBlock>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <TechMainBlock title="Experience" teal={teal} dark={dark}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10.5pt', fontWeight: '700', margin: 0, color: dark }}>{exp.role}</h3>
                    <span style={{ fontSize: '8pt', color: teal, fontFamily: "'Courier New', monospace", whiteSpace: 'nowrap' }}>
                      {formatDate(exp.startDate)} → {exp.current ? 'now' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '9pt', color: teal, fontWeight: '500', marginBottom: '6px' }}>
                    @ {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.bullets?.filter(b => b.trim()).length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                        <li key={j} style={{ fontSize: '9pt', color: slate, marginBottom: '3px', lineHeight: '1.55' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </TechMainBlock>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <TechMainBlock title="Projects" teal={teal} dark={dark}>
              {projects.map((proj, i) => (
                <div key={i} style={{
                  marginBottom: '12px', padding: '10px 14px',
                  backgroundColor: lightBg, borderRadius: '4px',
                  borderLeft: `3px solid ${teal}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '10pt', fontWeight: '700', color: dark, fontFamily: "'Courier New', monospace" }}>
                      {proj.title}
                    </span>
                    {proj.techStack && (
                      <span style={{ fontSize: '7.5pt', color: teal, fontFamily: "'Courier New', monospace" }}>[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: '9pt', color: slate, margin: '4px 0 0', lineHeight: '1.55' }}>{proj.description}</p>
                  )}
                  {proj.link && (
                    <div style={{ fontSize: '8pt', color: teal, marginTop: '3px', fontFamily: "'Courier New', monospace" }}>
                      🔗 {proj.link}
                    </div>
                  )}
                </div>
              ))}
            </TechMainBlock>
          )}
        </div>
      </div>
    </div>
  );
}

function TechSideBlock({ title, teal, dark, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{
        fontSize: '8pt', fontWeight: '700', textTransform: 'uppercase',
        letterSpacing: '1.5px', margin: '0 0 10px 0',
        paddingBottom: '5px', borderBottom: `2px solid ${teal}`,
        color: dark, fontFamily: "'Courier New', monospace",
      }}>{title}</h3>
      {children}
    </div>
  );
}

function TechMainBlock({ title, teal, dark, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{
        fontSize: '11pt', fontWeight: '800', textTransform: 'uppercase',
        letterSpacing: '2px', margin: '0 0 12px 0',
        paddingBottom: '6px', borderBottom: `2px solid ${teal}`,
        color: dark,
      }}>
        <span style={{ color: teal, fontFamily: "'Courier New', monospace", fontSize: '10pt' }}>// </span>
        {title}
      </h2>
      {children}
    </div>
  );
}
