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
            isFocus: false
        }

        this.inputRef = React.createRef(null);    
    }

    

    componentDidMount() {
        
        // this.inputRef.current.focus();
    }

    addCardList = () => {
       
        this.setState({
            inputVisible: true,
            isFocus: true
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
            inputVisible: false,
            label: ""
        })
    }


    editTask = () => {
       
    }

    deleteCardList = (cardList) => {
       
        const { list } = this.state;
        this.setState({
            list: list.filter((listItem) => {
                return listItem.id !== cardList.id
            })
        })
    }


    render() {
        const { list, taskInput, inputVisible, label } = this.state
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
                                    deleteCardList={this.deleteCardList}
                                    key={data.id}
                                />
                            )
                        })
                    }
                    {
                        inputVisible === true ? 
                        <div className="addcardList">
                            <Input
                                ref={this.inputRef} 
                                handleTaskInputChange={this.handleInputChange} 
                                onKeyPress={this.addListToCardList}
                                isFocus={this.state.isFocus}
                            />
                            <Button type={"add-button"} 
                                handleClick={this.addListToCardList} 
                                disabled={label === "" ? true : false}
                                />
                        </div> 
                        : 
                        <Button 
                            handleClick={this.addCardList} 
                            type={"add-button"}    
                        />
                    }
                    
                </div>

            
            </div>
        )
    }
}

export default TrelloBoard

