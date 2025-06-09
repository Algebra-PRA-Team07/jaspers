/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeProps } from "@xyflow/react";
import { ComponentType } from "react";

import { AdderNodeComponent, AdderSimulatorNode } from "@/editor/nodes/AdderNode.tsx";
import {
import { GateNodeComponent, GateNodeData, GateSimulatorNode } from "@/editor/nodes/GateNode.tsx";
import {
    InputNodeComponent,
    InputNodeData,
    InputSimulatorNode,
} from "@/editor/nodes/InputNode.tsx";
import { AdderProperties } from "@/editor/properties/AdderProperties.tsx";
import { GateProperties } from "@/editor/properties/GateProperties.tsx";
import { InputProperties } from "@/editor/properties/InputProperties.tsx";
import { LogicNodeData, SimulatorNode } from "@/editor/types.ts";

import { OutputProperties } from "../properties/OutputProperties";
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
    properties: AnyPropertiesComponent;
    simulation: typeof SimulatorNode;
    createData: () => LogicNodeData;
}

export const Nodes: Record<string, NodeRegistration> = {
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
        properties: OutputProperties,
        simulation: OutputSimulatorNode,
        createData: () => ({}),
    },
    adder: {
        name: "Half Adder",
        component: AdderNodeComponent,
        properties: AdderProperties,
        simulation: AdderSimulatorNode,
        createData: () => ({}),
    },
};

export const getRegisteredNodesProperty = <K extends keyof NodeRegistration>(property: K) => {
    return Object.fromEntries(
        Object.entries(Nodes).map(([key, value]) => [key, value[property]]),
    ) as Record<string, NodeRegistration[K]>;
};
