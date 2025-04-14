'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export default function SplineWrapper(props) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = React.useRef(null);

  useEffect(() => {
    let splineInstance = null;
    let cleanupFunction = null;

    const loadSpline = async () => {
      if (!containerRef.current || !window.spline) return;

      try {
        // Initialize Spline viewer
        const app = new window.spline.Application();
        splineInstance = app;
        
        // Load the scene
        await app.load(props.scene, { 
          container: containerRef.current,
          environmentPreset: 'neutral',
          onProgress: (progress) => {
            if (progress === 1) setIsLoading(false);
          }
        });
        
        // Pass any additional props to the container
        Object.keys(props).forEach(key => {
          if (key !== 'scene' && key !== 'className') {
            containerRef.current[key] = props[key];
          }
        });
        
        cleanupFunction = () => {
          if (splineInstance) {
            try {
              splineInstance.dispose();
            } catch (err) {
              console.warn('Error cleaning up Spline:', err);
            }
          }
        };
      } catch (error) {
        console.error('Failed to load Spline scene:', error);
        setIsLoading(false);
      }
    };

    // Only try to load if the spline script is loaded
    if (window.spline) {
      loadSpline();
    }

    return () => {
      if (cleanupFunction) cleanupFunction();
    };
  }, [props.scene, containerRef.current]);

  // Handle script load
  const handleScriptLoad = () => {
    if (containerRef.current) {
      // Try loading spline after script is loaded
      if (window.spline) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Script 
        src="https://unpkg.com/@splinetool/viewer@0.9.415/build/spline-viewer.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className={props.className || ''}
      />
    </>
  );
}