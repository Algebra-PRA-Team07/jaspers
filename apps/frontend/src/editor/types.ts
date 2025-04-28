import { Node } from "@xyflow/react";

export interface LogicNodeData extends Record<string, unknown> {
    simulator?: SimulatorNode;
}

export type LogicNode<
    Data extends LogicNodeData = LogicNodeData,
    Type extends string = string,
> = Node<Data, Type>;

export type LogicState = "on" | "off" | "unknown";

export const negate = (s: LogicState): LogicState => (s === "off" ? "on" : "off");

export class SimulatorNode {
    state: LogicState = "unknown";

    calculateNewState(_data: LogicNodeData, _inputs: LogicState[]): LogicState {
        throw new Error("Not Implemented");
    }
}
