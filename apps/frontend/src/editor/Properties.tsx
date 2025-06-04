import { FC, useMemo } from "react";

import { NewGateButton } from "@/editor/properties/NewGateButton.tsx";
import { SimulatorControlBar } from "@/editor/SimulatorControlBar.tsx";

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
        <div className="fixed top-0 left-0 h-screen p-4 pt-16 flex items-start gap-3 pointer-events-none">
            <div className="w-[250px] h-full bg-card border rounded-md shadow flex flex-col p-3 gap-3 pointer-events-auto">
                {NodeProperties && <NodeProperties node={selection!} />}
                <div className="flex-grow"></div>
                <NewGateButton />
            </div>

            <SimulatorControlBar />
        </div>
    );
};
