import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { api } from '~/utils/api';

export default function AuthForm({ type }: { type: 'signin' | 'signup' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = api.users.create.useMutation({
    onSuccess: () => signIn('credentials', { email, password }),
  });

  const { mutate } = mutation;

  const isSignUpForm = type === 'signup';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUpForm) {
      mutate({ name, email, password });
    } else {
      signIn('credentials', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
      {isSignUpForm && (
        <label className="text-sm text-gray-400">
          Name
          <input
            className="mb-2 block w-[300px] rounded bg-gray-800 p-2"
            id="name"
            name="name"
            placeholder="Bob Smith"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
      )}
      <label className="text-sm text-gray-400">
        Email
        <input
          className="mb-2 block w-[300px] rounded bg-gray-800 p-2"
          type="email"
          id="email"
          name="email"
          placeholder="abc123@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label className="text-sm text-gray-400">
        Password
        <input
          className="mb-2 block w-[300px] rounded bg-gray-800 p-2"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isSignUpForm && (
        <div className="mb-2">
          <a className="cursor-pointer text-sm text-gray-200">Forgot password?</a>
        </div>
      )}
      <button type="submit" className="block w-[300px] rounded bg-sky-700 px-4 py-2 text-white">
        {isSignUpForm ? 'Sign up' : 'Sign in'}
      </button>
    </form>
  );
}
