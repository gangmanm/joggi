const nextConfig = {
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true, // Server Actions 활성화
  },
};

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

export default nextConfig;
