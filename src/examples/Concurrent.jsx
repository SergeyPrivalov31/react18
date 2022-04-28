//ОСНОВНАЯ ФИЧА, ПАРАЛЛЕЛЬНЫЙ РЕНДЕРИНГ. МОЖНО ПОСТАВИТЬ НА ПАУЗУ.

//ПОЗВОЛЯЕТ СДЕЛАТЬ ОТЛОЖЕННУЮ ПЕРЕРИСОВКУ. РЕКАТ ОБЕЩАЕТ,ЧТО НА ИНТЕРФЕЙСЕ НИКАК НЕ ОТРАЗИТСЯ

//useTransition
//НЕ ИСПОЛЬЗЕМ В ИНПУТАХ, КЛИКАХ НА КНОПКУ  И ПРОЧИХ МЕЛКИХ ШТУКАХ
//ИСПОЛЬЗУЕМ КОГДА НУЖНО ПОКАЗАТЬ ПОДСКАЗКУ, ПЕРЕКЛЮЧЕНИЕ ТАБА(МЕНЯЕМ ИНТЕРФЕЙС)

//С ПОМОЩЬЮ Transitions МОЖЕМ ДЕЛАТЬ ОТЛОЖЕННЫЙ РЕНДЕР

//useDeffered -> это debounce только с отложенной перерисовкой
import React, { useDeferredValue, useMemo, useState, useTransition } from "react"
import {defaultItems}  from './defaultItems'

export const Concurrent = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState(defaultItems);
    const deferredValue = useDeferredValue(value); //реакт за нас делает стартТранзишн

    const filteredItems = useMemo( () => {
        return items.filter(item => item.title.toLowerCase().includes(deferredValue))
    }, [deferredValue]);

    const onChangeValue = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
        <input type='text' value={value} onChange={onChangeValue} />
        <div>
            {filteredItems.map((item, index) => (
                <div  key={index}>
                    <div>id = {item.id}</div>
                    <div>{item.title}</div>
                </div>
            ))}
        </div>
        </>
    )
}


//useTRANSITION

// export const Concurrent = () => {
//     const [value, setValue] = useState('');
//     const [filteredValue, setFilteredValue] = useState('');
//     const [items, setItems] = useState(defaultItems);
//     const [isPanding, startTransition] = useTransition(); //Булеан флаг и функция которая запускает отложенный рендер

//     const filteredItems = useMemo( () => {
//         return items.filter(item => item.title.toLowerCase().includes(filteredValue))
//     }, [filteredValue]);

//     const onChangeValue = (e) => {
//         setValue(e.target.value);
//         //Тут запускаем отложенный рендер
//         startTransition(()=> {
//             setFilteredValue(e.target.value)
//         })
//     }
//     return (
//         <>
//         <input type='text' value={value} onChange={onChangeValue} />
//         {isPanding && <h1>isLoading...</h1>}
//         <div>
//             {filteredItems.map((item, index) => (
//                 <div  key={index}>
//                     <div>id = {item.id}</div>
//                     <div>{item.title}</div>
//                 </div>
//             ))}
//         </div>
//         </>
//     )
// }