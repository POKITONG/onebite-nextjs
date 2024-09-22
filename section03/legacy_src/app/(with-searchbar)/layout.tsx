import {ReactNode} from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({children}: { children: ReactNode}) {
    return <div>
        <div><Searchbar/></div>
        {children}
    </div>;
};

// 라우트 그룹 : (name) 형태로 된 디렉토리로, 경로에 어더한 영향도 미치지 않는 폴더
// -> 동시에 각기 다른 경로를 갖는 페이지 파일들을 하나의 폴더 안에 묶어둘 수 있다.
// -> 경로상에 영향을 미치지 않으면서 레이아웃 파일을 만들 수 있다.