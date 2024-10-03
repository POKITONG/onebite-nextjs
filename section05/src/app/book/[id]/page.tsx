import style from "./page.module.css";
import {notFound} from "next/navigation";

// export const dynamicParams = false;
// generateStaticParams 로 내보내진 값 외에는 전부 404 리턴

export function generateStaticParams() {
    // 정적인 파라미터를 생성하는 함수 == getStaticPaths
    // 동적 URL 경로를 갖는 페이지들은 generateStaticParams 라는 약속된 이름의 함수를 사용해서
    // 리턴으로 어떠한 URL 파라미터가 빌드 타임에 이 페이지에 존재할 수 있는지 직접 설정

    /**
     * 주의점
     * 1. 문자열로만 명시해야 한다.
     * 2. generateStaticParams 함수를 내보내게 되면, 페이지 내부에 데이터 캐싱이 설정되지 않은 데이터 페칭이
     * 존재하게 될지어도 무조건 해당하는 페이지가 static 페이지로써 강제로 설정된다.
     */
    return [{id:1}, {id:2}, {id: 3}]
}

export default async function Page({
                                       params,
                                   }: {
    params: { id: string | string[] };
}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}`);
    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다...</div>;
    }

    const book = await response.json();

    const {
        id,
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl,
    } = book;

    return (
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}
