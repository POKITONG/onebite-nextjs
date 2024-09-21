// CSS Module
// -> CSS 파일들에 작성해둔 클래스 네임들이 다른 CSS 파일들과 중복되지 않도록 자동으로
// className 들을 파일마다 유니크한 이름으로 변환해주는 기능
// import "./index.module.css";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";

export default function Home() {
  return (
      <>
        <h1 className={style.h1}>인덱스</h1>
        <h2 className={style.h2}>H2</h2>
      </>
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
