import { nanoid } from "nanoid";
import { FC, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button.tsx";
import { AdderNode } from "@/editor/nodes/AdderNode.tsx";
import { ConstantNode } from "@/editor/nodes/ConstantNode.tsx";
import { GateNode } from "@/editor/nodes/GateNode.tsx";

import { useEditorState } from "./editorState.ts";
import { getRegisteredNodesProperty } from "./nodes/nodes.ts";

const properties = getRegisteredNodesProperty("properties");

export const Properties: FC = () => {
    const selectedNodes = useEditorState((s) => s.selectedNodes);
    const addNode = useEditorState((s) => s.addNode);
    const runSimulation = useEditorState((s) => s.runSimulation);

    const selection = useMemo(() => selectedNodes.at(0), [selectedNodes]);

    const NodeProperties = useMemo(() => {
        if (!selection) return undefined;

        return properties[selection.type!];
    }, [selection]);

    const onAddGate = useCallback(() => {
        addNode({
            id: nanoid(),
            type: "gate",
            position: { x: 50, y: 50 },
            data: {
                gateType: "AND",
                negated: false,
            },
        } satisfies GateNode);
    }, [addNode]);

    const onAddConstant = useCallback(() => {
        addNode({
            id: nanoid(),
            type: "constant",
            position: { x: 50, y: 50 },
            data: {
                desiredState: "on",
            },
        } satisfies ConstantNode);
    }, [addNode]);

    const onAddTest = useCallback(() => {
        addNode({
            id: nanoid(),
            type: "adder",
            position: { x: 50, y: 50 },
            data: {},
        } satisfies AdderNode);
    }, [addNode]);

    return (
        <div className="fixed top-0 left-0 h-screen p-4">
            <div className="bg-card w-[250px] h-full rounded-lg shadow flex flex-col p-3 gap-3">
                {NodeProperties && <NodeProperties node={selection!} />}
                <Button onClick={onAddGate}>Add Gate</Button>
                <Button onClick={onAddConstant}>Add Constant</Button>
                <Button onClick={onAddTest}>Add HA</Button>
                <Button onClick={runSimulation}>runFullSimulation</Button>
            </div>
        </div>
    );
};
