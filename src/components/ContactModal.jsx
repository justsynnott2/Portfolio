import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const INITIAL_FORM = { name: '', from: '', subject: '', body: '' };

export default function ContactModal({ open, onClose }) {
    const dialogRef = useRef(null);
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open) {
            dialog.showModal();
        } else if (dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        const dialog = dialogRef.current;
        const handleCancel = (e) => {
            e.preventDefault();
            onClose();
        };
        dialog.addEventListener('cancel', handleCancel);
        return () => dialog.removeEventListener('cancel', handleCancel);
    }, [onClose]);

    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) onClose();
    }

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('sending');
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.from,
                    subject: form.subject,
                    message: form.body,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            );
            setStatus('success');
            setTimeout(() => {
                setForm(INITIAL_FORM);
                setStatus('idle');
                onClose();
            }, 1500);
        } catch {
            setStatus('error');
        }
    }

    function handleClose() {
        setForm(INITIAL_FORM);
        setStatus('idle');
        onClose();
    }

    return (
        <dialog ref={dialogRef} className="contact-modal" onClick={handleBackdropClick}>
            <div className="contact-modal-inner">
                <div className="contact-modal-header">
                    <h2>Send a message</h2>
                    <button className="contact-modal-close" onClick={handleClose} aria-label="Close modal">
                        ×
                    </button>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-field">
                        <label htmlFor="cm-name">Name</label>
                        <input
                            id="cm-name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-form-field">
                        <label htmlFor="cm-from">Email</label>
                        <input
                            id="cm-from"
                            name="from"
                            type="email"
                            placeholder="you@example.com"
                            value={form.from}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-form-field">
                        <label htmlFor="cm-subject">Subject</label>
                        <input
                            id="cm-subject"
                            name="subject"
                            type="text"
                            placeholder="What's this about?"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact-form-field">
                        <label htmlFor="cm-body">Message</label>
                        <textarea
                            id="cm-body"
                            name="body"
                            placeholder="Your message…"
                            value={form.body}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {status === 'error' && (
                        <p className="contact-form-error">Something went wrong. Please try again.</p>
                    )}

                    <button
                        type="submit"
                        className="contact-form-submit"
                        disabled={status === 'sending' || status === 'success'}
                    >
                        {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent!' : 'Send message'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}
