import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
termsAndConditions.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const TermsAndConditions = dynamic(() => import('../sections/privacy/termsAndConditions'), { ssr: false });

export default function termsAndConditions() {
  return (
    <>
      <TermsAndConditions />
    </>
  )
}