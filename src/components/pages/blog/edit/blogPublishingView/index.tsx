"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionLabel } from "@/components/common";
import { TagType } from "@/types";
import {
  ButtonBase,
  DatePicker,
  FillButton,
  Tag,
  TagWrapper,
} from "@/components/common";
import { SelectSingleEventHandler } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SelectedDateType } from "@/types/date";
import { cn } from "@/utils/cn";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";

import {
  LuX as XIcon,
  LuCircleAlert as AlertIcon,
  LuChevronLeft as GoBackIcon,
  LuPlaneTakeoff as PublishPlaneIcon,
} from "react-icons/lu";
import { BlogStep } from "@/types";

interface BlogPublishingViewProps {
  selectedTags: TagType[];

  selectedDateType: SelectedDateType;
  onChangeSelectedDateType: (v: SelectedDateType) => void;

  publishingDate: Date | undefined;
  onChangePublishingDate: SelectSingleEventHandler;

  onChangeStep: (v: BlogStep) => void;
}

const BlogPublishingView = ({
  selectedTags,

  selectedDateType,
  onChangeSelectedDateType,

  publishingDate,
  onChangePublishingDate,

  onChangeStep,
}: BlogPublishingViewProps) => {
  /**
   * @MOUNT_ANIMATION
   */
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }, []);

  const {
    fillStyle: DarkFillStyle,
    textStyle: DarkTextStyle,
    flexBoxClass: DarkFlexClass,
  } = getButtonColorStyle("dark", "lg");
  const {
    fillStyle: lightFillStyle,
    textStyle: lightTextStyle,
    flexBoxClass: lightFlexBoxClass,
  } = getButtonColorStyle("light", "lg");

  return (
    <div
      ref={containerRef}
      className="mx-[10vw] flex h-screen flex-col items-center justify-center"
    >
      <div className="mb-8 w-full">
        {/* GO BACK BUTTON */}
        <ButtonBase
          onClick={() => onChangeStep(BlogStep.EDITTING)}
          className="group -translate-x-1.5 rounded-sm transition-all hover:bg-gray-5"
        >
          <XIcon
            size={28}
            className="text-gray-500 group-hover:text-gray-700"
          />
        </ButtonBase>
      </div>

      {/* CENTER BOX */}
      <div className="grid h-[500px] w-full grid-cols-8 gap-x-[3vw]">
        {/* LEFT MODULE */}
        <div className="col-span-4 flex w-full flex-col justify-between">
          {/* TITLE */}
          <div>
            <SectionLabel
              title="Preview"
              isActionButtonOn={false}
              className="mb-0"
            />
            <div className="mb-8 text-4xl font-bold">Title of Post Here</div>
          </div>

          {/* IMAGE */}
          <div className="aspect-video w-full rounded-xl bg-neutral-700"></div>
        </div>

        {/* RIGHT MODULE */}
        <div className="col-span-4 flex w-full flex-col justify-between">
          <div>
            {/* TAGS */}
            <SectionLabel
              title="Tags"
              isActionButtonOn={false}
              className="mb-0"
            />
            <TagWrapper className="min-h-8 flex-grow-0 items-center rounded-sm bg-gray-1 p-2">
              {selectedTags.map((items) => (
                <Tag
                  key={items.id}
                  id={items.id}
                  title={items.title}
                  isActivated
                  hasXButton={false}
                />
              ))}
            </TagWrapper>
          </div>
          <div className="">
            {/* SCHEDULE */}
            <SectionLabel
              title="Schedule"
              isActionButtonOn={false}
              className="mb-0"
            />

            <RadioGroup
              value={selectedDateType}
              defaultValue="rightNow"
              onValueChange={onChangeSelectedDateType}
              className="flex py-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rightNow" id="r1" />
                <Label htmlFor="r1">Right Now</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="r2" />
                <Label htmlFor="r2">Custom</Label>
              </div>
            </RadioGroup>

            <DatePicker
              selectedDateType={selectedDateType}
              date={publishingDate}
              onChangeDate={onChangePublishingDate}
            />
          </div>

          <div>
            {/* AUTHORIZATION */}
            <SectionLabel
              title="who can read it?"
              isActionButtonOn={false}
              className="mb-0"
            />

            <RadioGroup
              value={selectedDateType}
              defaultValue="rightNow"
              onValueChange={onChangeSelectedDateType}
              className="flex py-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="r2" />
                <Label htmlFor="r2">All Visitor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rightNow" id="r1" />
                <Label htmlFor="r1">Only Admin</Label>
              </div>
            </RadioGroup>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <AlertIcon className="mt-0.5 shrink-0 text-gray-300" size={20} />
              <span className="text-gray-300">
                The temporary save of this post will be deleted after
                deployment.
              </span>
            </div>
            <div className="flex gap-4">
              <FillButton
                className={cn("w-fit", lightFillStyle)}
                onClick={() => onChangeStep(BlogStep.EDITTING)}
              >
                <div className={lightFlexBoxClass}>
                  <GoBackIcon className={lightTextStyle} />
                  <span className={lightTextStyle}>Go Back</span>
                </div>
              </FillButton>
              <FillButton className={cn("w-fit", DarkFillStyle)}>
                <div className={DarkFlexClass}>
                  <PublishPlaneIcon className={DarkTextStyle} />
                  <span className={DarkTextStyle}>Publish</span>
                </div>
              </FillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPublishingView;
