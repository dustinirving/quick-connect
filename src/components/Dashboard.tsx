import { signOut } from "next-auth/react";
import { Navbar } from "tailwind-component-library";

const navItems = [
  { text: 'Dashboard', href: '#dashboard', id: 'dashboard', handleClick: () => null },
  {
    text: 'Profile',
    href: '#experience',
    id: 'experience',
    handleClick: () => null,
  },
  {
    text: 'Friends',
    href: '#friends',
    id: 'friends',
    handleClick: () => null,
  },
];

export default function Dashboard() {
  return (
    <div>
      <Navbar navItems={navItems} position="left" activeItemId="dashboard" />{' '}
      <button
        className="rounded bg-sky-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void signOut()}
      >
        Sign out
      </button>
    </div>
  );
}