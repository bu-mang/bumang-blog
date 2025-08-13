import { cn } from "@/utils/cn";
import { ToastContentProps } from "react-toastify";

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
  onClick?: () => void;
  buttonText?: string;
}>;

export default function CustomNotification({
  closeToast,
  data,
  toastProps,
}: CustomNotificationProps) {
  const isColored = toastProps.theme === "colored";

  return (
    <div className="flex w-full flex-col">
      <h3
        className={cn(
          "text-sm font-semibold",
          isColored ? "text-white" : "text-zinc-800",
        )}
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm">{data.content}</p>
        <button
          onClick={data?.onClick || closeToast}
          className={cn(
            "ml-auto rounded-md border px-4 py-2 text-xs text-white transition-all active:scale-[.95]",
            isColored ? "bg-transparent" : "bg-zinc-900",
          )}
        >
          {data.buttonText ?? "Try again"}
        </button>
      </div>
    </div>
  );
}
