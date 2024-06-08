'use client' 

import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import "./styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) 
{
  const pathname = usePathname();
  return (
    <>
      <header className="header">
        <a className="app-name nav-link" href="/">Task Manager Application</a>
        <nav className="nav-list">
          <ul className="nav-list">
            <li className="nav-item"><a className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Home</a></li>
            <li className="nav-item"><a className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <img className="footer-logo" src="/img/logo.svg" alt="logo" />
      </footer>
    </>
  );
}
