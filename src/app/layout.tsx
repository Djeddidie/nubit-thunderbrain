import "./globals.css";

export const metadata = {
  title: "⚡️🧠ThunderBrain Quiz", // 🟢 Нова назва
  description: "Take the ultimate Nubit ThunderBrain Quiz!"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Фон тепер на всю ширину та висоту */}
      <body className="bg-[#F25749] text-white min-h-screen">
        {/* Контейнер з обмеженою шириною для тексту */}
        <div className="w-full px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
