import { Handle, NodeProps, Position } from "@xyflow/react";

import { LogicNode, LogicNodeData, LogicState } from "../types.ts";
import { BaseNode } from "./BaseNode.tsx";

interface ConstantNodeData extends LogicNodeData {
    desiredState: LogicState;
}

export type ConstantNode = LogicNode<ConstantNodeData, "constant">;

export const ConstantNodeComponent = ({ data, selected }: NodeProps<ConstantNode>) => {
    return (
        <>
            <BaseNode selected={selected} className="rounded-full font-extrabold">
                {data.desiredState === "on" ? "1" : "0"}
            </BaseNode>
            <Handle type={"source"} position={Position.Right} />
        </>
    );
};
