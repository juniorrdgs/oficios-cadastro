export const metadata = {
  title: "Sistema de Ofícios",
  description: "Controle de ofícios usando Next.js + Turso",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
