import { useState } from "react";
import ModalRemoveTask from "../ModalRemoveTask/ModalRemoveTask";
import ModalEditTask from "../ModalEditTask/ModalEditTask";
import { TaskProps } from "../Home/Home";

interface TaskCardProps {
    id: number,
    done: boolean,
    authorEmail: string,
    title: string,
    children: string,
    onTaskDeleted: () => void;
    onTaskUpdated: (updatedTask: TaskProps) => void;
}

const TaskCard = (props: TaskCardProps) => {

    const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    
    return (
    <li className=" border border-slate-500 rounded-md my-4 p-2 md:w-1/2 md:mx-auto">
        <div className="flex flex-row">
            <span className="font-medium mr-2">Título:</span>
            <h3>{props.title}</h3>
        </div>
        <div className="flex flex-row">
            <span className="font-medium mr-2">Descrição:</span>
            {props.done ? <p className="line-through">{props.children}</p> : <p>{props.children}</p>} 
        </div>
            {props.done ? <p className="font-medium">Tarefa completa.</p> : <p className="font-medium">Tarefa incompleta.</p>} 
        <div className="flex row justify-end">
            <button onClick={() => setShowModalEdit(true)} className="h-8 w-2/6 mr-2 block rounded bg-slate-800 hover:bg-slate-700 text-primary text-center md:w-1/6">Editar</button>
            <button onClick={() => setShowModalRemove(true)} className="h-8 w-2/6 block rounded bg-red-500 hover:bg-red-400 text-primary text-center md:w-1/6">Remover</button>
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
    )
}

export default TaskCard;

