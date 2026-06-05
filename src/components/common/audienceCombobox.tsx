"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuSpeech } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CommandItem } from "cmdk";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CountBadge, Tag, TagWrapper } from "@/components/common";
import { useBlogEditorContext } from "@/contexts/BlogEditorContext";
import { getUserGroups } from "@/services/api/userGroups";

interface AudienceComboboxProps {
  isOpen?: boolean;
  handleIsOpen?: (v: boolean) => void;
}

/**
 * 글 단위 default audience(공개대상)를 선택하는 툴바 콤보박스.
 * TagCombobox와 동일한 시각/상호작용 패턴을 따른다.
 * - trigger: "+ 공개대상 선택" + (선택 / 전체) 카운트 배지
 * - popover: 선택된 그룹 / 검색창 / 미선택 그룹 칩
 *
 * 빈 배열이면 그룹 필터 없음(글이 보이는 모든 viewer 노출).
 */
const AudienceCombobox = ({ isOpen, handleIsOpen }: AudienceComboboxProps) => {
  const { defaultAudienceGroupIds, setDefaultAudienceGroupIds } =
    useBlogEditorContext();

  // OWNER만 user-groups API 호출 가능 — 권한 없으면 빈 리스트로 폴백
  const { data: groups = [] } = useQuery({
    queryKey: ["user-groups"],
    queryFn: getUserGroups,
    retry: false,
  });

  const { selectedGroups, unselectedGroups } = useMemo(() => {
    const selectedSet = new Set(defaultAudienceGroupIds);
    const sel: typeof groups = [];
    const un: typeof groups = [];
    for (const g of groups) {
      if (selectedSet.has(g.id)) sel.push(g);
      else un.push(g);
    }
    return { selectedGroups: sel, unselectedGroups: un };
  }, [groups, defaultAudienceGroupIds]);

  const totalLength = groups.length;
  const selectedLength = selectedGroups.length;

  const toggle = (id: number) => {
    if (defaultAudienceGroupIds.includes(id)) {
      setDefaultAudienceGroupIds(
        defaultAudienceGroupIds.filter((v) => v !== id),
      );
    } else {
      setDefaultAudienceGroupIds([...defaultAudienceGroupIds, id]);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleIsOpen}>
      {/* TRIGGER */}
      <PopoverTrigger asChild>
        <div className="group flex h-10 min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md transition-all hover:bg-gray-5 dark:hover:bg-gray-800">
          <div className="flex items-center gap-1.5 text-sm">
            <LuSpeech className="text-gray-100" />
            <span>공개대상 선택</span>
          </div>

          <HoverCard
            openDelay={200}
            closeDelay={200}
            open={isOpen ? false : undefined}
          >
            <HoverCardTrigger asChild>
              <CountBadge selected={selectedLength} total={totalLength} />
            </HoverCardTrigger>

            <HoverCardContent className="pointer-events-none w-80">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-200">선택된 공개대상</span>
                <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2 dark:bg-gray-600">
                  {selectedGroups.length > 0 ? (
                    selectedGroups.map((g) => (
                      <Tag
                        key={g.id}
                        id={g.id}
                        title={g.name}
                        fixedBgColor="dark"
                        isActivated={true}
                        type="button"
                        hasXButton={false}
                      />
                    ))
                  ) : (
                    <span className="px-1 text-xs text-gray-300">
                      비어있으면 전체 공개 (글 진입한 누구나 볼 수 있음)
                    </span>
                  )}
                </TagWrapper>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </PopoverTrigger>

      {/* CONTENT */}
      <PopoverContent className="w-[320px] p-0">
        {/* SELECTED_LIST */}
        <div className="flex flex-col gap-1 border-b-[1px] p-2.5">
          <span className="text-xs text-gray-200">선택된 공개대상</span>
          <TagWrapper className="min-h-8 items-center rounded-sm bg-gray-1 p-2 dark:bg-gray-800">
            {selectedGroups.length > 0 ? (
              selectedGroups.map((g) => (
                <Tag
                  key={g.id}
                  id={g.id}
                  title={g.name}
                  fixedBgColor="dark"
                  isActivated={true}
                  type="button"
                  onClick={() => toggle(g.id)}
                />
              ))
            ) : (
              <span className="px-1 text-xs text-gray-300">
                전체 공개 (그룹 필터 없음)
              </span>
            )}
          </TagWrapper>
        </div>

        <Command>
          <CommandInput placeholder="공개대상을 검색하세요." />
          <CommandList>
            <CommandEmpty className="flex h-8 items-end justify-center rounded-sm px-4 text-sm text-gray-100">
              추가 그룹은 /admin/groups에서 만들 수 있어요.
            </CommandEmpty>

            <CommandGroup className="flex">
              <div className="flex flex-wrap gap-2 p-1">
                {unselectedGroups.length > 0 &&
                  unselectedGroups.map((g) => (
                    <CommandItem className="flex w-fit" key={g.id}>
                      <Tag
                        id={g.id}
                        title={g.name}
                        fixedBgColor={"lightGray"}
                        isActivated={false}
                        type="button"
                        onClick={() => toggle(g.id)}
                      />
                    </CommandItem>
                  ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AudienceCombobox;
