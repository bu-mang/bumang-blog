import { END_POINTS } from "@/constants/routes/endpoints";
import ClientInstance from "@/services/lib/axios";
import {
  CreatePostDto,
  CreatePreSignedUrlResponseDto,
} from "@/types/dto/blog/edit";

export const postCreatePost = async (dto: CreatePostDto) => {
  const res = await ClientInstance.post(END_POINTS.POST_CREATE_POST, dto);

  return res.data;
};

export const postCreatePreSignedUrl = async (file: File) => {
  const res = await ClientInstance.post<CreatePreSignedUrlResponseDto>(
    END_POINTS.POST_IMAGE_PRESIGNED_URL,
    {
      filename: file.name,
      mimetype: file.type,
    },
  );

  return res.data;
};

export const postS3 = async (url: string, file: File) => {
  const res = await ClientInstance.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return res.data;
};
