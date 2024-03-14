import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from './Status';
import { NoteType } from '../models';

describe('Status Component', () => {
  jest.mock("../hooks", () => ({
    useFormatTimestamp: () => jest.fn().mockImplementation((timestamp) => "Now"),
  }));

  it('renders ChatBubbleIcon for NoteType.message', () => {
    render(<Status type={NoteType.message} />);
    expect(screen.getByTestId('ChatBubbleIcon')).toBeInTheDocument();
  });

  it('renders PhoneIcon for NoteType.phone', () => {
    render(<Status type={NoteType.phone} />);
    expect(screen.getByTestId('PhoneIcon')).toBeInTheDocument();
  });

  it('renders LocalCafeIcon for NoteType.coffee', () => {
    render(<Status type={NoteType.coffee} />);
    expect(screen.getByTestId('LocalCafeIcon')).toBeInTheDocument();
  });

  it('renders SportsBarIcon for NoteType.beer', () => {
    render(<Status type={NoteType.beer} />);
    expect(screen.getByTestId('SportsBarIcon')).toBeInTheDocument();
  });

  it('renders PersonIcon for NoteType.meetingNote', () => {
    render(<Status type={NoteType.meetingNote} />);
    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument();
  });

  it('renders default icon when no type is provided', () => {
    render(<Status />);
    expect(screen.getByTestId('FormatListBulletedIcon')).toBeInTheDocument();
  });

  it('renders timestamp when timestamp is provided', () => {
    render(<Status type={NoteType.meetingNote} />);
    const textElement = screen.getByText('Now', { selector: 'p' });
    expect(textElement).toBeInTheDocument();
  });

  it('does not render "Now" when no timestamp is provided', () => {
    render(<Status />);
    const textElement = screen.queryByText('Now', { selector: 'p' });
    expect(textElement).not.toBeInTheDocument();
  });

});
