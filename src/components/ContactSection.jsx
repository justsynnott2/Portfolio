import { useState } from 'react';
import ContactModal from './ContactModal';

const externalLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/justsynnott2',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/justin-synnott-7ba42a278/',
    },
];

export default function ContactSection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="contact-section" id="contact">
            <div className="contact-content">
                <p className="section-eyebrow">Contact</p>
                <h2>Let&apos;s connect</h2>
                <p>
                    Have a project, opportunity, or question? I&apos;d be happy to hear
                    from you.
                </p>

                <div className="contact-links" aria-label="Contact links">
                    <button onClick={() => setModalOpen(true)}>
                        Email
                    </button>

                    {externalLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
