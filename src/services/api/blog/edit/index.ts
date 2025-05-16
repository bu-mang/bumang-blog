import { END_POINTS } from "@/constants/routes/endpoints";
import ClientInstance from "@/services/lib/axios";
import { RoleType } from "@/types";

interface CreatePostDto {
  title: string;
  content: string;
  previewText: string;
  authorId: number;
  categoryId: number;
  tagIds: number[];
  readPermission: RoleType | null;
}

export const postCreatePost = async (dto: CreatePostDto) => {
  const res = await ClientInstance.post(END_POINTS.POST_CREATE_POST, dto);

  return res.data;
};
