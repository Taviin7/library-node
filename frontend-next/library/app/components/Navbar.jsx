"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/livros", label: "Livros" },
    { href: "/autores", label: "Autores" },
    { href: "/usuarios", label: "Usuários" },
  ];

  return (
    <nav className="w-full bg-gray-500 text-white px-6 py-4 shadow-md">
      <div className="flex items-center gap-6">

        <span className="text-xl font-bold mr-6">Biblioteca</span>

        {links.map((link) => {
          const active = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-md transition ${active
                  ? "bg-white text-gray-900 font-semibold"
                  : "text-gray-300 hover:bg-gray-700"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}