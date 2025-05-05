import { nanoid } from "nanoid";
import { FC, useCallback, useMemo } from "react";

import { useEditorState } from "./editorState.ts";
import { AdderNode } from "./nodes/AdderNode.tsx";
import { ConstantNode } from "./nodes/ConstantNode.tsx";
import { GateNode } from "./nodes/GateNode.tsx";
import { getRegisteredNodesProperty } from "./nodes/nodes.ts";
import { Button } from "./properties/Controls.tsx";

const properties = getRegisteredNodesProperty("properties");

export const Properties: FC = () => {
    const { selectedNodes, addNode, runSimulation } = useEditorState();

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
        <div className="fixed bottom-0 left-0 p-4">
            <div className="bg-zinc-900 p-3 w-[250px] rounded-lg shadow flex flex-col gap-3">
                {NodeProperties && <NodeProperties node={selection!} />}
                <Button onClick={onAddGate}>Add Gate</Button>
                <Button onClick={onAddConstant}>Add Constant</Button>
                <Button onClick={onAddTest}>Add HA</Button>
                <Button onClick={runSimulation}>runFullSimulation</Button>
            </div>
        </div>
    );
};
