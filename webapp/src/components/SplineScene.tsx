import Link from 'next/link';

export interface NavbarProps {
  currentPage?: string;
}

export default function Navbar({ currentPage = 'home' }: NavbarProps): JSX.Element {
  const navItems: Array<{
    name: string;
    path: string;
    id: string;
  }> = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Projects', path: '/projects', id: 'projects' },
    { name: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <header className="w-full flex justify-between items-center">
      <div className="font-bold text-xl">Your Logo</div>
      <nav>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link 
                href={item.path} 
                className={`hover:text-blue-500 transition-colors ${
                  currentPage === item.id ? 'font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}