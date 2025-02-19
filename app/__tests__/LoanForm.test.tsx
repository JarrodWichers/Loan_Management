// app/__tests__/LoanForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoanForm from '../loans/form/page'; // Adjust the import based on your file structure

describe('LoanForm', () => {
  test('renders the loan form', () => {
    render(<LoanForm />);
    
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/term/i)).toBeInTheDocument();
  });

  test('submits the form', async () => {
    render(<LoanForm />);
    
    fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/interest rate/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/term/i), { target: { value: '12' } });
    
    fireEvent.click(screen.getByText(/create/i)); 
    
    expect(await screen.findByText(/loan created/i)).toBeInTheDocument();
  });
});