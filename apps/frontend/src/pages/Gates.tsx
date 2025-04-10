import { Gate } from "@jaspers/models";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useTRPC } from "../utils/trpc";

const GateBlock: FC<{ gate: Gate }> = ({gate}) => {
    return (
        <div className="p-2 bg-slate-800 rounded flex items-center justify-between text-lg">
            <span className="text-neutral-400">Gate <span className="text-white">{gate.type}</span> takes <span className="text-sky-400">{gate.no_operands}</span> operands.</span>
            <span className="text-base text-neutral-400">id: {gate.id}</span>
        </div>
    )
}

export const Gates: FC = () => {
    const trpc = useTRPC();

    const gateQuery = useQuery(trpc.gateList.queryOptions());

    if (gateQuery.isFetching) {
        return <span>Loading...</span>
    }

    if (gateQuery.isError || !gateQuery.isSuccess) {
        return <span className="text-red-400">Can't load data from backend</span>;
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span>Gates from backend:</span>
            <button className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors" onClick={() => gateQuery.refetch()}>Reload</button>
            </div>
            {gateQuery.data.map(gate => <GateBlock key={gate.id} gate={gate} />)}
        </div>
    )
}