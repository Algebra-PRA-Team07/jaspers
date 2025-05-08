import { Handle, NodeProps, Position } from "@xyflow/react";

import {
    EdgeStates,
    LogicNode,
    LogicNodeData,
    logicStateFromBool,
    SimulatorNode,
} from "@/editor/types.ts";

import { BaseNode } from "./BaseNode.tsx";

export type AdderNodeData = LogicNodeData;

export type AdderNode = LogicNode<AdderNodeData, "adder">;

export class AdderSimulatorNode extends SimulatorNode {
    override calculateNewState(_data: LogicNodeData, inputs: EdgeStates): EdgeStates {
        return {
            out: logicStateFromBool(inputs["a"] !== inputs["b"]), // logic XOR
            carry: logicStateFromBool(inputs["a"] === "on" && inputs["b"] === "on"),
        };
    }
}

export const AdderNodeComponent = ({ selected }: NodeProps<AdderNode>) => {
    return (
        <>
            <BaseNode selected={selected}>HA</BaseNode>

            <Handle id="a" type="target" position={Position.Left} style={{ top: "30%" }} />
            <Handle id="b" type="target" position={Position.Left} style={{ top: "70%" }} />

            <Handle id="out" type="source" position={Position.Right} style={{ top: "30%" }} />
            <Handle id="carry" type="source" position={Position.Right} style={{ top: "70%" }} />
        </>
    );
};
