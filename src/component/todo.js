import React, { useState, useEffect } from 'react'
import './style.css'
import TodoLogo from '../images/todo.png';

///get local storage data

const getLocalData = () => {
    const list = localStorage.getItem("myTodoList");

    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //add an item to the list
    const addItem = () => {
        if (!inputData) {
            alert('Please fill data!')
            return;
        }else if(inputData && toggleButton){

            const abc =  items.map( (ele) => {
                if(ele.date === isEditItem){
                    return {...ele, value: inputData}
                }else{
                    return  ele;
                }
            });

            setItems( abc )

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }

        else {

            const myNewData = {
                date: new Date().getTime().toString(),
                value: inputData,
            }
            setItems([...items, myNewData])
        }
        setInputData('')
    }

    //deleting a single item

    const deleteItem = (date) => {
        const updatedItemList = items.filter((elem) => {
            return elem.date !== date;
        })

        setItems(updatedItemList);

    }

    //edit single item

    const editItem = (date) => {
        const item_to_edit = items.find((ele) => {
            return ele.date === date;
        })


        if (item_to_edit) {

            setInputData(item_to_edit.value);
            setIsEditItem(date);
            setToggleButton(true);

        }
    }

    //update that current item edit
    const updateItem = () =>{
         
    }

    //delete all items
    const deleteAll = () => {
        setItems([])
    }

    //save data to local storage
    const saveToLocalStorage = () => {

        localStorage.setItem("myTodoList", JSON.stringify(items))

    }

    //the below useEffect wil only run when the items array will change

    useEffect(() => {

        saveToLocalStorage()

    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={TodoLogo} alt="todo-logo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>

                    <div className="addItems">

                        <input
                            type="text"
                            placeholder="✍️ Add Item"
                            className="form-control"
                            value={inputData}
                            onChange={(e) => { setInputData(e.target.value) }}

                        />

                        {toggleButton ?
                            (

                                <i className="far fa-solid fa-edit" onClick={() => {addItem()}}></i>

                            )

                            :
                            (
                                <i className="fa fa-solid fa-plus" onClick={() => { addItem() }}></i>

                            )


                        }


                    </div>

                    {/* Show out items */}

                    <div className="showItems">

                        {items ? (items.map((currItem, index) => {

                            return (
                                <div className="eachItem" key={index}>

                                    <h3>{currItem.value}</h3>

                                    <div className="todo-btn"></div>
                                    <i className="far fa-solid fa-edit" onClick={() => { editItem(currItem.date) }}></i>
                                    <i className="far fa-solid fa-trash-alt" onClick={() => deleteItem(currItem.date)}></i>

                                </div>

                            )

                        })) : <></>}




                    </div>

                    {/* Remove all button */}


                    <div className="showItems">

                        <button
                            className='btn effect04'
                            onClick={() => { deleteAll() }}
                            data-sm-link-text="Remove All">
                            <span> CLEAR LIST</span></button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Todo