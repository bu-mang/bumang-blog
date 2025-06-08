import BlogDetailInner from "@/components/pages/blog/[id]";
import { getBlogDetail } from "@/services/api/blog/[id]";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";

interface BlogDetailPageProps {
  params: { id: string };
}

export default async function BlogDetail({ params }: BlogDetailPageProps) {
  const postId = params.id;
  let post: PostDetailResponseDto | null = null;

  try {
    post = await getBlogDetail(postId);
  } catch (err) {}

  return <BlogDetailInner post={post} />;
}
