// Creative Template - Bold expressive layout with accent sidebar

export default function CreativeTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const purple = '#6C3FC5';
  const pink = '#E91E8C';
  const lightPurple = '#F0EAFB';

  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontSize: '9.5pt', color: '#2d2d2d', backgroundColor: '#fff', minHeight: '100%' }}>
      {/* Bold color header */}
      <div style={{
        background: `linear-gradient(135deg, ${purple} 0%, ${pink} 100%)`,
        padding: '40px 48px 32px',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: '30pt', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.5px', lineHeight: 1 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {experience.length > 0 && experience[0].role && (
          <p style={{ fontSize: '12pt', margin: '0 0 14px 0', opacity: 0.9, fontWeight: '300', letterSpacing: '1px' }}>
            {experience[0].role}
          </p>
        )}
        {/* Contact row */}
        {(() => {
          const cleanUrl = (url) => (url || '').replace(/^https?:\/\/(www\.)?/, '');
          const items = [
            personalInfo.email && { icon: '✉', text: personalInfo.email },
            personalInfo.phone && { icon: '☎', text: personalInfo.phone },
            personalInfo.location && { icon: '📍', text: personalInfo.location },
            personalInfo.linkedin && { icon: 'in', text: cleanUrl(personalInfo.linkedin) },
            personalInfo.github && { icon: '⌨', text: cleanUrl(personalInfo.github) },
          ].filter(Boolean);
          return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {items.map((item, i) => (
                <span key={i} style={{ fontSize: '8.5pt', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '10pt' }}>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Body: 3-col left gutter + main */}
      <div style={{ display: 'flex' }}>
        {/* Left accent sidebar */}
        <div style={{ width: '220px', backgroundColor: lightPurple, padding: '30px 20px', flexShrink: 0 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <SideBlock title="Skills" purple={purple} pink={pink}>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: '600', color: '#333', marginBottom: '2px' }}>{skill}</div>
                  <div style={{ height: '4px', borderRadius: '2px', backgroundColor: '#ddd', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '80%', background: `linear-gradient(90deg, ${purple}, ${pink})`, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </SideBlock>
          )}

          {/* Education */}
          {education.length > 0 && (
            <SideBlock title="Education" purple={purple} pink={pink}>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '9pt', fontWeight: '700', color: purple }}>{edu.degree}</div>
                  <div style={{ fontSize: '8pt', color: '#555' }}>{edu.institution}</div>
                  <div style={{ fontSize: '7.5pt', color: '#888' }}>{edu.year}</div>
                  {edu.gpa && <div style={{ fontSize: '7.5pt', color: '#888' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </SideBlock>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SideBlock title="Certifications" purple={purple} pink={pink}>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '8.5pt', fontWeight: '600', color: purple }}>{cert.name}</div>
                  <div style={{ fontSize: '7.5pt', color: '#666' }}>{cert.issuer} {cert.year && `· ${cert.year}`}</div>
                </div>
              ))}
            </SideBlock>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '30px 36px' }}>
          {summary && (
            <MainBlock title="About Me" purple={purple} pink={pink}>
              <p style={{ fontSize: '9.5pt', lineHeight: '1.75', color: '#444', margin: 0 }}>{summary}</p>
            </MainBlock>
          )}

          {experience.length > 0 && (
            <MainBlock title="Experience" purple={purple} pink={pink}>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '18px', paddingLeft: '14px', borderLeft: `3px solid ${purple}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10.5pt', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>{exp.role}</h3>
                    <span style={{ fontSize: '7.5pt', color: '#888', whiteSpace: 'nowrap' }}>
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div style={{ fontSize: '9pt', color: pink, fontWeight: '600', marginBottom: '5px' }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.bullets?.filter(b => b.trim()).length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '14px' }}>
                      {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                        <li key={j} style={{ fontSize: '9pt', color: '#444', marginBottom: '3px', lineHeight: '1.55' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </MainBlock>
          )}

          {projects.length > 0 && (
            <MainBlock title="Projects" purple={purple} pink={pink}>
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '12px', padding: '10px 14px', backgroundColor: lightPurple, borderRadius: '6px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '10pt', fontWeight: '700', color: purple }}>{proj.title}</span>
                    {proj.techStack && <span style={{ fontSize: '7.5pt', color: '#888' }}>| {proj.techStack}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '9pt', color: '#444', margin: '4px 0 0', lineHeight: '1.55' }}>{proj.description}</p>}
                  {proj.link && <a href={proj.link} style={{ fontSize: '8pt', color: pink }}>{proj.link}</a>}
                </div>
              ))}
            </MainBlock>
          )}
        </div>
      </div>
    </div>
  );
}

function SideBlock({ title, purple, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{
        fontSize: '9pt', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px',
        margin: '0 0 10px 0', paddingBottom: '5px',
        borderBottom: `2px solid ${purple}`, color: purple,
      }}>{title}</h3>
      {children}
    </div>
  );
}

function MainBlock({ title, purple, pink, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: `linear-gradient(135deg, ${purple}, ${pink})` }} />
        <h2 style={{ fontSize: '12pt', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1a1a1a', margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: '2px', background: `linear-gradient(90deg, ${purple}33, transparent)` }} />
      </div>
      {children}
    </div>
  );
}
