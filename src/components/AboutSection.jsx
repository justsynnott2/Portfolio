// Each group renders as a labeled cluster of skill chips in the right-hand panel
const skillGroups = [
    {
        label: 'Languages',
        skills: ['Java', 'Python', 'JavaScript'],
    },
    {
        label: 'Frontend',
        skills: ['React', 'HTML', 'CSS'],
    },
    {
        label: 'Backend & Data',
        skills: ['Node.js', 'SQL', 'REST APIs'],
    },
    {
        label: 'Tools',
        skills: ['Git', 'Vite', 'VS Code'],
    },
];

export default function AboutSection() {
    return (
        <section className="about-section" id="about">
            <div className="about-content">
                {/* Left column: bio copy */}
                <div className="about-copy">
                    <p className="section-eyebrow">About</p>
                    <h2>About Me</h2>
                    <p>
                        I&apos;m a software developer and computer science student focused on
                        building practical, well-structured applications. I enjoy turning ideas
                        into clean interfaces, solving technical problems, and improving projects
                        through thoughtful iteration.
                    </p>
                </div>

                {/* Right column: skill chips grouped by category */}
                <div className="skills-panel" aria-label="Skill stack">
                    {skillGroups.map((group) => (
                        <div className="skill-group" key={group.label}>
                            <h3>{group.label}</h3>
                            <div className="skill-list">
                                {group.skills.map((skill) => (
                                    <span className="skill-chip" key={skill}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
