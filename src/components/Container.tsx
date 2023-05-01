export default function Container({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-24">{children}</div>
  );
}
