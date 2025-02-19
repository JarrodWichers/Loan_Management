"use client";
import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';// Import shadcn/ui Button component
import { Card } from '@/components/ui/card'; // Import shadcn/ui Card component

interface Loan {
  id: number;
  amount: number;
  interestRate: number;
  term: number;
}

const LoanDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loan, setLoan] = useState<Loan | null>(null);

  useEffect(() => {
    if (id) {
      const fetchLoan = async () => {
        const response = await fetch(`/api/loans?id=${id}`);
        const data = await response.json();
        setLoan(data);
      };

      fetchLoan();
    }
  }, [id]);

  if (!loan) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 animate-slideIn">
      <Card className="p-4 shadow-md">
        <h1 className="text-2xl font-bold">Loan Detail</h1>
        <p>Loan ID: {loan.id}</p>
        <p>Amount: ${loan.amount}</p>
        <p>Interest Rate: {loan.interestRate}%</p>
        <p>Term: {loan.term} months</p>
        <Link href={`/loans/form?id=${loan.id}`}>
          <Button className="mt-4">Edit Loan</Button>
        </Link>
      </Card>
    </div>
  );
};

export default LoanDetailPage;