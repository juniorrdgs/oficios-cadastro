export const metadata = {
  title: "Controle de Ofícios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto pt-10">{children}</div>
      </body>
    </html>
  );
}
