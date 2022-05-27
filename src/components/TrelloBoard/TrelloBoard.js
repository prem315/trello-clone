// import React from "react"
import Button from "../Button/Button"
import "./TrelloBoard.scss"
import CardList from "../CardList/CardList"
import Input from "../Input/input"
import { throttle } from "../../utils/utils"
import { v4 as uuidv4 } from 'uuid';

import React, { useState, useRef } from 'react';


class TrelloBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [
                {id: uuidv4(), label: "Todo List" , tasks: [{id: uuidv4(), task: "task 1"}, {id: uuidv4(), task: "task 2"}]},
                {id: uuidv4(), label: "Doing" , tasks: [{id: uuidv4(), task: "task 3"}, {id: uuidv4(), task: "task 4"}]}
            ],
            taskInput: "",
            currentCardId: null,
            inputVisible: false,
            label: "",
            
        }

        this.inputRef = React.createRef()
        
    }

    componentDidMount() {
        console.log(this.inputRef)
        //this.inputRef.current.focus()
    }

    addCardList = () => {
        this.inputRef.current.focus()
        this.setState({
            inputVisible: true
            //list: [...this.state.list, {id: uuidv4(), label: "", tasks: []}]
        })
    }

    addTaskToCard = (val, selectedCard) => {
      
        const { taskInput, currentCardId, list} = this.state;
  

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

    editTaskToCard = (val, selectedCard, selectedTask) => {
        // console.log("editing", val, card, task)
       
        const { list } = this.state;
        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        tasks: card.tasks.map((currentTask) => {
                            if(currentTask.id === selectedTask.id) {
                                return {
                                    ...currentTask,
                                    task: val
                                }
                            } else {
                                return currentTask
                            }
                        })
                    } 
                } else {
                    return card
                }
            })
        })
    }

    handleTaskInputChange = (val, card) => {
       
        this.setState({
            taskInput: val,
            currentCardId: card.id
        })
    }

    dragAndDropTask = (dragItem, dragOverItem, selectedCard, selectedTask, dragCardId) => {
       
        const {list} = this.state 
        const copyListItems = [...list];
        const selectedList = copyListItems.find((list) => {
            return list.id === selectedCard.id
        }).tasks
        
        if(dragCardId === selectedCard.id) {
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
        } else {
            
           
            // const selected
            const selectedList = copyListItems.find((list) => {
                return list.id === dragCardId
            }).tasks
            const dragItemContent = selectedList[dragItem];
            selectedList.splice(dragItem, 1);
           
            // remove from selectedlist
            // drop list tasks
            const dropListTasks = copyListItems.find((list) => {
                return list.id === selectedCard.id
            }).tasks
            dropListTasks.splice(dragOverItem, 0, dragItemContent)

            this.setState({
                list: list.map((card) => {
                    if(card.id === dragCardId) {
                        return {
                            ...card,
                            tasks: selectedList
                        }
                    } else if(card.id === selectedCard.id) {
                        return {
                            ...card,
                            tasks: dropListTasks
                        }
                    }
                })
            })
        }
    }

    editLableChange = (val, selectedCard) => {
        const { list } = this.state
        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        label:val
                    }
                } else {
                    return card
                }
            }),
        })
    }

    handleInputChange = (val) => {
        
        this.setState({
            label: val
        })
    }

    addListToCardList = () => {
        const {label, list} = this.state
        
        this.setState({

            list: [...list, {id: uuidv4(), label: label, tasks: []}],
            inputVisible: false
        })
    }


    editTask = () => {
        console.log("clicked")
    }

   


    render() {
        const { list, taskInput, inputVisible } = this.state
        return (
            <div className="trelloBoard" data-testid="trello-board">
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
                                    editTask={this.editTask}
                                    dragAndDropTask={this.dragAndDropTask}
                                    editLableChange={this.editLableChange}
                                    key={data.id}
                                />
                            )
                        })
                    }
                    {
                        inputVisible === true ? 
                        <div className="addcardList">
                            <Input 
                                handleTaskInputChange={this.handleInputChange} 
                                onKeyPress={this.addListToCardList}
                                ref={this.inputRef}
                            />
                            <Button handleClick={this.addListToCardList}>Add</Button>
                        </div> 
                        : 
                        <Button handleClick={this.addCardList} />
                    }
                    
                </div>

            
            </div>
        )
    }
}

export default TrelloBoard

