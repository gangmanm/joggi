const nextConfig = {
  output: "export",
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

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

export default nextConfig;
