import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 as uuidv4 } from 'uuid';
import CardList from './CardList';

describe("testing <CardList /> component", () => {
 
    test('should render CardList', () => {
        render(<CardList 
            // text={"text"}

            card={
                {
                    id: uuidv4(),
                    label: "Test List",
                    tasks: [{id: uuidv4(), task: "task 1"}, {id: uuidv4(), task: "task 2"}]
                }
            }
        />);
   
        const cardList = screen.getByTestId('cardList');
        expect(cardList).toBeInTheDocument();
    //   expect(inputEl).toHaveAttribute("type", "email");
    });

    test('loads items eventually', async () => {
        const doc = render(<CardList 
            card={
                {
                    id: uuidv4(),
                    label: "Test List",
                    tasks: [{id: uuidv4(), task: "task 1"}, {id: uuidv4(), task: "task 2"}]
                }
            }
        />);
      
      const inputElement = doc.getByTestId('name');
        
      const button =  doc.getByTestId('icon-button');
      //doc.getByTestId('icon-button');
     

     
      // const todoCountElement = doc.getByTestId('todoCount');
    
      // // Create the todo.
      fireEvent.change(inputElement, { target: { value: 'Feed my dog.' } });
      fireEvent.click(button);
    
      const tasks = screen.findAllByText(/task /);
      const todoNameElement = todo.firstChild;
      
        // Wait for page to update with query text
        // const items = await screen.findAllByText(/Item #[0-9]: /)
        // expect(items).toHaveLength(10)
    })

    

   
});