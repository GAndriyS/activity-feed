import '@testing-library/jest-dom/extend-expect';
import { fireEvent, renderHook } from '@testing-library/react';
import { addDays, addHours, addMinutes } from 'date-fns';
import { act } from 'react-dom/test-utils';
import AppContext from './AppContext';
import { useDeleteNote, useFormatTimestamp, useNotes, useOutsideClick } from './hooks';
import { Note, NoteType } from './models';

const mockLocalStorage = (function () {
  let store: {[key: string]: string} = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = String(value);
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const notesMock: Note[] = [
  {
    id: '1',
    timestamp: '2021-01-03T00:00:00.000Z',
    content: 'Note 1',
    author: 'Author 1',
    target: 'Target 1',
    type: NoteType.message
  },
  {
    id: '3',
    timestamp: '2021-01-03T00:00:00.000Z',
    content: 'Note 3',
    author: 'Author 1',
    target: 'Target 1',
    type: NoteType.message
  }
]

describe('Hooks tests', () => {
  describe('useNotes', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('initializes notes from localStorage', () => {
      const initialNotes = JSON.stringify(notesMock);
      window.localStorage.setItem('applicationNotes', initialNotes);

      const { result } = renderHook(() => useNotes());

      expect(result.current[0]).toEqual(notesMock);
    });

    it('updates notes and writes to localStorage', () => {;
      const { result } = renderHook(() => useNotes());

      act(() => {
        result.current[1](notesMock);
      });

      expect(result.current[0]).toEqual(notesMock);
      expect(window.localStorage.getItem('applicationNotes')).toEqual(JSON.stringify(notesMock));
    });
  });

  describe('useDeleteNote', () => {
    it('should remove the note with the specified id', () => {
      const setNotes = jest.fn();
      const wrapper = ({ children }: any) => (
        <AppContext.Provider value={{ notes: notesMock, setNotes }}>
          {children}
        </AppContext.Provider>
      );

      const { result } = renderHook(() => useDeleteNote(), { wrapper });

      act(() => {
        result.current('3');
      });

      const expectedResult = [{
        id: '1',
        timestamp: '2021-01-03T00:00:00.000Z',
        content: 'Note 1',
        author: 'Author 1',
        target: 'Target 1',
        type: NoteType.message
      }];
      expect(setNotes).toHaveBeenCalledTimes(1);
      expect(setNotes).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('useFormatTimestamp', () => {
    test('returns "Now" for current time', () => {
      const { result } = renderHook(() => useFormatTimestamp());
      const formattedTime = result.current(new Date().toISOString());
      expect(formattedTime).toBe("Now");
    });

    test('returns correct difference in minutes', () => {
      const { result } = renderHook(() => useFormatTimestamp());
      const date = addMinutes(new Date(), -30).toISOString();
      const formattedTime = result.current(date);
      expect(formattedTime).toBe("30min");
    });

    test('returns correct difference in hours', () => {
      const { result } = renderHook(() => useFormatTimestamp());
      const date = addHours(new Date(), -2).toISOString();
      const formattedTime = result.current(date);
      expect(formattedTime).toBe("2hr");
    });

    test('returns correct difference in days', () => {
      const { result } = renderHook(() => useFormatTimestamp());
      const date = addDays(new Date(), -3).toISOString();
      const formattedTime = result.current(date);
      expect(formattedTime).toBe("3d");
    });
  });

  describe('useOutsideClick', () => {
    let ref: { current: HTMLDivElement };
    let mockOnOutsideClick: any;

    beforeEach(() => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      ref = { current: div };
      mockOnOutsideClick = jest.fn();
    });

    afterEach(() => {
      document.body.removeChild(ref.current);
    });

    it('calls onOutsideClick when clicking outside of the referenced element', () => {
      renderHook(() => useOutsideClick(ref, mockOnOutsideClick));

      fireEvent.mouseDown(document);

      expect(mockOnOutsideClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onOutsideClick when clicking inside of the referenced element', () => {
      renderHook(() => useOutsideClick(ref, mockOnOutsideClick));

      fireEvent.mouseDown(ref.current);

      expect(mockOnOutsideClick).not.toHaveBeenCalled();
    });
  });
});