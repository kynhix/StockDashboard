import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <Button>Test Button</Button>
        </main>
      </div>
    </SidebarProvider>
  );
}
