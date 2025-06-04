import { FC, useMemo } from "react";

import { NewGateButton } from "@/editor/properties/NewGateButton.tsx";

import { useEditorState } from "./editorState.ts";
import { getRegisteredNodesProperty } from "./nodes/nodes.ts";

const properties = getRegisteredNodesProperty("properties");

export const Properties: FC = () => {
    const selectedNodes = useEditorState((s) => s.selectedNodes);

    const selection = useMemo(() => selectedNodes.at(0), [selectedNodes]);

    const NodeProperties = useMemo(() => {
        if (!selection) return undefined;

        return properties[selection.type!];
    }, [selection]);

    return (
        <div className="w-[250px] h-full bg-card border rounded-md shadow flex flex-col p-3 gap-3 pointer-events-auto">
            {NodeProperties && <NodeProperties node={selection!} />}
            <div className="flex-grow"></div>
            <NewGateButton />
        </div>
    );
};
