import { ChangeEventHandler, FC, useCallback } from "react";

import { useEditorState } from "../editorState.ts";
import { GateNode } from "../nodes/GateNode.tsx";
import { Select } from "./Controls.tsx";

export const GateProperties: FC<{ node: GateNode }> = ({ node }) => {
    const { updateNodeData } = useEditorState();

    const onTypeChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (event) => {
            updateNodeData(node.id, { gateType: event.target.value });
        },
        [node, updateNodeData],
    );

    const onNegatedChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            updateNodeData(node.id, { negated: event.target.checked });
        },
        [node, updateNodeData],
    );

    return (
        <>
            <Select value={node.data.gateType} onChange={onTypeChange}>
                {["AND", "OR", "XOR"].map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Select>
            <div>
                <label className="mr-2">Negated</label>
                <input type="checkbox" checked={node.data.negated} onChange={onNegatedChange} />
            </div>
        </>
    );
};
