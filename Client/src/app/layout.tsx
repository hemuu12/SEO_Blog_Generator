import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";


export const metadata: Metadata = {
  title: "Social Blog Generator | Fetch, Summarize & Publish Content",
  description:
    "Automatically fetch trending content from Twitter and Reddit, generate human-like blog summaries, and manage your posts efficiently with Social Blog Generator.",
  keywords:
    "social media aggregator, blog generator, content summarization, Twitter API, Reddit API, SEO content, automated blogging, AI-assisted blogs",
  openGraph: {
    title: "Social Blog Generator | Fetch, Summarize & Publish Content",
    description:
      "Create blogs effortlessly by aggregating and summarizing content from social media platforms like Twitter and Reddit. Perfect for content creators and marketers.",
    url: "https://yourdomain.com", // replace with your live site URL
    type: "website",
    locale: "en_US",
    siteName: "Social Blog Generator",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Social Blog Generator App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // replace with your Twitter handle
    title: "Social Blog Generator | Fetch, Summarize & Publish Content",
    description:
      "Aggregate content from Twitter and Reddit, generate blogs automatically, and share engaging posts faster than ever.",
    images: ["https://yourdomain.com/og-image.png"], // same OG image
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"    >
      <body
        suppressHydrationWarning
      >
      <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
