import {
  BlockNoteEditor,
  BlockNoteSchema,
  PartialBlock,
  createCodeBlockSpec,
} from "@blocknote/core";
import { codeBlockOptions } from "@blocknote/code-block";
import { maskedStyleSpec } from "./maskedStyle";

/**
 * edit / detail에서 공유하는 BlockNote 스키마.
 * - codeBlock: 기존 커스텀 설정 그대로
 *
 * audience 마스킹은 스키마/블록 타입을 건드리지 않고 동작한다.
 * 백엔드가 차단 블록의 텍스트만 같은 길이의 더미로 치환하고
 * 응답에 maskedBlockIds를 같이 내려보내며, 프론트는 그 id로 DOM에
 * .audience-blocked 클래스를 부여해 블러를 적용한다.
 */
export const blogBlockNoteSchema = BlockNoteSchema.create().extend({
  blockSpecs: {
    codeBlock: createCodeBlockSpec({
      ...codeBlockOptions,
      defaultLanguage: "typescript",
      supportedLanguages: {
        typescript: { name: "TypeScript", aliases: ["ts"] },
        javascript: { name: "JavaScript", aliases: ["js"] },
        python: { name: "Python", aliases: ["py"] },
        java: { name: "Java", aliases: [] },
        markdown: { name: "Markdown", aliases: ["md"] },
        sql: { name: "SQL", aliases: [] },
      },
    }),
  },
  // 인라인 마스킹 스타일. audience 그룹 기준으로 문장 중간 구간을 가린다.
  styleSpecs: {
    masked: maskedStyleSpec,
  },
});

/**
 * 스키마 인스턴스에서 BlockNote의 3개 generic 파라미터(BSchema/ISchema/SSchema)를 추출.
 * editor 인스턴스 / PartialBlock 타입을 같은 스키마로 일관되게 유도하기 위해 사용.
 */
type SchemaParts =
  typeof blogBlockNoteSchema extends BlockNoteSchema<infer B, infer I, infer S>
    ? { B: B; I: I; S: S }
    : never;

/** 이 블로그가 쓰는 BlockNote editor 인스턴스 타입. */
export type BlogBlockNoteEditor = BlockNoteEditor<
  SchemaParts["B"],
  SchemaParts["I"],
  SchemaParts["S"]
>;

/** 이 블로그가 쓰는 PartialBlock 타입. */
export type BlogPartialBlock = PartialBlock<
  SchemaParts["B"],
  SchemaParts["I"],
  SchemaParts["S"]
>;
