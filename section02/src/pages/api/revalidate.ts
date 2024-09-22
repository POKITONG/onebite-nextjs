import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await res.revalidate("/");
        // revalidate (재생성) 시킬 페이지의 경로 입력
        return res.json({revalidate: true});
    } catch (error) {
        res.status(500).send("Revalidation Failed");
    }
};