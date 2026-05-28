# Justin Synnott — Portfolio

Personal portfolio site built with React 19 and Vite. A single-page, vertically scrolling layout with a sticky header, smooth in-page navigation, and a fully responsive design that adapts from desktop down to mobile.

## Features

- **Project showcase** — each project card opens a modal with a full description, image slideshow, tech stack chips, and a GitHub link
- **Contact form** — in-page email modal (Name, Email, Subject, Message) powered by EmailJS; no backend required
- **Dark / light theme** — automatically follows the visitor's OS preference via `prefers-color-scheme`
- **Resume download** — PDF served directly from the site via the header
- **Responsive layout** — fluid typography with `clamp()`, breakpoints at 760 px (mobile) and 980 px (tablet)
- **English / Spanish translation** — language switcher powered by [ConveyThis](https://www.conveythis.com)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite |
| Styling | Plain CSS with custom properties |
| Email | EmailJS (`@emailjs/browser`) |
| Deployment | TBD |

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

### EmailJS setup

The contact form requires three environment variables. Create a `.env.local` file at the repo root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Sign up at [emailjs.com](https://www.emailjs.com), create a service and a template (variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`), then copy the IDs into the file above. The form will work in any environment that has these variables set; without them it will log an error on submit.

### ConveyThis setup

The language switcher is powered by ConveyThis. To enable it, add the following script tag to `index.html` just before the opening `<head>` tag, replacing `your_api_key` with the key from your ConveyThis dashboard:

```html
<!-- ConveyThis Script Start -->
<script src="//cdn.conveythis.com/javascript/conveythis.js?api_key=your_api_key"></script>
<!-- ConveyThis Script End -->
```

Sign up at [conveythis.com](https://www.conveythis.com) to get an API key and configure which languages to support.

## Notes

- `npm run lint` runs ESLint. There are no tests.
- `.env.local` is gitignored — never commit credentials.
- The resume PDF lives at `public/JS_Resume.pdf`; replace it to update the download link.
