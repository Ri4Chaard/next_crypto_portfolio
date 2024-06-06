import { useState } from "react";
import { Modal } from "./UI/Modal";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

interface PortfolioTopbar {
    wallets: [];
    address: string;
    setAddress: any;
    addWallet: any;
    selectedWallet: number;
    setSelectedWallet: any;
    loading: boolean;
}

export const PortfolioTopbar = ({
    wallets,
    address,
    setAddress,
    addWallet,
    selectedWallet,
    setSelectedWallet,
    loading,
}: PortfolioTopbar) => {
    const t = useTranslations("Portfolio");
    const [modal, setModal] = useState(false);
    return (
        <>
            <div className="p-3 border-x border-b border-solid border-slate-800 flex items-center justify-between">
                <p className="text-3xl font-bold">{t("Header")}</p>
                {wallets.length > 0 && (
                    <div className="font-bold flex items-center text-xl text-cyan-600">
                        <button
                            className="border-r border-solid border-cyan-600 hover:bg-cyan-600 hover:rounded-l hover:text-white"
                            disabled={selectedWallet == 0 || loading}
                            onClick={() =>
                                setSelectedWallet(selectedWallet - 1)
                            }
                        >
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>
                        <p className="px-3">
                            {selectedWallet + 1}{" "}
                            <span className="px-1 ">/</span>
                            {wallets.length}
                        </p>
                        <button
                            className="border-l border-solid border-cyan-600 hover:bg-cyan-600 hover:rounded-r hover:text-white"
                            disabled={
                                selectedWallet == wallets.length - 1 || loading
                            }
                            onClick={() =>
                                setSelectedWallet(selectedWallet + 1)
                            }
                        >
                            <ChevronRightIcon className="w-8 h-8" />
                        </button>
                    </div>
                )}
                <button
                    className="flex items-center text-green-700 font-bold hover:text-green-500"
                    onClick={() => setModal(!modal)}
                >
                    <p className="mr-2">{t("Add")}</p>
                    <PlusCircleIcon className="w-8 h-8" />
                </button>
            </div>
            <Modal visible={modal} setVisible={() => setModal(false)}>
                <div className="flex flex-col">
                    <p className="text-2xl font-bold mb-3">{t("AddHeader")}</p>
                    <p className="text-xl mb-3">{t("AddText")}</p>
                    <input
                        value={address}
                        type="text"
                        placeholder="0xXXX..."
                        className="mb-5 text-xl text-white w-96 p-1 border border-solid border-cyan-600 rounded bg-slate-900"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="flex flex-col">
                        <button
                            className="mb-5 p-3 font-bold border border-solid border-green-700 rounded hover:text-slate-900 hover:bg-green-700"
                            onClick={() => {
                                addWallet(address);
                                setModal(false);
                            }}
                        >
                            {t("AddBtn")}
                        </button>
                        <button
                            className="self-end"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            {t("AddCancel")}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
