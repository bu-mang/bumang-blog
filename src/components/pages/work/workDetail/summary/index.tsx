import { ButtonBase } from "@/components/common";
import { cn } from "@/utils/cn";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface SummaryProps {
  children: React.ReactNode;
}

export default function Summary({ children }: SummaryProps) {
  return (
    <div className="">
      <div className="mb-4 font-semibold">Summary</div>
      {children}
    </div>
  );
}

interface SummaryPartsProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
Summary.Block = ({ icon, title, children }: SummaryPartsProps) => {
  return (
    <div className="mb-4 grid grid-cols-6">
      <div className="col-span-2">
        <div className="flex items-center gap-2 text-gray-300">
          {icon}
          <span>{title}</span>
        </div>
      </div>

      <div className="col-span-3">{children}</div>
    </div>
  );
};

interface SummaryHintProps {
  testAccount: { id: string; password: string };
  breakId: boolean;
}
Summary.Hint = ({
  testAccount: { id, password },
  breakId,
}: SummaryHintProps) => {
  const [hidden, setHidden] = useState(true);

  let passwordHidden = "*".repeat(password.length);

  return (
    <div className="mt-5 flex flex-col rounded-lg bg-gray-5 px-4 py-2 text-gray-400">
      <div className="col-span-4 mb-1 border-b border-gray-300 pb-1 text-xs">
        Test Service Account
      </div>
      <div className="grid grid-cols-2">
        <div>
          <div className="col-span-4 text-xs">email</div>
          <div
            className={cn(
              breakId && "whitespace-pre-wrap",
              "col-span-4 mr-2 break-words text-sm font-semibold",
            )}
          >
            {id}
          </div>
        </div>

        <div className="group">
          <div className="col-span-4 text-xs">Password</div>
          <div>
            <div className="col-span-4 flex items-center gap-1 text-sm">
              <span className="font-semibold">
                {hidden ? passwordHidden : password}
              </span>
              <ButtonBase
                className="opacity-0 transition-all group-hover:opacity-100"
                onClick={() => setHidden((prev) => !prev)}
              >
                {hidden ? <Eye size={14} /> : <EyeClosed size={14} />}
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
