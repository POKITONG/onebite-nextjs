import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter();
    const {id} = router.query;
    return <h1>Book {id}</h1>;

    // [id]: URL 파라미터를 갖는 동적 경로 페이지 생성 가능
    // [...id]: 캐치 올 세그먼트 // 슬래시로 구분되는 경로상의 모든 아이디에 대응한다.

    // 전달된 여러개의 URL 파라미터들은 id 라는 변수에 배열 형태로 전달된다.
    // -> /book 의 인덱스 경로는 캐치 올 세그먼트도 불가능
    // -> 따로 인덱스 페이지를 만들지 않고 싶으면 [[...id]].tsx 식으로 라우팅 가능하다.
    // [[...id]] : 옵셔널 캐치 올 세그먼트
}