/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "export",
  distDir: "dist",  
  // trailingSlash: true,                       // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`  
  // skipTrailingSlashRedirect: true,           // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
};
