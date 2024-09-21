import style from "./[id].module.css";
import {
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";


/*export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params!.id;
    // [id] 페이지는 무조건 url 파라미터가 있어야만 접근할 수 있는 페이지이기 때문에 ! 단언을 사용해도 안전하다.

    const book = await fetchOneBook(Number(id));
    // url 파라미터로써 불러온 id는 기본적으로 string 타입을 갖기 때문에 number 타입으로 형변환해서 보내주어야 한다.

    return {
        props: {book}
    }
};*/

export const getStaticPaths = () => {
    // 동적 경로 페이지의 경우, 가능한 페이지 경로들 (id의 개수 만큼) 을 먼저 getStaticPaths 로 정의해주고, 해당
    // 경로들에 맞춰서 getStaticProps 를 그 수만큼 호출해서 해당 페이지들을 전부 사전에 렌더링 해주어야 한다.

    return {
        paths : [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: false,
        // fallback : 대체, 대비책, 보험
        // path 값에 설정하지 않은 url 로 요청하게 되면 반환할 대비책
        // 1. false : 없는 페이지로 취급해서 Not found 반환

    }
    // 리턴 객체 내부에 paths 라는 이름으로 가능한 params 의 배열을 반환해주어야 한다.
    // paths 배열 내부에는 가능한 param 들의 객체들을 정의해주면 된다.
    // !! url 파라미터의 값은 반드시 문자열로 설정해주어야 Next 프레임워크가 제대로 읽을 수 있다.
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    return {
        props: {book}
    }
};

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
    if (!book) return "문제가 발생했습니다 다시 시도하세요";

    const {id, title, subTitle, description, author, publisher, coverImgUrl} = book;

    return <div className={style.container}>
        <div className={style.cover_img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
            <img src={coverImgUrl}/>
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subtitle}>{subTitle}</div>
        <div className={style.author}>
            {author}| {publisher}
        </div>
        <div className={style.description}>{description}</div>
    </div>;

    // [id]: URL 파라미터를 갖는 동적 경로 페이지 생성 가능
    // [...id]: 캐치 올 세그먼트 // 슬래시로 구분되는 경로상의 모든 아이디에 대응한다.

    // 전달된 여러개의 URL 파라미터들은 id 라는 변수에 배열 형태로 전달된다.
    // -> /book 의 인덱스 경로는 캐치 올 세그먼트도 불가능
    // -> 따로 인덱스 페이지를 만들지 않고 싶으면 [[...id]].tsx 식으로 라우팅 가능하다.
    // [[...id]] : 옵셔널 캐치 올 세그먼트
};