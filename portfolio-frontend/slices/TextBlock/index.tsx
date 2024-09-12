import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

export const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mb-3 text-3xl font-bold text-gray-900">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mb-4 text-2xl font-bold text-gray-900">{children}</h3>
  ),
  paragraph: ({ children }) => (
    <p className="mb-4 font-light text-slate-400">{children}</p>
  ),
  strong: ({ children }) => (
    <span className="Link text-slate-200">{children}</span>
  ),
  hyperlink: ({ children, node }) => {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={node.data.url || ""}
            target="_blank"
            className="Link hover:text-timeline-active text-slate-200"
          >
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-navbar text-slate-200 border-slate-800">
          <p>Go to {node.data.url}</p>
        </TooltipContent>
      </Tooltip>
    );
  },
};

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.textblock}
        components={components}
      />
    </section>
  );
};

export default TextBlock;
