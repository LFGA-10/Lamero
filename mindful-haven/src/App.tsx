import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import LanguageSelection from "./pages/LanguageSelection.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import MoodSelection from "./pages/MoodSelection.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LanguageSelection />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/mood-selection" element={<MoodSelection />} />
                <Route path="/home" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
