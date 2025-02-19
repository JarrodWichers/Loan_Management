import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: any) {
  console.log(req.url);
  const url = new URL(req.url); // Parse the request URL
  const id = url.searchParams.get("id"); // Extract query parameter

  if (id) {
    const loan = await prisma.loan.findUnique({
      where: { id: Number(id) },
    });

    if (!loan) {
      return Response.json({ message: "Loan not found" }, { status: 404 });
    }

    return Response.json(loan, { status: 200 });
  }

  const loans = await prisma.loan.findMany();
  
  return Response.json(loans);
}

export async function POST(req: Request) {
  const { amount, interestRate, term } = await req.json(); // Parse the JSON body

  // Convert the values to the correct types
  const newLoan = await prisma.loan.create({
    data: {
      amount: parseFloat(amount), // Convert to Float
      interestRate: parseFloat(interestRate), // Convert to Float
      term: parseInt(term, 10), // Convert to Int
    },
  });

  return Response.json({ message: "Loan created!", loan: newLoan });
}

export async function PUT(req: Request) {
  const url = new URL(req.url); // Parse the request URL
  const id = url.searchParams.get("id"); // Extract query parameter
  const { amount, interestRate, term } = await req.json(); // Parse the JSON body

  // Convert the values to the correct types
  const updatedLoan = await prisma.loan.update({
    where: { id: Number(id) },
    data: {
      amount: parseFloat(amount), // Convert to Float
      interestRate: parseFloat(interestRate), // Convert to Float
      term: parseInt(term, 10), // Convert to Int
    },
  });

  return Response.json({ message: "Loan updated!", loan: updatedLoan });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return Response.json({ message: "Loan ID is required" }, { status: 400 });
  }

  const loan = await prisma.loan.delete({
    where: { id: Number(id) },
  });

  return Response.json({ message: "Loan deleted!", loan });
}