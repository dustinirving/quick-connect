import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from 'tailwind-component-library';
import google from '~/svg/google.svg';
import AuthForm from './AuthForm';
import Container from './Container';
import Header from './Header';

export function SignIn() {
  return (
    <Container>
      <Header />
      <div className="dark flex items-center justify-center bg-gray-800">
        <Card>
          <CardContent>
            <CardTitle>Sign in</CardTitle>
            <AuthForm type="signin" />
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-400">Don't have an account?</span>
              <Link className="ml-2 cursor-pointer text-sky-500" href="/signup">
                Sign up
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
  );
}
