"use client";
import { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const LoanFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the loan ID from the URL
  const isEditMode = Boolean(id); // Determine if we are in edit mode
  const [formData, setFormData] = useState({
    amount: 0,
    interestRate: 0,
    term: 0,
  });

  // Fetch loan data if in edit mode
  useEffect(() => {
    console.log(id);
    if (isEditMode) {
      const fetchLoan = async () => {
        
        const response = await fetch(`/api/loans?id=${id}`);
        const data = await response.json();
        console.log(data);
        setFormData({
          amount: data.amount || 0, // Default to 0 if undefined
          interestRate: data.interestRate || 0, // Default to 0 if undefined
          term: data.term || 0, // Default to 0 if undefined
        });
      };

      fetchLoan();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditMode ? 'PUT' : 'POST'; // Determine the HTTP method
    const url = isEditMode ? `/api/loans?id=${id}` : '/api/loans'; // Determine the URL

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    router.push('/loans'); // Redirect to the loan list page
  };

  return (
    <div className="container mx-auto p-4 animate-slideIn">
      <Card className="p-4 shadow-md">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Loan' : 'Create Loan'}</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Amount:</label>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <label className="block mb-2">Interest Rate:</label>
          <Input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <label className="block mb-2">Term:</label>
          <Input
            type="number"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <Button className='text-white hover:bg-blue-600 transition duration-300' type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
          <Link href={`/loans`}>
          <Button variant={"secondary"} className='ml-2 hover:bg-teal-500 transition duration-300'>Back</Button>
        </Link>
        </form>
      </Card>
    </div>
  );
};

export default LoanFormPage;