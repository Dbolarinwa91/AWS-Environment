"use client";
// File: components/RouteChangeProvider.tsx

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RouteChangeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // This effect will run on route changes
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    // Clean up any route change listeners
    window.addEventListener("beforeunload", handleRouteChangeStart);
    
    // Set a short timeout to hide the loader
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]); // Re-run when the route changes

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}