import PurchaseBtn from '@/components/purchase-btn';
import { prisma } from '@/lib/db';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  let isPayingMember = false;

  const user = await getUser();
  if (user) {
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        status: 'active',
      },
    });
    if (membership) {
      isPayingMember = true;
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Expenses Tracker',
            description:
              'Easily track and manage your expenses with our powerful expense tracker app.',
            url: 'https://nextjs-expenses-tracker-saas.vercel.app',
            image:
              'https://bytegrad.com/course-assets/youtube/expensestracker/preview.png',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '99.00',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '99.00',
                priceCurrency: 'USD',
                priceType: 'listPrice',
                unitText: 'lifetime access',
              },
            },
            author: {
              '@type': 'Organization',
              name: 'Expenses Tracker Team',
            },
            keywords:
              'expenses tracker, expense management, budget tracking, personal finance, financial management',
            inLanguage: 'en',
            isAccessibleForFree: false,
            hasPart: {
              '@type': 'WebPage',
              name: 'Marketing Page',
              url: 'https://nextjs-expenses-tracker-saas.vercel.app',
            },
          }),
        }}
      />

      <main className='bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 py-12 px-4'>
        <section className='xl:w-1/2'>
          <Image
            src='https://bytegrad.com/course-assets/youtube/expensestracker/preview.png'
            alt='Expenses Tracker app preview'
            width={700}
            height={472}
            className='rounded-md shadow-lg w-full max-w-md mx-auto xl:max-w-full'
          />
        </section>

        <section className='xl:w-1/2 max-w-2xl'>
          <header className='mb-8'>
            <h1 className='text-4xl sm:text-5xl font-semibold my-6 max-w-[500px] leading-tight'>
              Track your <span className='font-extrabold'>expenses</span> with
              ease
            </h1>
          </header>

          <article className='space-y-6'>
            <p className='text-lg sm:text-2xl font-medium max-w-[600px] leading-relaxed'>
              Use Expenses Tracker to easily keep track of your expenses. Our
              intuitive interface makes budgeting simple, while powerful
              features help you gain insights into your spending habits. Get
              lifetime access for just $99 and take control of your finances
              today.
            </p>

            <div className='bg-white/20 p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold mb-4'>Key Features:</h2>
              <ul className='list-disc list-inside space-y-2 text-lg'>
                <li>Easy expense categorization</li>
                <li>Monthly spending insights</li>
                <li>Secure data storage</li>
                <li>Lifetime access</li>
              </ul>
            </div>

            <div className='bg-white/20 p-6 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold mb-4'>
                Why Choose Our Expense Tracker?
              </h2>
              <p className='text-lg leading-relaxed'>
                Managing your finances shouldn't be complicated. Our expense
                tracker is designed with simplicity in mind, making it easy for
                anyone to track their spending and make informed financial
                decisions. Whether you're budgeting for a big purchase or just
                want to understand where your money goes each month, our app
                provides the tools you need.
              </p>
            </div>
          </article>

          <div className='mt-10 space-y-4 sm:space-y-0 sm:space-x-3 sm:flex sm:items-center'>
            {!isLoggedIn ? (
              <div className='space-y-3 sm:space-y-0 sm:space-x-3 sm:flex'>
                <LoginLink className='bg-black text-white py-3 px-6 rounded-lg font-medium text-lg block text-center hover:bg-gray-800 transition-colors touch-manipulation'>
                  Login
                </LoginLink>

                <RegisterLink className='bg-black/50 text-white py-3 px-6 rounded-lg font-medium text-lg block text-center hover:bg-black/70 transition-colors touch-manipulation'>
                  Register
                </RegisterLink>
              </div>
            ) : !isPayingMember ? (
              <PurchaseBtn />
            ) : (
              <Link
                href='/app/dashboard'
                className='bg-black text-white py-3 px-6 rounded-lg font-medium text-lg block text-center hover:bg-gray-800 transition-colors touch-manipulation'
              >
                Go to dashboard
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
