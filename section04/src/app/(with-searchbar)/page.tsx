import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";

async function AllBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "no-store"});
    /**
     * 1. no-store
     *   데이터 페칭의 결과를 저장하지 않는 옵션 -> 데이터 캐시의 기본값
     *   14 버전 이전에는 디폴트가 캐싱
     * 2. force-cache
     *   무조건 데이터 캐싱 / 다시는 호출되지 않음
     *   맨 처음 호출 될 때 데이터 캐시 MISS, 불러온 이후 SET. 해당 요청이 다시 들어오면 데이터 캐시에서 HIT
     *   실제로 백엔드와는 소통 X, HIT 한 값 반환
     * 3. revalidate
     *    특정 시간을 주기로 업데이트 // like Page Router 의 ISR
     *    맨 처음 MISS, 불러온 이후 SET, 3초간 HIT 그 이후 STALE (상했다)
     *    이후 데이터 요청이 들어오면 STALE 로 일단 빠르게 응답해서 페이지 생성 후 서버측에서 다시 호출해서 최신화
     * 4. tags: [a]
     *    On-Demand Revalidate // 요청이 들어오면 데이터 최신화
     */

    if (!response.ok) {
        return <div>오류가 발생했습니다...</div>
    }

    const allBooks: BookData[] = await response.json();

    return <div>
        {allBooks.map((book) => (<BookItem key={book.id} {...book} />))}
    </div>
}

async function RecoBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});


    if (!response.ok) {
        return <div>오류가 발생했습니다...</div>;
    }

    const recoBooks: BookData[] = await response.json();

    return <div>
        {recoBooks.map((book)=> (<BookItem key={book.id} {...book} />))}
    </div>
}

export default function Home() {


    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
        </div>
    );
}
