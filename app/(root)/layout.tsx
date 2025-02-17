import '@/assets/styles/global.css';
import Footer from '@/components/footer';
import Header from '@/components/shared/header';
import { APP_NAME } from '@/lib/constants';
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
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
      <Footer />
    </div>
  );
}
