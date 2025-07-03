import { cn } from "@/utils/cn";
import { forwardRef, HTMLAttributes } from "react";

interface ModalItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// Modal의 완전한 타입 정의
type ModalComponent = React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDivElement>
> & {
  // Modal을 forwardRef로 감싸도 Compound Components들을 찾을 수 있게.
  Container: typeof Container;
  Actions: typeof Actions;
  Contents: typeof Contents;
  Title: typeof Title;
};

interface ModalProps {
  open: boolean;
  onClose: (...args: unknown[]) => Promise<unknown> | unknown;
  onResolve?: (value: unknown) => void;
  canNotEscape?: boolean;
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, onClose }: ModalProps, ref) => {
    const handleClick = () => {
      console.log("🟡 DIM clicked");
      onClose();
    };

    // DIM
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-[1000] flex items-center justify-center bg-[#000]/70 transition-opacity",
        )}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  },
) as ModalComponent;
Modal.displayName = "Modal";
export default Modal;

function ContainerInner(
  { children, className }: ModalItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <section
      ref={ref}
      className={cn(
        "mx-5 min-w-[350px] rounded-3xl bg-white px-6 py-6 shadow-2xl",
        className,
      )}
      onClick={(e) => {
        console.log("🟢 modal clicked");
        e.stopPropagation();
      }}
    >
      {children}
    </section>
  );
}
const Container = forwardRef(ContainerInner);
Container.displayName = "Container";

function Title({ children, className }: ModalItemProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center text-center text-2xl font-semibold",
        className,
      )}
    >
      {children}
    </section>
  );
}

function Contents({ children, className }: ModalItemProps) {
  return (
    <section className={cn("flex flex-col items-center", className)}>
      {children}
    </section>
  );
}

function Actions({ children, className }: ModalItemProps) {
  return <section className={cn("flex w-full", className)}>{children}</section>;
}

Modal.Container = Container;
Modal.Actions = Actions;
Modal.Contents = Contents;
Modal.Title = Title;
