import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Dashboard from '~/components/Dashboard';
import { SignIn } from '~/components/SignIn';
import { api } from '~/utils/api';

const Home: NextPage = (props) => {
  const { data: sessionData, status } = useSession();
  console.log(sessionData)

  if (status === 'loading') {
    return <main className="dark min-h-screen bg-gray-800">Loading...</main>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="dark min-h-screen bg-gray-800">
        {sessionData ? <Dashboard /> : <SignIn />}
      </main>
    </>
  );
};

export default Home;
