import '@/assets/styles/global.css';
import { APP_NAME } from '@/lib';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: 'Modern Ecom Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex-1 wrapper'>{children}</main>
    </div>
  );
}
