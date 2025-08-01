"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogAuthenticatedDetail } from "@/services/api/blog/[id]";
import { QUERY_KEY } from "@/constants/api/queryKey";
import { useAuthStore } from "@/store/auth";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import BlogInnerView, { BlogInnerViewFallback } from "./blogInnerView";
import { useEffect } from "react";
import { useInteractiveStore } from "@/store/background";
/**
 * @BLOG_DETAIL_AUTHORIZED
 * csr로 AUTH 정보까지
 */
export function BlogDetailAuthorizedCSR({ postId }: { postId: string }) {
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const user = useAuthStore((state) => state.user);

  if (isAuthLoading) {
    return <BlogInnerViewFallback />;
  }

  return (
    <ErrorBoundary fallback={<BlogInnerViewFallback isError={!user} />}>
      <Suspense fallback={<BlogInnerViewFallback />}>
        <BlogDetailAuthorizedCSRInner postId={postId} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function BlogDetailAuthorizedCSRInner({ postId }: { postId: string }) {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEY.GET_BLOG_AUTHENTICATED_DETAIL(postId),
    queryFn: () => getBlogAuthenticatedDetail(postId),
  });

  const setDefaultSetting = useInteractiveStore(
    (state) => state.header.setDefaultSetting,
  );
  useEffect(() => {
    setDefaultSetting();
  }, []);

  return <BlogInnerView post={data} />;
}
