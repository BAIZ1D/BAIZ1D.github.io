# SPEC: Personal Website Enhancements

This specification outlines the completed and planned changes to BAIZ1D's personal website.

## Completed Tasks
1. **Neo-Brutalist Sticker Profile Picture**:
   - Transformed the static profile photo into a dynamic, rotated sticker badge with a bold white border, black frame, hard offset shadow, and wiggle/hover animation.
2. **About Me Base Card**:
   - Created the About Me console window with retro OS buttons and the 3-pillar engineering breakdown cards.

## Planned Tasks
### 3. Interactive Command Console Terminal
- **Objective**: Turn the "About Me" console card into an interactive terminal console.
- **Requirements**:
  - Keep the retro top title bar.
  - Convert the lower grid block into a dual layout: left-side (or top-side on mobile) static intro summary, right-side (or bottom-side) terminal shell. Or replace the bottom part with an embedded shell prompt.
  - Better yet: Keep the static "About Me" summary card intact, and *append* a dedicated, collapsable or inline "Interactive Shell Terminal" block inside the console, OR turn the card itself into a togglable console/terminal window!
  - Let's make it togglable: A tab/toggle inside the About Me console bar, allowing users to switch between "Overview" (the beautiful grid description) and "Interactive Terminal"! This is highly professional, keeps the layout clean, and prevents clutter.
- **Terminal Shell Specs**:
  - Initial message: "Type 'help' to see available commands."
  - Output logs tracking inputs and response streams.
  - Commands:
    - `help`: Returns list of executable options (`projects`, `contact`, `clear`).
    - `projects`: Lists:
      - `[1] yterm (GitHub)`
      - `[2] petition-legislation-matching (GitHub)`
      - `[3] BaitoTracker (Live App)`
      - Prompt instructs: "Type 1, 2, or 3 to open, or 'back' to return." Typing `1`/`2`/`3` opens the corresponding URL in a new window/tab and prints a confirmation.
    - `contact`: Prints:
      - Email: `baizid.al.hamid@gmail.com`
      - Phone: `+81-90-5683-2771`
      - LinkedIn: `https://www.linkedin.com/in/baizidalhamid`
    - `clear`: Empties the screen buffer and resets logs.
  - Accessibility:
    - Autofocus input on console area click.
    - Enter key handler.
    - Clean command-history tracking or log list scroll management.
