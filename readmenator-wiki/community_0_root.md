# root

*Community 0 | 2 files | cohesion 1.00*

## Definition

This community groups 2 file(s) rooted at `public/assets/js` with dominant language js (cohesion 1.00). Central symbols: `headerScrolled`, `navbarlinksActive`, `on`, `onscroll`, `select`, `to`, `toggleBacktotop`. Core file: `public/assets/js/main.js` (7 symbols).

## Files

| File | Language | Layer | Symbols | Doc |
|------|----------|-------|---------|-----|
| `index.js` | js | presentation | 0 | no |
| `public/assets/js/main.js` | js | utility | 7 | no |

## Key Symbols

- `select` (function, `public/assets/js/main.js:14`) - Easy selector helper function
- `on` (function, `public/assets/js/main.js:26`) - Easy event listener function
- `onscroll` (function, `public/assets/js/main.js:37`) - Easy on scroll event listener
- `navbarlinksActive` (function, `public/assets/js/main.js:63`)
- `to` (class, `public/assets/js/main.js:80`)
- `headerScrolled` (function, `public/assets/js/main.js:84`)
- `toggleBacktotop` (function, `public/assets/js/main.js:100`)

## Internal vs External Edges

- Internal resolved imports (EXTRACTED): 0
- Cross-boundary resolved imports (EXTRACTED): 0

## Connections

- No cross-community bridges recorded. This community is self-contained.

## Risks

- No scoped security, taint, cycle, or layer risks.

## Open Questions

- Why do 2 file(s) lack file-level docs (e.g. `index.js`)? What purpose do they serve?
- What would break if the most connected file in root changed?
- Should root be split, given cohesion 1.00?

## Sources

- `index.js`
- `public/assets/js/main.js`
