import React, {ReactNode, Suspense} from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
                                   children,
                               }: {
    children: ReactNode;
}) {
    return (
        <div>
            <div>{new Date().toLocaleDateString()}</div>
            {/* 클라이언트 라우터 캐시는 새로고침을 하게 되면 전부 초기화 */}
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar/>
            </Suspense>
            {/*사전렌더링에서 배제, 오로지 클라이언트 컴포넌트 측에서만 렌더링
      suspense = 미결 ,미완성 . 사전렌더링 시 미완성 상태로 남겨놓음.
      내부 컴포넌트의 비동기 작업이 종료될 때까지 미완서욤구*/}
            {children}
        </div>
    );
}
