"use client";

import { useEffect, useRef, useState } from "react";

const BlogComment = () => {
  const utterancesSettings = {
    src: "https://utteranc.es/client.js",
    repo: "Bumang-Cyber/bumang-blog-comments",
    "issue-term": "pathname",
    theme: "github-light",
    crossorigin: "anonymous",
    async: "true",
  };

  const COMMENTS_ID = "comment-container";
  const commentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (commentRef.current) {
      const utterances = document.createElement("script");

      Object.entries(utterancesSettings).forEach(([key, value]) => {
        utterances.setAttribute(key, value);
      });

      utterances.onload = (_event) => {
        const comments = document.getElementById(COMMENTS_ID);
        // for some reason it shows two comment elements, this is to hide second one.
        if (comments && comments.children[1]) {
          // @ts-ignore
          comments.children[1].style.display = "none";
        }
      };

      commentRef.current.appendChild(utterances);
    }

    setIsLoading(false);
  }, []);

  return (
    <div
      className="utterances-frame relative col-start-3 col-end-9 min-h-40 rounded-xl bg-gray-1"
      id={COMMENTS_ID}
      ref={commentRef}
    >
      {isLoading && <div>로딩중</div>}
    </div>
  );
};

export default BlogComment;
