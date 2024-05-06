import { SignalIcon } from "@heroicons/react/20/solid";

export const Loader = () => {
    return (
        <>
            <div className="flex justify-center items-center">
                <SignalIcon className="animate-spin w-12 h-12 text-cyan-600" />
            </div>
        </>
    );
};
