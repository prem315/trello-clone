import React from "react"
import Button from "../Button/Button"
import "./TrelloBoard.scss"
import CardList from "../CardList/CardList"


class TrelloBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [
                {id: 1, label: "Todo List" , tasks: [{id: 1, task: "task 1"}, {id: 2, task: "task 2"}]},
                {id: 2, label: "Doing" , tasks: [{id: 1, task: "task 1"}, {id: 2, task: "task 2"}]}
            ],
            taskInput: "",
            currentCardId: null
        }
        
    }

    addCard = () => {

    }

    addTaskToCard = (val, selectedCard) => {
      
        const { taskInput, currentCardId, list} = this.state;
  
        this.setState({
            list: list.map((card) => {
                if(card.id === selectedCard.id) {
                    return {
                        ...card,
                        tasks: [...card.tasks, {id: card.tasks.length + 1, task:val }]
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

    editTaskToCard = () => {
        console.log("editing")
    }

    handleTaskInputChange = (val, card) => {
       
        this.setState({
            taskInput: val,
            currentCardId: card.id
        })
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

// const cardListReducer = (state, action) => {
//     switch(action.type) {
//         default: 
//             return state
//     }
// }

// export default function TrelloBoard() {

//     const addCard = () => {
//         console.log("clicked")
//     }

//     const [cardListData, cardListDispatch] = React.useReducer(cardListReducer, {
//         list: [
//             {label: "Todo List" , tasks: [{id: 1, task: "task 1"}, {id: 1, task: "task 2"}]},
//             {label: "Doing" , tasks: [{id: 1, task: "task 1"}, {id: 1, task: "task 2"}]}
//         ]
//     })

//     console.log(cardListData)

//     return (
//         <div className="trelloBoard">
//             <div className="cardListContainer">
//                 {
//                     cardListData.list.map((data) => {
                       
//                         return(
//                             <CardList 
//                                 card={data} 
//                                 cardListDispatch={cardListDispatch}
//                             />
//                         )
//                     })
//                 }
//                 <Button handleClick={addCard} />
//             </div>
            
//         </div>
//     )
// }