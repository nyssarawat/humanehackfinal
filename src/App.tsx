import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUpPage from "./components/SignUpPage";
import PaymentPage from "./components/PaymentPage";
import VerificationPage from "./components/VerificationPage";

const queryClient = new QueryClient();

const App = () => {
  const [currentStep, setCurrentStep] = useState<'signup' | 'payment' | 'verification' | 'app'>('signup');
  const [userData, setUserData] = useState<{ name: string; email: string; phone: string; zipcode: string } | null>(null);

  const handleSignUpComplete = (data: { name: string; email: string; phone: string; zipcode: string }) => {
    setUserData(data);
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('verification');
  };

  const handleEnterApp = () => {
    setCurrentStep('app');
  };

  const handleBackToSignUp = () => {
    setCurrentStep('signup');
  };

  // Show the main app if user has completed the flow
  if (currentStep === 'app') {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show onboarding flow
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {currentStep === 'signup' && (
          <SignUpPage onSignUpComplete={handleSignUpComplete} />
        )}
        {currentStep === 'payment' && userData && (
          <PaymentPage 
            userData={userData} 
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBackToSignUp}
          />
        )}
        {currentStep === 'verification' && userData && (
          <VerificationPage 
            userData={userData}
            onEnterApp={handleEnterApp}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;