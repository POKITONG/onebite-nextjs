import books from "@/mock/books.json";
import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // context : 현재 브라우저로부터 받은 요청에 대한 모든 정보가 다 포함되어 있음
    const q = context.query.q;
    const books = await fetchBooks(q as string);

    return {
        props: {
            books,
        },
    };
};

export default function Page({books}:InferGetServerSidePropsType<typeof getServerSideProps>) {

/*
    const router = useRouter()
    // 쿼리스트링을 사용하기 위해서 useRouter 사용
    // 넥스트앱이 쿼리스트링을 읽는 과정에서 렌더링을 한 번 더 하기 때문에 두 번 출력됨

    const {q} = router.query;
    // 쿼리스트링은 router.query 로 꺼내옴
*/

    return <div>
        {books.map((book)=>
            <BookItem key={book.id} {...book} />
        )}
    </div>
};

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;

};