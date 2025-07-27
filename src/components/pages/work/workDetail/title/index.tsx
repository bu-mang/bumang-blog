export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full mt-10 flex justify-center text-5xl font-semibold tracking-tighter sm:block sm:text-9xl md:mt-0">
      {children}
    </div>
  );
}
