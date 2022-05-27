import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableInput from './EditableInput';

describe("testing <EditableInput /> component", () => {
 
    test('should render CardList', () => {
        render(<EditableInput 
            text={""}
        />);
   
        const cardList = screen.getByTestId('editable-input');
        expect(cardList).toBeInTheDocument();
    //   expect(inputEl).toHaveAttribute("type", "email");
    });

   
});