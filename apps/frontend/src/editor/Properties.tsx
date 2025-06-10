import { FC, useMemo } from "react";

import { NewGateButton } from "@/editor/properties/NewGateButton.tsx";

import { useEditorState } from "./editorState.ts";
import { NodeType, REGISTERED_NODES_PROPERTIES } from "./nodes/nodes.ts";

const properties = REGISTERED_NODES_PROPERTIES["properties"];

const Placeholder: FC<{ text: string }> = ({ text }) => {
    return <div className="flex-grow flex justify-center items-center opacity-50">{text}</div>;
};

export const Properties: FC = () => {
    const selectedNodes = useEditorState((s) => s.selectedNodes);

    const selection = useMemo(
        () => (selectedNodes.length === 1 ? selectedNodes[0] : undefined),
        [selectedNodes],
    );

    const NodeProperties = useMemo(() => {
        if (!selection) return undefined;

        return properties[selection.type! as NodeType];
    }, [selection]);

    return (
        <div className="w-[250px] h-full bg-card border rounded-md shadow flex flex-col p-3 gap-3 pointer-events-auto">
            {NodeProperties ? (
                <>
                    <NodeProperties node={selection!} />
                    <div className="flex-grow"></div>
                </>
            ) : selectedNodes.length > 1 ? (
                <Placeholder text={"Multiple Selection"} />
            ) : selectedNodes.length === 0 ? (
                <Placeholder text={"No Selection"} />
            ) : (
                <Placeholder text={"Not Applicable"} />
            )}

            <NewGateButton />
        </div>
    );
};
