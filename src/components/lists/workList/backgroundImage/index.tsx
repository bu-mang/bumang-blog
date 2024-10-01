import Image from "next/image";
import { forwardRef } from "react";

interface Props {
  bgImage: string;
}

const BackgroundImage = forwardRef<HTMLDivElement, Props>(
  ({ bgImage }: Props, ref) => {
    return (
      <div className={"absolute -z-10 h-full w-full"} ref={ref}>
        <Image
          src={bgImage}
          width={100}
          height={100}
          alt="background"
          layout="responsive"
          objectFit="cover"
          style={{
            transform: "scale(1.5)",
            position: "absolute",
          }}
        />
      </div>
    );
  },
);

BackgroundImage.displayName = "BackgroundImage";
export default BackgroundImage;
