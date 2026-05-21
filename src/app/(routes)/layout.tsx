export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-w-100 flex flex-col px-8 py-12 gap-y-4px bg-bg-form rounded-3xl shadow-xl">
        {children}
    </div>
  );
}
