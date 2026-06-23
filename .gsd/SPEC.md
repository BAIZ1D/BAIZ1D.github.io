# SPEC: Personal Website Enhancements

This specification outlines the completed and planned changes to BAIZ1D's personal website.

## Completed Tasks
1. **Neo-Brutalist Sticker Profile Picture**:
   - Transformed the static profile photo into a dynamic, rotated sticker badge with a bold white border, black frame, hard offset shadow, and wiggle/hover animation.
2. **About Me Base Card**:
   - Created the About Me console window with retro OS buttons and the 3-pillar engineering breakdown cards.
3. **Interactive Command Console Terminal**:
   - Implemented toggle tabs and the matrix-themed command shell interpreter with help/projects/contact/clear logic.

## Planned Tasks & Bug Fixes
### 4. Fix Terminal Viewport Jump Bug (Active)
- **Problem**: Switching to the terminal tab or typing a command triggers a browser-wide viewport scroll (the page jumps down slightly).
- **Cause**: The current scroll logic uses `element.scrollIntoView()`, which scrolls the browser window to align the terminal text in the viewport.
- **Solution**:
  - Replace the global `scrollIntoView()` call.
  - Implement a container-scoped `ref` (`terminalScrollRef`) on the scrollable terminal list element.
  - Programmatically set `terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight` inside the `useEffect` hook.
  - This ensures that only the terminal buffer container scrolls, leaving the main browser window entirely static.
