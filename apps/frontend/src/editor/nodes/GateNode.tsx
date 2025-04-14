import { Handle, Node, NodeProps, Position } from "@xyflow/react";

import { LogicNodeData } from "../logicNode.ts";

interface GateNodeData extends LogicNodeData {
    gateType: string;
}

type GateNode = Node<GateNodeData, "gate">;

export default function GateNode({ data }: NodeProps<GateNode>) {
    let backgroundColor;

    switch (data.state) {
        case "on": {
            backgroundColor = "bg-green-500";
            break;
        }

        case "off": {
            backgroundColor = "bg-white";
            break;
        }

        case "unknown": {
            backgroundColor = "bg-gray-200";
            break;
        }
    }

    return (
        <>
            <Handle type="target" position={Position.Left} id="a" style={{ top: 10 }} />
            <Handle type="target" position={Position.Left} id="b" style={{ bottom: 10 }} />
            <div className={`${backgroundColor} border-2 border-black p-2 rounded`}>
                <label htmlFor="text">{data.gateType}</label>
            </div>
            <Handle type="source" position={Position.Right} id="a" />
        </>
    );
}
