/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            // next 앱에서 발생하는 모든 데이터 fetching 이 로그로써 자동으로 콘솔에 출력된다.
        }
    }
};

export default nextConfig;
