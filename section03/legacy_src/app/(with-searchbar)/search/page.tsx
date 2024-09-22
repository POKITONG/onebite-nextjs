import ClientComponent from "@/components/client-component";

export default function Page({searchParams} : {searchParams: {
        q?: string;
    }}) {
    // 앱 라우트에서는 쿼리스트링이나 URL 파라미터처럼 경로와 함께 명시되는 값들은 페이지 컴포넌트에 props 로 전달된다.
    // 쿼리스트링을 페이지 내에서 이용하려면 파라미터에 구조분해할당으로 searchParams 를 명시한다.
    return <div>\
        Search 페이지 {searchParams.q}
        <ClientComponent>
            <></>
        </ClientComponent>
    </div>;
};