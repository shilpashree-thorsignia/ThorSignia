// This component should be used within a React Router context (e.g., inside a <BrowserRouter>)

import React, { useState, useRef, useEffect } from "react"; // Standard React import
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Keep icon imports and import LucideIcon
import {
  Menu, // Keep Menu as we may still need its type in other contexts, but not strictly for IconComponent now
  X,
  LucideIcon, // <--- Imported LucideIcon type
  // Service Icons
  Speech,
  Users,
  Cpu,
  Bot,
  ListTree,
  Shield, // For Threat Detection
  // Case Study Icons
  ClipboardCheck,
  Stethoscope,
  Briefcase,
  Landmark,
  Sparkles,
  Wrench, // Used for Predictive Maintenance
  // Other Icons used in data or component
  FlaskConical,
  Book,
  ShieldCheck,
  TrendingUp,
  ChevronDown, // Added for dropdown indicators
  // Icons potentially for the main section boxes (added for illustration)
  Settings, // Example icon for Services
  Database, // Example icon for Case Studies
  Icon // Keep Icon if it's used elsewhere or potentially needed
} from "lucide-react";

// Mapping from string name to icon component
const iconMap = {
  // Service Icons
  Speech,
  Users,
  Cpu,
  Bot,
  ListTree,
  Shield,
  // Case Study Icons
  ClipboardCheck,
  Stethoscope,
  Briefcase,
  Landmark,
  Sparkles,
  Wrench,
  // Other Mappings if needed for other parts of the app or main sections
  FlaskConical,
  Book,
  ShieldCheck,
  TrendingUp,
  Settings, // Added to map
  Database // Added to map
};

// Define type for the icon name keys
type IconName = keyof typeof iconMap;

// Helper component to render icon by name
const IconComponent = ({
  name,
  ...props
}: { name: IconName } & LucideIcon) => { // <-- Using the imported LucideIcon type
  const Icon = iconMap[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    // Fallback div should also accept props like className and style
    return <div className={cn("w-4 h-4 inline-block bg-gray-200 rounded-full", props.className)} style={props.style}></div>;
  }
  // Pass remaining props (like className, style, etc.) to the Icon component
  return <Icon {...props} />;
};

// Define interface for navigation items
interface NavItem {
  title: string;
  href: string;
  dropdown: boolean;
  items?: {
    title: string;
    href: string;
    icon?: string; // icon name string
  }[];
  // Added optional property for the icon of the main dropdown section
  mainIcon?: IconName; // Use IconName type here
  mainDescription?: string; // Added optional description for the main section box
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    dropdown: false,
  },
  {
    title: "About",
    href: "/about#top",
    dropdown: false,
  },
  {
    title: "Services",
    href: "/services#top",
    dropdown: true,
    mainIcon: "Settings",
    mainDescription: "Explore all our cutting-edge Enterprise AI Solutions.",
    items: [
      {
        title: "Intelligent Voice Automation",
        href: "/services#intelligent-voice-automation",
        icon: "Speech",
      },
      {
        title: "Social Engagement Automation",
        href: "/services#social-engagement-automation",
        icon: "Users",
      },
      {
        title: "AI-Powered Lead Intelligence",
        href: "/services#ai-powered-lead-intelligence",
        icon: "Cpu",
      },
      {
        title: "Interactive AI Chatbots",
        href: "/services#interactive-ai-chatbots",
        icon: "Bot",
      },
      {
        title: "Automated Campaign Orchestration",
        href: "/services#automated-campaign-orchestration",
        icon: "ListTree",
      },
       {
        title: "AI-Powered Threat Detection",
       href: "/services#ai-powered-threat-detection",
       icon: "Shield",
       },
    ],
  },
    {
    title: "Cybersecurity",
    href: "/cyber-security#top",
    dropdown: false,
  },
  {
    title: "Case Studies",
    href: "/case-studies#top",
    dropdown: true,
    mainIcon: "Database",
    mainDescription: "Discover how our AI solutions deliver measurable results for clients.",
    items: [
      {
        title: "AI-Powered Quality Control System",
        href: "/case-studies/sgf-fab-ai-quality-control",
        icon: "ClipboardCheck",
      },
      {
        title: "AI Voice Assistant for Medical Education",
        href: "/case-studies/doctor-dreams-ai-voice-assistant",
        icon: "Stethoscope",
      },
      {
        title: "AI Chatbot for Workspace Management",
        href: "/case-studies/anthill-iq-smart-workspace",
        icon: "Briefcase",
      },
      {
        title: "AI-Powered Customer Service Revolution",
        href: "/case-studies/financial-services-ai-transformation",
        icon: "Landmark",
      },
      {
        title: "AI-Driven Retail Personalization Engine",
        href: "/case-studies/retail-personalization-engine",
        icon: "Sparkles",
      },
      {
        title: "Healthcare AI Voice Assistant",
        href: "/case-studies/healthcare-voice-assistant",
        icon: "Stethoscope",
      },
      {
        title: "AI-Powered Predictive Maintenance",
        href: "/case-studies/manufacturing-predictive-maintenance",
        icon: "Wrench",
      },
    ],
  },
  {
    title: "Blog",
    href: "/blog#top",
    dropdown: false,

  },
  {
    title: "AI Engineers",
    href: "/ai-engineers#top",
    dropdown: false,
  },
  {
    title: "Awards",
    href: "/awards#top",
    dropdown: false,
  },
  {
    title: "Careers",
    href: "/careers#top",
    dropdown: false,
  },
  {
    title: "Contact",
    href: "/contact#top",
    dropdown: false,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const pathname = location.pathname;
  const currentHash = location.hash;

  const desktopNavRef = useRef<HTMLDivElement>(null);

  // Effect to close desktop dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (window.innerWidth >= 768 && desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node) && openDropdown !== null) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openDropdown]);

  // Effect to handle scrolling on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);

    if (currentHash) {
      const targetElement = document.getElementById(currentHash.substring(1));
      if (targetElement) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else {
      if (location.key !== 'default') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [location, currentHash]);

  // Determine if the dropdown trigger text should be highlighted (active)
  const isDropdownTriggerActiveByUrl = (item: NavItem) => {
    if (!item.dropdown) return false;

    if (item.href !== '/') {
      const currentFullUrl = pathname + (currentHash || '');
      const subItemMatch = item.items?.some(subItem => subItem.href === currentFullUrl);
      return pathname === item.href || !!subItemMatch;
    }

    if (item.href === '/' && pathname === '/') return true;
    return false;
  };

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdown(openDropdown === itemTitle ? null : itemTitle);
  };

  const handleNavLinkClick = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  // Function to determine if a mobile link is active based on URL
  const isMobileLinkActive = (href: string) => {
    const currentFullUrl = pathname + (currentHash || '');
    if (currentFullUrl === href) return true;
    if (href !== '/' && pathname === href && href.indexOf('#') === -1) return true;
    if (href === '/' && pathname === '/') return true;
    return false;
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - positioned first with fixed width */}
          <div className="w-32 md:w-40 lg:w-44 flex-shrink-0 mr-2 md:mr-4 lg:mr-6">
            <Link to="/" onClick={handleNavLinkClick}>
              <img 
                src="/thor-signia-logo.png" 
                alt="Thor Signia Logo" 
                className="h-25 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - positioned after logo */}
          <div className="hidden md:flex space-x-1 lg:space-x-2 xl:space-x-3 flex-1 justify-center" ref={desktopNavRef}>
            {navItems.map((item) => (
            <div key={item.title} className="relative group h-full flex items-center">
              {item.dropdown ? (
                // Desktop Custom dropdown trigger (button)
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className={cn(
                    "text-xs sm:text-sm md:text-base lg:text-lg font-medium transition-colors h-full flex items-center px-1 md:px-2 whitespace-nowrap", 
                    "hover:text-[#88bf42]",
                    // Active state based on URL match
                    isDropdownTriggerActiveByUrl(item) ? "text-[#88bf42] border-b-2 border-[#88bf42]" : "text-foreground border-b-2 border-transparent",
                     "flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === item.title}
                >
                   {/* Text style now only reflects URL activity or default */}
                   <span className={isDropdownTriggerActiveByUrl(item) ? "text-[#88bf42]" : "text-foreground"}> 
                       {item.title}
                   </span>
                   <ChevronDown className={cn(
                       "h-4 w-4 transition-transform duration-200",
                       openDropdown === item.title ? "rotate-180" : "rotate-0",
                       // Apply hover/active color to arrow as well
                        isDropdownTriggerActiveByUrl(item) || openDropdown === item.title ? "text-[#88bf42]" : "text-foreground"
                   )} />
                </button>
              ) : (
                // Desktop Standard non-dropdown link
                <Link
                  to={item.href}
                  className={cn(
                    "text-xs sm:text-sm md:text-base lg:text-lg font-medium transition-colors hover:text-[#88bf42] h-full flex items-center px-1 md:px-2 whitespace-nowrap", 
                    pathname === item.href && currentHash === '' ? "text-[#88bf42] border-b-2 border-[#88bf42]" : "text-foreground border-b-2 border-transparent",
                     "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                   onClick={handleNavLinkClick} // Close mobile menu if somehow open
                >
                  {item.title}
                </Link>
              )}

              {/* Desktop Custom Dropdown Content Panel */}
              {item.dropdown && openDropdown === item.title && item.items && ( // Ensure items exist
                <div
                  className={cn(
                    "absolute top-full left-0 mt-0",
                    "w-[600px] max-w-[calc(100vw-42px)]", // Increased width, added max-width for small viewports
                    "bg-background border rounded-md shadow-lg p-4", // Added more padding
                    "z-50 animate-in slide-in-from-top-1 fade-in-0",
                    "flex gap-6" // Flex container for two columns
                  )}
                   role="menu" // ARIA role for accessibility
                   aria-orientation="vertical"
                >
                  {/* Left Column: Main Section Link/Box */}
                  <div className="w-48 flex-shrink-0"> {/* Fixed width */}
                      <Link
                        to={item.href} // Link to the main page (e.g., /services, /case-studies)
                        onClick={handleNavLinkClick} // Close dropdown and mobile menu on click
                        className={cn(
                          "flex flex-col h-full p-4 rounded-md",
                          "bg-gradient-to-br from-[#10b4b7]/10 to-[#9ac857]/10", // Gradient background
                          "hover:bg-gradient-to-br hover:from-[#10b4b7]/20 hover:to-[#9ac257]/20", // Hover effect
                          "transition-colors duration-200",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          pathname === item.href && currentHash === '' ? "border border-[#88bf42]" : "border border-transparent" // Highlight border if on the main page
                        )}
                         role="menuitem" // ARIA role
                      >
                        {/* Icon (if available in navItems) */}
                        {item.mainIcon && typeof iconMap[item.mainIcon] !== 'undefined' && (
                             <IconComponent
                                name={item.mainIcon} // Use IconName type directly
                                className="h-8 w-8 text-[#10b4b7] mb-3" // Larger icon for prominence
                              />
                          )}
                        {/* Title */}
                        <div className="text-lg md:text-xl font-semibold text-foreground leading-tight mb-1">{item.title} Overview</div> {/* Added Overview */}
                        {/* Description */}
                         {item.mainDescription && (
                             <p className="text-sm text-muted-foreground leading-snug">{item.mainDescription}</p>
                         )}
                         {/* Optional Arrow */}
                          <div className="mt-auto pt-2 text-right"> {/* Push to bottom */}
                              {/* Add ArrowRight icon if you want one */}
                          </div>
                      </Link>
                  </div>

                  {/* Right Column: List of Sub-Items */}
                  <div className="flex-1"> {/* Takes remaining space */}
                     {/* The grid for the sub-items */}
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3"> {/* Can adjust grid columns here, e.g., sm:grid-cols-2 */}
                       {item.items.map((subItem) => {
                          // Ensure icon name exists in iconMap if provided
                           const subItemIconName = subItem.icon as IconName | undefined;
                           const hasValidIcon = subItemIconName && typeof iconMap[subItemIconName] !== 'undefined';

                          const currentFullUrl = pathname + (currentHash || '');
                          const isSubItemActive = currentFullUrl === subItem.href;

                          return (
                            <li key={subItem.title}>
                              <Link
                                to={subItem.href}
                                onClick={handleNavLinkClick} // Close dropdown and mobile menu on click
                                className={cn(
                                  "flex items-start gap-2 rounded-sm px-3 py-2 text-sm md:text-base outline-none transition-colors",
                                  "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                   isSubItemActive ? "text-[#88bf42] font-semibold" : "text-foreground" // Active state for sub-items
                                )}
                                 role="menuitem" // ARIA role
                              >
                                {hasValidIcon && (
                                   <IconComponent
                                      name={subItemIconName} // Use IconName type directly
                                      className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" // Vertically align icon
                                    />
                                )}
                                <span className="leading-snug">{subItem.title}</span> {/* Adjusted leading */}
                              </Link>
                            </li>
                          );
                       })}
                     </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden ml-auto pl-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-[#88bf42]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-12 w-12" /> : <Menu className="h-12 w-12" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden h-[calc(100vh-64px)] overflow-y-auto"> 
          <nav className="flex flex-col space-y-4 mt-4">
            {navItems.map((item) => (
              <div key={item.title}>
                {/* Mobile links and dropdowns */}
                {!item.dropdown ? (
                  // Mobile Standard non-dropdown link
                  <Link
                    to={item.href}
                    className={cn(
                      "text-lg sm:text-xl font-medium block py-2", 
                      "text-foreground",
                      isMobileLinkActive(item.href) && "font-bold",
                      "hover:text-[#88bf42]"
                    )}
                    onClick={handleNavLinkClick}
                  >
                    {item.title}
                  </Link>
                ) : (
                   // Mobile Dropdown Trigger (clickable button)
                   <div>
                     <button
                        onClick={() => toggleDropdown(item.title)}
                        className={cn(
                          "text-lg sm:text-xl font-medium w-full text-left py-2",
                          "flex justify-between items-center",
                          "text-foreground",
                          isDropdownTriggerActiveByUrl(item) && "font-bold",
                          "hover:text-foreground"
                        )}
                         aria-expanded={openDropdown === item.title}
                     >
                       <span>{item.title}</span>
                        {/* Chevron icon for dropdown indicator (always gray) */}
                       <ChevronDown className={cn(
                           "h-6 w-6 transition-transform duration-200 text-muted-foreground",
                           openDropdown === item.title ? "rotate-180" : "rotate-0"
                       )} />
                     </button>

                    {/* Mobile Dropdown Content */}
                    {item.items && openDropdown === item.title && (
                      <div className="mt-2 ml-4 flex flex-col space-y-2">
                        {/* Main Link for Mobile Dropdown Section */}
                         <Link
                            to={item.href}
                            onClick={handleNavLinkClick}
                            className={cn(
                              "text-base sm:text-lg font-semibold py-1",
                              "text-foreground",
                              isMobileLinkActive(item.href) && "font-bold",
                              "hover:text-[#88bf42]",
                              "flex items-center gap-2"
                            )}
                         >
                              {/* Optional Main Icon for Mobile (always gray) */}
                               {item.mainIcon && typeof iconMap[item.mainIcon] !== 'undefined' && (
                                  <IconComponent
                                     name={item.mainIcon}
                                     className="h-4 w-4 text-muted-foreground"
                                   />
                               )}
                               <span>{item.title} Overview</span>
                         </Link>
                        
                        {/* Sub-Items for Mobile Dropdown */}
                        {item.items.map((subItem) => {
                            const subItemIconName = subItem.icon as IconName | undefined;
                            const hasValidIcon = subItemIconName && typeof iconMap[subItemIconName] !== 'undefined';

                           const currentFullUrl = pathname + (currentHash || '');
                           const isSubItemActive = currentFullUrl === subItem.href;

                          return (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className={cn(
                                "text-base sm:text-lg py-1",
                                isMobileLinkActive(subItem.href) ? "text-foreground font-semibold" : "text-muted-foreground",
                                "hover:text-[#88bf42]",
                                "flex items-center gap-2"
                              )}
                              onClick={handleNavLinkClick}
                            >
                              {hasValidIcon && (
                                <IconComponent
                                  name={subItemIconName}
                                  className={cn("h-5 w-5 flex-shrink-0 text-muted-foreground")}
                                />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                   </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}
