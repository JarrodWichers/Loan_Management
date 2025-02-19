"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';// Import shadcn/ui Button component
import { Card } from '@/components/ui/card'; // Import shadcn/ui Card component

interface Loan {
  id: number;
  amount: number;
  interestRate: number;
  term: number;
}

const LoanListPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of loans to display
  const [allLoans, setAllLoans] = useState<Loan[]>([]); // Store all loans

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch('/api/loans');
      const data = await response.json();
      setLoans(data.slice(0, visibleCount)); // Set initial loans to display
      setAllLoans(data); // Store all loans for later use
    };

    fetchLoans();
  }, []);

  const loadMoreLoans = () => {
    let newVisibleCount = visibleCount + 6;
    setVisibleCount(newVisibleCount); // Increase the count by 6
    setLoans(allLoans.slice(0, newVisibleCount)); // Update the visible loans
  };

  const deleteLoan = async (id: number) => {
    const response = await fetch(`/api/loans?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the deleted loan from the state
      setLoans(loans.filter(loan => loan.id !== id));
      setAllLoans(allLoans.filter(loan => loan.id !== id));
    } else {
      console.error('Failed to delete loan');
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Loan List</h1>
      <Link href="/loans/form">
        <Button className="mb-4 text-white hover:bg-blue-600 transition duration-300">Create New Loan</Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {loans.map((loan) => (
          <Card key={loan.id} className="p-4 shadow-md animate-slideIn">
            <h2 className="text-lg font-semibold">Loan ID: {loan.id}</h2>
            <p>Amount: ${loan.amount}</p>
            <p>Interest Rate: {loan.interestRate}%</p>
            <p>Term: {loan.term} months</p>
            <Link href={`/loans/form?id=${loan.id}`}>
              <Button className="mt-2 text-white hover:bg-blue-600 transition duration-300">Edit Loan</Button>
            </Link>
            <Button 
              className="mt-2 ml-2 text-red-600 hover:bg-red-500 transition duration-300" 
              onClick={() => deleteLoan(loan.id)}
            >
              Delete Loan
            </Button>
          </Card>
        ))}
      </div>
      {visibleCount < allLoans.length && ( // Check if there are more loans to load
        <div className="flex justify-center mt-4"> {/* Center the button */}
        <Button onClick={loadMoreLoans} className="mt-2 text-white hover:bg-blue-600 transition duration-300">
          Load More
        </Button>
      </div>
      )}
    </div>
  );
};

export default LoanListPage;