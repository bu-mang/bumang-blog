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
import { cn } from "@/utils/cn";
import { getButtonColorStyle } from "@/utils/styles/filButtonManager";

import {
  LuX as XIcon,
  LuCircleAlert as AlertIcon,
  LuChevronLeft as GoBackIcon,
  LuPlaneTakeoff as PublishPlaneIcon,
} from "react-icons/lu";
import { BlogStep } from "@/types";
import { useQueryParams } from "@/hooks/useQueryParams";

interface BlogPublishingViewProps {
  selectedTags: TagType[];

  publishingDate: Date | undefined;
  onChangePublishingDate: SelectSingleEventHandler;

  onChangeStep: (v: BlogStep) => void;
  onPublishing: () => void;
}

const BlogPublishingView = ({
  selectedTags,

  publishingDate,
  onChangePublishingDate,

  onChangeStep,
  onPublishing,
}: BlogPublishingViewProps) => {
  /**
   * @MOUNT_ANIMATION
   */
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
    );

    return () => {
      // 진행 중인 모든 GSAP 애니메이션 정리
      gsap.killTweensOf(container);
    };
  }, []);

  const handleConvertToEditting = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.1,
      onComplete: () => onChangeStep(BlogStep.EDITTING),
    });
  };

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

  const { hasQuery, getQueryValue } = useQueryParams();
  const idParam = getQueryValue("id");

  return (
    <div
      ref={containerRef}
      className="mx-[10vw] flex h-screen flex-col items-center justify-center"
    >
      <div className="mb-8 w-full">
        {/* GO BACK BUTTON */}
        <ButtonBase
          onClick={handleConvertToEditting}
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
              itemViewType="list"
              isTag={false}
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
              itemViewType="list"
              isTag={false}
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
              itemViewType="list"
              isTag={false}
              className="mb-0"
            />
          </div>

          <div>
            {/* AUTHORIZATION */}
            <SectionLabel
              title="who can read it?"
              itemViewType="list"
              isTag={false}
              className="mb-0"
            />
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
                onClick={handleConvertToEditting}
              >
                <div className={lightFlexBoxClass}>
                  <GoBackIcon className={lightTextStyle} />
                  <span className={lightTextStyle}>Go Back</span>
                </div>
              </FillButton>
              <FillButton
                className={cn("w-fit", DarkFillStyle)}
                onClick={onPublishing}
              >
                <div className={DarkFlexClass}>
                  <PublishPlaneIcon className={DarkTextStyle} />
                  <span className={DarkTextStyle}>
                    {hasQuery("id") ? `Update ${idParam}` : "Publish"}
                  </span>
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
