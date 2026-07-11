import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { H2c, H3, H4, H5, H6, Body18 } from "@/components/ui/typography";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="flex flex-col gap-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }: { children?: ReactNode }) => <H2c as="h2">{children}</H2c>,
          h2: ({ children }: { children?: ReactNode }) => <H2c as="h2">{children}</H2c>,
          h3: ({ children }: { children?: ReactNode }) => <H3 as="h3">{children}</H3>,
          h4: ({ children }: { children?: ReactNode }) => <H4 as="h4">{children}</H4>,
          h5: ({ children }: { children?: ReactNode }) => <H5 as="h5">{children}</H5>,
          h6: ({ children }: { children?: ReactNode }) => <H6 as="h6">{children}</H6>,
          p: ({ children }: { children?: ReactNode }) => (
            <Body18 as="p" className="text-black/70">
              {children}
            </Body18>
          ),
          a: ({ children, href }: { children?: ReactNode; href?: string }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:no-underline"
            >
              {children}
            </a>
          ),
          ul: ({ children }: { children?: ReactNode }) => (
            <ul className="list-disc space-y-2 pl-5 text-[18px] leading-[1.4] tracking-[-0.04em] text-black/70">
              {children}
            </ul>
          ),
          ol: ({ children }: { children?: ReactNode }) => (
            <ol className="list-decimal space-y-2 pl-5 text-[18px] leading-[1.4] tracking-[-0.04em] text-black/70">
              {children}
            </ol>
          ),
          strong: ({ children }: { children?: ReactNode }) => (
            <strong className="font-semibold text-black">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
