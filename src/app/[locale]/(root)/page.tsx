"use client"
import { Header } from '@/components/landing/header';
import { BigBranding } from '@/components/landing/big-branding';
import { Footer } from '@/components/landing/footer';
import LandingPage from '@/app/[locale]/(public)/_components/landing-page';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

export default async function Page() {
  const { data: user } = useCurrentUser();
  if (user) {
    window.location.href = "/overview";
    return null;
  }
  return (
    <main className="min-h-screen relative">
      <Header />

      <div className="relative z-10 bg-background">
        <LandingPage />
      </div>

      <div className="relative">
        <BigBranding />
        <Footer />
      </div>
    </main>
  );
}
