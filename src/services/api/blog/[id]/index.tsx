import { END_POINTS } from "@/constants/api/endpoints";
import ClientInstance from "@/services/lib/axios";
import serverFetch from "@/services/lib/serverFetch";
import { PostListItemType } from "@/types";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { previous } from "slate";

// 블로그 상세 조회 (ServerFetch)
export const getBlogDetail = async (id: string) => {
  const isDev = process.env.NODE_ENV === "development";

  const res = await serverFetch<PostDetailResponseDto>(
    process.env.NEXT_PUBLIC_API_BASE_URL + END_POINTS.GET_BLOG_DETAIL(id),
    {
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 0 : 300,
      },
    },
  );

  console.log(res, "Res");

  return res;
};

export const getBlogAuthenticatedDetail = async (id: string) => {
  const res = await ClientInstance.get<PostDetailResponseDto>(
    END_POINTS.GET_BLOG_DETAIL(id),
  );

  return res.data;
};

export const getRelatedPosts = async (id: number) => {
  const res = await ClientInstance.get<PostListItemType[]>(
    END_POINTS.GET_RELATED_POSTS(id),
  );

  return res.data;
};

export const getAdjacentPosts = async (id: number) => {
  const res = await ClientInstance.get<{
    previous: PostListItemType | null;
    next: PostListItemType | null;
  }>(END_POINTS.GET_ADJACENT_POSTS(id));

  console.log(res, "res");

  return res.data;
};
