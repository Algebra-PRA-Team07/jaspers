import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { useMemo } from "react";

import { BaseNode } from "./BaseNode.tsx";

type GateType = "AND" | "OR" | "XOR";

type GateNodeData = {
    gateType: GateType;
    negated: boolean;
};

export type GateNode = Node<GateNodeData, "gate">;

export const GateNodeComponent = ({ selected, data }: NodeProps<GateNode>) => {
    const gateName = useMemo(() => {
        if (data.gateType === "XOR" && data.negated) return "XNOR";

        return (data.negated ? "N" : "") + data.gateType;
    }, [data.gateType, data.negated]);

    return (
        <>
            <BaseNode selected={selected}>{gateName}</BaseNode>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};
