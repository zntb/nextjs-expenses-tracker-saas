import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10'>
      <Image
        src='https://bytegrad.com/course-assets/youtube/expensestracker/preview.png'
        alt='Expenses Tracker app preview'
        width={700}
        height={472}
        className='rounded-md'
      />

      <div>
        <h1 className='text-5xl font-semibold my-6 max-w-[500px]'>
          Track your <span className='font-extrabold'>expenses</span> with ease
        </h1>

        <p className='text-2xl font-medium max-w-[600px]'>
          Use Expenses Tracker to easily keep track of your expenses. Get
          lifetime access for $99.
        </p>
      </div>
    </div>
  );
}
