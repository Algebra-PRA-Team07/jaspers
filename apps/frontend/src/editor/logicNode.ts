import { Node } from "@xyflow/react";

export type LogicState = "on" | "off" | "unknown";

export interface LogicNodeData {
    state: LogicState;
    calculateNewState: (inputs: LogicState[]) => LogicState;
    [key: string]: unknown;
}

export interface LogicNode extends Node {
    data: LogicNodeData;
}
