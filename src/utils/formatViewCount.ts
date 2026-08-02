// 조회수 표시 규칙: 10회 미만(0~9)은 지정 라벨로, 10 이상은 숫자로.
// underTenLabel은 i18n 번역 문자열을 넘긴다 — 예: t("viewsUnderTen").
// (경계를 바꾸려면 10을 11로: 그러면 10도 라벨로 묶임)
export function formatViewCount(
  view: number | undefined,
  underTenLabel: string,
): string {
  const n = view ?? 0;
  return n < 10 ? underTenLabel : n.toLocaleString();
}
