import { forwardRef, HTMLAttributes } from "react";

export const BaseNode = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...properties }, reference) => (
    <div
        ref={reference}
        className={`relative rounded-md border bg-zinc-900 border-zinc-700 px-5 py-3 hover:ring-2  ${selected ? "ring-1 shadow-lg" : ""} ${className}`}
        tabIndex={0}
        {...properties}
    />
));

BaseNode.displayName = "BaseNode";
