"use client";

import Link from "next/link";
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full fixed bottom-0 left-0 right-0 z-10 bg-transparent">
            <div className="w-full mx-auto max-w-screen-xl p-4 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    © 2025 <Link href=" " className="hover:underline">David.wealth™</Link>. All Rights Reserved.
                </div>
                <div className="text-center">
    
     <div className="mt-4 space-x-4">
       <a href="/about" className="text-gray-400 hover:text-blue-400 text-sm">  About </a> 
       <span className="mx-3 text-gray-500">|</span>
       <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">  Privacy Policy </a> 
       <span className="mx-3 text-gray-500">|</span>
       <a href="/licensing" className="text-gray-400 hover:text-blue-400 text-sm"> Licensing  </a> 
       <span className="mx-3 text-gray-500">|</span>
       <a href="/contact" className="text-gray-400 hover:text-blue-400 text-sm">Contact</a>
     </div>
            </div>
            </div>
        </footer>
    );
}