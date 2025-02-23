import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectedDateType } from "@/types/date";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  date: Date | undefined;
  onChangeDate: SelectSingleEventHandler;
  selectedDateType: SelectedDateType;
}

const DatePicker = ({
  date,
  onChangeDate,
  selectedDateType,
}: DatePickerProps) => {
  //
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={selectedDateType === SelectedDateType.rightNow}
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChangeDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
