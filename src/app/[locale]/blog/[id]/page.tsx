import BlogDetailInner, {
  BlogDetailInnerViewFallback,
} from "@/components/pages/blog/[id]/blogDetailInnerView";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";
import { getBlogDetail } from "@/services/api/blog/[id].server";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { isAxiosError } from "axios";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ServerBlockNoteEditor } from "@blocknote/server-util";
import { blogBlockNoteSchema } from "@/components/editor/blogBlockNoteSchema";
import { parseBlockNoteContent } from "@/utils/contentFormat";
import DOMPurify from "isomorphic-dompurify";

// 본문 BlockNote JSON을 서버에서 HTML로 직렬화.
// 클라 BlockNoteView는 ssr:false라 서버 응답엔 본문이 없으므로,
// 크롤러/SEO/초기 페인트용으로 동일 구조의 HTML을 미리 만들어 내려보낸다.
// (blocksToFullHTML은 에디터 DOM을 미러링 → 같은 mantine CSS로 동일하게 보임)
async function serializeArticleHtml(content: string): Promise<string> {
  try {
    const blocks = parseBlockNoteContent(content);
    if (blocks.length === 0) return "";
    const serverEditor = ServerBlockNoteEditor.create({
      schema: blogBlockNoteSchema,
    });
    const html = await serverEditor.blocksToFullHTML(blocks);
    // dangerouslySetInnerHTML로 주입되므로 새니타이즈 한 겹.
    // 본문은 내가 작성한 것이지만, 댓글/외부 데이터가 섞일 경우를 대비한 보험.
    // data-*/class/style은 DOMPurify 기본값이 유지하므로 mantine 렌더는 안 깨짐.
    return DOMPurify.sanitize(html);
  } catch (err) {
    console.log("serializeArticleHtml error:", err);
    return "";
  }
}

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
      console.log("Metadata fetch error:", err.status);
    }
  }

  // 포스트 데이터가 없을 때 빈값 => 부모 메타데이터 상속
  if (!post) {
    return {};
  }

  // 태그들을 키워드로 변환
  const keywords = post.tags.map((tag) => tag.label);

  // 카테고리와 그룹 정보를 포함한 풍부한 제목
  const fullTitle = `${post.title} | ${post.category.label}`;

  // Open Graph용 이미지 (썸네일 > 그룹 배너 압축본 > 기본 이미지)
  // 본문 배너 원본은 4K PNG(~12MB)라 크롤러가 거름 → public/og 의 1200px 압축본 사용
  const OG_BANNER_BY_GROUP: Record<string, string> = {
    project: "/og/projects.jpg",
    frontend: "/og/frontend.jpg",
    backend: "/og/backend.jpg",
    "computer science": "/og/computerScience.jpg",
    interactive: "/og/interactive.jpg",
    life: "/og/life.jpg",
  };
  const groupBannerUrl = OG_BANNER_BY_GROUP[post.group.label.toLowerCase()];
  const ogImage = post.thumbnailUrl || groupBannerUrl || "/bumangRoute53.png";

  // width/height는 크기를 확실히 아는 경우(배너/기본)에만 선언한다.
  // S3 썸네일은 글마다 크기가 달라(예: 600x314) 하드코딩 시 실제와 불일치 →
  // 카카오/페북이 렌더에 실패하므로 치수를 생략해 크롤러가 직접 측정하게 둔다.
  const ogImageEntry =
    ogImage === groupBannerUrl
      ? { url: ogImage, width: 1200, height: 675, alt: post.title }
      : ogImage === "/bumangRoute53.png"
        ? { url: ogImage, width: 1200, height: 630, alt: post.title }
        : { url: ogImage, alt: post.title };

  // 사이트 기본 URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bumang.xyz";
  const postUrl = `${siteUrl}/blog/${post.id}`;

  return {
    // 기본 메타데이터
    title: fullTitle,
    description: post.previewText,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: post.authorNickname }],

    // Open Graph (소셜 미디어 공유 - 카카오톡, 페이스북 등)
    openGraph: {
      type: "article",
      title: post.title,
      description: post.previewText,
      url: postUrl,
      siteName: "Bumang Route53", // 실제 블로그 이름으로 변경
      images: [ogImageEntry],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorNickname],
      tags: keywords,
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.previewText,
      images: [ogImage],
      creator: `@${post.authorNickname}`, // 트위터 핸들이 있다면
    },

    // 기타 SEO
    robots: {
      index: post.readPermission === null, // 공개 글만 인덱싱
      follow: true,
      googleBot: {
        index: post.readPermission === null,
        follow: true,
      },
    },
    alternates: {
      canonical: postUrl,
      languages: {
        'x-default': `https://bumang.xyz/ko/blog/${post.id}`,
        ko: `https://bumang.xyz/ko/blog/${post.id}`,
        en: `https://bumang.xyz/en/blog/${post.id}`,
      },
    },

    // 추가 메타데이터
    category: post.category.label,

    // JSON-LD 구조화 데이터 (선택사항이지만 SEO에 매우 좋음)
    other: {
      "article:published_time": post.createdAt,
      "article:modified_time": post.updatedAt,
      "article:author": post.authorNickname,
      "article:section": post.category.label,
      "article:tag": keywords.join(", "),
    },
  };
}

export default async function BlogDetail({ params }: BlogDetailPageProps) {
  const postId = params.id;

  let post: PostDetailResponseDto | null = null;

  try {
    post = await getBlogDetail(postId);
  } catch (err) {
    console.log("catch");

    if (err instanceof Error) {
      console.log("err", err.message);
      if ("status" in err && (err.status === 401 || err.status === 403)) {
        redirect(PATHNAME.BLOG + "?error=unauthorized");
      }
    }
  }

  if (!post) {
    return <BlogDetailInnerViewFallback />;
  }

  const articleHtml = await serializeArticleHtml(post.content);

  return <BlogDetailInner post={post} articleHtml={articleHtml} />;
}
