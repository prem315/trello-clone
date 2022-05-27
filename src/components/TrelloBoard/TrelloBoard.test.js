import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { v4 as uuidv4 } from 'uuid';
import TrelloBoard from './TrelloBoard';

describe("testing <TrelloBoard /> component", () => {
 
    test('should render CardList', () => {
        render(<TrelloBoard 
            // text={"text"}
           
        />);
   
        const cardList = screen.getByTestId('trello-board');
        expect(cardList).toBeInTheDocument();
    //   expect(inputEl).toHaveAttribute("type", "email");
    });

   
});