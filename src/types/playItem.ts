import { StaticImageData } from "next/image";

/**
 * 이미지 아이템 타입
 * - 썸네일 및 상세 이미지에 공통으로 사용
 */
export interface ImageItemType {
  width: number;
  height: number;
  imgUrl: StaticImageData;
  title?: string;
  /** false로 설정 시 blur placeholder 비활성화 */
  placeholder?: false;
  /** true로 설정 시 Next.js 이미지 최적화 비활성화 (애니메이션 이미지용) */
  unoptimized?: boolean;
}

/**
 * Play 아이템 메타데이터
 */
export interface PlayItemMetaData {
  id: number;
  title?: string;
  content?: string;
  /** 상세 페이지에 표시할 이미지들 */
  items: ImageItemType[];
  /** 캔버스에 표시할 썸네일 */
  thumnail: ImageItemType;
  createdAt: string;
}

/**
 * Play 아이템 스타일 옵션
 */
export interface PlayItemStyle {
  isVisible?: boolean;
  isCentered?: boolean;
  imageOnly?: boolean;
  containerClassName?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";
  maxWidth?: number | string;
}

/**
 * 캔버스 내 아이템 위치/크기 정보
 */
export interface PlayItemPosition {
  /** 캔버스 내 X 좌표 (px) */
  x: number;
  /** 캔버스 내 Y 좌표 (px) */
  y: number;
  /** 아이템 너비 (px) */
  width?: number;
  /** 아이템 높이 (px) */
  height?: number;
  /** 회전 각도 (deg) */
  rotation?: number;
}

/**
 * Play 아이템 전체 타입
 * - 메타데이터 + 스타일 + 위치 정보
 */
export interface PlayItemType extends PlayItemMetaData, PlayItemStyle {
  position: PlayItemPosition;
}

export type PlayItemListType = (PlayItemType | null)[];
