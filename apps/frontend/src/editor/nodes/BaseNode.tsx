import { forwardRef, HTMLAttributes } from "react";

import { LogicState } from "@/editor/types.ts";

const gap: number = 20;
const baseHeight: number = 50;

export const BaseNode = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & {
        selected?: boolean;
        logicState?: LogicState;
        numberOfEdges?: number;
    }
>(({ className, selected, logicState, numberOfEdges, ...properties }, reference) => {
    const index = (numberOfEdges ?? 0) / 2;

    return (
        <div
            ref={reference}
            style={{
                height: baseHeight * index + gap * (Math.floor(index) - 1),
                minHeight: baseHeight,
            }}
            className={`flex items-center relative rounded-md border ${logicState === "on" ? "bg-green-900" : "bg-zinc-900"} border-zinc-700 px-5 py-3 hover:ring-2  ${selected ? "ring-1 shadow-lg" : ""} ${className}`}
            tabIndex={0}
            {...properties}
        />
    );
});

BaseNode.displayName = "BaseNode";
