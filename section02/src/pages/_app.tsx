import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // 파라미터 Component : 현재 페이지 역할을 할 컴포넌트
  // pageProps : 해당 페이지가 전달 받아야 하는 props 들
  return <>
    <header>글로벌 헤더</header>
    <Component {...pageProps} />
  </>;
}

// app 컴포넌트는 react 의 Aoo 컴포넌트와 동일한 역할
// -> 모든 컴포넌트의 부모 컴포넌트
