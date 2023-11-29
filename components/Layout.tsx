import { useRouter } from 'next/router';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }: any) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' ? '' : <Navbar />}
      {children}
    </>
  );
};

export default Layout;
