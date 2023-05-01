import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getCsrfToken, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from 'tailwind-component-library';
import AuthForm from '~/components/AuthForm';
import Container from '~/components/Container';
import Header from '~/components/Header';
import { authOptions } from '~/server/auth';
import google from '~/svg/google.svg';

export default function SignUp({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="dark min-h-screen bg-gray-800">
      <Container>
        <Header />
        <div className="dark flex items-center justify-center bg-gray-800">
          <Card>
            <CardContent>
              <CardTitle>Sign up</CardTitle>
              <AuthForm type="signup" />
              <div className="mt-4 text-center text-sm">
                  <span className="text-gray-400">Already have an account?</span>
                  <Link className="ml-2 cursor-pointer text-sky-500" href="/">
                    Sign in
                  </Link>
                </div>
              <div className="flex items-center">
                <div className="mt-[3px] h-[1px] w-[100%] border-t border-gray-700"></div>
                <div className="p-2 text-center text-gray-400">or</div>
                <div className="mt-[3px] h-[1px] w-[100%] border-t border-gray-700"></div>
              </div>
              <div key="google">
                <button
                  onClick={() => {
                    signIn('google');
                  }}
                  type="submit"
                  className="flex w-[300px] rounded bg-white px-4 py-2"
                >
                  <div>
                    <Image src={google} alt="google" />
                  </div>
                  <div className="m-auto">Continue with Google</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
}
