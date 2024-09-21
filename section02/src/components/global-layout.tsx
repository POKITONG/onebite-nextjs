import {ReactNode} from "react";
import Link from "next/link";
import style from "./global-layout.module.css";

export default function GlobalLayout({children}: { children: ReactNode;}) {
    return (
        <div className={style.container}>
            {/*<Link href={"/search"} prefetch={false}>search</Link>*/}
            {/*/!*prefetch=false 를 이용해 prefetch 를 명시적으로 제외해줄 수 있다.*!/*/}
            <header className={style.header}>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main className={style.main}>{children}</main>
            <footer className={style.footer}>제작 @pokitong</footer>
        </div>
    );
};