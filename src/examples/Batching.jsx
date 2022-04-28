import React, { useState } from "react";
import { flushSync } from "react-dom";

//ЭТА ШТУКА ПОЗВОЛЯЕТ ОПТИМИЗИРОВАТЬ КОД, ОПТИМИЗИРОВАТЬ ПЕРЕРИСОВКИ

export const Batching = () => {

    const [value, setValue] = useState(0)
    const [state, setState] = useState(0)

    console.log('RENDER')

    //// Тут Batching работает, один рендер происходит

    const update = () => {
        Promise.resolve()
            .then(() => {
                setValue(prev => prev + 1)  
                setState(prev => prev + 1)
            })
        }      
    
    //// Тут Batching не работает, два рендера происходит
    
    // const update = () => {
    //     Promise.resolve()
    //         .then(() => {
    //             flushSync(() => { setValue(prev => prev + 1) }) 
    //             flushSync(() => { setState(prev => prev + 1) })
    //         })
    //     }

    return (
            <div>
                <h1>value {value}</h1>
                <h1>state {state}</h1>
                <button onClick={update}>UPDATE</button>
            </div>
        )
}
