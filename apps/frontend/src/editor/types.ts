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
export const logicStateFromBool = (b: boolean): LogicState => (b ? "on" : "off");

export type EdgeStates = Record<string, LogicState>;

export class SimulatorNode {
    output: EdgeStates = {};

    receiveInput(_data: LogicNodeData, _inputs: EdgeStates): string[] {
        const newState = this.calculateNewState(_data, _inputs);

        const changed = Object.entries(newState)
            .filter(([key, value]) => {
                return this.output[key] !== value;
            })
            .map(([key]) => key);

        this.output = newState;

        return changed;
    }

    protected calculateNewState(_data: LogicNodeData, _inputs: EdgeStates): EdgeStates {
        throw new Error("Not Implemented");
    }
}
