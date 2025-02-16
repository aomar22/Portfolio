import Link from 'next/link';
 
export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-lg font-bold">Next.js API Lab</Link>
        <Link href="/customers" className="hover:underline">Customers</Link>
      </div>
    </nav>
  );
}
 