import { Handle, NodeProps, Position } from "@xyflow/react";
import { useMemo } from "react";

import { BaseNode } from "@/editor/nodes/BaseNode.tsx";
import {
    EdgeStates,
    LogicNode,
    LogicNodeData,
    LogicState,
    logicStateFromBool,
    negate,
    SimulatorNode,
} from "@/editor/types.ts";

type GateType = "AND" | "OR" | "XOR" | "NOT";

export interface GateNodeData extends LogicNodeData {
    gateType: GateType;
    negated: boolean;
}

export type GateNode = LogicNode<GateNodeData, "gate">;

export class GateSimulatorNode extends SimulatorNode {
    override calculateNewState(data: GateNodeData, inputs: EdgeStates): EdgeStates {
        let state: LogicState;

        switch (data.gateType) {
            case "AND": {
                state = logicStateFromBool(inputs["a"] === "on" && inputs["b"] === "on");
                break;
            }
            case "OR": {
                state = logicStateFromBool(inputs["a"] === "on" || inputs["b"] === "on");
                break;
            }
            case "XOR": {
                state = logicStateFromBool(inputs["a"] !== inputs["b"]);
                break;
            }
            case "NOT": {
                return { out: negate(inputs["a"]) };
            }
        }

        if (data.negated) {
            state = negate(state);
        }

        return { out: state };
    }
}

export const GateNodeComponent = ({ selected, data }: NodeProps<GateNode>) => {
    const gateName = useMemo(() => {
        if (data.gateType === "XOR" && data.negated) return "XNOR";

        return (data.negated ? "N" : "") + data.gateType;
    }, [data.gateType, data.negated]);

    return (
        <>
            <BaseNode logicState={data.simulator?.output["out"]} selected={selected}>
                {gateName}
            </BaseNode>
            <Handle id={"a"} type="target" position={Position.Left} style={{ top: "30%" }} />
            <Handle id={"b"} type="target" position={Position.Left} style={{ top: "70%" }} />
            <Handle id={"out"} type="source" position={Position.Right} />
        </>
    );
};
