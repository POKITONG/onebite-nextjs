import React, {ReactNode, useEffect, useState} from "react";
import {event} from "next/dist/build/output/log";
import {useRouter} from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({children} : {children : ReactNode}) {

    const [search, setSearch] = useState("");
    const router = useRouter();
    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // React.ChangeEvent<HTMLInputElement> :  타입인데 HTMLInputElement 에서 발생한 React.ChangeEvent 타입이라는 의미
        setSearch(event.target.value);
    };

    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };


    return <div>
        <div className={style.searchbar_container}>
            <input onKeyDown={onKeyDown} value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요 ..."/>
            <button onClick={onSubmit}>검색</button>
        </div>
        {children}
    </div>;
};