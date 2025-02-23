"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BlogTitle from "../blogTitle";
import { TagProps } from "@/types";
import { DatePicker, Tag, TagWrapper } from "@/components/common";
import { SelectSingleEventHandler } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SelectedDateType } from "@/types/date";

interface BlogPublishingViewProps {
  selectedTags: TagProps[];

  selectedDateType: string;
  onChangeSelectedDateType: (v: SelectedDateType) => void;

  publishingDate: Date | undefined;
  onChangePublishingDate: SelectSingleEventHandler;
}

const BlogPublishingView = ({
  selectedTags,

  selectedDateType,
  onChangeSelectedDateType,

  publishingDate,
  onChangePublishingDate,
}: BlogPublishingViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }, [containerRef]);

  return (
    <div ref={containerRef} className="mx-[10vw] flex h-screen items-center">
      {/* CENTER BOX */}
      <div className="grid h-[500px] w-full grid-cols-8 gap-x-[3vw]">
        {/* LEFT MODULE */}
        <div className="col-span-4 flex w-full flex-col justify-between">
          {/* TITLE */}
          <div>
            <BlogTitle
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
            <BlogTitle title="Tags" isActionButtonOn={false} className="mb-2" />
            <TagWrapper className="mb-6 min-h-8 flex-grow-0 items-center rounded-sm bg-gray-1 p-2">
              {selectedTags.map((items) => (
                <Tag
                  id={items.id}
                  value={items.value}
                  label={items.label}
                  isActivated
                  hasXButton={false}
                />
              ))}
            </TagWrapper>

            {/* SCHEDULE */}
            <BlogTitle
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
              date={publishingDate}
              onChangeDate={onChangePublishingDate}
            />
          </div>

          {/* BUTTONS */}
          <div>
            <></>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPublishingView;
