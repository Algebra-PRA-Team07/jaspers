import { FC, useMemo } from "react";

import { Button } from "@/components/ui/button.tsx";
import { NewGateButton } from "@/editor/properties/NewGateButton.tsx";

import { useEditorState } from "./editorState.ts";
import { getRegisteredNodesProperty } from "./nodes/nodes.ts";

const properties = getRegisteredNodesProperty("properties");

export const Properties: FC = () => {
    const selectedNodes = useEditorState((s) => s.selectedNodes);
    const runSimulation = useEditorState((s) => s.runSimulation);

    const selection = useMemo(() => selectedNodes.at(0), [selectedNodes]);

    const NodeProperties = useMemo(() => {
        if (!selection) return undefined;

        return properties[selection.type!];
    }, [selection]);

    return (
        <div className="fixed top-0 left-0 h-screen p-4 pt-16">
            <div className="w-[250px] h-full bg-card border rounded-md shadow flex flex-col p-3 gap-3">
                {NodeProperties && <NodeProperties node={selection!} />}
                <div className="flex-grow"></div>
                <NewGateButton />
                <Button onClick={runSimulation}>Start Simulation</Button>
            </div>
        </div>
    );
};
