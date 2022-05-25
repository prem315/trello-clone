// import React from "react"
import Button from "../Button/Button"
import "./TrelloBoard.scss"
import CardList from "../CardList/CardList"
import { throttle } from "../../utils/utils"
import { v4 as uuidv4 } from 'uuid';

import React, { useState, useRef } from 'react';
// import './App.css';
 
// const TrelloBoard = () => {
  
//   const dragItem = useRef();
//   const dragOverItem = useRef();
//   const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
//   const dragStart = (e, position) => {
//     dragItem.current = position;
//     console.log(e.target.innerHTML);
//   };
 
//   const dragEnter = (e, position) => {
//     dragOverItem.current = position;
//     console.log(e.target.innerHTML);
//   };
 
//   const drop = (e) => {
//     const copyListItems = [...list];
//     const dragItemContent = copyListItems[dragItem.current];
//     const d = copyListItems.splice(dragItem.current, 1);
//     const a = copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setList(copyListItems);
//   };
 
//   return (
//     <>
//     {
//     list &&
//     list.map((item, index) => (
//       <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
//         onDragStart={(e) => dragStart(e, index)}
//         onDragEnter={(e) => dragEnter(e, index)}
//         onDragEnd={drop}
//         key={index}
//         draggable>
//           {item}
//       </div>
//       ))}
//     </>
//   );
// };
// export default TrelloBoard;

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props)

        // this.state = {
        //     list: [
        //         {id: 1, label: "Todo List" , tasks: [{id: 1, task: "task 1"}, {id: 2, task: "task 2"}]},
        //         {id: 2, label: "Doing" , tasks: [{id: 1, task: "task 1"}, {id: 2, task: "task 2"}]}
        //     ],
        //     taskInput: "",
        //     currentCardId: null
        // }

        this.state = {
            list: [
                {id: uuidv4(), label: "Todo List" , tasks: [{id: uuidv4(), task: "task 1"}, {id: uuidv4(), task: "task 2"}]},
                {id: uuidv4(), label: "Doing" , tasks: [{id: uuidv4(), task: "task 1"}, {id: uuidv4(), task: "task 2"}]}
            ],
            taskInput: "",
            currentCardId: null
        }
        
    }

    addCard = () => {

    }

    addTaskToCard = (val, selectedCard) => {
      
        const { taskInput, currentCardId, list} = this.state;
  
        // this.setState({
        //     list: list.map((card) => {
        //         if(card.id === selectedCard.id) {
        //             return {
        //                 ...card,
        //                 tasks: [...card.tasks, {id: card.tasks.length + 1, task:val }]
        //             }
        //         } else {
        //             return card
        //         }
               
        //     }),
        //     taskInput : ""
        // })

        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        tasks: [...card.tasks, {id: uuidv4(), task:val }]
                    }
                } else {
                    return card
                }
               
            }),
            taskInput : ""
        })

       
    }

    delteTaskToCard = (selectedCard, selectedTask) => {
        // console.log("delete", card, task)
        const { list } = this.state;
        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        tasks: card.tasks.filter((task) => {
                            return task.id !== selectedTask.id
                        })
                    } 
                } else {
                    return card
                }
            })
        })
    }

    editTaskToCard = (val, card, task) => {
        console.log("editing", val)
        const { list } = this.state;
        // throttle(() => {
        //     this.setState({

        //     })
        // }, 2000)
    }

    handleTaskInputChange = (val, card) => {
       
        this.setState({
            taskInput: val,
            currentCardId: card.id
        })
    }

    dragAndDropTask = (dragItem, dragOverItem, selectedCard, selectedTask, dragCard) => {
       
        const {list} = this.state 
        const copyListItems = [...list];
        const selectedList = copyListItems.find((list) => {
            return list.id === selectedCard.id
        }).tasks

        const dragItemContent = selectedList[dragItem];
        selectedList.splice(dragItem, 1);
        selectedList.splice(dragOverItem, 0, dragItemContent); 
        
        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        tasks: selectedList
                    }
                } else {
                    return card
                }
            })
        })
        
        // if(dragCard.id === selectedCard.id) {
           
        // } else {
        //     console.log("dont don a")
        // }
        
        
    }

    render() {
        const { list, taskInput } = this.state
        return (
            <div className="trelloBoard">
                <div className="cardListContainer">
                    {
                        list.map((data, index) => {
                        
                            return(
                                <CardList 
                                    card={data}
                                    addTaskToCard={this.addTaskToCard}
                                    handleTaskInputChange={this.handleTaskInputChange} 
                                    taskInput={taskInput}
                                    delteTaskToCard={this.delteTaskToCard}
                                    editTaskToCard={this.editTaskToCard}
                                    dragAndDropTask={this.dragAndDropTask}
                                    key={data.id}
                                />
                            )
                        })
                    }
                    <Button handleClick={this.addCard} />
                </div>
            
            </div>
        )
    }
}

export default TrelloBoard

