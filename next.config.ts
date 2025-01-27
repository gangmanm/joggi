const nextConfig = {
  basePath: "",
  assetPrefix: "",
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // 필요에 따라 크기 조정
    },
  },
};

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

export default nextConfig;
