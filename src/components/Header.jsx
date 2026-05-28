// Links rendered in the primary <nav> — add, remove, or reorder entries here
const navItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

// theme: 'light' | 'dark' — determines which icon the toggle shows
// onToggleTheme: called when the user clicks the toggle button
export default function Header({ theme, onToggleTheme }) {
    return (
        <header className="header">
            <a className="header-title" href="#home" aria-label="Justin Synnott home">
                Synnott
            </a>

            <nav className="header-nav" aria-label="Primary navigation">
                {navItems.map((item) => (
                    <a key={item.href} href={item.href}>
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Toggle and Resume are grouped in a flex row so they sit together on the right */}
            <div className="header-actions">
                {/* Shows the moon in light mode (click to go dark) and sun in dark mode (click to go light) */}
                <button
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? '☀' : '☾'}
                </button>
                <a
                    className="header-resume"
                    href="/JS_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Resume
                </a>
            </div>
        </header>
    );
}
