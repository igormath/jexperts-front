import getAuthToken from "../../util/authToken";
import { useState } from "react";
import putTask from "../../services/task/putTask";
import { useRef } from "react";
import { TaskProps } from "../Home/Home";

interface ModalProps {
    isVisible: boolean;
    onClose: Function;
    email: string;
    id: number;
    description: string;
    done: boolean;
    title: string;
    onTaskUpdated: (updatedTask: TaskProps) => void;
}

const ModalEditTask = (props: ModalProps) => {
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false);
    const [isDone, setIsDone] = useState(props.done);
    const taskTitleInput = useRef<HTMLInputElement>(null);
    const taskDescriptionInput = useRef<HTMLInputElement>(null);
    const taskDoneInput = useRef<HTMLInputElement>(null);

    if (!props.isVisible) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.id === "wrapper") {
            props.onClose();
        }
    };

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }

        const newDescription =
            taskDescriptionInput.current?.value || props.description;
        const newTitle = taskTitleInput.current?.value || props.title;
        const newDone = isDone;

        try {
            const response = await putTask(
                props.email,
                newDescription,
                newDone,
                props.id,
                newTitle,
                token,
            );

            if (!response.ok) {
                alert(
                    `Houve um erro ao editar a tarefa, tente novamente. ${response.status}`,
                );
            } else {
                setIsTaskUpdated(true);
                props.onTaskUpdated({
                    id: props.id,
                    description: newDescription,
                    done: newDone,
                    authorEmail: props.email,
                    title: newTitle,
                });
                setTimeout(() => {
                    setIsTaskUpdated(false);
                    props.onClose();
                }, 1000);
            }
        } catch (error) {
            alert(
                `Houve um erro ao editar a tarefa, tente novamente. ${error}`,
            );
        }
    };

    const handleCheckboxChange = () => {
        setIsDone((prev) => !prev);
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
                        Editar Tarefa
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
                <form onSubmit={handleUpdateTask} className="space-y-6">
                    <div>
                        <label
                            htmlFor="task-title"
                            className="text-sm font-medium text-slate-700"
                        >
                            Título
                        </label>
                        <input
                            ref={taskTitleInput}
                            type="text"
                            name="task-title"
                            id="task-title"
                            className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                            defaultValue={props.title}
                            placeholder="Digite o novo título"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="task-description"
                            className="text-sm font-medium text-slate-700"
                        >
                            Descrição
                        </label>
                        <input
                            ref={taskDescriptionInput}
                            type="text"
                            name="task-description"
                            id="task-description"
                            className="mt-1 block w-full px-4 py-2 text-slate-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                            defaultValue={props.description}
                            placeholder="Digite a nova descrição"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            ref={taskDoneInput}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            name="done"
                            id="done"
                            checked={isDone}
                            className="h-4 w-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                        />
                        <label
                            htmlFor="done"
                            className="ml-2 block text-sm text-slate-900"
                        >
                            Marcar como completa
                        </label>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => props.onClose()}
                            className="flex-1 text-slate-800 bg-white font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 text-primary bg-slate-800 font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-slate-700 transition-colors duration-300"
                        >
                            Atualizar
                        </button>
                    </div>
                    {isTaskUpdated && (
                        <p className="text-center text-sm text-green-600 mt-4">
                            Tarefa atualizada com sucesso!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ModalEditTask;
