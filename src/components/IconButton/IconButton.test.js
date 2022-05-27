import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './IconButton';

describe("testing <IconButton /> component", () => {
 
    test('should render IconButton', () => {
      render(<IconButton />);
   
      const button = screen.getByLabelText('cost-icon-button');
      expect(button).toBeInTheDocument();
    //   expect(inputEl).toHaveAttribute("type", "email");
    });


    
   
});