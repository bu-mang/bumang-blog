import { cache } from "react";

import { END_POINTS } from "@/constants/api/endpoints";
import serverFetch from "@/services/lib/serverFetch";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";

// 블로그 상세 조회 (ServerFetch)
//
// cache()로 감싸는 이유: 한 페이지를 그리는 동안 generateMetadata와 본문 컴포넌트가
// 각각 이 함수를 부른다. 감싸지 않으면 백엔드 GET이 두 번 나가고, 그 핸들러가
// 감사 로그를 남기므로 조회 한 번에 로그가 두 줄 쌓인다. cache()는 같은 렌더 패스
// 안에서 같은 인자의 호출을 한 번으로 접는다.
export const getBlogDetail = cache(async (id: string) => {
  const res = await serverFetch<PostDetailResponseDto>(
    process.env.NEXT_PUBLIC_API_BASE_URL + END_POINTS.GET_BLOG_DETAIL(id),
  );

  return res;
});
