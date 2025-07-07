import { ComponentType } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModalType = {
  Component: ComponentType<any>;
  props?: any;
  onResolve: (value: any) => void;
  canNotEscape?: boolean;
};

type State = {
  openedModals: ModalType[];
};

/**
 * @IsEmptyObject
 * 빈 객체인지 아닌지 검사하는 유틸리티 타입
 * 분산 조건부 타입을 막기 위해 튜플로 감싸기. [T] extends [T]
 */
type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends [never]
  ? true
  : false;

/**
 * @ModalPropsType
 * UI로직 빼고 실제 props만 추출
 */
type ModalPropsType<T> = Omit<T, "onResolve" | "canNotEscape">;

/**
 * @ModalPropsParams
 * props(ModalPropsType)와 canNotEscape 여부를 분리해서 모달의 타입으로 지정.
 */
type ModalPropsParams<T> =
  IsEmptyObject<ModalPropsType<T>> extends true
    ? [props?: undefined, canNotEscape?: boolean]
    : [props: ModalPropsType<T>, canNotEscape?: boolean];

type Action = {
  // 모달을 여는 함수
  openModal: <T>(
    Component: ComponentType<T>, // T라는 props를 가진 컴포넌트 타입
    ...params: ModalPropsParams<T> // T라는 props
  ) => Promise<
    T extends Pick<ModalType, "onResolve">
      ? Parameters<T["onResolve"]>[0] // onResolve의 첫 번째 패러미터 반환 (패러미터는 하나밖에 없음)
      : unknown
  >;

  // 모달을 닫는 함수
  closeModal: <T>(Component: ComponentType<T>, unmountDelay?: number) => void;

  clearModal: () => void;

  setNextModal: <T>(
    Component: ComponentType<T>,
    ...params: ModalPropsParams<T>
  ) => Promise<
    T extends Pick<ModalType, "onResolve">
      ? Parameters<T["onResolve"]>[0] //
      : unknown
  >;
};

const useModalStore = create(
  immer<State & Action>((set, get) => ({
    openedModals: [],

    // 모달을 여는 함수
    openModal: async (Component, ...params) => {
      const res = new Promise((resolve: (value?: any) => void) => {
        // 세팅된 모달 제거 함수 (resolve)
        const handleResolve = (value: any = false) => {
          resolve(value);
          get().closeModal(Component);
        };

        // 모달 세팅
        set((state) => {
          state.openedModals = [
            ...state.openedModals,
            {
              Component,
              props: params[0],
              onResolve: handleResolve,
              canNotEscape: params[1],
            },
          ];
        });
      });
      return res;
    },

    // 모딜 닫는 함수 (보통 openModal의 resolve함수에서 쓰임)
    closeModal: (Component, unmountDelay = 100) => {
      setTimeout(() => {
        set((state) => {
          state.openedModals = state.openedModals.filter(
            (x: ModalType) => x.Component.displayName !== Component.displayName,
          );
        });
      }, unmountDelay);
    },

    // 모달 모두 닫는 함수
    clearModal: () => {
      set((state) => {
        state.openedModals = [];
      });
    },

    // 현재 모달 위에 새로운 모달 세팅. (resolve에서 써야 함)
    setNextModal: async (Component, ...params) => {
      const res = new Promise((resolve: (value?: any) => void) => {
        const handleResolve = (value: any = false) => {
          resolve(value);
          get().closeModal(Component);
        };
        set((state) => {
          state.openedModals = [
            ...state.openedModals,
            {
              Component,
              props: params[0],
              onResolve: handleResolve,
              canNotEscape: params[1],
            },
          ];
        });
      });
      return res;
    },
  })),
);

export default useModalStore;
