/* eslint-disable */
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
//
const Header = dynamic(() => import('./Header'), {ssr: false});
const Footer = dynamic(() => import('./Footer'), {ssr: false});
const montserrat = Montserrat({subsets: ['latin']});
// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({children}) {
  return (
    <>
      <div className={montserrat.className}>
        <Header/>
        <main className="min-h-fullVH">
          {children}
        </main>
        <Footer/>
      </div>
    </>
  );
}