// CSS Module
// -> CSS 파일들에 작성해둔 클래스 네임들이 다른 CSS 파일들과 중복되지 않도록 자동으로
// className 들을 파일마다 유니크한 이름으로 변환해주는 기능
// import "./index.module.css";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect} from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType} from "next";

// @ 경로 : src 폴더를 가리키는 경로

export const getServerSideProps = () => {
    // getServerSideProps 라는 약속된 이름의 함수를 만들어서 export 로 내보내주면 해당 페이지는 SSR 방식으로 사전렌더링 된다.
    // 클라이언트에서 페이지를 요청해서 넥스트가 사전 렌더링을 실행할 때, 해당 페이지 컴포넌트보다 먼저 실행되어서
    // 컴포넌트에 필요한 데이터를 또 다른 백엔드 서버로부터 불러오는 등의 기능을 하는 함수

    // -> 사전 렌더링을 하는 과정에서 단 한 번만 실행되기 때문에 오직 서버 측에서만 실행되는 함수라는 점 주의

    // console.log("서버사이드 프롭스예요");
    // -> 콘솔로 찍더라도 브라우저 콘솔에 나오지 않고, 실행중인 넥스트 서버의 로그가 나오고 있는 터미널에만 출력
    // window.location; 자바스크립트의 window : 브라우저
    // -> 클라이언트에서만 접근 가능한 window 같은 함수를 실행하려고 하면 브라우저를 읽을 수 없기 때문에 해당 값이
    // undefined 가 되며, undefined 에서 location 을 호출하려고 할 시 오류 발생

    /**
     * 1. 클라이언트에서 페이지 요청
     * 2. getServersideProps 함수 실행 (필요한 데이터 사전 페치 등의 동작 수행)
     * 3. 컴포넌트 실행
     */

    const data = "hello";

    return {
        props: {
            data,
        },
    };

    // ServerSideProps 의 return 값은 반드시 props 라는 객체 프로퍼티를 포함하는 단 하나의 객체여야만 한다.
};

export default function Home({data} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    // InferGetServerSidePropsType -> GetServerSideProps 함수에서 반환되는 값을 자동으로 타입 추론해주는 타입 객체

    // Home 컴포넌트 또한 서버에서 한 번 실행된 후 브라우저에서 한 번 더 실행된다.
    // -> 브라우저로부터 접속 요청을 받았을 때 사전 렌더링을 위해 서버측에서 첫번째로 실행
    // -> 브라우저에서 자바스크립트 번들 형태로 전달되어서 하이드레이션 과정이 진행 될 때 두번째로 실행

    // !!! 그렇기 때문에 컴포넌트 내부에서 바로 브라우저에서만 실행 가능한 함수를 호출 시 오류 발생 !!!

/*    useEffect(() => {
        console.log(window);
    }, []);*/
    // -> 브라우저에서만 실행 가능한 함수를 호출하고 싶을 때는 useEffect 사용

    console.log(data);
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {books.map((book) => <BookItem key={book.id} {...book}/>)}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {books.map((book) => <BookItem key={book.id} {...book}/>)}
            </section>
        </div>
    );


    // 넥스트에서는 App 컴포넌트를 제외하고 import 문을 통해서 그대로 css 파일을 불러오는 것을 제한한다.
    // -> 별도의 페이지 파일에서 CSS 를 그대로 불러와서 임포트하고 있을 경우,
    // 다른 페이지에서 작성된 CSS 코드와 충돌이 일어날 수 있기 때문

};

Home.getLayout = (page: ReactNode) => {
    // 페이지라는 파라및미터로 현재의 페이지 역할을 할 컴포넌트를 받아와서 별도의 레이아웃으로 감싼 페이지를 리턴해준다.
    // -> 자바스크립트의 모든 함수들은 객체이기 때문에 메서드를 추가할 수 있다.
    return <SearchableLayout>{page}</SearchableLayout>
};
