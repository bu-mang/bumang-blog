"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogAuthenticatedDetail } from "@/services/api/blog/[id]";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { UserType } from "@/types";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import BlogInnerView, { BlogInnerViewFallback } from "./blogInnerView";
/**
 * @BLOG_DETAIL_AUTHORIZED
 * csr로 AUTH 정보까지
 */
export function BlogDetailAuthorizedCSR({ postId }: { postId: string }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <BlogInnerViewFallback isError />;
  }

  return (
    <ErrorBoundary fallback={<BlogInnerViewFallback isError />}>
      <Suspense fallback={<BlogInnerViewFallback />}>
        <BlogDetailAuthorizedCSRInner postId={postId} user={user} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function BlogDetailAuthorizedCSRInner({
  user,
  postId,
}: {
  user: UserType;
  postId: string;
}) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_BLOG_AUTHENTICATED_DETAIL(postId),
    queryFn: () => getBlogAuthenticatedDetail(postId),
  });

  return <BlogInnerView post={data} />;
}
