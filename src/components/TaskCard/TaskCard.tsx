import { useState } from "react";
import ModalRemoveTask from "../ModalRemoveTask/ModalRemoveTask";
import ModalEditTask from "../ModalEditTask/ModalEditTask";
import { TaskProps } from "../Home/Home";

interface TaskCardProps {
    id: number;
    done: boolean;
    authorEmail: string;
    title: string;
    children: string;
    onTaskDeleted: () => void;
    onTaskUpdated: (updatedTask: TaskProps) => void;
}

const TaskCard = (props: TaskCardProps) => {
    const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

    return (
        <li className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3
                        className={`text-lg font-bold text-slate-900 ${props.done ? "line-through text-slate-500" : ""}`}
                    >
                        {props.title}
                    </h3>
                    <p
                        className={`mt-1 text-sm text-slate-600 ${props.done ? "line-through" : ""}`}
                    >
                        {props.children}
                    </p>
                </div>
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${props.done ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                >
                    {props.done ? "Completa" : "Pendente"}
                </span>
            </div>
            <div className="flex justify-end items-center mt-6 gap-3">
                <button
                    onClick={() => setShowModalEdit(true)}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={() => setShowModalRemove(true)}
                    className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                    Remover
                </button>
                <ModalRemoveTask
                    isVisible={showModalRemove}
                    onClose={() => setShowModalRemove(false)}
                    email={props.authorEmail}
                    id={props.id}
                    onTaskDeleted={props.onTaskDeleted}
                />
                <ModalEditTask
                    isVisible={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    email={props.authorEmail}
                    id={props.id}
                    description={props.children}
                    done={props.done}
                    onTaskUpdated={props.onTaskUpdated}
                    title={props.title}
                />
            </div>
        </li>
    );
};

export default TaskCard;
