import { Node } from "@xyflow/react";

export type LogicNodeData = Record<string, unknown>;

export type LogicNode<
    Data extends LogicNodeData = LogicNodeData,
    Type extends string = string,
> = Node<Data, Type>;

export type LogicState = "on" | "off" | "unknown";
