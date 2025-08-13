interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="relative mt-10 grid aspect-video w-screen grid-cols-8 gap-[1.5vw] bg-gray-10 md:h-[600px]">
      {children}
    </div>
  );
}
