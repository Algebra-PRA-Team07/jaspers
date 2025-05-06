import { FC, useCallback } from "react";

import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { GateNode } from "@/editor/nodes/GateNode.tsx";

export const GateProperties: FC<{ node: GateNode }> = ({ node }) => {
    const { updateNodeData } = useEditorState();

    const onTypeChange = useCallback(
        (type: string) => {
            updateNodeData(node.id, { gateType: type });
        },
        [node, updateNodeData],
    );

    const onNegatedClick = useCallback(() => {
        updateNodeData(node.id, { negated: !node.data.negated });
    }, [node, updateNodeData, node.data.negated]);

    return (
        <>
            <Select value={node.data.gateType} onValueChange={onTypeChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select gate type" />
                </SelectTrigger>
                <SelectContent>
                    {["AND", "OR", "XOR"].map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
                <Checkbox id="negated" checked={node.data.negated} onClick={onNegatedClick} />
                <label htmlFor="negated" className="text-sm font-medium">
                    Negated
                </label>
            </div>
        </>
    );
};
