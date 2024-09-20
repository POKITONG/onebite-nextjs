import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// document : 모든 페이지에 공통적으로 적용되어야 하는 next 앱의 html 을 설정하는 컴포넌트
// -> 리액트 앱의 index.html 과 비슷한 역할
