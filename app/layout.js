import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CommitMsg AI — Generate Perfect Git Commit Messages",
  description:
    "Paste your git diff and instantly get 5 professional commit messages following Conventional Commits format. Free AI-powered tool for developers.",
  keywords: [
    "git commit message generator",
    "ai commit messages",
    "conventional commits",
    "git diff",
    "developer tool",
  ],
  openGraph: {
    title: "CommitMsg AI — Generate Perfect Git Commit Messages",
    description:
      "Paste your git diff and instantly get 5 professional commit messages. Free for developers.",
    url: "https://commitmsg1.vercel.app",
    siteName: "CommitMsg AI",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CommitMsg AI",
    description:
      "Stop writing bad commit messages. Paste your diff, get 5 perfect ones instantly.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}