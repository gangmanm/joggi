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
  async redirects() {
    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || "/";
    console.log("Redirect URL:", redirectUrl); // 디버깅용 출력

    return [
      {
        source: "/", // 리디렉션할 경로
        destination: redirectUrl, // 리디렉션 대상
        permanent: false, // 301(true) 또는 302(false)
      },
    ];
  },
};

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

export default nextConfig;
