import { FC, useCallback } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { ConstantNode } from "@/editor/nodes/ConstantNode.tsx";
import { LogicState } from "@/editor/types.ts";

export const ConstantProperties: FC<{ node: ConstantNode }> = ({ node }) => {
    const updateNodeData = useEditorState.use.updateNodeData();

    const onStateChange = useCallback(
        (state: LogicState) => {
            updateNodeData(node.id, { desiredState: state });
        },
        [updateNodeData, node],
    );

    return (
        <Select value={node.data.desiredState} onValueChange={onStateChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select gate type" />
            </SelectTrigger>
            <SelectContent>
                {["on", "off"].map((state) => (
                    <SelectItem key={state} value={state}>
                        {state.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
