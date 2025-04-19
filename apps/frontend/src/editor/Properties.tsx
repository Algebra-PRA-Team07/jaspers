import React, { FC, useMemo } from "react";

import { useEditorState } from "./editorState.ts";
import { ConstantProperties } from "./properties/ConstantProperties.tsx";
import { Button } from "./properties/Controls.tsx";
import { GateProperties } from "./properties/GateProperties.tsx";
import { LogicNode } from "./types.ts";

type AnyPropertiesComponent = React.ComponentType<{ node: LogicNode }>;

const properties: Record<string, AnyPropertiesComponent> = {
    gate: GateProperties as AnyPropertiesComponent,
    constant: ConstantProperties as AnyPropertiesComponent,
};

export const Properties: FC = () => {
    const { selectedNodes, addNode } = useEditorState();

    const selection = useMemo(() => selectedNodes.at(0), [selectedNodes]);

    const NodeProperties = useMemo(() => {
        if (!selection) return undefined;

        return properties[selection.type!];
    }, [selection]);

    return (
        <div className="fixed bottom-0 left-0 p-4">
            <div className="bg-zinc-900 p-3 w-[250px] rounded-lg shadow flex flex-col gap-3">
                {NodeProperties && <NodeProperties node={selection!} />}
                <Button onClick={addNode}>Add Node</Button>
            </div>
        </div>
    );
};
