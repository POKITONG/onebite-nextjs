import {BookData} from "@/types";

export default async function fetchBooks(q?:string) : Promise<BookData[]> {
    let url = `onebite-books-server-main-eosin.vercel.app/book`;

    if(q) {
        url += `/search?q=${q}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}