type InputReference = { type: "input"; name: string };
type GateReference = { type: "gate"; id: string };

type Source = InputReference | GateReference;

type GateType = "AND" | "NAND" | "OR" | "NOR" | "XOR";

interface Gate {
    id: string;
    type: GateType;
    inputs: Source[];
}

interface LogicCircuit {
    inputs: string[];
    gates: Gate[];
    outputs: Source[];
}
