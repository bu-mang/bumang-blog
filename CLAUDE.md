# Bumang Blog Frontend — 에이전트 가이드

Next.js 14 App Router 기반 블로그 + 포트폴리오 웹. 상위 컨텍스트는 [../CLAUDE.md](../CLAUDE.md) 참고.

**스택**: Next.js 14 (App Router) · React 18 · TypeScript · Tailwind + Radix UI · Zustand · TanStack Query · next-intl(ko/en) · BlockNote 에디터

## 명령어

```bash
npm run dev      # next dev --port 4000
npm run build    # next build (output: standalone)
npm start        # 프로덕션 서버
npm run lint     # next lint
```

환경변수(빌드 타임 주입, `NEXT_PUBLIC_*`):
- `NEXT_PUBLIC_API_BASE_URL` — 백엔드 API (개발 시 `http://localhost:4001`). 브라우저와 SSR 양쪽이 URL을 만들 때 쓰는 공개 주소.
- `NEXT_PUBLIC_S3_DOMAIN` — S3 이미지 도메인

환경변수(런타임 주입, 서버 전용):
- `API_INTERNAL_URL` — SSR(`serverFetch`)이 백엔드를 부를 때 공개 주소 대신 쓰는 내부 주소. 프로덕션은 백엔드 레포 `docker-compose.prod.yaml`의 `frontend.environment`에서 `http://app:4001`로 주입한다. 비어 있으면 공개 주소를 그대로 쓴다(로컬 개발). **공개 주소로 나갈 땐 `cf-connecting-ip`를 절대 붙이지 않는다** — Cloudflare가 403으로 튕긴다(2026-09-06 장애). 상세는 `src/services/lib/serverFetch/index.ts` 주석.

## 라우팅 (App Router)

**모든 페이지는 `src/app/[locale]/` 하위** (next-intl 다국어). locale 세그먼트를 빠뜨리지 말 것.

```
src/app/[locale]/
├── (home)/            # 홈
├── blog/
│   ├── (list)/        # 목록 (페이지네이션, 리스트/썸네일 뷰)
│   ├── [id]/          # 상세
│   └── edit/          # 작성·수정 (인증 필요, BlockNote)
├── work/<project>/    # 포트폴리오 (sea-pearl, blai, percent-hotel, anttime-* 등)
├── play/              # 갤러리
├── about/  login/
└── admin/groups/      # 관리(그룹/카테고리)
src/app/api/proxy/     # 라우트 핸들러 (외부 이미지 업로드 프록시)
```

## 컨벤션

- **Path alias**: `@/*` → `src/*` (`tsconfig.json`). 백엔드(`src/*`)와 다르다.
- **tsconfig는 strict:true**. 백엔드와 달리 타입 엄격.
- 스타일: Tailwind 유틸 우선, 컴포넌트는 `cva`(class-variance-authority) + `tailwind-merge`(`cn`). Prettier에 `prettier-plugin-tailwindcss` 적용 — 클래스 순서 자동 정렬.

## 데이터 레이어

- HTTP 클라이언트: `src/services/lib/{axios, serverFetch, queryClients}`
  - **서버 컴포넌트** → `serverFetch` (쿠키 기반 SSR 인증)
  - **클라이언트** → `axios` 인스턴스 + **TanStack Query**
- API 함수: `src/services/api/{auth, blog, userGroups}/`. 클라/서버 변형은 `*.client.ts` / `*.server.ts`로 분리 (예: `blog/[id].ts`, `blog/[id].server.ts`).
- 엔드포인트 경로 상수: `END_POINTS` (정의 `src/constants/api/endpoints.ts`, `src/services/index.ts`에서 재export). **백엔드 라우트 변경 시 여기부터 고친다.**

## 상태 / 에러 처리

- 전역/UI 상태: **Zustand** (`src/store/`).
- 서버 상태: **TanStack Query**.
- 비동기 UI: **@suspensive/react**(Suspense) + **react-error-boundary**. 컴포넌트 단위로 로딩/에러를 선언적으로 감싼다 — 페이지 전체 try/catch 대신 이 패턴을 따를 것.

## middleware.ts (민감 — 변경 주의)

진입점에서 4가지를 한다: ① 악성 봇 차단 + 검증된 봇 레이트리밋 ② IP 기반 rate limiting(메모리 `Map`, 일반 60/분·봇 100/분) ③ access 토큰 검증 → 만료 시 refresh로 **자동 재발급** → 실패 시 쿠키 정리 ④ next-intl 로케일 라우팅. 인증·국제화·보안이 한 파일에 모여 있으니 수정 시 4가지 흐름을 모두 고려.

## 빌드 설정 (`next.config.mjs`)

- `output: 'standalone'` — Docker 최적화. 빌드 산출물 구조 의존.
- 보안 헤더(X-Frame-Options DENY, HSTS, nosniff 등) 전역 적용.
- **SVG**: `import Icon from './x.svg'` → React 컴포넌트(SVGR), `import url from './x.svg?url'` → URL 문자열. 둘을 구분해서 import.
- `images.domains` 화이트리스트(unsplash + S3). 새 외부 이미지 호스트는 여기 추가해야 `next/image`가 허용.

## 컴포넌트 조직

`src/components/`: `ui`(Radix 기반 프리미티브) · `common` · `layout`(Header/Footer) · `pages`(페이지 전용) · `modal` · `editor`(BlockNote) · `error`. 재사용 프리미티브는 `ui`, 페이지 한정 조합은 `pages`에 둔다.
