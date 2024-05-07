import Link from 'next/link';
import Image from 'next/image';
import Login from '@/pages/users/login';
import Register from '@/pages/users/register';

export default function Test() {
  return (
    <div className="flex">
      Test
      Username
      Password
      <Link href="/users/login">Login</Link>
      <Register />
    </div>
  );
}
