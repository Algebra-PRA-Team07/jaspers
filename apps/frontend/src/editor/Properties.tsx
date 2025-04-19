import { ButtonHTMLAttributes, FC, useMemo } from "react";

import { useEditorState } from "./editorState.ts";
import { GateNode } from "./nodes/GateNode.tsx";
import { GateProperties } from "./properties/GateProperties.tsx";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    ...properties
}) => {
    return (
        <button className={`bg-zinc-800 p-2 rounded ${className}`} {...properties}>
            {children}
        </button>
    );
};

export const Properties: FC = () => {
    const { selectedNodes, addNode } = useEditorState();

    const selection = useMemo(() => selectedNodes.at(0), [selectedNodes]);

    return (
        <div className="fixed bottom-0 left-0 p-4">
            <div className="bg-zinc-900 p-3 w-[250px] rounded-lg shadow flex flex-col gap-3">
                {selection && <GateProperties gate={selection as GateNode} />}
                <Button onClick={addNode}>Add Node</Button>
            </div>
        </div>
    );
};
