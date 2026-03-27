"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/auth/use-current-user';
import { useLogout } from '@/hooks/auth/use-logout';
import GlobalLoader from '../global-loader';
import { AppButton } from '../button';
import MainIcon from '../main-icon';
const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
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

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  if (isPending) return <GlobalLoader />;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container px-6 md:px-12 lg:px-20 mx-auto flex items-center justify-between">

        <MainIcon />
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

          <div className="flex items-center gap-3">
            {user ? (
              <AppButton
                onClick={() => logout()}
                title="Logout"
                icon={LogOut}
              />

            ) : (
              <AppButton
                title="Login | Signup"
                href="/login"
              />
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
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
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="container px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-foreground/80 hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t">
                {user ? (

                  <AppButton
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    title="Logout"
                    variant="ghost"
                    fullWidth
                    icon={LogOut}
                  />

                ) : (
                  <AppButton
                    title="Login | Signup"
                    href="/login"
                    fullWidth
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}