import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import ContactPage from "./pages/Contact";
import AIEngineersPage from "./pages/AIEngineers";
import AboutPage from "./pages/About";
import AwardsPage from "./pages/Awards";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServicesPage from "./pages/Services";
import CaseStudiesPage from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import CyberSecurity from "@/pages/CyberSecurity";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";

import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import PenetrationTestPage from "@/pages/cybersecurity/PenetrationTestPage";
import CloudSecurityPage from "@/pages/cybersecurity/CloudSecurityPage";
import OffensiveSecurityPage from "@/pages/cybersecurity/OffensiveSecurityPage";
import RedTeamingPage from "@/pages/cybersecurity/RedTeamingPage";
import IOTSecurityPage from "@/pages/cybersecurity/IOTSecurityPage";
import VCISOPage from "@/pages/cybersecurity/VCISOPage";
import SecurityTrainingPage from "@/pages/cybersecurity/SecurityTrainingPage";


const queryClient = new QueryClient();

// Enhanced ScrollToTop component that forces scroll reset on every navigation
const ScrollToTopOnMount = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Force scroll to top with multiple approaches
    const forceScrollToTop = () => {
      // 1. Direct scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // 2. Try to scroll main content elements
      const mainElements = [
        document.querySelector('main'),
        document.querySelector('#root'),
        document.querySelector('#app'),
        document.querySelector('.main-content'),
        document.querySelector('.content')
      ];
      
      mainElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.scrollTop = 0;
        }
      });
    };

    forceScrollToTop();
    
    if (location.hash) {
      window.history.replaceState(
        {},
        document.title,
        location.pathname + location.search
      );
    }
    
    const timers = [
      setTimeout(forceScrollToTop, 0),
      setTimeout(forceScrollToTop, 50),
      setTimeout(forceScrollToTop, 100),
      setTimeout(forceScrollToTop, 200)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [location.pathname, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai-engineers" element={<AIEngineersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cyber-security" element={<CyberSecurity />} />
          
          <Route path="/penetration-testing" element={<PenetrationTestPage />} />
          <Route path="/cloud-security" element={<CloudSecurityPage />} />
          <Route path="/offensive-security" element={<OffensiveSecurityPage />} />
          <Route path="/red-teaming" element={<RedTeamingPage />} />
          <Route path="/iot-security" element={<IOTSecurityPage />} />
          <Route path="/vciso-services" element={<VCISOPage />} />

          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
