export default function Page({params}:{params:{ id: string | string[]}}) {
    // url 파라미터는 params 를 이용해 호출 가능
    return <div>book/[id] 페이지{params.id}</div>;
};