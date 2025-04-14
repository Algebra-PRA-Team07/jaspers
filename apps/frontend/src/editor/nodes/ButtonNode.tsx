import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useCallback } from "react";

import { useEditorActions } from "../editorState.ts";
import { LogicNodeData } from "../logicNode.ts";

type ButtonNode = Node<LogicNodeData, "button">;

export default function ButtonNode({ id, data }: NodeProps<ButtonNode>) {
    const { setNodeData, runSimulation } = useEditorActions();

    const onClick = useCallback(() => {
        const newState = data.state === "on" ? "off" : "on";

        setNodeData(id, { ...data, state: newState });
        //runSimulation();
    }, [setNodeData, id, data, runSimulation]);

    return (
        <>
            <div
                className={`${data.state === "on" ? "bg-green-500" : "bg-white"} border-2 border-black p-3 rounded`}
            >
                <button onClick={onClick}>Button</button>
            </div>
            <Handle type="source" position={Position.Right} id="b" />
        </>
    );
}
