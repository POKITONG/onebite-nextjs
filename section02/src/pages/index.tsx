// CSS Module
// -> CSS 파일들에 작성해둔 클래스 네임들이 다른 CSS 파일들과 중복되지 않도록 자동으로
// className 들을 파일마다 유니크한 이름으로 변환해주는 기능
// import "./index.module.css";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-randomBooks";

// @ 경로 : src 폴더를 가리키는 경로

export const getStaticProps = async () => {
    console.log("인덱스 페이지");
    // getStaticProps : SSG 방식으로 렌더링하게 해주는 함수
    // -> 개발 모드에서는 SSR 이든, SSG 든 개발자의 편의를 위해서 호출을 받을때마다 컴포넌트들을 새롭게 렌더링 해준다.
    // SSG 방식이 디폴트

    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks(),
    ]);
    // Promise.all() : 인수로 전달한 배열 안에 들어있는 모든 비동기 함수를 동시에 실행시켜주는 함수

    return {
        props: {
            allBooks, recoBooks,
        },
        revalidate: 3,
        // ISR : SSG 를 설정한 시간마다 반복하는 사전렌더링 방식.
        // getStaticProps 에서 props 객체 뒤에 revalidate 를 추가해서 반환해주면 된다. (초단위 사용)
        // revalidate : 재검증하다
        // 페이지를 기본적으로 정적으로 브라우저에게 제공함으로써 굉장히 빠른 속도로 페이지를 화면에 렌더링 할 수 있다는 장점과 더불어
        // 일정시을 주기로 최신 데이터를 갱신할 수 있다는 장점까지 한 번에 가지고 있기 때문에 사용 추천
    };

    // ServerSideProps 의 return 값은 반드시 props 라는 객체 프로퍼티를 포함하는 단 하나의 객체여야만 한다.
};

export default function Home({allBooks, recoBooks}: InferGetStaticPropsType<typeof getStaticProps>) {

    /*    useEffect(() => {
            console.log(window);
        }, []);*/
    // -> 브라우저에서만 실행 가능한 함수를 호출하고 싶을 때는 useEffect 사용

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {recoBooks.map((book) => <BookItem key={book.id} {...book}/>)}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {allBooks.map((book) => <BookItem key={book.id} {...book}/>)}
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
