import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/content",
  latex: true,
});

const nextConfig: NextConfig = {};

export default withNextra(nextConfig);
