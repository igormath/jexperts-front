import { useState } from "react";
import deleteUser from "../../services/user/deleteUser";
import { useNavigate } from "react-router-dom";
import getAuthToken from "../../util/authToken";

interface ModalProps {
    isVisible: boolean;
    onClose: Function;
    email: string;
}

const ModalRemove = (props: ModalProps) => {
    const navigate = useNavigate();
    const [isAccountDeleted, setIsAccountDeleted] = useState<boolean>(false);

    if (!props.isVisible) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.id === "wrapper") {
            props.onClose();
        }
    };

    const handleDeleteUser = async () => {
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }
        const response = await deleteUser(props.email, token);
        if (!response.ok) {
            alert(
                `Houve um erro ao remover o usuário, tente novamente. ${response.status}`,
            );
        } else {
            setIsAccountDeleted(true);
            setTimeout(() => {
                localStorage.clear();
                navigate("/");
            });
        }
    };

    return (
        <div
            onClick={handleClose}
            id="wrapper"
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                        Remover Perfil
                    </h3>
                    <button
                        onClick={() => props.onClose()}
                        className="text-slate-500 hover:text-slate-700"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <p className="text-slate-600 text-center">
                    Tem certeza que deseja remover seu perfil? Esta ação é
                    irreversível.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => props.onClose()}
                        className="flex-1 text-slate-800 bg-white font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeleteUser}
                        className="flex-1 text-primary bg-red-600 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-red-500 transition-colors duration-300"
                    >
                        Remover
                    </button>
                </div>
                {isAccountDeleted && (
                    <p className="text-center text-sm text-green-600 mt-4">
                        Perfil removido com sucesso. Redirecionando...
                    </p>
                )}
            </div>
        </div>
    );
};

export default ModalRemove;
