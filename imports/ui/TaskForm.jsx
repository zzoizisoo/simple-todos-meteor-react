import React, {useState} from "react";

export const TaskForm = () => { 
    const [text, setText] = useState('')

    return(
        <form className="task-form"> 
            <input
                type="text"
                placeholder="새 할일을 입력하세요"
            />

            <button type="submit">할 일 추가</button>
        </form>
    )
}