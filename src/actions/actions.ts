'use server';

import { prisma } from '@/lib/db';
import { checkAuthenticationAndMembership } from '@/lib/server-utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addExpense(formData: FormData) {
  const user = await checkAuthenticationAndMembership();

  if (!user) return redirect('/api/auth/login');
  await prisma.expense.create({
    data: {
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      creatorId: user.id,
    },
  });

  revalidatePath('/app/dashboard');
}

export async function editExpense(formData: FormData, id: number) {
  await checkAuthenticationAndMembership();

  await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
    },
  });

  revalidatePath('/app/dashboard');
}

export async function deleteExpense(id: number) {
  await checkAuthenticationAndMembership();

  await prisma.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath('/app/dashboard');
}

export async function createCheckoutSession() {
  // authentication check
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect('/api/auth/login');
  }

  // const user = await getUser();
  // const session = await stripe.checkout.sessions.create({
  //   customer_email: user.email!,
  //   client_reference_id: user.id,
  //   line_items: [
  //     {
  //       price: 'price_1QigxuJDcR4KvLwWPed0Fltu',
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${process.env.CANONICAL_URL}/app/dashboard?payment=success`,
  //   cancel_url: `${process.env.CANONICAL_URL}`,
  // });

  // redirect(session.url!);
}
