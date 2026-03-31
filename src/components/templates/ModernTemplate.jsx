export default function ModernTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const accentColor = '#e94560';

  return (
    <div style={{ display: 'flex', minHeight: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '10pt' }}>
      {/* Sidebar */}
      <div style={{
        width: '35%',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        padding: '40px 24px',
      }}>
        {/* Name & Title */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '22pt',
            fontWeight: '700',
            fontFamily: "'Playfair Display', serif",
            lineHeight: '1.2',
            marginBottom: '8px',
          }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {experience.length > 0 && experience[0].role && (
            <p style={{ fontSize: '10pt', color: accentColor, fontWeight: '500' }}>
              {experience[0].role}
            </p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={sidebarHeading(accentColor)}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '8.5pt' }}>
            {personalInfo.email && (
              <div style={contactItem}>
                <span style={contactIcon}>✉</span> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div style={contactItem}>
                <span style={contactIcon}>☎</span> {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div style={contactItem}>
                <span style={contactIcon}>📍</span> {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={contactItem}>
                <span style={contactIcon}>in</span> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </div>
            )}
            {personalInfo.github && (
              <div style={contactItem}>
                <span style={contactIcon}>⌨</span> {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
              </div>
            )}
            {personalInfo.portfolio && (
              <div style={contactItem}>
                <span style={contactIcon}>🌐</span> {personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={sidebarHeading(accentColor)}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '8pt',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(233, 69, 96, 0.2)',
                  color: '#f0c0c0',
                  border: '1px solid rgba(233, 69, 96, 0.3)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={sidebarHeading(accentColor)}>Education</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '9.5pt', fontWeight: '600' }}>{edu.degree}</div>
                <div style={{ fontSize: '8.5pt', color: '#a8a8b3' }}>{edu.institution}</div>
                <div style={{ fontSize: '8pt', color: accentColor }}>{edu.year}</div>
                {edu.gpa && <div style={{ fontSize: '8pt', color: '#a8a8b3' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 style={sidebarHeading(accentColor)}>Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '9pt', fontWeight: '600' }}>{cert.name}</div>
                <div style={{ fontSize: '8pt', color: '#a8a8b3' }}>
                  {cert.issuer} {cert.year && `• ${cert.year}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '65%', padding: '40px 32px', backgroundColor: '#ffffff', color: '#1a1a1a' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={mainHeading(accentColor)}>Profile</h2>
            <p style={{ fontSize: '9.5pt', lineHeight: '1.7', color: '#444' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={mainHeading(accentColor)}>Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11pt', fontWeight: '700', margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontSize: '8pt', color: '#888', whiteSpace: 'nowrap' }}>
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div style={{ fontSize: '9pt', color: accentColor, fontWeight: '500', marginBottom: '6px' }}>
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
                {exp.bullets?.filter(b => b.trim()).length > 0 && (
                  <ul style={{ margin: '0', paddingLeft: '16px' }}>
                    {exp.bullets.filter(b => b.trim()).map((bullet, j) => (
                      <li key={j} style={{ fontSize: '9pt', marginBottom: '3px', color: '#444', lineHeight: '1.5' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={mainHeading(accentColor)}>Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <h3 style={{ fontSize: '10pt', fontWeight: '700', margin: 0 }}>{proj.title}</h3>
                  {proj.techStack && (
                    <span style={{ fontSize: '8pt', color: '#888' }}>| {proj.techStack}</span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ fontSize: '9pt', color: '#444', margin: '3px 0 0 0', lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const sidebarHeading = (accent) => ({
  fontSize: '10pt',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  marginBottom: '12px',
  paddingBottom: '6px',
  borderBottom: `2px solid ${accent}`,
  color: '#ffffff',
  fontFamily: "'DM Sans', sans-serif",
});

const mainHeading = (accent) => ({
  fontSize: '13pt',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '14px',
  paddingBottom: '6px',
  borderBottom: `2px solid ${accent}`,
  color: '#1a1a2e',
  fontFamily: "'Playfair Display', serif",
});

const contactItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#d0d0d0',
  wordBreak: 'break-all',
};

const contactIcon = {
  width: '16px',
  textAlign: 'center',
  fontSize: '10pt',
  flexShrink: 0,
};
