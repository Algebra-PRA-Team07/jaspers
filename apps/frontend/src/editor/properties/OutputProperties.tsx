import { ChangeEventHandler, FC, useCallback } from "react";

import { Input } from "@/components/ui/input.tsx";
import { useEditorState } from "@/editor/editorState.ts";
import { OutputNode } from "@/editor/nodes/OutputNode.tsx";

export const OutputProperties: FC<{ node: OutputNode }> = ({ node }) => {
    const updateNodeData = useEditorState.use.updateNodeData();

    const onNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            updateNodeData(node.id, { name: event.target.value });
        },
        [node.id, updateNodeData],
    );

    return (
        <>
            <Input placeholder="Name" value={node.data.name} onChange={onNameChange} />
        </>
    );
};
