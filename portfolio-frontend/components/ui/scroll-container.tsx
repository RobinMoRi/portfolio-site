export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-md h-64 border rounded-lg shadow-md">
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="h-full w-full overflow-y-auto px-4 py-2">{children}</div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </div>
  );
}
