// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,

  // request 와 response 를 매개변수로 받음
) {
  res.status(200).json({ name: "John Doe" });
}

// pages 내에 api 폴더를 만들고 해당 폴더 내에 새로운 파일들을 배치해주면
// 해당 파일들은 API 라우츠로써 API 응답을 정의하는 파일이 된다.
