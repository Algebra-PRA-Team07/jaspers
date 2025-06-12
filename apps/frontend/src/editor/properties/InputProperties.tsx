import { ChangeEventHandler, FC, useCallback } from "react";

import { Input } from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { InputNode } from "@/editor/nodes/InputNode.tsx";
import { LogicState } from "@/editor/types.ts";

export const InputProperties: FC<{ node: InputNode }> = ({ node }) => {
    const updateNodeData = useEditorState.use.updateNodeData();

    const onStateChange = useCallback(
        (state: LogicState) => {
            updateNodeData(node.id, { desiredState: state });
        },
        [updateNodeData, node],
    );

    const onNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            updateNodeData(node.id, { name: event.target.value });
        },
        [node.id, updateNodeData],
    );

    return (
        <>
            <Input placeholder="Name" value={node.data.name} onChange={onNameChange} />

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
        </>
    );
};
