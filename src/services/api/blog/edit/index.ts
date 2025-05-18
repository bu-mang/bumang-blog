import { END_POINTS } from "@/constants/routes/endpoints";
import ClientInstance from "@/services/lib/axios";
import { CreatePostDto } from "@/types/dto/blog";

export const postCreatePost = async (dto: CreatePostDto) => {
  const res = await ClientInstance.post(END_POINTS.POST_CREATE_POST, dto);

  return res.data;
};
