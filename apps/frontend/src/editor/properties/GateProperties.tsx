import { ChangeEventHandler, FC, useCallback } from "react";

import { useEditorState } from "../editorState.ts";
import { GateNode } from "../nodes/GateNode.tsx";

export const GateProperties: FC<{ gate: GateNode }> = ({ gate }) => {
    const { updateNodeData } = useEditorState();

    const onTypeChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (event) => {
            updateNodeData(gate.id, { gateType: event.target.value });
        },
        [gate, updateNodeData],
    );

    const onNegatedChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            updateNodeData(gate.id, { negated: event.target.checked });
        },
        [gate, updateNodeData],
    );

    return (
        <>
            <select
                className="bg-zinc-800 text-white p-2"
                value={gate.data.gateType}
                onChange={onTypeChange}
            >
                {["AND", "OR", "XOR"].map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <div>
                <label className="mr-2">Negated</label>
                <input type="checkbox" checked={gate.data.negated} onChange={onNegatedChange} />
            </div>
        </>
    );
};
