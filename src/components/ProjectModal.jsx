import { useRef, useEffect, useState } from 'react';

export default function ProjectModal({ project, onClose }) {
    // dialogRef lets us call showModal() / close() imperatively — the native <dialog>
    const dialogRef = useRef(null);

    // Current index into the screenshots array for the slideshow
    const [slideIndex, setSlideIndex] = useState(0);

    // Whether the full-screen lightbox is open over the modal
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // A ref that mirrors lightboxOpen so the cancel event listener can read the
    // current value without capturing a stale closure (the listener is registered
    // once and would otherwise always see the initial false value)
    const lightboxOpenRef = useRef(false);

    // Open or close the native dialog whenever the active project changes
    useEffect(() => {
        const dialog = dialogRef.current;
        if (project) {
            dialog.showModal();
        } else if (dialog.open) {
            dialog.close();
        }
    }, [project]);

    // Pressing ESC fires a 'cancel' event on the dialog (not a regular click).
    // Intercept it so ESC closes only the lightbox first; a second ESC closes the modal.
    useEffect(() => {
        const dialog = dialogRef.current;
        const handleCancel = (e) => {
            e.preventDefault(); // stop the browser from closing the dialog automatically
            if (lightboxOpenRef.current) {
                setLightboxOpen(false);
            } else {
                onClose();
            }
        };
        dialog.addEventListener('cancel', handleCancel);
        return () => dialog.removeEventListener('cancel', handleCancel);
    }, [onClose]);

    // Keep the ref in sync with state so the cancel listener always has the latest value
    useEffect(() => { lightboxOpenRef.current = lightboxOpen; }, [lightboxOpen]);

    // Reset both the slide position and the lightbox whenever a new project is opened
    useEffect(() => { setSlideIndex(0); setLightboxOpen(false); }, [project]);

    // Clicking directly on the dialog element (the full-screen overlay area outside
    // the inner card) closes the modal
    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) onClose();
    }

    // Default to an empty array so prev/next math never runs on undefined
    const screenshots = project?.screenshots ?? [];

    // Modulo arithmetic makes navigation wrap: going back from index 0 lands on the last
    function prev() { setSlideIndex(i => (i - 1 + screenshots.length) % screenshots.length); }
    function next() { setSlideIndex(i => (i + 1) % screenshots.length); }

    return (
        <dialog ref={dialogRef} className="project-modal" onClick={handleBackdropClick}>
            <div className="project-modal-inner">
                <div className="project-modal-header">
                    <h2>{project?.title}</h2>
                    <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>

                <p className="project-modal-description">{project?.description}</p>

                {/* Slideshow — only rendered when there are screenshots to show */}
                {screenshots.length > 0 && (
                    <div className="project-modal-slideshow">
                        {/* Clicking the image opens the full-screen lightbox */}
                        <img
                            src={screenshots[slideIndex]}
                            alt={`${project.title} screenshot ${slideIndex + 1}`}
                            className="slideshow-image"
                            onClick={() => setLightboxOpen(true)}
                        />
                        {/* Navigation controls are hidden when there's only one screenshot */}
                        {screenshots.length > 1 && (
                            <div className="slideshow-controls">
                                <button onClick={prev} aria-label="Previous screenshot">‹</button>
                                <span>{slideIndex + 1} / {screenshots.length}</span>
                                <button onClick={next} aria-label="Next screenshot">›</button>
                            </div>
                        )}
                    </div>
                )}

                {project?.tech?.length > 0 && (
                    <div>
                        <p className="project-modal-label">Tech Stack</p>
                        <div className="project-tech-list" aria-label={`${project.title} tech stack`}>
                            {project.tech.map((item) => (
                                <span className="skill-chip" key={item}>{item}</span>
                            ))}
                        </div>
                    </div>
                )}

                {project?.github && (
                    <div className="project-links">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </a>
                    </div>
                )}
            </div>

            {/* Lightbox — full-screen overlay rendered inside the dialog so it layers correctly.
                stopPropagation is on the content wrapper (not the image) so that clicking
                the prev/next buttons also won't accidentally dismiss the lightbox. */}
            {lightboxOpen && (
                <div
                    className="lightbox-overlay"
                    onClick={() => setLightboxOpen(false)}
                >
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={screenshots[slideIndex]}
                            alt={`${project.title} screenshot ${slideIndex + 1} enlarged`}
                        />
                        {/* Same prev/next controls as the slideshow — index is shared */}
                        {screenshots.length > 1 && (
                            <div className="lightbox-controls">
                                <button onClick={prev} aria-label="Previous screenshot">‹</button>
                                <span>{slideIndex + 1} / {screenshots.length}</span>
                                <button onClick={next} aria-label="Next screenshot">›</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    );
}
