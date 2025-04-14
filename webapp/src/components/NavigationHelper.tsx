"use client";
// File: components/NavigationHelper.tsx

import { useRouter } from "next/navigation";

export default function useNavigationWithLoading() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    // You can add logic here to show the loader before navigation
    // For example, dispatch a custom event or use a global state
    
    // Then navigate to the path
    router.push(path);
  };

  return { navigateTo };
}