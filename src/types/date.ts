/**
 * @DATE_NODE
 * 생성일, 수정일 필요한 모든 곳에 쓰이는 공통 타입
 * */
export interface DateType {
  createdAt: Date;
  updatedAt: Date;
}

export enum SelectedDateType {
  rightNow = "rightNow",
  custom = "custom",
}
