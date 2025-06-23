import { BezierEdge, EdgeProps } from "@xyflow/react";
import { FC, useCallback, useMemo } from "react";

import { EditorState, useEditorState } from "@/editor/editorState.ts";

export const CustomEdge: FC<EdgeProps> = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
    targetPosition,
    sourcePosition,
    source,
    sourceHandleId,
}) => {
    const selector = useCallback(
        (state: EditorState) => state.nodes.find((n) => n.id === source),
        [source],
    );

    const sourceNode = useEditorState(selector);

    const color = useMemo(() => {
        const state = sourceNode?.data.simulator?.output[sourceHandleId!];

        return state === "on" ? "green" : undefined;
    }, [sourceNode, sourceHandleId]);

    return (
        <>
            <BezierEdge
                sourceX={sourceX}
                sourceY={sourceY}
                targetX={targetX}
                targetY={targetY}
                sourcePosition={sourcePosition}
                targetPosition={targetPosition}
                style={{ stroke: color, strokeWidth: "4px" }}
            />
        </>
    );
};
