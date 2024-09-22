import style from "./[id].module.css";
import {
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import {useRouter} from "next/router";


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
        fallback: true,

        // fallback : 대체, 대비책, 보험
        // fallback 상태 : 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못 한 상태

        // path 값에 설정하지 않은 url 로 요청하게 되면 반환할 대비책
        // 1. false : paths 에 정의돼있지 않은 페이지를 요청했을 때는 Not found 반환

        // 2. Blocking : SSR 방식처럼 요청받은 페이지를 사전 렌더링해서 브라우저에게 반환
        // -> 빌드 타임에 사전에 생성하지 않았던 페이지까지 반환 가능
        // -> 맨 처음 렌더링 할 때는 오래 걸리지만, 그 이후 요청에는 서버에 저장되기 때문에 SSG 처럼 빠르게 처리가 가능하다.
        // !!! 주의 !!! 존재하지 않았던 페이지를 SSR 방식으로 새롭게 생성할 때 백엔드 서버에게 추가적인 데이터를 요청해야 하거나 해서
        // 페이지의 사전 렌더링 시간이 길어지게 될 경우에는 브라우저에게 넥스트 서버가 아무것도 응답하지 않기 때문에 로딩 발생

        // 3. true : 사전에 생성하지 않았던 페이지를 요청 받았을 때, Props 가 없는 페이지를 먼저 반환하고 그 이후
        // 필요한 Props 만 계산해서 다시 전달

    }
    // 리턴 객체 내부에 paths 라는 이름으로 가능한 params 의 배열을 반환해주어야 한다.
    // paths 배열 내부에는 가능한 param 들의 객체들을 정의해주면 된다.
    // !! url 파라미터의 값은 반드시 문자열로 설정해주어야 Next 프레임워크가 제대로 읽을 수 있다.
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    if (!book) {
        return {
            notFound: true,
        }
    }

    return {
        props: {book}
    };
};

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    if (router.isFallback) return "로딩중입니다.";
    // 현재 페이지가 fallback 상태일 때 페이지를 설정해 주려면 router.isFallback 함수 사용
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