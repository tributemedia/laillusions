import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
privacyPolicy.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const PrivacyPolicy = dynamic(() => import('../sections/privacy/privacyPolicy'), { ssr: false });

export default function privacyPolicy() {
  return (
    <>
      <PrivacyPolicy />
    </>
  )
}