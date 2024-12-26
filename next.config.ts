const nextConfig = {
  output: "standalone", // 변경
  basePath: "",
  assetPrefix: "https://jogi.co.kr",
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
