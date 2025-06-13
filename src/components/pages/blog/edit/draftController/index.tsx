import { Divider, Tag, TagWrapper } from "@/components/common";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/utils/cn";
import { YooptaContentValue } from "@yoopta/editor";

interface DraftControllerProps {
  isDraftOpen: boolean;
  handleDraftOpen: (v?: boolean) => void;
  handleEditorValue: (title: string, content: YooptaContentValue) => void;

  className?: string;
}

const DraftController = ({
  // OPEN
  isDraftOpen,
  handleDraftOpen,
  //
  handleEditorValue,
  className,
}: DraftControllerProps) => {
  const triggerClass = cn(
    "group flex h-10 min-w-24 cursor-pointer items-center justify-center gap-2 rounded-md px-4 transition-all hover:bg-gray-5",
    className,
  );

  const handleSelect = async () => {
    handleEditorValue;

    return;
  };

  const user = useAuthStore((state) => state.user);

  return (
    <Popover open={isDraftOpen} onOpenChange={handleDraftOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        {/* Trigger */}
        <div className={triggerClass}>
          <div className="flex items-center gap-1.5 text-sm">
            <span>Draft</span>
          </div>

          <div className="flex min-w-10 items-center justify-evenly gap-1 rounded-full bg-gray-5 px-2 py-0.5 shadow-sm transition-transform group-hover:bg-gray-50">
            <span className="text-xs font-semibold text-gray-700">{1}</span>
            <Divider size={18} direction="vertical" className="bg-gray-100" />
            <span className="text-xs font-semibold text-gray-700">{5}</span>
          </div>
        </div>
      </PopoverTrigger>

      {/* CONTENT */}
      <PopoverContent className="w-[320px] p-0">
        <Command>
          <CommandList>
            {/* SELECTED_LIST */}
            <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
              <span className="text-xs text-gray-200">Drafts</span>
              <CommandEmpty>No Draft found.</CommandEmpty>
              {[1, 2, 3].map((order) => (
                <CommandItem
                  className="text-sm"
                  key={order}
                  value={`draft${order}`}
                  onSelect={(currentValue) => {
                    handleSelect();
                    handleDraftOpen(false);
                  }}
                >
                  <div>
                    <h4 className="mb-0.5 text-xs text-gray-200">
                      2025.02.22.
                    </h4>
                    <span className="font-medium">
                      타입스크립트 뭐시기... {order}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DraftController;
