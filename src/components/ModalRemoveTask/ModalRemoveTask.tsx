import getAuthToken from "../../util/authToken";
import { useState } from "react";
import deleteTask from "../../services/task/deleteTask";

interface ModalProps{
    isVisible: boolean,
    onClose: Function,
    email: string,
    id: number,
    onTaskDeleted: () => void,
}

const ModalRemoveTask = (props: ModalProps) => {

    const [isTaskDeleted, setIsTaskDeleted] = useState<boolean>(false);

    if (!props.isVisible) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.id === "wrapper") {
            props.onClose();
        }
    }

    const handleDeleteTask = async () => {
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }
        const response = await deleteTask(props.email, props.id, token);
        if (!response.ok){
            alert(`Houve um erro ao remover a tarefa, tente novamente. ${response.status}`)
        } else{
            setIsTaskDeleted(true);
            props.onTaskDeleted();
            setTimeout(() => {
                props.onClose();
            }, 3000)
        }
    }

    return (
    <div onClick={handleClose} id="wrapper" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-10/12 lg:w-1/2 2xl:w-1/3 flex flex-col">
            <button onClick={() => props.onClose()} className="text-white text-xl place-self-end">X</button>
            <div className="py-6 bg-white p-2 rounded">
                <p className="text-center text-lg">Tem certeza que deseja remover a tarefa {props.id}?</p>
                <button onClick={handleDeleteTask} className="h-10 w-7/12 mx-auto mt-4 block rounded bg-red-500 my-2 hover:bg-red-400 text-primary text-center">Remover</button>
                <button onClick={() => props.onClose()} className="h-10 w-7/12 mx-auto mt-4 block rounded bg-slate-500 my-2 hover:bg-slate-400 text-primary text-center">Cancelar</button>
                {isTaskDeleted && <p className="text-center mt-4">Tarefa removida com sucesso. Retornando para a página de login...</p>}
            </div>
        </div>
    </div>
    )
}

export default ModalRemoveTask;
