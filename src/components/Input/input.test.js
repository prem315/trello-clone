import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './input';

const mockedHandleChange = jest.fn()

describe("testing <Input /> component", () => {
 
    test('should render input', () => {
      render(<Input />);
   
      const inputEl = screen.getByLabelText('cost-input');
      expect(inputEl).toBeInTheDocument();
    //   expect(inputEl).toHaveAttribute("type", "email");
    });
   
    test('pass valid input field', () => {
      render(<Input handleTaskInputChange={mockedHandleChange}/>);
   
      const inputEl = screen.getByLabelText("cost-input");
      userEvent.type(inputEl, "task 1");
   
      expect(screen.getByLabelText("cost-input")).toHaveValue("task 1");
      expect(screen.queryByTestId("cost-input")).not.toBeInTheDocument();
    });
   
});

