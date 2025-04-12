import { User } from "@jaspers/models";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { useTRPC } from "../utils/trpc.ts";

const UserBlock: FC<{ user: User }> = ({ user }) => {
    return (
        <div className="p-2 bg-slate-800 rounded flex items-center justify-between text-lg">
            <span className="text-base text-neutral-400">
                id: {user.id} username: {user.username}
            </span>
        </div>
    );
};

export const UsersTest: FC = () => {
    const trpc = useTRPC();
    const usersQuery = useQuery(trpc.userList.queryOptions());

    if (usersQuery.isFetching) {
        return <span>Loading...</span>;
    }

    if (usersQuery.isError || !usersQuery.isSuccess) {
        return <span className="text-red-400">Can't load data from backend (cringe)</span>;
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span>Users from backend:</span>
                <button
                    className="px-2 py-0.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors"
                    onClick={() => usersQuery.refetch()}
                >
                    Reload
                </button>
            </div>
            {usersQuery.data.map((user) => (
                <UserBlock key={user.id} user={user} />
            ))}
        </div>
    );
};
