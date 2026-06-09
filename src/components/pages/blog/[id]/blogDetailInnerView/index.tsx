"use client";

import {
  ButtonBase,
  Divider,
  FillButton,
  Tag,
  TagWrapper,
} from "@/components/common";
import { PostDetailResponseDto } from "@/types/dto/blog/[id]";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { blogBlockNoteSchema } from "@/components/editor/blogBlockNoteSchema";
import { format } from "date-fns";
import {
  AlignJustifyIcon,
  Calendar,
  Edit,
  FolderIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import BlogIndex from "../../(list)/blogIndex";
import BlogComment from "./blogComment";
import RelatedAndAdjacentPost from "./relatedPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { PATHNAME } from "@/constants/routes/pathnameRoutes";
import { getThumbnailByGroup } from "@/utils/getThumnailByGroup";
import { Link } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth";
import { useEditStore } from "@/store/edit";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost } from "@/services/api/blog/edit";
import { getUserGroups } from "@/services/api/userGroups";
import AudienceMarkerLayer from "@/components/editor/blockAudience/audienceMarkerLayer";
import { useTranslations } from "next-intl";
import { useHeaderStore } from "@/store/header";
import { useTheme } from "next-themes";
import { parseBlockNoteContent } from "@/utils/contentFormat";
import useModalStore from "@/store/modal";
import CommonModal from "@/components/modal/type/common";

import "@blocknote/mantine/style.css";

interface BlogDetailInnerProps {
  post: PostDetailResponseDto;
}

/**
 * @BLOG_INNER_VIEW
 */

export function BlogDetailInnerViewFallback({
  isError,
}: {
  isError?: boolean;
}) {
  const router = useRouter();

  if (isError) {
    return (
      <div className="col-span-full flex h-96 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/401.png"}
            alt="Unauthenticated Error Image"
            width={324}
            height={127}
            className="pointer-events-none"
            placeholder="blur"
          />
          <div className="mb-5 mt-3 text-xl font-semibold">OopseyDaisies!</div>
          <div className="text-lg font-medium">This is Private Article.</div>
          <div className="mb-8">It seems You are not logged in</div>
        </div>
        <div className="flex gap-5">
          <ButtonBase
            onClick={() => router.push(PATHNAME.HOME)}
            className="text-gray-500 hover:text-gray-800 hover:underline"
          >
            ← Back to Home
          </ButtonBase>
          <FillButton
            className="text-white"
            onClick={() => router.push(PATHNAME.LOGIN)}
          >
            Go To Login
          </FillButton>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 본문 ARTICLE */}
      <div className="col-start-3 col-end-9 mb-10 flex h-fit flex-col justify-center gap-x-[1.5vw]">
        <TagWrapper as="collapsible" align="center">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </TagWrapper>

        <div className="mb-10 mt-4 flex flex-col items-center justify-center gap-4 text-center text-6xl font-semibold leading-tight">
          <Skeleton className="h-16 w-full max-w-[600px]" />
          <Skeleton className="h-16 w-full max-w-[1000px]" />
        </div>

        <div className="mb-12 flex items-center justify-center">
          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <Skeleton className="h-5 w-5" />
            <span className="group-hover:text-gray-600">
              <Skeleton className="h-5 w-24" />
            </span>
          </div>

          <span className="mx-2 text-gray-200">•</span>

          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <Skeleton className="h-5 w-5" />
            <span className="group-hover:text-gray-600">
              <Skeleton className="h-5 w-24" />
            </span>
          </div>

          <Divider className="mx-5" />

          <div className="pointer-events-none flex items-center justify-center gap-2 text-sm text-gray-300">
            <Skeleton className="h-5 w-5" />
            <span>
              <Skeleton className="h-5 w-24" />
            </span>
          </div>
        </div>

        <div className="relative mb-14 aspect-video w-full overflow-hidden rounded-2xl shadow-md">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="mb-4 flex">
          <Skeleton className="mr-4 h-16 w-16 shrink-0 rounded-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      {/* <RelatedAndAdjacentPost id={post.id} /> */}
    </>
  );
}

export default function BlogDetailInnerView({ post }: BlogDetailInnerProps) {
  const t = useTranslations("blogDetail");

  // 헤더 상태 초기화
  const setDefaultSetting = useHeaderStore((state) => state.setDefaultSetting);
  useEffect(() => {
    setDefaultSetting();
    // eslint-disable-next-line
  }, []);

  /**
   * EDITOR_LOGIC
   */
  const user = useAuthStore((state) => state.user);
  const setAllEditState = useEditStore((state) => state.setAllEditState);
  const router = useRouter();
  const params = useParams();
  const queryId = typeof params.id === "string" ? params.id : params.id[0];

  // Parse BlockNote content
  const blockNoteContent = useMemo(() => {
    return parseBlockNoteContent(post.content);
  }, [post.content]);

  // BlockNote가 시스템 OS 색상이 아닌 앱 테마(next-themes)를 따르게 함.
  const { resolvedTheme } = useTheme();

  // Create BlockNote editor — shared schema with editor side
  const editor = useCreateBlockNote({
    schema: blogBlockNoteSchema,
    initialContent: blockNoteContent,
  });

  // 백엔드가 마스킹한 블록(원본 텍스트는 같은 길이 더미로 치환됨)에:
  // - 블러 클래스(`audience-blocked`) 부여
  // - hover 시 안내 툴팁(`title`)
  // - 클릭 시 로그인 페이지로 (anon만)
  // BlockNote가 각 블록을 [data-id="..."] 속성으로 렌더하므로 그걸로 찾는다.
  const isAnon = !user;
  useEffect(() => {
    const ids = post.maskedBlockIds ?? [];
    if (ids.length === 0) return;

    const tooltip = isAnon
      ? "로그인하면 볼 수 있어요"
      : "권한이 있는 그룹에 속해야 볼 수 있어요";

    const handlers: Array<{ el: HTMLElement; onClick: () => void }> = [];

    const raf = requestAnimationFrame(() => {
      ids.forEach((id) => {
        const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
        if (!el) return;
        el.classList.add("audience-blocked");
        el.title = tooltip;
        const onClick = () => {
          if (isAnon) router.push(PATHNAME.LOGIN);
        };
        el.addEventListener("click", onClick);
        handlers.push({ el, onClick });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      handlers.forEach(({ el, onClick }) => {
        el.classList.remove("audience-blocked");
        el.removeAttribute("title");
        el.removeEventListener("click", onClick);
      });
    };
  }, [post.maskedBlockIds, isAnon, router]);

  // Owner 응답에 blockAudienceMap이 포함됐을 때만 그룹 라벨용 캐시를 채워둔다.
  // AudienceMarkerLayer는 ["user-groups"] queryKey 캐시를 enabled:false로 구독하므로
  // 여기서 한 번 fetch만 트리거해주면 마커가 그룹명을 읽어 쓴다.
  useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    enabled: !!post.blockAudienceMap,
  });

  const handleSetDraft = () => {
    setAllEditState(
      post.id,
      {
        title: post.title,
        content: blockNoteContent,
        selectedGroup: post.group,
        selectedCategory: post.category,
        selectedTags: post.tags,
        readPermission: post.readPermission,
        blockAudienceMap: post.blockAudienceMap ?? {},
      },
      "toUpdate",
    );
  };

  const openModal = useModalStore((state) => state.openModal);

  const handleDelete = async () => {
    const confirmed = await openModal(CommonModal, {
      title: t("deleteConfirmTitle") || "포스트 삭제",
      desc:
        t("deleteConfirmDesc") ||
        "정말 삭제하시겠습니까?\n삭제된 포스트는 복구할 수 없습니다.",
      proceedLabel: t("deleteConfirmButton") || "삭제",
      dismissLabel: t("cancel") || "취소",
    });

    if (confirmed) {
      deleteMutation.mutateAsync();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(queryId),
    onSuccess: () => {
      router.back();
    },
  });

  return (
    <>
      {/* 본문 ARTICLE */}
      <div className="col-span-full mb-10 flex h-fit flex-col justify-center gap-x-[1.5vw] lg:col-start-3 lg:col-end-9 xl:col-start-3 xl:col-end-9">
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            alt="Thumnail"
            src={
              post?.thumbnailUrl ||
              getThumbnailByGroup(post.group.label, "postBanner")
            }
            className="bg-secondary object-cover object-top"
            priority
            fill
            sizes="100vw"
          />
        </div>

        <TagWrapper as="collapsible" align="center" className="mb-4">
          {post?.tags.length ? (
            post.tags.map((tag) => (
              <Tag type="button" id={tag.id} title={tag.label} key={tag.id} />
            ))
          ) : (
            <Tag id={0} title={t("noTag")} className="pointer-events-none" />
          )}
        </TagWrapper>

        <div
          className="mb-4 text-center text-2xl font-semibold md:text-5xl"
          style={{ lineHeight: 1.4 }}
        >
          {post.title}
        </div>

        {/* INFORMATIONS */}
        <div className="mb-12 flex flex-wrap items-center justify-center">
          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <FolderIcon size={18} className="group-hover:text-gray-600" />
            {post.group.label && (
              <Link
                href={PATHNAME.BLOG + `?groupId=${post.group.id}`}
                className="group-hover:text-gray-600"
              >
                {post.group.label}
              </Link>
            )}
          </div>

          <span className="mx-2 text-gray-200">•</span>

          <div className="group flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-300 transition-all hover:scale-105">
            <AlignJustifyIcon size={18} className="group-hover:text-gray-600" />
            <Link
              href={PATHNAME.BLOG + `?categoryId=${post.category.id}`}
              className="group-hover:text-gray-600"
            >
              {post.category.label ?? "No Category"}
            </Link>
          </div>

          <Divider className="mx-5" />

          {/* CALENDAR */}
          <div className="pointer-events-none flex items-center justify-center gap-2 text-sm text-gray-300">
            <Calendar size={18} />
            <span>{format(post.createdAt, "yyyy. MM. dd.")}</span>
          </div>

          {/* LOGGINED */}
          {(post.authorNickname === user?.nickname ||
            user?.role === "admin") && (
            <div className="hidden gap-2 md:flex">
              <Divider className="mx-5" />

              <Link
                className="mr-5 flex items-center gap-1 text-sm text-gray-300 hover:underline"
                href={PATHNAME.BLOG + `/edit?id=${post.id}`}
                onClick={handleSetDraft}
              >
                <Edit size={18} />
                <span>{t("edit")}</span>
              </Link>

              <ButtonBase
                className="flex items-center gap-1 text-sm text-gray-300 hover:underline"
                onClick={handleDelete}
              >
                <Trash2 size={18} />
                <span>{t("delete")}</span>
              </ButtonBase>
            </div>
          )}
        </div>

        {/* BlockNote 내부 .bn-editor의 padding-inline:54px를 보정해
            데스크탑(lg↑)에서 본문 가시 폭을 제목/컨테이너에 맞춤.
            모바일에선 col-span-full이라 여백이 부족하므로 lg부터만 적용. */}
        <div className="lg:-mx-[46px]">
          <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            editable={false}
          >
            {post.blockAudienceMap && (
              <AudienceMarkerLayer blockAudienceMap={post.blockAudienceMap} />
            )}
          </BlockNoteView>
        </div>
      </div>

      {/* 목차 */}
      <div className="relative col-start-9 col-end-12">
        <BlogIndex />
      </div>

      {/* 댓글 */}
      <BlogComment />

      <RelatedAndAdjacentPost id={post.id} />
    </>
  );
}
