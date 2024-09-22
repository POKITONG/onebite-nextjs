import styles from "./page.module.css";
import {useEffect} from "react";
import ClientComponent from "@/app/(with-searchbar)/client-component";
import ServerComponent from "@/app/(with-searchbar)/server-component";

export default function Home() {

    // const secretkey = "qwer123";
    // -> 서버에만 실행되기 때문에 secreKey 를 내부에서 사용해도 아무런 보안적인 문제도 발생하지 않는다.
    // -> 그래서 보안에 민감한 작업이나 데이터는 페칭해 오는 그런 기능 등의 다양한 작업들 진행 가능
    // but 브라우저에서만 할 수 있는 작업들 진행 불가

/*    useEffect(() => {
        useEffect 와 같은 브라우저에서만 사용되는 함수들은 "use client" 를 파일 최상단에 기재해주어야 사용 가능하다.
    }, []);*/

    // 서버 컴포넌트 : 서버에서만 실행되어 하이드레이션 과정을 거치지 않는 컴포넌트
    // 넥스트 App 라우터의 기본 컴포넌트들은 전부 서버 컴포넌트로 설정되어 있다.

    // 상호작용이 있어야 하는 컴포넌트 -> 클라이언트 컴포넌트 ex) 서치바 컴포넌트
    // 상호작용이 없는 컴포넌트 (자바스크립트 이용) -> 서버 컴포넌트 ex) BookItem 컴포넌트를 포함한 거의 모든 컴포넌트

  return (
    <div className={styles.page}>
      인덱스 페이지
        <ClientComponent>
            <ServerComponent/>
        </ClientComponent>
    </div>
  );
}

// 서버 컴포넌트를 직접 임포트하지 않고 children 프롭스로 받게 되면, 해당 컴포넌트의 결과만 props 로 받기 때문에
// 넥스트에서는 서버 컴포넌트를 클라이언트 컴포넌트로 변경하지 않는다.
