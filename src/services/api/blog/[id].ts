import { END_POINTS } from "@/constants/api/endpoints";
import ClientInstance from "@/services/lib/axios";

import { PostListItemType } from "@/types";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";

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
