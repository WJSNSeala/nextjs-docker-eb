/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  assetPrefix: process.env.NEXTJS_CDN_URL || "",
};
