import type { RichPart } from '../model/content';

interface RichTextProps {
  parts: readonly RichPart[];
}

/** Plain text with bold and code runs; the copy lives in model/content.ts. */
export function RichText({ parts }: RichTextProps) {
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'string') return part;
        if ('strong' in part) {
          return (
            <span
              key={index}
              className="font-medium text-text"
            >
              {part.strong}
            </span>
          );
        }
        return (
          <code
            key={index}
            className="rounded-md bg-white/7 px-1.5 py-px font-mono text-sm text-text"
          >
            {part.code}
          </code>
        );
      })}
    </>
  );
}
