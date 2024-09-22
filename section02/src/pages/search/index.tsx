import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";
import Head from "next/head";

/*export const getStaticProps = async (context: GetStaticPropsContext) => {
    // context : 현재 브라우저로부터 받은 요청에 대한 모든 정보가 다 포함되어 있음

    // getServerSideProps 라는 약속된 이름의 함수를 만들어서 export 로 내보내주면 해당 페이지는 SSR 방식으로 사전렌더링 된다.
    // 클라이언트에서 페이지를 요청해서 넥스트가 사전 렌더링을 실행할 때, 해당 페이지 컴포넌트보다 먼저 실행되어서
    // 컴포넌트에 필요한 데이터를 또 다른 백엔드 서버로부터 불러오는 등의 기능을 하는 함수

    // -> 사전 렌더링을 하는 과정에서 단 한 번만 실행되기 때문에 오직 서버 측에서만 실행되는 함수라는 점 주의

    // console.log("서버사이드 프롭스예요");
    // -> 콘솔로 찍더라도 브라우저 콘솔에 나오지 않고, 실행중인 넥스트 서버의 로그가 나오고 있는 터미널에만 출력
    // window.location; 자바스크립트의 window : 브라우저
    // -> 클라이언트에서만 접근 가능한 window 같은 함수를 실행하려고 하면 브라우저를 읽을 수 없기 때문에 해당 값이
    // undefined 가 되며, undefined 에서 location 을 호출하려고 할 시 오류 발생

    /!**
     * 1. 클라이언트에서 페이지 요청
     * 2. getServersideProps 함수 실행 (필요한 데이터 사전 페치 등의 동작 수행)
     * 3. 컴포넌트 실행
     *!/

    /!*    const allBooks = await fetchBooks();
        const recoBooks = await fetchRandomBooks();*!/

/!*    const q = context.query.q;*!/
    // GetStaticProps 함수에게 전달되는 context 파라미터에는 쿼리스트링을 포함하고 있는  query 프로퍼티가 존재하지 않는다.
    // -> 빌드 당시 단 한 번만 실행되므로 빌드 타임에 query 를 알아낼 방법이 없다.
    // -> 쿼리스트링을 꺼내올 방법이 없기 때문에 서치같은 페이지는 SSG 방식으로 렌더할 수 없다.
    // -> 꼭 하고싶다면 현재의 쿼리스트링을 꺼내와서 해당 갑승로 결과 데이터를 불러오는 과정을 리액트와 같이 사전 렌더링
    // 이후에 진행해주어야 한다.


    const books = await fetchBooks(q as string);

    return {
        props: {
            books,
        },
    };
};*/

export default function Page() {
    // InferGetServerSidePropsType -> GetServerSideProps 함수에서 반환되는 값을 자동으로 타입 추론해주는 타입 객체

    // Home 컴포넌트 또한 서버에서 한 번 실행된 후 브라우저에서 한 번 더 실행된다.
    // -> 브라우저로부터 접속 요청을 받았을 때 사전 렌더링을 위해 서버측에서 첫번째로 실행
    // -> 브라우저에서 자바스크립트 번들 형태로 전달되어서 하이드레이션 과정이 진행 될 때 두번째로 실행

    // !!! 그렇기 때문에 컴포넌트 내부에서 바로 브라우저에서만 실행 가능한 함수를 호출 시 오류 발생 !!!
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();

    const q = router.query.q;

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            // 검색 결과를 불러오는 로직
            fetchSearchResult();
        }
    }, [q]);

/*
    const router = useRouter()
    // 쿼리스트링을 사용하기 위해서 useRouter 사용
    // 넥스트앱이 쿼리스트링을 읽는 과정에서 렌더링을 한 번 더 하기 때문에 두 번 출력됨

    const {q} = router.query;
    // 쿼리스트링은 router.query 로 꺼내옴
*/

    return <div>
        <Head>
            <title>한입북스 - 검색결과</title>
            <meta property="og:image" content="/thumbnail.png"/>
            <meta property="og:title" content="한입북스 - 검색결과"/>
            <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요!"/>
        </Head>
        {books.map((book)=>
            <BookItem key={book.id} {...book} />
        )}
    </div>
};

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;

};