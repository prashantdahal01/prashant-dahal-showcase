# Prashant Dahal Portfolio Redesign

## Goal
Build an original, dark editorial portfolio that positions Prashant as a confident full-stack developer without inventing projects, experience, links, or achievements.

## Build
- Replace the placeholder with one immersive scrolling portfolio: loading intro, sticky navigation, hero, about, technology marquee, selected work, journey, capabilities, contact, and minimal footer.
- Use oversized expressive typography, near-black surfaces, crisp light type, a restrained signal-green accent, thin rules, subtle grain, and generous whitespace.
- Present the two verified projects as large editorial case-study rows with abstract, original project visuals. Omit a third project until real details are supplied.
- Keep unavailable GitHub, LinkedIn, live-project, and CV actions visibly unavailable rather than linking to invented destinations. Keep email fully functional.
- Add a mobile fullscreen menu, keyboard-friendly controls, semantic structure, accessible form labels, and responsive project layouts.
- Add lightweight CSS and React interactions: loader, text reveals, progressive scroll reveals, marquee, restrained parallax, project hover movement, and a desktop custom cursor with reduced-motion fallbacks.
- Add the requested page title, description, Open Graph text, social metadata, and font loading.

## Technical details
- Keep this as the index route because the requested experience is explicitly one continuous scroll.
- Use browser-native observers and pointer events rather than a heavy animation library.
- Use generated abstract imagery only for project presentation; no copied or stock assets.
- The contact form will open a prefilled email draft because no message-storage service was requested.

## Validation
- Confirm the preview builds without errors.
- Check desktop and mobile screenshots, menu behavior, section navigation, email form behavior, no horizontal overflow, and reduced-motion support.
