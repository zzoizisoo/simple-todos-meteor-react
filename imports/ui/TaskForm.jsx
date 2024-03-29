import React, {useState} from "react";
import { TasksCollection } from "../api/TasksCollection";

export const TaskForm = () => { 
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        console.log('new task submit click')
        e.preventDefault();

        if(!text) return;

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        })

        setText("")
    }


    return(
        <form className="task-form"> 
            <input
                type="text"
                placeholder="새 할일을 입력하세요"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button type="submit" onClick={handleSubmit}>할 일 추가</button>
        </form>
    )
}