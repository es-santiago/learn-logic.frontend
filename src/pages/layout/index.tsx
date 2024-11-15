import '@/app/globals.css';
import SideBar from "@/components/layout/sidebar"
import HeaderPage from "@/components/layout/header"
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      
      <SideBar />

      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <HeaderPage />
        <Toaster />
        <main>
        {children}
        </main>
      </div>
    </div>
  )
}

