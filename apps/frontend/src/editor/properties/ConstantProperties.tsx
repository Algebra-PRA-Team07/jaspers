import { ChangeEventHandler, FC, useCallback } from "react";

import { useEditorState } from "../editorState.ts";
import { ConstantNode } from "../nodes/ConstantNode.tsx";
import { Select } from "./Controls.tsx";

export const ConstantProperties: FC<{ node: ConstantNode }> = ({ node }) => {
    const { updateNodeData } = useEditorState();

    const onStateChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (event) => {
            updateNodeData(node.id, { desiredState: event.target.value });
        },
        [updateNodeData, node],
    );

    return (
        <Select value={node.data.desiredState} onChange={onStateChange}>
            {["on", "off"].map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
            ))}
        </Select>
    );
};
