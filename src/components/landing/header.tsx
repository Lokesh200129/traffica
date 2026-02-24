
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { useCurrentUser } from '@/hooks/auth/use-current-user';
import { useLogout } from '@/hooks/auth/use-logout';
import GlobalLoader from '../global-loader';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Get Started', href: '#home' }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (isPending) return <GlobalLoader />
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/80 backdrop-blur-md border-border py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container px-6 md:px-12 lg:px-20 mx-auto flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
          className="text-2xl font-black tracking-tighter flex items-center group"
        >
          <span>TRAFFICA</span>
          <span className="text-accent group-hover:translate-x-0.5 transition-transform duration-300">.AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-foreground/70 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6 h-10 orange-glow"
            asChild
          >
            <Link href="/login">Login | Signup</Link>
          </Button> */}
          {user ? (
            <Button
              variant="outline"
              onClick={() => logout()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6 h-10 flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </Button>
          ) : (
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-6 h-10 orange-glow cursor-pointer"
              asChild
            >
              <Link href="/login">Login | Signup</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-foreground/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold w-full py-6 rounded-2xl"
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login">Login | Signup</Link>
              </Button> */}
              {user ? (
                <Button
                  onClick={() => logout()}
                  // variant="destructive"
                  className=" bg-accent hover:bg-accent/90 text-accent-foreground font-bold w-full py-6 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut size={20} />
                  Logout
                </Button>
              ) : (
                <Button
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold w-full py-6 rounded-2xl cursor-pointer"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/login">Login | Signup</Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
