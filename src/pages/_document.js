import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="mn" data-theme="light">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased bg-cream text-ink font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
