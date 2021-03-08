# What is this?

This folder exists to give Nuxt something empty to scan when searching for pages. Because this site opts to define routes manually for more explicit control, a "diversion" of sorts is required to get Nuxt to play along.

Specifically, if the `dir:pages` path in `~/nuxt.config.js` points to a non-existent folder, Nuxt will bail out & revert to using the default `~/pages` path. No good!
