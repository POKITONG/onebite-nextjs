'use client';

import {ChangeEvent, useState} from "react";

export default function Searchbar() {
    const [search, setSearch] = useState();

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // 앱 라우터에서는 파일명이 page 혹은 layout 이 아니라면 일반적인 컴포넌트로 인지하기 때문에 컴포넌트 파일도
        // 앱 폴더 내에 위치해도 괜찮다.

    };

    return <div>
        <input value={search} onChange={onChangeSearch}/>
        <button>검색</button>
    </div>;
};