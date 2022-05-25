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

    addTaskToCard = () => {
        console.log("clicked")
        const { taskInput, currentCardId, list} = this.state;
    //     const newList = [...list];
    //     const findCard = newList.filter((card) => {
    //         return card.id === currentCardId
    //     })
    //    // findCard
    //     console.log(findCard)
        this.setState({
            list: list.map((card) => {
                if(card.id === currentCardId) {
                    return {
                        ...card,
                        tasks: [...card.tasks, {id: card.tasks.length + 1, task:taskInput }]
                    }
                } else {
                    return card
                }
               
            }),
            taskInput : ""
        })

        // this.setState({
        //     taskInput: ""
        // })

        // this.setState(previousState => ({
        //     taskInput: [...previousState.myArray, 'new value']
        // }));

        // this.setState(prevState =>{
        //     return{
        //          ...prevState,
        //          taskInput : ""
        //     }
        //  })
    }

    delteTaskToCard = () => {

    }

    editTaskToCard = () => {

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