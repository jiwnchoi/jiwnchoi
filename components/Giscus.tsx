"use client";

import { default as GiscusImpl } from "@giscus/react";
import { useTheme } from "next-themes";

export default function Giscus() {
  const { resolvedTheme } = useTheme();
  return (
    <GiscusImpl
      id="comments"
      repo="jiwnchoi/jiwnchoi"
      repoId="R_kgDOOj1s5Q"
      category="giscus"
      categoryId="DIC_kwDOOj1s5c4Cp7UN"
      mapping="pathname"
      strict="0"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "https://jiwnchoi.me/giscus_light.css" : "noborder_light"}
      lang="en"
      loading="eager"
    />
  );
}
