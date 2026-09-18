# Recipe: Reduce File Complexity

Target hotspot: `public/assets/js/main.js`
(complexity 1.0, centrality 0.4)

1. Read dependents: `grep -n 'public/assets/js/main.js' readmenator-agent/ARCHITECTURE.md`
2. Extract functions/classes into new files in the same subsystem
3. Update imports
4. Regenerate: `readmenator .`
