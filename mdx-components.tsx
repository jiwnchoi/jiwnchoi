/* eslint-disable jsx-a11y/alt-text */
// throws TypeError: Cannot read properties of null (reading 'useMemo')
"use no memo";

/* eslint sort-keys: error */
import Image from "next/image";
import {
  Callout,
  Code,
  Details,
  Pre,
  Summary,
  Table,
  withGitHubAlert,
  withIcons,
} from "nextra/components";
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getNextraMDXComponents } from "nextra/mdx-components";
import type { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";
import { Giscus } from "./components";

export type UseMDXComponents<
  /**
   * Default MDX components
   */
  DefaultMDXComponents extends MDXComponents,
> = {
  <components extends MDXComponents>(
    /**
     * An object where:
     * - The key is the name of the HTML element to override.
     * - The value is the component to render instead.
     * @remarks `MDXComponents`
     */
    components: components,
  ): DefaultMDXComponents & components;
  (): DefaultMDXComponents;
};

const createHeading = (Tag: `h${2 | 3 | 4 | 5 | 6}`): FC<ComponentProps<typeof Tag>> =>
  function HeadingLink({ children, id, className, ...props }) {
    return (
      <Tag
        id={id}
        // can be added by footnotes
        className={
          className === "sr-only"
            ? "x:sr-only text-primary dark:text-primary"
            : "text-primary dark:text-primary"
        }
        {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="not-prose subheading-anchor"
            aria-label="Permalink for this section"
          />
        )}
      </Tag>
    );
  };
const CALLOUT_TYPE = Object.freeze({
  caution: "error",
  important: "info", // Changed from "important" to "info" as "important" is not a supported CalloutType
  note: "info",
  tip: "default",
  warning: "warning",
});
const Blockquote = withGitHubAlert(({ type, ...props }) => (
  <Callout type={CALLOUT_TYPE[type]} {...props} />
));

type BlogMDXComponents = MDXComponents & {
  DateFormatter?: FC<{ date: Date }>;
};

const DEFAULT_COMPONENTS = getNextraMDXComponents({
  a: (props) => <a {...props} className={twMerge(props.className, "me-hover")} />,
  blockquote: Blockquote,
  code: Code,
  details: Details,
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: (props) => <Image {...props} placeholder="empty" />,
  pre: withIcons(Pre),
  summary: Summary,
  table: Table,
  td: Table.Td,
  th: Table.Th,
  tr: Table.Tr,
});

export const useMDXComponents: UseMDXComponents<typeof DEFAULT_COMPONENTS> = <
  T extends BlogMDXComponents,
>(
  comp?: T,
) => {
  const components = comp ?? {};
  return {
    ...DEFAULT_COMPONENTS,
    // @ts-expect-error -- fixme
    wrapper({ children, metadata }) {
      return (
        <>
          {metadata.type !== "page" ? (
            <>
              <h1>{metadata?.shortTitle ? metadata.shortTitle : metadata.title}</h1>
              <p className="my-0 text-sm">{metadata.description}</p>
              <div className="divider my-2" />
            </>
          ) : null}

          {children}

          {metadata.type === "post" && (
            <div>
              <div className="divider mt-16" />
              <Giscus />
            </div>
          )}
        </>
      );
    },
    ...components,
  };
};
