import "@/styles/globals.css";
// app 컴포넌트만 글로벌 css 파일로 불러와서 사용 가능
import type {AppProps} from "next/app";
import GlobalLayout from "@/components/global-layout";

export default function App({Component, pageProps}: AppProps) {
    // 파라미터 Component : 현재 페이지 역할을 할 컴포넌트
    // pageProps : 해당 페이지가 전달 받아야 하는 props 들

    // a태그 : 클라이언트 사이드 렌더링 방식이 아닌 서버에게 새로운 페이지를 요청하는 방식으로 이동시켜 주는 태그
    // -> 비교적 느리다.


    // 프로그레메틱한 페이지 이동
    // -> 사용자가 링크를 직접 클릭했을 때 이동시키는 방식이 아닌 특정 버튼을 클릭했거나, 특정 조건이 만족되었을 때
    // 함수 내부에서 페이지를 이동시키는 방식

    /*  const router = useRouter();

      const onClickButton = () => {
        router.push("/test");
        // router.replace("/test")
        // replace : 뒤로가기를 방지하면서 페이지를 이동시키는 메서드
        // back : 뒤로가기를 시키는 메서드
      };*/

    // 링크 컴포넌트로 명시된 경로가 아니라면 프리 페칭이 이루어지지 않는다.

    /*  useEffect(() => {
        router.prefetch("/test");
        // 앱 컴포넌트가 마운트 됐을 때 단 한 번 /test 에 대한 JS 번들들을 프리페칭 한다.
      }, []);*/

    return (
        <GlobalLayout>
            <Component {...pageProps} />
        </GlobalLayout>
    );
};

// app 컴포넌트는 react 의 Aoo 컴포넌트와 동일한 역할
// -> 모든 컴포넌트의 부모 컴포넌트

