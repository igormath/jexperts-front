import getAuthToken from "../../util/authToken";
import { useState } from "react";
import putTask from "../../services/task/putTask";
import { useRef } from "react";
import { TaskProps } from "../Home/Home";

interface ModalProps{
    isVisible: boolean,
    onClose: Function,
    email: string,
    id: number,
    description: string,
    done: boolean,
    title: string,
    onTaskUpdated: (updatedTask: TaskProps) => void,
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
    }

    const handleUpdateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getAuthToken();
        if (!token) {
            console.error("Nenhuma chave encontrada no local storage.");
            return;
        }

        const newDescription = taskDescriptionInput.current?.value || props.description;
        const newTitle = taskTitleInput.current?.value || props.title;
        const newDone = isDone;

        try{
            const response = await putTask(props.email,  newDescription, newDone, props.id, newTitle, token);

            if (!response.ok){
                alert(`Houve um erro ao editar a tarefa, tente novamente. ${response.status}`)
            } else{
                setIsTaskUpdated(true);
                props.onTaskUpdated({
                    id: props.id,
                    description: newDescription,
                    done: newDone,
                    authorEmail: props.email,
                    title: newTitle,
                })
                setTimeout(() => {
                    setIsTaskUpdated(false);
                    props.onClose();
                }, 1000)
            }
        }catch(error){
            alert(`Houve um erro ao editar a tarefa, tente novamente. ${error}`)
        }
    }

    const handleCheckboxChange = () => {
        setIsDone(prev => !prev);
    };

    return (
    <div onClick={handleClose} id="wrapper" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-10/12 lg:w-1/2 2xl:w-1/3 flex flex-col">
            <button onClick={() => props.onClose()} className="text-white text-xl place-self-end">X</button>
            <div className="py-6 bg-white px-3 rounded">
                <form onSubmit={handleUpdateTask}>
                <label htmlFor="task-description" className="flex flex-col">
                        <span>Titulo:</span>
                        <input ref={taskTitleInput} type="text" name="task-title" id="task-title" className="h-11 border-2 rounded mb-2 px-3" defaultValue={props.title} placeholder="Digite a nova descrição" required/>
                    </label>
                    <label htmlFor="task-description" className="flex flex-col">
                        <span>Descrição:</span>
                        <input ref={taskDescriptionInput} type="text" name="task-description" id="task-description" className="h-11 border-2 rounded mb-2 px-3" defaultValue={props.description} placeholder="Digite a nova descrição" required/>
                    </label>
                    <label htmlFor="task-done">
                        <span className="mr-2">Tarefa completa:</span>
                        <input ref={taskDoneInput} onChange={handleCheckboxChange} type="checkbox" name="done" id="done" checked={isDone}/>
                    </label>
                    <button type="submit" className="h-10 w-7/12 mx-auto mt-4 block rounded my-2 bg-slate-800 hover:bg-slate-700 text-primary text-center">Atualizar</button>
                </form>
                <button onClick={() => props.onClose()} className="h-10 w-7/12 mx-auto mt-4 block rounded bg-slate-500 my-2 hover:bg-slate-400 text-primary text-center">Cancelar</button>
                {isTaskUpdated && <p className="text-center mt-4">Tarefa atualizada com sucesso</p>}
            </div>
        </div>
    </div>
    )
}

export default ModalEditTask;
