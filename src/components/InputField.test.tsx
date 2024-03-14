import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppContext from '../AppContext';
import InputField from './InputField';

const mockSetNotes = jest.fn();
const wrapper = ({ children }: any) => (
  <AppContext.Provider value={{ notes: [], setNotes: mockSetNotes }}>
    {children}
  </AppContext.Provider>
);

describe('InputField Component', () => {
  it('updates content state on text input change', () => {
    render(<InputField />, { wrapper });

    const inputElement: HTMLInputElement = screen.getByPlaceholderText('Add a note about Milton Romaguera');
    fireEvent.change(inputElement, { target: { value: 'New note content' } });

    expect(inputElement.value).toBe('New note content');
  });


  it('changes note type on icon click', () => {
    render(<InputField />, { wrapper });
    const card = screen.getByTestId('card');
    fireEvent.focus(card);

    const phoneIconButton = screen.getByTestId('btn-phone');
    fireEvent.click(phoneIconButton);

    expect(phoneIconButton).toHaveStyle('background-color: #00c6ee');
  });

  it('adds a new note on submit', () => {
    render(<InputField />, { wrapper });
    const card = screen.getByTestId('card');
    fireEvent.focus(card);

    const phoneIconButton = screen.getByTestId('btn-phone');
    fireEvent.click(phoneIconButton);

    const inputElement = screen.getByPlaceholderText('Add a note about Milton Romaguera');
    fireEvent.change(inputElement, { target: { value: 'Test note content' } });

    const submitButton = screen.getByTestId('btn-submit');
    fireEvent.click(submitButton);

    expect(mockSetNotes).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          content: 'Test note content',
        }),
      ]),
    );
  });
});
