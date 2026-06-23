# SPEC: Personal Website Enhancements

This specification outlines the completed and planned changes to BAIZ1D's personal website.

## Completed Tasks
1. **Neo-Brutalist Sticker Profile Picture**:
   - Transformed the static profile photo into a dynamic, rotated sticker badge with a bold white border, black frame, hard offset shadow, and wiggle/hover animation.
2. **About Me Base Card**:
   - Created the About Me console window with retro OS buttons and the 3-pillar engineering breakdown cards.
3. **Interactive Command Console Terminal**:
   - Implemented toggle tabs and the matrix-themed command shell interpreter with help/projects/contact/clear logic.
4. **Fix Terminal Viewport Jump Bug**:
   - Swapped `scrollIntoView()` with a scoped `scrollTop` assignment on `terminalScrollRef` to contain scrolling strictly inside the shell.

## Planned Tasks
### 5. Responsive Mobile Grid Order Fix (React Render Approach)
- **Objective**: On mobile viewports, stack elements in the exact sequence:
  1. About Me
  2. Connect, Education, Languages, Honors, Technical Stack (Sidebar details)
  3. Projects Portfolio, Publications & Datasets, Professional Experience (Main content)
- **Constraint**: On desktop, maintain two clean columns: sidebar details stacked tightly on the left, main content stacked tightly on the right, without large empty vertical row gaps.
- **Solution**:
  - Encapsulate the individual sections into local render functions inside the `App` component function closure (e.g. `renderAboutMe`, `renderConnect`, `renderProjects`, etc.). This preserves direct access to react states.
  - Implement two responsive container layouts inside the main render block:
    - **Desktop Layout (`hidden lg:grid`)**: Renders two columns containing the sections in their original desktop positions (Sidebar left, Main right).
    - **Mobile Layout (`flex flex-col lg:hidden`)**: Renders sections in the exact sequential order requested.
  - This provides a robust, responsive solution with no visual layout gaps on desktop and perfect ordering on mobile devices.

### 6. Retro Cassette Tape Deck Widget
- **Objective**: Fill the empty space below the Technical Stack card on the desktop left column with a vintage-themed, fully interactive cassette tape deck.
- **Design**:
  - A card following neo-brutalist guidelines: bold borders, solid background (`bg-neoYellow` or `bg-neoOrange`), hard shadows.
  - Visual cassette tape inside a clear window, complete with labels, spindles, and a play/pause LED indicator.
  - Realistic player buttons (Play/Pause, Stop, Next Track) that press down on active click.
  - Volume control slider.
- **Interactivity & Audio**:
  - React state driving a hidden HTML5 audio element.
  - Rotate the tape reels via a CSS infinite keyframe rotation animation when playing.
  - Pulse the red/green LED when music is playing.
  - Audio list with 4 synthwave/chiptune tracks from stable public domain URLs (Helix MP3s).
  - Hidden on mobile viewports (`hidden lg:block`) as mobile height is already dense.
