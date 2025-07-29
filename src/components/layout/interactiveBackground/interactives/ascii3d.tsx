import { useInteractiveStore } from "@/store/background";
import Image from "next/image";

export default function Ascii3DBackground() {
  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);
  // const { centerText } = useInteractiveStore((state) => state.work);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Image
        src={"/about_banner.jpg"}
        alt="Ascii 3d Background"
        className="pointer-events-none object-cover opacity-20"
        fill
      />
    </div>
  );
}
