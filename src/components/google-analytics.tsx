import Script from "next/script"

const measurementId = "G-VZL6X98PE1"

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null

  return (
    <Script id="google-analytics" strategy="afterInteractive">
      {`(() => {
        if (!["shenxianovo.com", "www.shenxianovo.com"].includes(window.location.hostname)) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", "${measurementId}", {
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=${measurementId}";
        document.head.appendChild(script);
      })();`}
    </Script>
  )
}
