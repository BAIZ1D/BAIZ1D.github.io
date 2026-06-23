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
### 5. Responsive Mobile Grid Order Fix
- **Problem**: On mobile devices and small screen viewports, the Left Column (Connect, Education, Languages, Honors, Stack) renders *above* the Right Column (About Me, Projects, Publications, Experience) because it is defined first in the HTML. However, the "About Me" section should be the primary, most visible element on mobile as well.
- **Cause**: Standard CSS Grid renders children sequentially in 1-column layouts.
- **Solution**:
  - Apply Tailwind responsive flexbox/grid ordering classes (`order-x`) to the layout columns.
  - Left Column (Sidebar details): Add `order-2 lg:order-1`.
  - Right Column (About Me & Main content): Add `order-1 lg:order-2`.
  - This forces the main content (About Me, Projects, Experience) to render at the top on mobile, while retaining the correct multi-column layout on desktop.
