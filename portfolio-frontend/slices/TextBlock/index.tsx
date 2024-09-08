import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mb-3 text-3xl font-bold text-gray-900">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mb-4 text-2xl font-bold text-gray-900">{children}</h3>
  ),
  paragraph: ({ children }) => <p className="mb-4 text-gray-500">{children}</p>,
  // preformatted: ({ children }) => <Code size="sm">{children}</Code>,
  // hyperlink: ({ children, node }) => {
  //   return (
  //     <Link href={node.data.url} target="_blank">
  //       {children}
  //     </Link>
  //   );
  // },
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
