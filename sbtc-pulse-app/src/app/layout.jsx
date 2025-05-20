// app/layout.jsx
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";
import BackgroundAnimation from "../component/layout/BackgroundAnimation";
import "./globals.css";

export const metadata = {
  title: "sBTC Pulse - Track. Score. Dominate the Bitcoin DeFi game",
  description: "An interactive analytics and monitoring dashboard tailored for users in the sBTC ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        <ThemeProvider>
          <BackgroundAnimation />
          <Navbar />
          <main className="pb-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}