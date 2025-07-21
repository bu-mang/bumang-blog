export const SECTION_ENV_INTERGRATION = "SECTION_ENV_INTERGRATION";
export const SECTION_ANIM_UPDATE = "SECTION_ANIM_UPDATE";
export const SECTION_PUSH_SKIN_UPDATE = "SECTION_PUSH_SKIN_UPDATE";
export const SECTION_RN_UPDATE = "SECTION_RN_UPDATE";
export const SECTION_DEEPLINK_UPDATE = "SECTION_DEEPLINK_UPDATE";

export const ANTTIME_SWAP_KO = {
  backToList: "목록으로 돌아가기",
  left: {
    badge: ["플레이스토어", "다운로드 80만", "Web3 포인트 채굴 앱"],
    summary: {
      title: "프로젝트 요약",
      period: {
        label: "담당 시작일",
        value: "24.04.15.",
      },
      position: {
        label: "포지션",
        value: "프론트(크로스플랫폼 앱개발)",
      },
      techStack: {
        label: "테크스택",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Styled Components", colorClass: "bg-pink-100" },
          { label: "PWA", colorClass: "" },
          { label: "Firebase Cloud Message(FCM)", colorClass: "bg-red-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "MSW", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "팀 구성",
        value: [
          { role: "프론트", amount: 1 },
          { role: "백엔드", amount: 1 },
          { role: "PM", amount: 1 },
          { role: "디자인", amount: 1 },
        ],
      },
      relatedLink: {
        label: "관련링크",
        value: [
          {
            name: "Android",
            value:
              "https://play.google.com/store/apps/details?id=net.anttime.app",
          },
          {
            name: "iOS",
            value: "https://apps.apple.com/kr/app/anttime/id6449239746?l=en-GB",
          },
          { name: "공식", value: "https://anttime.net/" },
        ],
        testServiceAccount: {
          title: "테스트용 계정",
          email: "이메일",
          password: "비밀번호",
        },
      },
    },
  },
  right: {
    title: "When ANTs Mine, TIME Shine.",
    desc: "ANTTIME은 시간이라는 자산을 수익화할 수 있는 블록체인 기반 T2E(Time-to-Earn) 프로젝트입니다. 이 TIME 생태계에서 창작, 소유, 수익 창출 등 다양한 경제 활동에 참여할 수 있습니다. 또한 노드 검증자가 되어 블록체인에 직접 참여할 수도 있습니다. ANTTIME과 함께 당신의 시간을 더욱 가치 있게 만드세요.",
    navigation: {
      title: "맡은 역할",
      value: [
        {
          title: "프로덕션과 테스트 환경 분리",
          desc: "안드로이드 Flavor와 iOS 스키마 분리",
          href: SECTION_ENV_INTERGRATION,
        },
        {
          title: "고성능 채굴 애니메이션 구현",
          desc: "react-native-reanimate를 통한 좌표 애니메이션 구현", // Lottie 플레이어 기반 애니메이션을 React-native-reanimated를 통한 타임라인 애니메이션으로 전환"
          href: SECTION_ANIM_UPDATE,
        },
        {
          title: "신체 부위 별 스킨 업데이트",
          desc: "연휴 별 스킨 추가 이벤트 진행",
          href: SECTION_PUSH_SKIN_UPDATE,
        },
        {
          title: "React Native 버전 업데이트",
          desc: "RN 0.68에서 0.74로.",
          href: SECTION_RN_UPDATE,
        },
        {
          title: "딥링크 구현",
          desc: "PlayStore Referral API 사용",
          href: SECTION_DEEPLINK_UPDATE,
        },
      ],
    },
  },
  details: [
    {
      title: "프로덕션과 테스트 환경 분리",
      titleDesc: "안드로이드 Flavor와 iOS 스키마 분리",
      id: SECTION_ENV_INTERGRATION,

      list: [
        {
          subtitle: "• 프로덕션과 개발 환경 분리",
          desc: [
            "각 개발 환경에 대해 Firestore 설정 및 그에 맞는 환경 변수 파일 구성",
            "iOS용 Xcode 빌드 스키마와 Android용 Android Flavor를 사용하여 네이티브 빌드 중 react-native-firebase의 환경별 설정 구성",
          ],
        },
      ],

      image: "",
    },
    {
      title: "복잡한 채굴 애니메이션 구현",
      titleDesc: "좌표 기반 타임라인 애니메이션",
      id: SECTION_ANIM_UPDATE,

      list: [
        {
          subtitle:
            "• 기존 Lottie 애니메이션을 캐릭터의 신체 부위 별 애니메이션을 독립적으로 실행되도록 분리",
          desc: [
            "기존 Lottie 애니메이션으론 여러가지 스킨 조합의 경우의 수를 표현하는데에 한계가 존재. 신체 부위 별로 아바타를 교체할 수 있으려면 각 파츠 별로 애니메이션을 따로 구현해야하는 상황 발생.",
            "react-native-reanimate로 각 파츠 별 애니메이션 설정. 타임라인 기능으로 각 애니메이션의 실행시기를 정확하게 맞춤.",
            "앱이 백그라운드 상태가 되거나 애니메이션 페이지에서 벗어나면 클린업 함수로 타임라인 제거. 캐릭터 idle 상태로 전환 최적화.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "신체 부위 별 스킨 업데이트",
      titleDesc: "연휴 별 스킨 추가 이벤트 진행",
      id: SECTION_PUSH_SKIN_UPDATE,

      list: [
        {
          subtitle:
            "• 사용자가 앱 내 화폐를 사용하여 구매할 수 있는 스킨 페이지 개발",
          desc: [
            "신체 부위 별 애니메이션 분리 이후, 앱 내 화폐로 스킨을 갈아끼울 수 있는 스킨샵 추가",
            "인앱 재화 구매(In-app Purchase) 후 착용 시 해당 파츠만 교체되며 나머지 스킨은 유지",
            "여러 연휴 및 명절을 기념하는 스킨 출시 이벤트를 진행할 수 있는 초석 마련.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "React Native 버전 업데이트",
      titleDesc: "RN 0.68에서 0.74로.",
      id: SECTION_RN_UPDATE,

      list: [
        {
          subtitle:
            "• RN 0.68 버전이 노후화로 인해 서드 파티 라이브러리들의 지원이 중단됨",
          desc: [
            "새로운 라이브러리들이 기존 RN 버전(0.68)을 지원하지 않아 버전을 낮춰서 설치해야되는 상황이 빈번하게 발생.",
            "React Native Upgrade Helper를 사용하여 0.68에서 0.74로 업그레이드하고 그에 맞게 네이티브 코드 수정 (Flipper 제거, Fabric 구성, iOS/Android config 파일 업데이트).",
            "새로운 RN 버전에 맞게 서드파티 라이브러리 구성도 업데이트 완료.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "딥링크 구현",
      titleDesc: "PlayStore Referral API 사용",
      id: SECTION_DEEPLINK_UPDATE,

      list: [
        {
          subtitle: "• 개발팀 규칙 설정",
          desc: [
            "사용자의 운영체제에 따라 적절한 스토어 링크로 리디렉션하는 딥링크 개발",
            "앱 설치 후 진입 시 추천인 링크 쿼리스트링을 자동으로 추출하여 추천인 코드 자동 입력 구현",
            "Firebase Dynamic Links의 지원 중단으로 인해 Google Play Store Referral API를 사용하여 추천인 코드와 함께 딥링크 통합 완료",
          ],
        },
      ],

      image: "",
    },
  ],
};
export const ANTTIME_SWAP_EN = {
  backToList: "Back to List",
  left: {
    badge: ["Play Store", "800K Downloads", "Web3 Point Mining App"],
    summary: {
      title: "Project Summary",
      period: {
        label: "Start Date",
        value: "24.04.15.",
      },
      position: {
        label: "Position",
        value: "Frontend (Cross-platform App Development)",
      },
      techStack: {
        label: "Tech Stack",
        value: [
          { label: "React", colorClass: "bg-blue-100" },
          { label: "Vite", colorClass: "bg-yellow-100" },
          { label: "Zustand", colorClass: "bg-rose-100" },
          { label: "Styled Components", colorClass: "bg-pink-100" },
          { label: "PWA", colorClass: "" },
          { label: "Firebase Cloud Message(FCM)", colorClass: "bg-red-50" },
          { label: "Github Action", colorClass: "bg-slate-100" },
          { label: "MSW", colorClass: "bg-neutral-100" },
        ],
      },
      team: {
        label: "Team",
        value: [
          { role: "Frontend", amount: 1 },
          { role: "Backend", amount: 1 },
          { role: "PM", amount: 1 },
          { role: "Design", amount: 1 },
        ],
      },
      relatedLink: {
        label: "Related Links",
        value: [
          {
            name: "Android",
            value:
              "https://play.google.com/store/apps/details?id=net.anttime.app",
          },
          {
            name: "iOS",
            value: "https://apps.apple.com/kr/app/anttime/id6449239746?l=en-GB",
          },
          { name: "Official", value: "https://anttime.net/" },
        ],
        testServiceAccount: {
          title: "Test Account",
          email: "Email",
          password: "Password",
        },
      },
    },
  },
  right: {
    title: "When ANTs Mine, TIME Shine.",
    desc: "ANTTIME is a blockchain-based T2E (Time-to-Earn) project that allows you to monetize time as an asset. In this TIME ecosystem, you can participate in various economic activities such as creating, owning, and generating revenue. You can also become a node validator and participate directly in the blockchain. Make your time more valuable with ANTTIME.",
    navigation: {
      title: "Responsibilities",
      value: [
        {
          title: "Separation of Production and Test Environments",
          desc: "Android Flavor and iOS Schema Separation",
          href: SECTION_ENV_INTERGRATION,
        },
        {
          title: "Complex Mining Animation",
          desc: "Coordinate animation implementation using react-native-reanimate",
          href: SECTION_ANIM_UPDATE,
        },
        {
          title: "Body Part-Specific Skin Updates",
          desc: "Holiday-themed skin addition events",
          href: SECTION_PUSH_SKIN_UPDATE,
        },
        {
          title: "React Native Version Update",
          desc: "From RN 0.68 to 0.74.",
          href: SECTION_RN_UPDATE,
        },
        {
          title: "Deep Link Implementation",
          desc: "Using PlayStore Referral API",
          href: SECTION_DEEPLINK_UPDATE,
        },
      ],
    },
  },
  details: [
    {
      title: "Separation of Production and Test Environments",
      titleDesc: "Android Flavor and iOS Schema Separation",
      id: SECTION_ENV_INTERGRATION,

      list: [
        {
          subtitle: "• Production and Development Environment Separation",
          desc: [
            "Configured Firestore settings for each development environment and corresponding environment variable files",
            "Used iOS Xcode build schemas and Android Flavors to configure environment-specific settings for react-native-firebase during native builds",
          ],
        },
      ],

      image: "",
    },
    {
      title: "Complex Mining Animation",
      titleDesc: "Coordinate-based Timeline Animation",
      id: SECTION_ANIM_UPDATE,

      list: [
        {
          subtitle:
            "• Separated existing Lottie animations so that character body part animations run independently",
          desc: [
            "Existing Lottie animations had limitations in expressing various skin combinations. To enable avatar replacement by body parts, each part needed to be animated separately.",
            "Set up animations for each part using react-native-reanimate. Used timeline functionality to precisely synchronize the execution timing of each animation.",
            "When the app goes to background state or leaves the animation page, cleanup functions remove timelines. Optimized character idle state transitions.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "Body Part-Specific Skin Updates",
      titleDesc: "Holiday-themed Skin Addition Events",
      id: SECTION_PUSH_SKIN_UPDATE,

      list: [
        {
          subtitle:
            "• Developed skin page where users can purchase using in-app currency",
          desc: [
            "After separating body part animations, added skin shop where users can change skins using in-app currency",
            "After in-app purchase, only the corresponding part is replaced when equipped while other skins are maintained",
            "Established foundation for conducting skin release events commemorating various holidays and festivals.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "React Native Version Update",
      titleDesc: "From RN 0.68 to 0.74.",
      id: SECTION_RN_UPDATE,

      list: [
        {
          subtitle:
            "• RN 0.68 version became obsolete, causing third-party library support to be discontinued",
          desc: [
            "New libraries frequently didn't support the existing RN version (0.68), requiring downgraded installations.",
            "Used React Native Upgrade Helper to upgrade from 0.68 to 0.74 and modified native code accordingly (removed Flipper, configured Fabric, updated iOS/Android config files).",
            "Completed updates to third-party library configurations to match the new RN version.",
          ],
        },
      ],

      image: "",
    },
    {
      title: "Deep Link Implementation",
      titleDesc: "Using PlayStore Referral API",
      id: SECTION_DEEPLINK_UPDATE,

      list: [
        {
          subtitle: "• Development Team Rule Setting",
          desc: [
            "Developed deep links that redirect to appropriate store links based on user's operating system",
            "Implemented automatic extraction of referral link query strings upon app entry after installation for automatic referral code input",
            "Due to Firebase Dynamic Links support discontinuation, integrated deep links with referral codes using Google Play Store Referral API",
          ],
        },
      ],

      image: "",
    },
  ],
};
