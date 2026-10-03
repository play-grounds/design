/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/design/tshirts" : "",
};

export default nextConfig;
