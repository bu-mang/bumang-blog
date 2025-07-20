export const SECTION_MAIN_PAGE = "SECTION_MAIN_PAGE";
export const SECTION_SELLER_REGISTER_PAGE = "SECTION_SELLER_REGISTER_PAGE";
export const SECTION_PUSH_NOTIFICATION_PAGE = "SECTION_PUSH_NOTIFICATION_PAGE";
export const SECTION_SEO = "SECTION_SEO";
export const SECTION_TEAM_LEADER = "SECTION_TEAM_LEADER";

export const PERCENT_HOTEL_KO = [
  {
    title: "메인페이지",
    titleDesc: "자체 캐로셀 개발",
    id: SECTION_MAIN_PAGE,

    list: [
      {
        subtitle: "• 슬라이드 애니메이션 구현",
        desc: [
          "Resize 이벤트에 따라 부모 container의 width값이 변하면 슬라이드되는 x값도 변하도록 useCarouselSize 훅 개발",
          "MouseDown이벤트의 pageX 좌표값과 mouseUp 이벤트의 pageX 좌표값의 차이를 계산하여 delta(변화량)값을 도출. → 변화값이 일정 값 이상이면 다음 슬라이드로 이동하도록 구현",
          "useEffect와 SetInterval을 활용하여 3초 마다 무한반복 슬라이드 애니메이션 구현. MouseEnter, MouseLeave 이벤트를 감지하여 일시정지 구현. 클린업 함수로 페이지 이탈 시 setTimeout 해제하여 메모리 정리",
        ],
      },
      {
        subtitle: "• 모바일 환경과 PC 환경에 동일한 사용자 경험 제공",
        desc: [
          "캐로셀 애니메이션을 모바일, PC 환경에서 모두 드래그 가능하도록 TouchEvent와 MouseEvent를 모두 활용.",
          "touch이벤트 발생 시 mouse 이벤트를 cancel시켜 의도치 않은 클릭 방지",
        ],
      },
    ],

    image: "",
  },
  {
    title: "판매글 작성 페이지",
    titleDesc: "복잡한 비즈니스 로직과 예외 처리",
    id: SECTION_SELLER_REGISTER_PAGE,

    list: [
      {
        subtitle: "• 복잡한 비즈니스 로직 예외처리를 커스텀 훅으로 핸들링",
        desc: [
          "양도 1차 가격, 2차 가격 설정 여부, 2차 가격 시간 설정, 2차 가격 설정, 계좌 등록 여부, 야놀자 인증 여부, 약관 동의 여부 등 다양한 비즈니스 로직들을 고려하여 다음 프로세스로 진행 가능한지 판별하는 커스텀 훅 개발",
        ],
      },
      {
        subtitle:
          "• 결제 수단이 없을 경우 결제수단등록 페이지로 리다이렉팅시킨 후 복귀 시 작성 상태 기록",
        desc: [
          "계좌 등록이 안 된 경우 현재까지의 작성 상태를 기억해놓고, 계좌 연결 플로우를 타게 한 다음 다시 복귀하는 로직이 필요",
          "현재 페이지에 머무르며 결제수단등록 페이지의 컴포넌트만 갈아끼워서 구현. 이로 인해 기존에 입력했던 state 모두 유지",
          "복귀 시 state는 살아있지만 브라우저에서 checkbox의 check상태가 풀려 있는 등의 문제가 발생 → 현재 state 상태에 따라 페이지 전환 시 다시 복구시키는 훅으로 대응 및 해결",
        ],
      },
    ],

    image: "",
  },
  {
    title: "알림 페이지",
    titleDesc: "Firebase Cloud Message 알림 구현",
    id: SECTION_PUSH_NOTIFICATION_PAGE,

    list: [
      {
        subtitle: "• 안드로이드, iOS, PWA 내의 브라우저에서 푸시 알림 구현",
        desc: [
          "FCM 토큰 초기화 로직을 커스텀 훅으로 만들어 로그인 시 사용",
          "서비스 워커로 백그라운드 푸시 알림 수신",
          "백엔드에서 매물 거래 성공 혹은 체크인 7일, 1일 전 푸시알림 전송 시 프론트엔드에서 수신",
        ],
      },
    ],

    image: "",
  },
  {
    title: "리액트 SEO 최적화",
    titleDesc: "LightHouse SEO 최적화",
    id: SECTION_SEO,

    list: [
      {
        subtitle: "• React/Vite 환경에서도 서버사이드 pre-render 구현",
        desc: [
          "리액트 헬멧 라이브러리로 동적인 메타데이터를 브라우저에 렌더",
          "리액트 스냅 라이브러리로 리액트에서도 SSG 방식의 메타데이터 주입 구현",
          "개선 전 LightHouse SEO 점수 77점 → 100점",
        ],
      },
    ],

    image: "",
  },
  {
    title: "개발팀 운영",
    titleDesc: "완성도와 팀워크를 가다듬어 파이널 프로젝트 2등 달성",
    id: SECTION_TEAM_LEADER,

    list: [
      {
        subtitle: "• 개발팀 규칙 설정",
        desc: [
          "매일 아침 데일리 스크럼으로 작업 내역 공유",
          "코드리뷰는 전원 다 해야 머지 가능. ‘수고하셨습니다.’보단 코드를 자세히 보면서 뭐라도 남기도록 유도.",
        ],
      },
      {
        subtitle: "• 프로젝트 중반 팀원 이탈 대처",
        desc: [
          "프로젝트 중반에 팀원 2명이 면접 준비를 이유로 중도 이탈하는 상황이 발생하여 남은 팀원들이 사기가 떨어지는 상황에 대한 대처",
          "이탈한 2명에게 연락하여 구체적으로 어떤 부분을 개발하고 있었고, 완료하지 못한 부분이 어디인지 파악하여 남은 인원들에게 업무 분담",
          "개발 템포가 떨어지지 않게 하기 위하여 오히려 코드리뷰를 더욱 자세히 하고, 빠른 피드백 문화를 위해 pr이 올라오면 3시간 이내에 확인하기 문화를 만듦. 그리고 잘한 점은 칭찬하는 문화를 전파.",
          "그 결과 팀원들 중 퍼포먼스가 가장 좋았던 팀원이 팀 분위기가 좋아 마지막까지 힘낼 수 있었다고 회고 때 언급",
        ],
      },
    ],

    image: "",
  },
];
