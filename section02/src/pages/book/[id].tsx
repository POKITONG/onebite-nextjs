import style from "./[id].module.css";

const mockData = {
    id: 1,
    title: "한 입 크기로 잘라 먹는 리액트",
    subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
    description: "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
    author: "이정환",
    publisher: "프로그래밍인사이트",
    coverImgUrl: "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"
};

export default function Page() {
    const {id, title, subTitle, description, author, publisher, coverImgUrl} = mockData;

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
}