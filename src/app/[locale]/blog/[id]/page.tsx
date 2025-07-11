import { BlogDetailAuthorizedCSR } from "@/components/pages/blog/[id]";
import BlogDetailPublicSSR from "@/components/pages/blog/[id]/blogInnerView";
import { getBlogDetail } from "@/services/api/blog/[id]";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { isAxiosError } from "axios";
import { Metadata } from "next";

interface BlogDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const postId = params.id;
  let post: PostDetailResponseDto | null = null;

  try {
    post = await getBlogDetail(postId);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.status === 401) {
        console.log(err.status, err.config?.data);
      }
    }
  }

  return {
    title: post?.title, // 동적 타이틀
    description: post?.previewText,
  };
}

export default async function BlogDetail({ params }: BlogDetailPageProps) {
  const postId = params.id;
  let post: PostDetailResponseDto | null = null;

  try {
    post = await getBlogDetail(postId);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.status === 401) {
        console.log(err.status, err.config?.data);
      }
    }
  }

  // SSR로 불러온 POST DATA가 없다면 클라이언트에서 패칭 시작
  return post ? (
    // SSR (FOR PUBLIC ARTICLE)
    <BlogDetailPublicSSR post={post} />
  ) : (
    // CSR (FOR PRIVATE ARTICLE)
    <BlogDetailAuthorizedCSR postId={postId} />
  );
}
