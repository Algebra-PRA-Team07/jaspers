import { Node } from "@xyflow/react";

import { SimulatorNode } from "./simulation/simulator.ts";

export interface LogicNodeData extends Record<string, unknown> {
    simulator?: SimulatorNode;
}

export type LogicNode<
    Data extends LogicNodeData = LogicNodeData,
    Type extends string = string,
> = Node<Data, Type>;

export type LogicState = "on" | "off" | "unknown";

export const negate = (s: LogicState): LogicState => (s === "off" ? "on" : "off");
