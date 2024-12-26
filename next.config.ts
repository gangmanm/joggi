/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "server", // or "export" if you're using next export
  basePath: "", // 서브 디렉토리 배포 시 추가
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://jogi.co.kr" : "", // CDN 설정
  trailingSlash: true, // URL 끝에 슬래시 추가
  reactStrictMode: true, // 개발 모드에서 React의 문제를 쉽게 찾을 수 있게 설정
  compiler: {
    styledComponents: true, // styled-components 사용 시
  },
  images: {
    unoptimized: true, // 이미지 최적화 하지 않음
  },
};

export default nextConfig;
