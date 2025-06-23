import { Edge } from "@xyflow/react";
import { nanoid } from "nanoid";

import { GateNode } from "@/editor/nodes/GateNode.tsx";
import { InputNode } from "@/editor/nodes/InputNode.tsx";
import { NegateNode } from "@/editor/nodes/NegateNode.tsx";
import { OutputNode } from "@/editor/nodes/OutputNode.tsx";
import { LogicNode } from "@/editor/types.ts";

export interface Example {
    name: string;
    nodes: LogicNode[];
    edges: Edge[];
}

export const EXAMPLES: Example[] = [
    {
        name: "D Latch",
        nodes: [
            {
                id: "nor-1",
                type: "gate",
                position: { x: 450, y: 100 },
                data: {
                    gateType: "OR",
                    negated: true,
                },
            } satisfies GateNode,
            {
                id: "nor-2",
                type: "gate",
                position: { x: 450, y: 300 },
                data: {
                    gateType: "OR",
                    negated: true,
                },
            } satisfies GateNode,
            {
                id: "and-1",
                type: "gate",
                position: { x: 300, y: 100 },
                data: {
                    gateType: "AND",
                    negated: false,
                },
            } satisfies GateNode,
            {
                id: "and-2",
                type: "gate",
                position: { x: 300, y: 300 },
                data: {
                    gateType: "AND",
                    negated: false,
                },
            } satisfies GateNode,
            {
                id: "not-1",
                type: "negate",
                position: { x: 150, y: 100 },
                data: {},
            } satisfies NegateNode,
            {
                id: "enable",
                type: "_input",
                position: { x: 200, y: 200 },
                data: {
                    name: "Enable",
                    desiredState: "off",
                },
            } satisfies InputNode,
            {
                id: "data",
                type: "_input",
                position: { x: 35, y: 200 },
                data: {
                    name: "Data",
                    desiredState: "off",
                },
            } satisfies InputNode,
            {
                id: "output",
                type: "_output",
                position: { x: 600, y: 100 },
                data: {
                    name: "Output",
                },
            } satisfies OutputNode,
        ].map((it) => ({
            ...it,
            position: {
                x: it.position.x + 400,
                y: it.position.y + 200,
            },
        })),

        edges: [
            {
                id: nanoid(),
                source: "nor-1",
                sourceHandle: "out",
                target: "nor-2",
                targetHandle: "a",
            },
            {
                id: nanoid(),
                source: "nor-2",
                sourceHandle: "out",
                target: "nor-1",
                targetHandle: "b",
            },
            {
                id: nanoid(),
                source: "and-1",
                sourceHandle: "out",
                target: "nor-1",
                targetHandle: "a",
            },
            {
                id: nanoid(),
                source: "and-2",
                sourceHandle: "out",
                target: "nor-2",
                targetHandle: "b",
            },
            {
                id: nanoid(),
                source: "not-1",
                sourceHandle: "out",
                target: "and-1",
                targetHandle: "a",
            },

            {
                id: nanoid(),
                source: "enable",
                sourceHandle: "out",
                target: "and-1",
                targetHandle: "b",
            },
            {
                id: nanoid(),
                source: "enable",
                sourceHandle: "out",
                target: "and-2",
                targetHandle: "a",
            },

            {
                id: nanoid(),
                source: "data",
                sourceHandle: "out",
                target: "not-1",
                targetHandle: "in",
            },
            {
                id: nanoid(),
                source: "data",
                sourceHandle: "out",
                target: "and-2",
                targetHandle: "b",
            },

            {
                id: nanoid(),
                source: "nor-1",
                sourceHandle: "out",
                target: "output",
                targetHandle: "in",
            },
        ],
    },

    {
        name: "Half Adder",
        nodes: [
            {
                id: "xor-1",
                type: "gate",
                position: { x: 650, y: 300 },
                data: {
                    gateType: "XOR",
                    negated: false,
                },
            } satisfies GateNode,

            {
                id: "and-1",
                type: "gate",
                position: { x: 650, y: 400 },
                data: {
                    gateType: "AND",
                    negated: false,
                },
            } satisfies GateNode,

            {
                id: "in-a",
                type: "_input",
                position: { x: 500, y: 300 },
                data: {
                    name: "A",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b",
                type: "_input",
                position: { x: 500, y: 400 },
                data: {
                    name: "B",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "out-sum",
                type: "_output",
                position: { x: 850, y: 300 },
                data: {
                    name: "Sum",
                },
            } satisfies OutputNode,

            {
                id: "out-carry",
                type: "_output",
                position: { x: 850, y: 400 },
                data: {
                    name: "Carry",
                },
            } satisfies OutputNode,
        ],
        edges: [
            {
                id: nanoid(),
                source: "in-a",
                sourceHandle: "out",
                target: "xor-1",
                targetHandle: "a",
            },
            {
                id: nanoid(),
                source: "in-a",
                sourceHandle: "out",
                target: "and-1",
                targetHandle: "a",
            },
            {
                id: nanoid(),
                source: "in-b",
                sourceHandle: "out",
                target: "xor-1",
                targetHandle: "b",
            },
            {
                id: nanoid(),
                source: "in-b",
                sourceHandle: "out",
                target: "and-1",
                targetHandle: "b",
            },
            {
                id: nanoid(),
                source: "xor-1",
                sourceHandle: "out",
                target: "out-sum",
                targetHandle: "in",
            },
            {
                id: nanoid(),
                source: "and-1",
                sourceHandle: "out",
                target: "out-carry",
                targetHandle: "in",
            },
        ],
    },

    {
        name: "Full Adder (template)",
        nodes: [
            {
                id: "in-a",
                type: "_input",
                position: { x: 400, y: 300 },
                data: {
                    name: "A",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b",
                type: "_input",
                position: { x: 400, y: 400 },
                data: {
                    name: "B",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-carry",
                type: "_input",
                position: { x: 550, y: 200 },
                data: {
                    name: "Carry IN",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "out-sum",
                type: "_output",
                position: { x: 850, y: 300 },
                data: {
                    name: "Sum",
                },
            } satisfies OutputNode,

            {
                id: "or-1",
                type: "gate",
                position: { x: 700, y: 400 },
                data: {
                    gateType: "OR",
                    negated: false,
                },
            } satisfies GateNode,

            {
                id: "out-carry",
                type: "_output",
                position: { x: 850, y: 400 },
                data: {
                    name: "Carry OUT",
                },
            } satisfies OutputNode,
        ],
        edges: [
            {
                id: nanoid(),
                source: "or-1",
                sourceHandle: "out",
                target: "out-carry",
                targetHandle: "in",
            },
        ],
    },

    {
        name: "4-bit Adder (template)",
        nodes: [
            {
                id: "in-carry",
                type: "_input",
                position: { x: 400, y: 150 },
                data: {
                    name: "Carry IN",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-a1",
                type: "_input",
                position: { x: 400, y: 250 },
                data: {
                    name: "A1",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-a2",
                type: "_input",
                position: { x: 400, y: 300 },
                data: {
                    name: "A2",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-a3",
                type: "_input",
                position: { x: 400, y: 350 },
                data: {
                    name: "A3",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-a4",
                type: "_input",
                position: { x: 400, y: 400 },
                data: {
                    name: "A4",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b1",
                type: "_input",
                position: { x: 500, y: 450 },
                data: {
                    name: "B1",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b2",
                type: "_input",
                position: { x: 500, y: 500 },
                data: {
                    name: "B2",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b3",
                type: "_input",
                position: { x: 500, y: 550 },
                data: {
                    name: "B3",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "in-b4",
                type: "_input",
                position: { x: 500, y: 600 },
                data: {
                    name: "B4",
                    desiredState: "off",
                },
            } satisfies InputNode,

            {
                id: "out-1",
                type: "_output",
                position: { x: 900, y: 300 },
                data: {
                    name: "S1",
                },
            } satisfies OutputNode,

            {
                id: "out-2",
                type: "_output",
                position: { x: 900, y: 350 },
                data: {
                    name: "S2",
                },
            } satisfies OutputNode,

            {
                id: "out-3",
                type: "_output",
                position: { x: 900, y: 400 },
                data: {
                    name: "S3",
                },
            } satisfies OutputNode,

            {
                id: "out-4",
                type: "_output",
                position: { x: 900, y: 450 },
                data: {
                    name: "S4",
                },
            } satisfies OutputNode,
        ],
        edges: [],
    },
];
