// app/__tests__/LoanList.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoanListPage from '../loans/page'; // Adjust the import based on your file structure

describe('LoanListPage', () => {
  test('renders loan list', async () => {
    render(<LoanListPage />);
    
    // Mock the fetch API call to return sample loan data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, amount: 1000, interestRate: 5, term: 12 }]),
      })
    ) as jest.Mock;

    expect(await screen.findByText(/loan id/i)).toBeInTheDocument(); // Adjust based on your content
  });
});