export default function Loading() {
    return <div>Loading...</div>
};

/**
 * 1. 동일한 경로의 페이지 컴포넌트만 스트리밍 되도록 설정하는 것이 아니라 마치 레이아웃 파일처럼
 * 해당하는 경로 아래에 있는 모든 페이지들이 전부 스트리밍 되도록 설정된다.
 * => 해당 경로 아래에 있는 모든 비동기 컴포넌트들을 전부 스트리밍 되도록 설정
 *
 * 2. loading.tsx 파일이 스트리밍 하도록 설정하는 파일은 모든 컴포넌트 파일이 아닌, async 라는 키워드가 붙어서
 *      비동기로 작동하도록 설정된 페이지 컴포넌트에만 스트리밍을 제공
 *
 * 3. loading.tsx 파일은 무조건 페이지 컴포넌트에만 스트리밍을 적용할 수 있다.
 *      => 일반적인 컴포넌트에는 스트리밍을 설정할 수 없음
 *
 * 4. loading.tsx 로 설정된 파일은 브라우저에서 쿼리스트링이 변경될 때에는 트리거링 되지 않는다.
 */