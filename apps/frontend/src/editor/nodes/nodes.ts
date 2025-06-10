/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeProps } from "@xyflow/react";
import { ComponentType } from "react";

import { AdderNodeComponent, AdderSimulatorNode } from "@/editor/nodes/AdderNode.tsx";
import { CustomNodeComponent, CustomSimulatorNode } from "@/editor/nodes/CustomNode.tsx";
import { GateNodeComponent, GateNodeData, GateSimulatorNode } from "@/editor/nodes/GateNode.tsx";
import {
    InputNodeComponent,
    InputNodeData,
    InputSimulatorNode,
} from "@/editor/nodes/InputNode.tsx";
import { GateProperties } from "@/editor/properties/GateProperties.tsx";
import { InputProperties } from "@/editor/properties/InputProperties.tsx";
import { LogicNodeData, SimulatorNode } from "@/editor/types.ts";

import { OutputNodeComponent, OutputSimulatorNode } from "./OutputNode";

type AnyNodeComponent = ComponentType<
    NodeProps & {
        data: any;
        type: any;
    }
>;

type AnyPropertiesComponent = ComponentType<{ node: any }>;

// ovo je taaaakav neeeredddd sveeee
export interface NodeRegistration {
    name: string;
    component: AnyNodeComponent;
    properties: AnyPropertiesComponent | null;
    simulation: typeof SimulatorNode;
    createData: () => LogicNodeData;
}

export const Nodes = {
    gate: {
        name: "Gate",
        component: GateNodeComponent,
        properties: GateProperties,
        simulation: GateSimulatorNode,
        createData: () =>
            ({
                gateType: "AND",
                negated: false,
            }) satisfies GateNodeData,
    },
    _input: {
        name: "Input",
        component: InputNodeComponent,
        properties: InputProperties,
        simulation: InputSimulatorNode,
        createData: () =>
            ({
                desiredState: "off",
            }) satisfies InputNodeData,
    },
    _output: {
        name: "Output",
        component: OutputNodeComponent,
        properties: null,
        simulation: OutputSimulatorNode,
        createData: () => ({}),
    },
    adder: {
        name: "Half Adder",
        component: AdderNodeComponent,
        properties: null,
        simulation: AdderSimulatorNode,
        createData: () => ({}),
    },
    custom: {
        name: "Custom",
        component: CustomNodeComponent,
        properties: null,
        simulation: CustomSimulatorNode,
        createData: () => ({}),
    },
} satisfies Record<string, NodeRegistration>;

export type NodeType = keyof typeof Nodes;

type NodePropertiesObject = {
    [k in keyof NodeRegistration]: Record<NodeType, NodeRegistration[k]>;
};

// type safe enough
export const REGISTERED_NODES_PROPERTIES: NodePropertiesObject = Object.fromEntries(
    (["name", "component", "properties", "simulation", "createData"] as const).map((field) => [
        field,
        Object.fromEntries(Object.entries(Nodes).map(([key, value]) => [key, value[field]])),
    ]),
) as Record<
    keyof NodeRegistration,
    Record<NodeType, NodeRegistration[keyof NodeRegistration]>
> as NodePropertiesObject;
