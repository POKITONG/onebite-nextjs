'use client';

import {ChangeEvent, useState} from "react";
import {useRouter} from "next/navigation";

export default function Searchbar() {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // 앱 라우터에서는 파일명이 page 혹은 layout 이 아니라면 일반적인 컴포넌트로 인지하기 때문에 컴포넌트 파일도
        // 앱 폴더 내에 위치해도 괜찮다.

        /**
         * NEXT 앱에서 서버 컴포넌트를 이용할 때 주의사항
         * 1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다.
         * 2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.
         * 3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.
         * 4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 props 는 전달 불가능하다.
         *    직렬화 : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전달하기 위해
         *    아주 단순한 형태 (문자열, Byte) 로 변환하는 것
         *    -> 자바스크립트의 함수는 직렬화 불가능
         *    -> 그래서 함수들은 서버 컴포넌트에서 클라이언트 컴포넌트로 Props 로 전달 불가
         */
    };

    const router = useRouter();

    const onSubmit = () => {
        router.push(`/search?q=${search}`);
    };

    return <div>
        <input value={search} onChange={onChangeSearch}/>
        <button onClick={onSubmit}>검색</button>
    </div>;
};