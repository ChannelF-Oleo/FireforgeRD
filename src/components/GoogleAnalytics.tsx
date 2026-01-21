"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-GF4L0SL5X4";

export function GoogleAnalytics() {
  useEffect(() => {
    // Ensure window is available before setting up GA
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.gtag = function() {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', GA_MEASUREMENT_ID, {
              page_path: window.location.pathname,
            });
          }
        }}
      />
    </>
  );
}
