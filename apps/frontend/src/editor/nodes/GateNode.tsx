import { Handle, NodeProps, Position } from "@xyflow/react";
import { useMemo } from "react";

import { LogicNode, LogicNodeData } from "../types.ts";
import { BaseNode } from "./BaseNode.tsx";

type GateType = "AND" | "OR" | "XOR";

export interface GateNodeData extends LogicNodeData {
    gateType: GateType;
    negated: boolean;
}

export type GateNode = LogicNode<GateNodeData, "gate">;

export const GateNodeComponent = ({ selected, data }: NodeProps<GateNode>) => {
    const gateName = useMemo(() => {
        if (data.gateType === "XOR" && data.negated) return "XNOR";

        return (data.negated ? "N" : "") + data.gateType;
    }, [data.gateType, data.negated]);

    return (
        <>
            <BaseNode logicState={data.simulator?.state} selected={selected}>
                {gateName}
            </BaseNode>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};
