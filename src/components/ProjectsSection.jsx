import { useState } from 'react';
import ProjectModal from './ProjectModal.jsx';

// Each project object drives both the card on the page and the detail modal.
// Fields:
//   title       — displayed on both the card and the modal header
//   summary     — shorter text shown on the card
//   description — longer text shown only inside the modal
//   tech        — array of technology names rendered as chips
//   github      — repo URL shown as a direct link on the card and in the modal;
//                 set to null to hide the GitHub button entirely
//   screenshots — array of local image paths (served from public/screenshots/);
//                 empty array = no slideshow shown in the modal
const projects = [
    {
        title: 'TBD',
        summary: 'More Projects coming soon! I have a few in the works that I\'m excited to share!',
        description: null,
        tech: [],
        github: null,
        screenshots: [],
    },
    {
        title: 'CenterPlate',
        summary: 'Group Dining Coordination App that solves the headache of arguing over where to eat. Participants enter location and cuisine preferences, and the app generates a list of nearby restaurants that best match the group\'s tastes.',
        description: 'CenterPlate is a real-time group dining coordination app built to eliminate the friction of deciding where to eat. Each participant joins a shared session and submits their location and cuisine preferences. The app then queries the Foursquare API to surface nearby restaurants, ranks them against the group\'s collective preferences, and presents a shortlist everyone can agree on. Sessions are kept in sync via Socket.IO so all participants see results update live as others submit their preferences.',
        tech: ['React Native', 'Node/Express.js', 'MongoDB', 'Socket.IO', 'Firebase', 'Foursquare API'],
        github: 'https://github.com/justsynnott2/Center-Plate',
        screenshots: [],
    },
    {
        title: 'FitTracker',
        summary: 'A fitness and nutrition tracking web application that allows users to log workouts and meals, set goals, and track progress over time. Users can also post on the social feed to share achievements and connect with friends for motivation.',
        description: 'FitTracker is a full-stack fitness and nutrition platform designed for users who want a single place to manage their health data. Users can log detailed workout sessions and meals, set weekly goals, and view progress charts over time. A social feed lets users share milestone achievements and interact with friends, adding an accountability layer to the experience. The backend is built with Node/Express.js and MongoDB for primary data, Redis for session caching, and MinIO for storing user-uploaded images. The frontend is written in React with TypeScript and styled using TailwindCSS. The entire stack is containerised with Docker for consistent local development and deployment.',
        tech: ['React', 'TypeScript', 'TailwindCSS', 'Node/Express.js', 'MongoDB', 'Redis', 'MinIO', 'Docker'],
        github: 'https://github.com/justsynnott2/FitTracker',
        screenshots: [
            '/screenshots/fit-tracker/login.png',
            '/screenshots/fit-tracker/dashboard.png',
            '/screenshots/fit-tracker/profile.png',
            '/screenshots/fit-tracker/feed.png',
            '/screenshots/fit-tracker/progress.png',
            '/screenshots/fit-tracker/meals.png',
            '/screenshots/fit-tracker/workouts.png',
        ],
    },
];

export default function ProjectsSection() {
    // null = modal closed; a project object = that project's modal is open
    const [activeProject, setActiveProject] = useState(null);

    return (
        <section className="projects-section" id="projects">
            <div className="projects-content">
                <div className="projects-header">
                    <p className="section-eyebrow">Projects</p>
                    <h2>Featured Work</h2>
                    <p>
                        A few projects and concepts that show how I approach interfaces,
                        architecture, and practical problem solving.
                    </p>
                </div>

                <div className="project-grid">
                    {projects.map((project) => (
                        <article className="project-card" key={project.title}>
                            <div>
                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>
                            </div>

                            <div className="project-tech-list" aria-label={`${project.title} tech stack`}>
                                {project.tech.map((item) => (
                                    <span className="skill-chip" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Only show action buttons on cards that have actual content (not the TBD placeholder) */}
                            {project.tech.length > 0 && (
                                <div className="project-links">
                                    {/* Opens the detail modal for this project */}
                                    <button
                                        className="project-link-btn"
                                        onClick={() => setActiveProject(project)}
                                    >
                                        View Project
                                    </button>
                                    {/* Direct link to the repo; hidden if github is null */}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>

            {/* Single modal instance shared across all project cards */}
            <ProjectModal
                project={activeProject}
                onClose={() => setActiveProject(null)}
            />
        </section>
    );
}
