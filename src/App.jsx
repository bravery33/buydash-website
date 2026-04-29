import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  Headphones,
  Layers3,
  Menu,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const img = (name) => `/images/${name}`;
const CONTACT_EMAIL = "sales@buydash.co.kr";
const CANONICAL_DOMAIN = "https://www.buydash.co.kr";
const supportedLangs = ["en", "ko", "zh"];
const languageLabels = { en: "EN", ko: "KR", zh: "CN" };

const pageMeta = {
  en: {
    "/": {
      title: "BUYDASH | Semiconductor Test Interface Solutions",
      description: "BUYDASH supplies probe cards, burn-in sockets, HTOL/HAST boards and temperature control systems for semiconductor test and reliability applications.",
    },
    "/probe-cards": {
      title: "Probe Card Solutions | BUYDASH",
      description: "Custom probe card configurations for V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360, S100, D10, V50 and T5830 wafer test platforms.",
    },
    "/burn-in-sockets": {
      title: "Burn-in Socket Solutions | BUYDASH",
      description: "High-reliability burn-in sockets and probe pins for HTOL, HAST and high-temperature semiconductor reliability test environments.",
    },
    "/htol-hast-boards": {
      title: "HTOL / HAST Burn-in Boards | BUYDASH",
      description: "Custom HTOL and HAST burn-in boards, independent temperature-control HTOL boards and mother-daughter board configurations for reliability testing.",
    },
    "/temperature-controllers": {
      title: "6-Channel Temperature Controller | BUYDASH",
      description: "Independent PID temperature control system for burn-in boards, socket heating setups and semiconductor reliability test applications.",
    },
    "/contact": {
      title: "Contact BUYDASH | Request Semiconductor Test Interface Support",
      description: "Submit semiconductor test interface requirements to BUYDASH for probe cards, burn-in sockets, HTOL/HAST boards, temperature controllers and probe pins.",
    },
  },
  ko: {
    "/": {
      title: "BUYDASH | 반도체 테스트 인터페이스 솔루션",
      description: "BUYDASH는 반도체 테스트와 신뢰성 평가를 위한 프로브 카드, 번인 소켓, HTOL/HAST 보드, 온도 제어 시스템을 공급하는 테스트 인터페이스 솔루션 파트너입니다.",
    },
    "/probe-cards": {
      title: "프로브 카드 솔루션 | BUYDASH",
      description: "V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360, S100, D10, V50, T5830 플랫폼을 위한 맞춤형 프로브 카드 구성을 지원합니다.",
    },
    "/burn-in-sockets": {
      title: "번인 소켓 솔루션 | BUYDASH",
      description: "HTOL, HAST 및 고온 반도체 신뢰성 시험 환경을 위한 고신뢰성 번인 소켓과 프로브 핀을 지원합니다.",
    },
    "/htol-hast-boards": {
      title: "HTOL / HAST 번인 보드 | BUYDASH",
      description: "신뢰성 시험을 위한 HTOL 보드, 독립 온도 제어 HTOL 보드, HAST 보드 및 Mother-Daughter 보드 구성을 지원합니다.",
    },
    "/temperature-controllers": {
      title: "6채널 온도 컨트롤러 | BUYDASH",
      description: "번인 보드, 소켓 히팅 구성 및 반도체 신뢰성 시험을 위한 독립 PID 온도 제어 시스템입니다.",
    },
    "/contact": {
      title: "BUYDASH 문의 | 반도체 테스트 인터페이스 상담",
      description: "프로브 카드, 번인 소켓, HTOL/HAST 보드, 온도 컨트롤러, 프로브 핀 관련 기술 요구사항을 BUYDASH에 문의하세요.",
    },
  },
  zh: {
    "/": {
      title: "BUYDASH | 半导体测试接口解决方案",
      description: "BUYDASH 是半导体测试接口解决方案伙伴，供应探针卡、老化测试座、HTOL/HAST 板卡和温度控制系统。",
    },
    "/probe-cards": {
      title: "探针卡解决方案 | BUYDASH",
      description: "支持 V93000、Magnum2、Astar/S200、J750/J750HD、3380/3360、S100、D10、V50、T5830 等平台的定制探针卡配置。",
    },
    "/burn-in-sockets": {
      title: "老化测试座解决方案 | BUYDASH",
      description: "面向 HTOL、HAST 和高温半导体可靠性测试环境的高可靠性老化测试座和探针。",
    },
    "/htol-hast-boards": {
      title: "HTOL / HAST 老化板 | BUYDASH",
      description: "面向可靠性测试的 HTOL 板、独立温控 HTOL 板、HAST 板和母子板配置。",
    },
    "/temperature-controllers": {
      title: "6通道温度控制器 | BUYDASH",
      description: "适用于老化板、测试座加热配置和半导体可靠性测试的独立 PID 温度控制系统。",
    },
    "/contact": {
      title: "联系 BUYDASH | 半导体测试接口咨询",
      description: "提交探针卡、老化测试座、HTOL/HAST 板、温度控制器和探针相关技术需求。",
    },
  },
};

const copy = {
  en: {
    brandSubtitle: "Semiconductor Test Interfaces",
    nav: { home: "Home", probeCards: "Probe Cards", burnInSolutions: "Burn-in Solutions", applications: "Applications", about: "About", contact: "Contact" },
    navProducts: ["Burn-in Sockets", "HTOL / HAST Boards", "Temperature Controllers"],
    requestQuote: "Request a Quote",
    viewProducts: "View Products",
    viewMore: "View More",
    home: {
      eyebrow: "BUYDASH Semiconductor Test Interfaces",
      title: "Probe Card & Burn-in Test Interface Solutions",
      text: "BUYDASH supplies probe cards, burn-in sockets, HTOL/HAST boards and temperature control systems for semiconductor test and reliability applications.",
      metrics: [["Up to 2304", "Digital Channels"], ["-55°C to 150°C", "Temperature Range"], ["HTOL / HAST", "Reliability Solutions"]],
      productLabel: "Product Portfolio",
      productTitle: "Configurable test interface supply for wafer test and reliability programs",
      applicationsTitle: "Applications",
      applicationsText: "BUYDASH supports interface configurations for wafer probe, burn-in, reliability stress testing and validation workflows.",
      whyLabel: "Why Choose Buydash",
      whyTitle: "Technical sourcing support built around your test application",
      ctaTitle: "Need a custom probe card or burn-in solution?",
      ctaText: "Send us your test requirements and our team will help identify the right configuration for your application.",
    },
    portfolio: [
      ["Probe Cards", "Custom wafer test interface solutions."],
      ["Burn-in Sockets", "Reliable sockets for HTOL and HAST."],
      ["HTOL / HAST Boards", "Custom burn-in boards for reliability testing."],
      ["Temperature Controllers", "Independent multi-channel control."],
      ["Probe Pins", "Precision contact components for test interfaces."],
    ],
    applications: ["Wafer Probe Test", "HTOL Reliability Test", "HAST Stress Test", "Product Validation"],
    reasons: [
      ["Application-Focused Configuration", "We tailor test interface solutions to match your application and test goals."],
      ["Custom Test Interface Solutions", "Custom probe cards, sockets, boards and control systems built to your specifications."],
      ["Reliable Product Quality", "High-quality materials and strict quality control ensure consistent performance."],
      ["Engineering Coordination", "Our engineering team works closely with you from design to deployment."],
      ["Flexible Supply Support", "Global supply support with responsive communication and on-time delivery."],
    ],
    probe: {
      label: "Probe Cards",
      title: "Probe Card Solutions",
      text: "Custom probe card configurations for semiconductor wafer test platforms, supporting high-density digital channels, DPS/HV resources, custom dimensions and platform-specific interface requirements.",
      overviewLabel: "Overview",
      overviewTitle: "Platform-specific probe card configurations",
      overviewText: "BUYDASH supports probe card configurations for major wafer test platforms including V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360 series, S100-7D, D10-HDVI, V50 and T5830.",
      modelLabel: "Model Groups",
      modelTitle: "Probe cards grouped by platform",
      specLabel: "Specifications",
      specTitle: "Probe card specification matrix",
      applications: ["Wafer probe test", "High-density digital test", "Mixed-signal interface", "Platform conversion projects"],
      ctaTitle: "Need a probe card for a specific test platform?",
      ctaText: "Send your platform, channel count, DPS/HV requirements, window size and application details.",
    },
    sockets: {
      label: "Burn-in Sockets",
      title: "Burn-in Socket Solutions",
      text: "High-reliability burn-in sockets for HTOL, HAST and high-temperature semiconductor reliability test environments.",
      specLabel: "Mechanical & Electrical",
      specTitle: "Core socket characteristics",
      typeLabel: "Socket Types",
      typeTitle: "Configurable socket structures for reliability test",
      pinsLabel: "Contact Components",
      pinsTitle: "Probe Pins",
      pinsText: "Precision contact components used in burn-in socket and test interface applications, supporting stable electrical contact and long operating lifetime.",
      applications: ["HTOL socket programs", "HAST stress testing", "High-temperature validation", "Multi-site burn-in boards"],
      ctaTitle: "Need a burn-in socket configuration?",
      ctaText: "Send package size, pitch, temperature target, site count and reliability test conditions.",
    },
    boards: {
      label: "HTOL / HAST Boards",
      title: "HTOL / HAST Burn-in Boards",
      text: "Custom burn-in boards for high-temperature operating life tests and highly accelerated stress test environments.",
      familyLabel: "Board Families",
      familyTitle: "Reliability board configurations",
      familyText: "Custom board layout, socket arrangement and material stack-up can be configured by package and test condition.",
      imageLabel: "Product Images",
      imageTitle: "Board examples from reliability test applications",
      specLabel: "Specifications",
      specTitle: "HTOL and HAST board specification table",
      applications: ["High-temperature operating life", "Highly accelerated stress test", "Independent temperature control", "Mother-daughter board setups"],
      ctaTitle: "Need a custom HTOL or HAST board?",
      ctaText: "Send package, pitch, site count, board size limits, socket type and chamber or platform requirements.",
    },
    controller: {
      label: "Temperature Controllers",
      title: "6-Channel Temperature Controller",
      text: "Independent PID temperature control system for burn-in and semiconductor reliability test setups.",
      featureLabel: "Key Features",
      featureTitle: "Independent multi-channel control",
      features: ["6-channel independent control", "PID temperature adjustment", "PT100 or K-type thermocouple input", "RS485 / MODBUS RTU communication", "Monitoring software support", "Suitable for burn-in and reliability test setups"],
      specLabel: "Technical Specifications",
      specTitle: "Controller specification table",
      applications: ["Socket heating setups", "Independent HTOL boards", "Reliability lab fixtures", "Temperature validation workflows"],
      ctaTitle: "Need temperature control for a burn-in setup?",
      ctaText: "Send channel count, input sensor type, power requirements, temperature range and board configuration.",
    },
    contact: {
      label: "Contact",
      title: "Contact BUYDASH",
      text: "Submit your technical requirements through the form below. BUYDASH will review your application and help identify the right configuration.",
      formLabel: "Technical Request Form",
      formTitle: "Share your test requirements through the request form",
      formText: "Use the request form to submit package details, pitch, platform, channel count, DPS/HV needs, temperature range, site count and application goals. The BUYDASH team will review the information and follow up by email.",
      note: "For drawings or technical documents, please mention them in the message. Our team will follow up by email.",
      submit: "Submit Request",
      sending: "Sending...",
      success: "Thank you. Your request has been submitted successfully. BUYDASH will review your requirements and contact you shortly.",
      error: "Sorry, your request could not be sent. Please email sales@buydash.co.kr directly.",
      fields: {
        name: "Name", company: "Company", email: "Email", country: "Country", productType: "Product Type", targetApplication: "Target Application", testPlatform: "Test Platform", packageSize: "Package Size", pitch: "Pitch", channelCount: "Channel Count", dpsHvAnalogRequirements: "DPS / HV / Analog Requirements", temperatureRange: "Temperature Range", siteCount: "Site Count", expectedQuantity: "Expected Quantity", message: "Message",
      },
      validation: {
        name: "Name is required.", company: "Company is required.", email: "Email is required.", invalidEmail: "Please enter a valid email address.", productType: "Product Type is required.", message: "Message is required.",
      },
      productOptions: ["Probe Card", "Burn-in Socket", "HTOL / HAST Board", "Temperature Controller", "Probe Pins", "Custom Solution"],
      productPlaceholder: "Select product type",
      messagePlaceholder: "Share test conditions, package details, target schedule and any special requirements.",
    },
    footer: {
      products: "Products",
      contact: "Contact",
      businessInfo: "Business Information",
      email: "Email",
      website: "Website",
      location: "Location",
      companyName: "BUYDASH / 바이대시",
      business: "Business Registration No. 189-07-02993",
      mailOrder: "Mail-order Business Registration No. 2024-Gyeonggi Ansan-3370",
      address: "Ansan-si, Gyeonggi-do, Republic of Korea",
    },
  },
  ko: {
    brandSubtitle: "반도체 테스트 인터페이스",
    nav: { home: "홈", probeCards: "프로브 카드", burnInSolutions: "번인 솔루션", applications: "적용 분야", about: "소개", contact: "문의" },
    navProducts: ["번인 소켓", "HTOL / HAST 보드", "온도 컨트롤러"],
    requestQuote: "견적 문의",
    viewProducts: "제품 보기",
    viewMore: "자세히 보기",
    home: {
      eyebrow: "BUYDASH 반도체 테스트 인터페이스",
      title: "Probe Card & Burn-in Test Interface Solutions",
      text: "BUYDASH는 반도체 테스트와 신뢰성 평가를 위한 프로브 카드, 번인 소켓, HTOL/HAST 보드, 온도 제어 시스템을 공급합니다.",
      metrics: [["최대 2304", "Digital Channels"], ["-55°C to 150°C", "Temperature Range"], ["HTOL / HAST", "Reliability Solutions"]],
      productLabel: "제품 포트폴리오",
      productTitle: "웨이퍼 테스트와 신뢰성 평가를 위한 구성형 테스트 인터페이스 공급",
      applicationsTitle: "적용 분야",
      applicationsText: "BUYDASH는 웨이퍼 프로브, 번인, 신뢰성 스트레스 테스트, 제품 검증을 위한 인터페이스 구성을 지원합니다.",
      whyLabel: "BUYDASH를 선택하는 이유",
      whyTitle: "테스트 애플리케이션 중심의 기술 소싱 지원",
      ctaTitle: "맞춤형 프로브 카드 또는 번인 솔루션이 필요하신가요?",
      ctaText: "테스트 요구사항을 보내주시면 BUYDASH 팀이 애플리케이션에 맞는 구성을 검토해 드립니다.",
    },
    portfolio: [
      ["프로브 카드", "맞춤형 웨이퍼 테스트 인터페이스 솔루션."],
      ["번인 소켓", "HTOL 및 HAST를 위한 신뢰성 높은 소켓."],
      ["HTOL / HAST 보드", "신뢰성 시험을 위한 맞춤형 번인 보드."],
      ["온도 컨트롤러", "독립 다채널 제어."],
      ["프로브 핀", "테스트 인터페이스용 정밀 접촉 부품."],
    ],
    applications: ["Wafer Probe Test", "HTOL Reliability Test", "HAST Stress Test", "Product Validation"],
    reasons: [
      ["애플리케이션 중심 구성", "테스트 목표와 애플리케이션에 맞춰 테스트 인터페이스 솔루션을 조정합니다."],
      ["맞춤형 테스트 인터페이스 솔루션", "사양에 맞춘 프로브 카드, 소켓, 보드, 제어 시스템 구성을 지원합니다."],
      ["신뢰성 있는 제품 품질", "고품질 소재와 엄격한 품질 관리를 통해 일관된 성능을 지원합니다."],
      ["엔지니어링 코디네이션", "설계부터 적용까지 고객과 긴밀히 협업합니다."],
      ["유연한 공급 지원", "신속한 커뮤니케이션과 납기 중심의 글로벌 공급 지원을 제공합니다."],
    ],
    probe: {
      label: "프로브 카드",
      title: "프로브 카드 솔루션",
      text: "고밀도 Digital Channel, DPS/HV 리소스, 맞춤형 치수, 플랫폼별 인터페이스 요구사항을 지원하는 반도체 웨이퍼 테스트용 프로브 카드 구성입니다.",
      overviewLabel: "개요",
      overviewTitle: "플랫폼별 프로브 카드 구성",
      overviewText: "BUYDASH는 V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360 series, S100-7D, D10-HDVI, V50, T5830 등 주요 웨이퍼 테스트 플랫폼용 프로브 카드 구성을 지원합니다.",
      modelLabel: "모델 그룹",
      modelTitle: "플랫폼별 프로브 카드",
      specLabel: "사양",
      specTitle: "프로브 카드 사양 매트릭스",
      applications: ["Wafer probe test", "High-density digital test", "Mixed-signal interface", "Platform conversion projects"],
      ctaTitle: "특정 테스트 플랫폼용 프로브 카드가 필요하신가요?",
      ctaText: "플랫폼, 채널 수, DPS/HV 요구사항, 윈도우 사이즈, 애플리케이션 정보를 보내주세요.",
    },
    sockets: {
      label: "번인 소켓",
      title: "번인 소켓 솔루션",
      text: "HTOL, HAST 및 고온 반도체 신뢰성 시험 환경을 위한 고신뢰성 번인 소켓입니다.",
      specLabel: "기계적 / 전기적 특성",
      specTitle: "핵심 소켓 특성",
      typeLabel: "소켓 타입",
      typeTitle: "신뢰성 시험을 위한 구성형 소켓 구조",
      pinsLabel: "접촉 부품",
      pinsTitle: "프로브 핀",
      pinsText: "번인 소켓과 테스트 인터페이스 애플리케이션에 사용되는 정밀 접촉 부품으로 안정적인 전기 접촉과 긴 동작 수명을 지원합니다.",
      applications: ["HTOL socket programs", "HAST stress testing", "High-temperature validation", "Multi-site burn-in boards"],
      ctaTitle: "번인 소켓 구성이 필요하신가요?",
      ctaText: "패키지 크기, 피치, 목표 온도, 사이트 수, 신뢰성 시험 조건을 보내주세요.",
    },
    boards: {
      label: "HTOL / HAST 보드",
      title: "HTOL / HAST 번인 보드",
      text: "고온 동작 수명 시험과 고가속 스트레스 시험 환경을 위한 맞춤형 번인 보드입니다.",
      familyLabel: "보드 제품군",
      familyTitle: "신뢰성 보드 구성",
      familyText: "패키지와 시험 조건에 따라 보드 레이아웃, 소켓 배열, 소재 스택업을 구성할 수 있습니다.",
      imageLabel: "제품 이미지",
      imageTitle: "신뢰성 시험 애플리케이션 보드 예시",
      specLabel: "사양",
      specTitle: "HTOL 및 HAST 보드 사양표",
      applications: ["High-temperature operating life", "Highly accelerated stress test", "Independent temperature control", "Mother-daughter board setups"],
      ctaTitle: "맞춤형 HTOL 또는 HAST 보드가 필요하신가요?",
      ctaText: "패키지, 피치, 사이트 수, 보드 크기 제한, 소켓 타입, 챔버 또는 플랫폼 요구사항을 보내주세요.",
    },
    controller: {
      label: "온도 컨트롤러",
      title: "6채널 온도 컨트롤러",
      text: "번인 및 반도체 신뢰성 시험 구성을 위한 독립 PID 온도 제어 시스템입니다.",
      featureLabel: "주요 기능",
      featureTitle: "독립 다채널 제어",
      features: ["6-channel independent control", "PID temperature adjustment", "PT100 or K-type thermocouple input", "RS485 / MODBUS RTU communication", "Monitoring software support", "Suitable for burn-in and reliability test setups"],
      specLabel: "기술 사양",
      specTitle: "컨트롤러 사양표",
      applications: ["Socket heating setups", "Independent HTOL boards", "Reliability lab fixtures", "Temperature validation workflows"],
      ctaTitle: "번인 구성용 온도 제어가 필요하신가요?",
      ctaText: "채널 수, 입력 센서 타입, 전원 요구사항, 온도 범위, 보드 구성을 보내주세요.",
    },
    contact: {
      label: "문의",
      title: "BUYDASH 문의",
      text: "아래 양식으로 기술 요구사항을 보내주시면 BUYDASH가 적용 분야에 맞는 구성을 검토합니다.",
      formLabel: "기술 요청 양식",
      formTitle: "테스트 요구사항을 요청 양식으로 보내주세요",
      formText: "패키지, 피치, 플랫폼, 채널 수, DPS/HV 요구사항, 온도 범위, 사이트 수, 애플리케이션 목표를 입력해 주세요. BUYDASH 팀이 검토 후 이메일로 연락드립니다.",
      note: "도면 또는 기술 문서가 있는 경우 메시지에 언급해 주세요. 담당자가 이메일로 후속 안내를 드립니다.",
      submit: "문의 보내기",
      sending: "전송 중...",
      success: "감사합니다. 요청이 정상적으로 접수되었습니다. BUYDASH가 요구사항을 검토한 뒤 곧 연락드리겠습니다.",
      error: "죄송합니다. 요청을 전송할 수 없습니다. sales@buydash.co.kr로 직접 이메일을 보내주세요.",
      fields: {
        name: "이름", company: "회사명", email: "이메일", country: "국가", productType: "제품 유형", targetApplication: "대상 애플리케이션", testPlatform: "테스트 플랫폼", packageSize: "패키지 크기", pitch: "피치", channelCount: "채널 수", dpsHvAnalogRequirements: "DPS / HV / Analog 요구사항", temperatureRange: "온도 범위", siteCount: "사이트 수", expectedQuantity: "예상 수량", message: "메시지",
      },
      validation: {
        name: "이름을 입력해 주세요.", company: "회사명을 입력해 주세요.", email: "이메일을 입력해 주세요.", invalidEmail: "올바른 이메일 주소를 입력해 주세요.", productType: "제품 유형을 선택해 주세요.", message: "메시지를 입력해 주세요.",
      },
      productOptions: ["Probe Card", "Burn-in Socket", "HTOL / HAST Board", "Temperature Controller", "Probe Pins", "Custom Solution"],
      productPlaceholder: "제품 유형을 선택하세요",
      messagePlaceholder: "시험 조건, 패키지 정보, 목표 일정, 특수 요구사항을 입력해 주세요.",
    },
    footer: {
      products: "제품",
      contact: "문의",
      businessInfo: "사업자 정보",
      email: "이메일",
      website: "웹사이트",
      location: "소재지",
      companyName: "BUYDASH / 바이대시",
      business: "Business Registration No. 189-07-02993",
      mailOrder: "Mail-order Business Registration No. 2024-Gyeonggi Ansan-3370",
      address: "Ansan-si, Gyeonggi-do, Republic of Korea",
    },
  },
  zh: {
    brandSubtitle: "半导体测试接口",
    nav: { home: "首页", probeCards: "探针卡", burnInSolutions: "老化解决方案", applications: "应用", about: "关于", contact: "联系" },
    navProducts: ["老化测试座", "HTOL / HAST 板", "温度控制器"],
    requestQuote: "提交询价",
    viewProducts: "查看产品",
    viewMore: "了解更多",
    home: {
      eyebrow: "BUYDASH 半导体测试接口",
      title: "Probe Card & Burn-in Test Interface Solutions",
      text: "BUYDASH 供应用于半导体测试和可靠性应用的探针卡、老化测试座、HTOL/HAST 板和温度控制系统。",
      metrics: [["最高 2304", "Digital Channels"], ["-55°C to 150°C", "Temperature Range"], ["HTOL / HAST", "Reliability Solutions"]],
      productLabel: "产品组合",
      productTitle: "面向晶圆测试和可靠性项目的可配置测试接口供应",
      applicationsTitle: "应用",
      applicationsText: "BUYDASH 支持晶圆探针测试、老化测试、可靠性应力测试和产品验证流程的接口配置。",
      whyLabel: "为什么选择 BUYDASH",
      whyTitle: "围绕测试应用的技术选型支持",
      ctaTitle: "需要定制探针卡或老化解决方案？",
      ctaText: "请发送测试需求，BUYDASH 团队将协助确认适合应用的配置。",
    },
    portfolio: [
      ["探针卡", "定制晶圆测试接口解决方案。"],
      ["老化测试座", "适用于 HTOL 和 HAST 的可靠测试座。"],
      ["HTOL / HAST 板", "用于可靠性测试的定制老化板。"],
      ["温度控制器", "独立多通道控制。"],
      ["探针", "用于测试接口的精密接触部件。"],
    ],
    applications: ["Wafer Probe Test", "HTOL Reliability Test", "HAST Stress Test", "Product Validation"],
    reasons: [
      ["面向应用的配置", "根据您的应用和测试目标匹配测试接口解决方案。"],
      ["定制测试接口解决方案", "按规格支持探针卡、测试座、板卡和控制系统配置。"],
      ["可靠的产品质量", "高质量材料和严格质量控制支持稳定性能。"],
      ["工程协同", "工程团队从设计到导入与您紧密配合。"],
      ["灵活供应支持", "提供响应及时、重视交期的全球供应支持。"],
    ],
    probe: {
      label: "探针卡",
      title: "探针卡解决方案",
      text: "面向半导体晶圆测试平台的定制探针卡配置，支持高密度 Digital Channel、DPS/HV 资源、定制尺寸和平台接口要求。",
      overviewLabel: "概述",
      overviewTitle: "按平台配置的探针卡",
      overviewText: "BUYDASH 支持 V93000、Magnum2、Astar/S200、J750/J750HD、3380/3360 series、S100-7D、D10-HDVI、V50 和 T5830 等主要晶圆测试平台的探针卡配置。",
      modelLabel: "型号分组",
      modelTitle: "按平台分类的探针卡",
      specLabel: "规格",
      specTitle: "探针卡规格矩阵",
      applications: ["Wafer probe test", "High-density digital test", "Mixed-signal interface", "Platform conversion projects"],
      ctaTitle: "需要特定测试平台的探针卡？",
      ctaText: "请发送平台、通道数、DPS/HV 要求、窗口尺寸和应用信息。",
    },
    sockets: {
      label: "老化测试座",
      title: "老化测试座解决方案",
      text: "面向 HTOL、HAST 和高温半导体可靠性测试环境的高可靠性老化测试座。",
      specLabel: "机械与电气特性",
      specTitle: "核心测试座特性",
      typeLabel: "测试座类型",
      typeTitle: "用于可靠性测试的可配置测试座结构",
      pinsLabel: "接触部件",
      pinsTitle: "探针",
      pinsText: "用于老化测试座和测试接口应用的精密接触部件，支持稳定电接触和长使用寿命。",
      applications: ["HTOL socket programs", "HAST stress testing", "High-temperature validation", "Multi-site burn-in boards"],
      ctaTitle: "需要老化测试座配置？",
      ctaText: "请发送封装尺寸、Pitch、目标温度、Site 数量和可靠性测试条件。",
    },
    boards: {
      label: "HTOL / HAST 板",
      title: "HTOL / HAST 老化板",
      text: "面向高温工作寿命测试和高加速应力测试环境的定制老化板。",
      familyLabel: "板卡系列",
      familyTitle: "可靠性板卡配置",
      familyText: "可根据封装和测试条件配置板卡 layout、测试座排列和材料 stack-up。",
      imageLabel: "产品图片",
      imageTitle: "可靠性测试应用板卡示例",
      specLabel: "规格",
      specTitle: "HTOL 和 HAST 板规格表",
      applications: ["High-temperature operating life", "Highly accelerated stress test", "Independent temperature control", "Mother-daughter board setups"],
      ctaTitle: "需要定制 HTOL 或 HAST 板？",
      ctaText: "请发送封装、Pitch、Site 数量、板卡尺寸限制、测试座类型以及 chamber 或平台要求。",
    },
    controller: {
      label: "温度控制器",
      title: "6通道温度控制器",
      text: "适用于老化和半导体可靠性测试配置的独立 PID 温度控制系统。",
      featureLabel: "主要功能",
      featureTitle: "独立多通道控制",
      features: ["6-channel independent control", "PID temperature adjustment", "PT100 or K-type thermocouple input", "RS485 / MODBUS RTU communication", "Monitoring software support", "Suitable for burn-in and reliability test setups"],
      specLabel: "技术规格",
      specTitle: "控制器规格表",
      applications: ["Socket heating setups", "Independent HTOL boards", "Reliability lab fixtures", "Temperature validation workflows"],
      ctaTitle: "需要老化测试温度控制？",
      ctaText: "请发送通道数、输入传感器类型、电源要求、温度范围和板卡配置。",
    },
    contact: {
      label: "联系",
      title: "联系 BUYDASH",
      text: "请通过下方表单提交您的技术需求。BUYDASH 将根据您的应用需求协助确认合适的配置。",
      formLabel: "技术需求表",
      formTitle: "通过请求表提交您的测试需求",
      formText: "请提交封装、Pitch、平台、通道数、DPS/HV 需求、温度范围、Site 数量和应用目标。BUYDASH 团队将审核并通过邮件跟进。",
      note: "如有图纸或技术文件，请在消息中说明。我们的团队将通过邮件跟进。",
      submit: "提交请求",
      sending: "发送中...",
      success: "谢谢。您的请求已成功提交。BUYDASH 将审核您的需求并尽快联系您。",
      error: "抱歉，您的请求无法发送。请直接发送邮件至 sales@buydash.co.kr。",
      fields: {
        name: "姓名", company: "公司", email: "邮箱", country: "国家", productType: "产品类型", targetApplication: "目标应用", testPlatform: "测试平台", packageSize: "封装尺寸", pitch: "Pitch", channelCount: "通道数", dpsHvAnalogRequirements: "DPS / HV / Analog 要求", temperatureRange: "温度范围", siteCount: "Site 数量", expectedQuantity: "预计数量", message: "消息",
      },
      validation: {
        name: "请输入姓名。", company: "请输入公司名称。", email: "请输入邮箱。", invalidEmail: "请输入有效的邮箱地址。", productType: "请选择产品类型。", message: "请输入消息。",
      },
      productOptions: ["Probe Card", "Burn-in Socket", "HTOL / HAST Board", "Temperature Controller", "Probe Pins", "Custom Solution"],
      productPlaceholder: "请选择产品类型",
      messagePlaceholder: "请填写测试条件、封装信息、目标日程和特殊要求。",
    },
    footer: {
      products: "产品",
      contact: "联系",
      businessInfo: "企业信息",
      email: "邮箱",
      website: "网站",
      location: "所在地",
      companyName: "BUYDASH / 바이대시",
      business: "Business Registration No. 189-07-02993",
      mailOrder: "Mail-order Business Registration No. 2024-Gyeonggi Ansan-3370",
      address: "Ansan-si, Gyeonggi-do, Republic of Korea",
    },
  },
};

const initialContactForm = {
  name: "",
  company: "",
  email: "",
  country: "",
  productType: "",
  testPlatform: "",
  packageSize: "",
  pitch: "",
  channelCount: "",
  dpsHvAnalogRequirements: "",
  temperatureRange: "",
  siteCount: "",
  expectedQuantity: "",
  targetApplication: "",
  message: "",
  website: "",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactForm(values, messages) {
  const errors = {};

  Object.entries({
    name: messages.name,
    company: messages.company,
    email: messages.email,
    productType: messages.productType,
    message: messages.message,
  }).forEach(([field, message]) => {
    if (!values[field].trim()) {
      errors[field] = message;
    }
  });

  if (values.email.trim() && !isValidEmail(values.email.trim())) {
    errors.email = messages.invalidEmail;
  }

  return errors;
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setCanonicalUrl(url) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

function parseLocalizedPath(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first === "ko" || first === "zh") {
    return {
      lang: first,
      route: segments.length === 1 ? "/" : `/${segments.slice(1).join("/")}`,
    };
  }

  return { lang: "en", route: pathname === "" ? "/" : pathname };
}

function localizePath(lang, route = "/") {
  const cleanRoute = route === "" ? "/" : route;
  if (lang === "en") {
    return cleanRoute;
  }
  return cleanRoute === "/" ? `/${lang}` : `/${lang}${cleanRoute}`;
}

function setHrefLangLinks(route) {
  document.querySelectorAll("link[data-managed-hreflang]").forEach((node) => node.remove());

  const links = [
    ["en", `${CANONICAL_DOMAIN}${localizePath("en", route)}`],
    ["ko", `${CANONICAL_DOMAIN}${localizePath("ko", route)}`],
    ["zh", `${CANONICAL_DOMAIN}${localizePath("zh", route)}`],
    ["x-default", `${CANONICAL_DOMAIN}${localizePath("en", route)}`],
  ];

  links.forEach(([hreflang, href]) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", href);
    link.setAttribute("data-managed-hreflang", "true");
    document.head.appendChild(link);
  });
}

const navProducts = [
  { label: "Burn-in Sockets", href: "/burn-in-sockets" },
  { label: "HTOL / HAST Boards", href: "/htol-hast-boards" },
  { label: "Temperature Controllers", href: "/temperature-controllers" },
];

const portfolio = [
  {
    title: "Probe Cards",
    text: "Custom wafer test interface solutions.",
    href: "/probe-cards",
    image: "probe-card.png",
  },
  {
    title: "Burn-in Sockets",
    text: "Reliable sockets for HTOL and HAST.",
    href: "/burn-in-sockets",
    image: "burn-in-socket.png",
  },
  {
    title: "HTOL / HAST Boards",
    text: "Custom burn-in boards for reliability testing.",
    href: "/htol-hast-boards",
    image: "htol-hast-board.png",
  },
  {
    title: "Temperature Controllers",
    text: "Independent multi-channel control.",
    href: "/temperature-controllers",
    image: "temperature-controller.png",
  },
  {
    title: "Probe Pins",
    text: "Precision contact components for test interfaces.",
    href: "/burn-in-sockets#probe-pins",
    image: "probe-pins.png",
  },
];

const reasons = [
  {
    title: "Application-Focused Configuration",
    text: "We tailor test interface solutions to match your application and test goals.",
    icon: Target,
  },
  {
    title: "Custom Test Interface Solutions",
    text: "Custom probe cards, sockets, boards and control systems built to your specifications.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reliable Product Quality",
    text: "High-quality materials and strict quality control ensure consistent performance.",
    icon: ShieldCheck,
  },
  {
    title: "Engineering Coordination",
    text: "Our engineering team works closely with you from design to deployment.",
    icon: CircuitBoard,
  },
  {
    title: "Flexible Supply Support",
    text: "Global supply support with responsive communication and on-time delivery.",
    icon: Headphones,
  },
];

const probeGroups = [
  {
    title: "V93000 Probe Cards",
    image: "probe-v93000.png",
    models: ["V93000_PS1600_DPS128_PB_V1", "V93K 12 Inch Generic PCB For WPI"],
  },
  {
    title: "Magnum2 Probe Cards",
    image: "probe-magnum2.png",
    models: ["M2_1280CH_640DPS_PB_V1", "M2_1024CH_512DPS_PB_V1"],
  },
  {
    title: "Astar / S200 Probe Cards",
    image: "probe-card.png",
    models: ["ASTAR_1024CH_64DPS_PB_V1"],
  },
  {
    title: "J750 / J750HD Probe Cards",
    image: "probe-j750hd.png",
    models: [
      "J750HD_1024CH_96DPS_CP_V2",
      "J750HD_300MM_1024CH_96HDDPS_32HDCTO_PC",
      "J750HD-512-W70",
      "J750_512CH_32DPS Rev A",
    ],
  },
  {
    title: "3380 / 3360 Series Probe Cards",
    image: "probe-3380.png",
    models: [
      "C3380P-512 Universal J-Type",
      "C3380P-512-64DPS J-Type",
      "C3380P-512 32x4",
      "C3380-1152 128DPS C-Type",
      "3380P-Q-TYPE-512CH",
      "C3380D-256-CM",
      "C3360-512",
    ],
  },
  {
    title: "S100 / D10 / V50 / T5830",
    image: "hero-probe-card.png",
    models: [
      "YT5100-7D Universal S100-7D",
      "D10_576CH-HDVI_CP",
      "V50-256CH",
      "440MM Universal Probe Card",
    ],
  },
];

const probeSpecs = [
  ["V93000_PS1600_DPS128_PB_V1", "V93000", "1024", "DPS: 128; UR: 64; Analog: 231/431, 232/432", "Ø279.4 mm", "6.35 mm", "Ø70 mm"],
  ["V93K 12 Inch Generic PCB For WPI", "V93000", "1024", "DPS: 225/425, 229/429, MSDPS1, MSDPS2; UR: 48; Analog: 231/431, 232/432", "Ø279.4 mm", "6.35 mm", "Ø60 mm"],
  ["M2_1280CH_640DPS_PB_V1", "Magnum2", "1280", "DPS: 160, 4-way DPS split; HV: N/A", "Ø279.4 mm", "6.35 mm", "140 x 50 mm"],
  ["M2_1024CH_512DPS_PB_V1", "Magnum2", "1024", "DPS: 128, 4-way DPS split; HV: 128, 4-way DPS split", "Ø279.4 mm", "6.35 mm", "140 x 50 mm"],
  ["ASTAR_1024CH_64DPS_PB_V1", "Astar/S200", "1024", "DPS: 64; GPMU: 64; HV: 64; UR: 66", "Ø330 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD_1024CH_96DPS_CP_V2", "J750HD", "1024", "DPS: 96; CTO: 16; BPMU: 16; UR: 40", "Ø304.8 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD_300MM_1024CH_96HDDPS_32HDCTO_PC", "J750HD", "1024", "DPS: 96; CTO: 32; BPMU: 16; UR: 40", "Ø304.8 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD-512-W70", "J750HD", "512", "DPS: 48; CTO: 16; BPMU: 8; UR: 64", "Ø304.8 mm", "6.35 mm", "Ø70 mm"],
  ["J750_512CH_32DPS Rev A", "J750", "512", "DPS: 32; CTO: 8; BPMU: 4; UR: 16", "Ø304.8 mm", "6.35 mm", "Ø50.8 mm"],
  ["C3380P-512 Universal J-Type", "3380P J-Type", "512", "DPS: 64 MLDPS max; UR: 128", "Ø304.8 mm", "6.35 mm", "Ø65 mm"],
  ["C3380P-512-64DPS J-Type", "3380P J-Type", "512", "DPS: 64 MLDPS max; UR: 128", "Ø304.8 mm", "6.35 mm", "112 x 52 mm"],
  ["C3380P-512 32x4", "3380P", "512", "DPS: 128; UR: 128", "Ø304.8 mm", "6.35 mm", "112 x 52 mm"],
  ["C3380-1152 128DPS C-Type", "3380 C-Type", "1152", "DPS: 128 MLDPS max; UR: 128", "Ø337 mm", "6.35 mm", "120 x 60 mm"],
  ["3380P-Q-TYPE-512CH", "3380P Q-Type", "512", "DPS: 64 MLDPS max; UR: 32 + 16", "Ø214 mm", "4.75 mm", "Ø50 mm"],
  ["C3380D-256-CM", "3380D / 3360P2", "256", "DPS: 8 + 16 + 8 DPS for 3380D, 8 DPS for 3360P2; UR: 64 for 3380D, 32 for 3360P2", "313 x 114 mm", "3 mm", "Ø66 mm"],
  ["C3360-512", "3360 G-Type", "512", "DPS: 64 MLDPS max; UR: 32 + 16", "Ø214 mm", "4.75 mm", "Ø50 mm"],
  ["YT5100-7D Universal S100-7D", "S100-7D", "768", "DPS: 48; GPMU: 24; UR: 96", "308 x 238 mm", "5.0 mm", "Ø70 mm"],
  ["D10_576CH-HDVI_CP", "D10-HDVI", "576", "HDVI: 72 Force; MULTIWAVE: 4 Source & 4 Capture; UR: 27", "Ø279.4 mm", "6.35 mm", "Ø72 mm"],
  ["V50-256CH", "V50", "256", "DPS: 8 max; UR: 116", "310 x 114 mm", "3 mm", "Ø41 mm"],
  ["440MM Universal Probe Card", "T5830", "2304", "PPS/DPS: 576; HV: 576 CH", "Ø440 mm", "6.8 mm", "180 x 70 mm"],
];

const socketTypes = [
  {
    title: "Die-cast flip-top rotary shaft type 23 x 30",
    image: "socket-23x30.png",
    specs: ["Chip size: <15 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Metal cover for thermal performance", "Rotary shaft structure reduces lateral chip stress", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C"],
  },
  {
    title: "Injection-molded flip-top knob type 38.5 x 38.5",
    image: "socket-385x385.png",
    specs: ["Chip size: <20 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Adjustable stroke by chip thickness", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C"],
  },
  {
    title: "Injection-molded flip-top knob type 40 x 50",
    image: "socket-40x50.png",
    specs: ["Chip size: <25 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Adjustable stroke by chip thickness", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor", "Suitable for independent temperature control projects", "Suitable for MCC furnace"],
  },
  {
    title: "Injection-molded flip-top knob type 55 x 65",
    image: "socket-55x65.png",
    specs: ["Chip size: <30 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Knob-axis structure helps prevent chip damage when closing cover", "Suitable for small-size chip multi-site structures", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor", "Suitable for MCC furnace"],
  },
  {
    title: "High pin count folding type",
    image: "socket-high-pin-count.png",
    specs: ["Chip size: <50 mm", "Pitch: >0.8 mm", "Suitable for signal transmission below 6G", "Metal cover with heat sink for thermal performance", "Rotary shaft pressure structure reduces lateral chip stress", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor"],
  },
];

const boardSpecs = [
  ["DL600 Platform HTOL Board", "HTOL Burn-in Boards", "450 mm x 570 mm", "10", "HI-TG FR4", "15 x 15 mm", "0.65 mm", "4 Row x 4 Col = 16 positions", "htol-dl600.png"],
  ["DL601H Platform HTOL Board", "HTOL Burn-in Boards", "450 mm x 570 mm", "12", "HI-TG FR4", "19 x 19 mm", "0.65 mm", "3 Row x 4 Col = 12 positions", "htol-dl601h.png"],
  ["HTOL Board", "HTOL Burn-in Boards", "450 mm x 500 mm", "8", "HI-TG FR4", "35 x 35 mm", "1.00 mm", "2 Row x 4 Col = 8 positions", "htol-hast-board.png"],
  ["Independent Temperature-Control HTOL Board", "Independent Temperature-Control HTOL Boards", "610 mm x 540 mm", "14", "HI-TG FR4", "25 x 25 mm", "0.65 mm", "2 Row x 3 Col = 6 positions", "hero-htol-board.png"],
  ["HAST Burn-in Board", "HAST Burn-in Boards", "300 mm x 450 mm", "4", "Polyimide", "20 x 20 mm", "0.40 mm", "4 Row x 5 Col = 20 positions", "hast-board.png"],
  ["HAST Mother-Daughter Board", "HAST Mother-Daughter Boards", "270 mm x 348 mm + 62 mm x 72 mm", "6 + 6", "Polyimide", "14 x 14 mm", "0.55 mm", "6 Row x 4 Col = 24 positions", "hast-mother-daughter.png"],
];

const controllerSpecs = [
  ["Temperature Range", "25°C to 200°C heating mode"],
  ["Temperature Control Accuracy", "±0.2°C"],
  ["Total Power Input", "DC 24V / 15A"],
  ["Single Channel Current Limit", "2.5A"],
  ["Input Signal", "PT100 or K-type thermocouple"],
  ["Control Output", "6-channel PID adjustment, 6-channel control output"],
  ["Max Output Per Channel", "DC 24V / 2.5A"],
  ["Sampling Speed", "1 second for all channels, maximum 6 channels"],
  ["Communication", "RS485, standard MODBUS RTU protocol"],
  ["Size", "180 x 140 x 150 mm"],
  ["Monitoring Software", "Supported"],
];

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const { lang, route } = parseLocalizedPath(path);
  const t = copy[lang] || copy.en;

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [path]);

  useEffect(() => {
    const meta = pageMeta[lang]?.[route] || pageMeta.en["/"];
    const canonicalUrl = `${CANONICAL_DOMAIN}${localizePath(lang, route)}`;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);
    setCanonicalUrl(canonicalUrl);
    setHrefLangLinks(route);
    document.documentElement.lang = lang === "ko" ? "ko" : lang === "zh" ? "zh-Hans" : "en";
  }, [lang, route]);

  const page = useMemo(() => {
    switch (route) {
      case "/probe-cards":
        return <ProbeCardsPage lang={lang} t={t} />;
      case "/burn-in-sockets":
        return <BurnInSocketsPage lang={lang} t={t} />;
      case "/htol-hast-boards":
        return <BoardsPage lang={lang} t={t} />;
      case "/temperature-controllers":
        return <TemperatureControllersPage lang={lang} t={t} />;
      case "/contact":
        return <ContactPage lang={lang} t={t} />;
      default:
        return <HomePage lang={lang} t={t} />;
    }
  }, [route, lang, t]);

  return (
    <>
      <Header lang={lang} route={route} t={t} />
      <main>{page}</main>
      <Footer lang={lang} t={t} />
    </>
  );
}

function Header({ lang, route, t }) {
  const [open, setOpen] = useState(false);
  const go = (event, href) => {
    if (href.startsWith("/")) {
      event.preventDefault();
      history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
      if (href.includes("#")) {
        const [, hash] = href.split("#");
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
      } else if (href === "/" || href === "/ko" || href === "/zh") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <header className="site-header">
      <a className="brand" href={localizePath(lang, "/")} onClick={(e) => go(e, localizePath(lang, "/"))}>
        <span className="brand-mark">B</span>
        <span>
          <strong>BUYDASH</strong>
          <small>{t.brandSubtitle}</small>
        </span>
      </a>
      <button className="nav-toggle" type="button" aria-label="Open navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? "nav open" : "nav"}>
        <a href={localizePath(lang, "/")} onClick={(e) => go(e, localizePath(lang, "/"))}>{t.nav.home}</a>
        <a href={localizePath(lang, "/probe-cards")} onClick={(e) => go(e, localizePath(lang, "/probe-cards"))}>{t.nav.probeCards}</a>
        <div className="nav-dropdown">
          <button type="button">{t.nav.burnInSolutions} <ChevronDown size={15} /></button>
          <div className="dropdown-menu">
            {navProducts.map((item, index) => (
              <a key={item.href} href={localizePath(lang, item.href)} onClick={(e) => go(e, localizePath(lang, item.href))}>{t.navProducts[index]}</a>
            ))}
          </div>
        </div>
        <a href={`${localizePath(lang, "/")}#about`} onClick={(e) => go(e, `${localizePath(lang, "/")}#about`)}>{t.nav.about}</a>
        <a href={localizePath(lang, "/contact")} onClick={(e) => go(e, localizePath(lang, "/contact"))}>{t.nav.contact}</a>
        <div className="language-switcher" aria-label="Language selector">
          {supportedLangs.map((code) => (
            <a
              key={code}
              className={code === lang ? "active" : ""}
              href={localizePath(code, route)}
              onClick={(e) => go(e, localizePath(code, route))}
            >
              {languageLabels[code]}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function HomePage({ lang, t }) {
  const homeDesignCopy = {
    en: {
      heroLabel: "Semiconductor test interface solutions partner",
      workflowTitle: "From test requirement to configured interface",
      workflowText: "Package, pitch, platform, channel count, DPS/HV resources, temperature range and site count are reviewed together to identify the right configuration.",
      workflowSteps: ["Requirement review", "Configuration match", "Supply coordination"],
      whyTitle: "Technical sourcing support, not a generic catalogue",
    },
    ko: {
      heroLabel: "반도체 테스트 인터페이스 솔루션 파트너",
      workflowTitle: "테스트 요구사항에서 맞춤 구성까지",
      workflowText: "패키지, 피치, 플랫폼, 채널 수, DPS/HV 리소스, 온도 범위, 사이트 수를 함께 검토해 적합한 구성을 확인합니다.",
      workflowSteps: ["요구사항 검토", "구성 매칭", "공급 조율"],
      whyTitle: "일반 카탈로그가 아닌 테스트 애플리케이션 중심의 기술 소싱",
    },
    zh: {
      heroLabel: "半导体测试接口解决方案伙伴",
      workflowTitle: "从测试需求到接口配置",
      workflowText: "封装、Pitch、平台、通道数、DPS/HV 资源、温度范围和 Site 数量将一起评估，以确认合适配置。",
      workflowSteps: ["需求评估", "配置匹配", "供应协调"],
      whyTitle: "不是通用目录，而是围绕测试应用的技术选型支持",
    },
  }[lang] || {};

  return (
    <>
      <section className="home-hero-redesign">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">{homeDesignCopy.heroLabel}</p>
            <h1>{t.home.title}</h1>
            <p className="hero-text">{t.home.text}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#products">{t.viewProducts} <ArrowRight size={17} /></a>
              <a className="secondary-btn" href={localizePath(lang, "/contact")}>{t.requestQuote}</a>
            </div>
            <div className="home-metrics">
              {t.home.metrics.map(([value, label]) => (
                <div className="home-metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="interface-stage" aria-label="BUYDASH test interface system visual">
            <div className="stage-label">Interface system stack</div>
            <img
              className="generated-interface-visual"
              src={img("hero-interface-system.png")}
              alt="Semiconductor test interface product visual"
            />
          </div>
        </div>
      </section>

      <section id="products" className="section home-product-system">
        <div className="home-section-heading">
          <p className="eyebrow">{t.home.productLabel}</p>
          <h2>{t.home.productTitle}</h2>
        </div>
        <div className="system-grid">
          {portfolio.map((item, index) => (
            <a className={index === 0 ? "system-card featured" : "system-card"} key={item.href} href={localizePath(lang, item.href)}>
              <div className="system-visual">
                <img src={img(item.image)} alt={item.title} />
              </div>
              <h3>{t.portfolio[index][0]}</h3>
              <p>{t.portfolio[index][1]}</p>
              <span>{t.viewMore} <ArrowRight size={16} /></span>
            </a>
          ))}
          <article className="workflow-panel">
            <p className="eyebrow">{homeDesignCopy.workflowSteps[0]}</p>
            <h3>{homeDesignCopy.workflowTitle}</h3>
            <p>{homeDesignCopy.workflowText}</p>
            <div className="workflow-steps">
              {homeDesignCopy.workflowSteps.map((step) => <span key={step}>{step}</span>)}
            </div>
          </article>
        </div>
      </section>

      <section id="about" className="section home-why">
        <div className="home-section-heading">
          <p className="eyebrow">{t.home.whyLabel}</p>
          <h2>{homeDesignCopy.whyTitle}</h2>
        </div>
        <div className="home-reason-grid">
          {reasons.map(({ title, icon: Icon }, index) => (
            <article className="home-reason-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={26} />
              <div>
                <h3>{t.reasons[index][0]}</h3>
                <p>{t.reasons[index][1]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Cta lang={lang} t={t} title={t.home.ctaTitle} text={t.home.ctaText} />
    </>
  );
}

function ProbeCardsPage({ lang, t }) {
  return (
    <>
      <PageHero
        lang={lang}
        t={t}
        label={t.probe.label}
        title={t.probe.title}
        text={t.probe.text}
        image="hero-probe-card.png"
      />
      <section className="section split-section">
        <div>
          <p className="eyebrow">{t.probe.overviewLabel}</p>
          <h2>{t.probe.overviewTitle}</h2>
          <p>{t.probe.overviewText}</p>
        </div>
        <img className="feature-image" src={img("probe-card.png")} alt="Probe card detail" />
      </section>
      <section className="section">
        <SectionHeading label={t.probe.modelLabel} title={t.probe.modelTitle} />
        <div className="model-grid">
          {probeGroups.map((group) => <ModelCard key={group.title} {...group} />)}
        </div>
      </section>
      <section className="section table-section">
        <SectionHeading label={t.probe.specLabel} title={t.probe.specTitle} />
        <ResponsiveTable
          headers={["Model", "Platform", "Digital Channels", "DPS / HV / Analog", "Size", "Thickness", "Window Size"]}
          rows={probeSpecs}
        />
      </section>
      <ApplicationStrip items={t.probe.applications} />
      <Cta lang={lang} t={t} title={t.probe.ctaTitle} text={t.probe.ctaText} />
    </>
  );
}

function BurnInSocketsPage({ lang, t }) {
  return (
    <>
      <PageHero
        lang={lang}
        t={t}
        label={t.sockets.label}
        title={t.sockets.title}
        text={t.sockets.text}
        image="hero-burnin-socket.png"
      />
      <section className="section table-section">
        <SectionHeading label={t.sockets.specLabel} title={t.sockets.specTitle} />
        <ResponsiveTable
          headers={["Parameter", "Value"]}
          rows={[
            ["Bandwidth @ -1dB", ">2.5GHz"],
            ["Current", ">2A"],
            ["Inductance", "1.27nH"],
            ["Capacitance", "0.27pF"],
            ["Resistance", "<200mΩ AVG"],
            ["Temperature Range", "-55°C to 150°C"],
            ["Lifetime", ">3000 hours"],
          ]}
        />
      </section>
      <section className="section">
        <SectionHeading label={t.sockets.typeLabel} title={t.sockets.typeTitle} />
        <div className="type-grid">
          {socketTypes.map((type) => (
            <article className="type-card" key={type.title}>
              <img src={img(type.image)} alt={type.title} />
              <div>
                <h3>{type.title}</h3>
                <ul>{type.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="probe-pins" className="section split-section">
        <div>
          <p className="eyebrow">{t.sockets.pinsLabel}</p>
          <h2>{t.sockets.pinsTitle}</h2>
          <p>{t.sockets.pinsText}</p>
          <div className="pill-row">
            <span>0.35 pitch</span>
            <span>0.4 pitch</span>
            <span>0.8 pitch</span>
          </div>
        </div>
        <img className="feature-image contain" src={img("probe-pins.png")} alt="Probe pins" />
      </section>
      <ApplicationStrip items={t.sockets.applications} />
      <Cta lang={lang} t={t} title={t.sockets.ctaTitle} text={t.sockets.ctaText} />
    </>
  );
}

function BoardsPage({ lang, t }) {
  const groups = ["HTOL Burn-in Boards", "Independent Temperature-Control HTOL Boards", "HAST Burn-in Boards", "HAST Mother-Daughter Boards"];
  return (
    <>
      <PageHero
        lang={lang}
        t={t}
        label={t.boards.label}
        title={t.boards.title}
        text={t.boards.text}
        image="hero-htol-board.png"
      />
      <section className="section">
        <SectionHeading label={t.boards.familyLabel} title={t.boards.familyTitle} />
        <div className="board-family-grid">
          {groups.map((group) => (
            <article className="family-card" key={group}>
              <Layers3 size={32} />
              <h3>{group}</h3>
              <p>{t.boards.familyText}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading label={t.boards.imageLabel} title={t.boards.imageTitle} />
        <div className="image-card-grid">
          {boardSpecs.map((row) => (
            <article className="image-card" key={row[0]}>
              <img src={img(row[8])} alt={row[0]} />
              <h3>{row[0]}</h3>
              <p>{row[1]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section table-section">
        <SectionHeading label={t.boards.specLabel} title={t.boards.specTitle} />
        <ResponsiveTable
          headers={["Product", "Category", "Size", "Layers", "Material", "Package", "Pitch", "Site"]}
          rows={boardSpecs.map((row) => row.slice(0, 8))}
        />
      </section>
      <ApplicationStrip items={t.boards.applications} />
      <Cta lang={lang} t={t} title={t.boards.ctaTitle} text={t.boards.ctaText} />
    </>
  );
}

function TemperatureControllersPage({ lang, t }) {
  return (
    <>
      <PageHero
        lang={lang}
        t={t}
        label={t.controller.label}
        title={t.controller.title}
        text={t.controller.text}
        image="hero-temperature-controller.png"
      />
      <section className="section split-section">
        <div>
          <p className="eyebrow">{t.controller.featureLabel}</p>
          <h2>{t.controller.featureTitle}</h2>
          <ul className="check-list">
            {t.controller.features.map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}
          </ul>
        </div>
        <img className="feature-image contain" src={img("temperature-controller.png")} alt="6-channel temperature controller" />
      </section>
      <section className="section table-section">
        <SectionHeading label={t.controller.specLabel} title={t.controller.specTitle} />
        <ResponsiveTable headers={["Item", "Specification"]} rows={controllerSpecs} />
      </section>
      <ApplicationStrip items={t.controller.applications} />
      <Cta lang={lang} t={t} title={t.controller.ctaTitle} text={t.controller.ctaText} />
    </>
  );
}

function ContactPage({ lang, t }) {
  const [formData, setFormData] = useState(initialContactForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setFormStatus({ type: "", message: "" });

    const errors = validateContactForm(formData, t.contact.validation);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormData(initialContactForm);
      setFieldErrors({});
      setFormStatus({ type: "success", message: t.contact.success });
    } catch (error) {
      setFormStatus({ type: "error", message: t.contact.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { label: t.contact.fields.name, name: "name", required: true },
    { label: t.contact.fields.company, name: "company", required: true },
    { label: t.contact.fields.email, name: "email", type: "email", required: true },
    { label: t.contact.fields.country, name: "country" },
  ];

  const secondaryFields = [
    { label: t.contact.fields.targetApplication, name: "targetApplication" },
    { label: t.contact.fields.testPlatform, name: "testPlatform" },
    { label: t.contact.fields.packageSize, name: "packageSize" },
    { label: t.contact.fields.pitch, name: "pitch" },
    { label: t.contact.fields.channelCount, name: "channelCount" },
    { label: t.contact.fields.dpsHvAnalogRequirements, name: "dpsHvAnalogRequirements" },
    { label: t.contact.fields.temperatureRange, name: "temperatureRange" },
    { label: t.contact.fields.siteCount, name: "siteCount" },
    { label: t.contact.fields.expectedQuantity, name: "expectedQuantity" },
  ];

  return (
    <>
      <PageHero
        lang={lang}
        t={t}
        label={t.contact.label}
        title={t.contact.title}
        text={t.contact.text}
        showAction={false}
        hideVisual
      />
      <section className="section contact-section">
        <form className="quote-form" onSubmit={submitForm} noValidate>
          <div className="form-intro full">
            <p className="eyebrow">{t.contact.formLabel}</p>
            <h2>{t.contact.formTitle}</h2>
            <p>{t.contact.formText}</p>
            <p className="form-note">{t.contact.note}</p>
          </div>
          <label className="honeypot" aria-hidden="true">
            <span>Website</span>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={updateField}
              tabIndex="-1"
              autoComplete="off"
            />
          </label>
          {inputFields.map((field) => (
            <label key={field.name}>
              <span>{field.label}{field.required ? " *" : ""}</span>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={updateField}
                placeholder={field.label}
                aria-invalid={fieldErrors[field.name] ? "true" : "false"}
                aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
              />
              {fieldErrors[field.name] ? <span className="field-error" id={`${field.name}-error`}>{fieldErrors[field.name]}</span> : null}
            </label>
          ))}
          <label>
            <span>{t.contact.fields.productType} *</span>
            <select
              name="productType"
              value={formData.productType}
              onChange={updateField}
              aria-invalid={fieldErrors.productType ? "true" : "false"}
              aria-describedby={fieldErrors.productType ? "productType-error" : undefined}
            >
              <option value="" disabled>{t.contact.productPlaceholder}</option>
              {t.contact.productOptions.map((type) => <option key={type}>{type}</option>)}
            </select>
            {fieldErrors.productType ? <span className="field-error" id="productType-error">{fieldErrors.productType}</span> : null}
          </label>
          {secondaryFields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={updateField}
                placeholder={field.label}
              />
            </label>
          ))}
          <label className="full">
            <span>{t.contact.fields.message} *</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={updateField}
              rows="6"
              placeholder={t.contact.messagePlaceholder}
              aria-invalid={fieldErrors.message ? "true" : "false"}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
            />
            {fieldErrors.message ? <span className="field-error" id="message-error">{fieldErrors.message}</span> : null}
          </label>
          {formStatus.message ? (
            <p className={`form-status ${formStatus.type}`} role="status">{formStatus.message}</p>
          ) : null}
          <button className="primary-btn form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t.contact.sending : t.contact.submit} <ArrowRight size={17} />
          </button>
        </form>
        <aside className="contact-aside">
          <h2>BUYDASH</h2>
          <p>{t.brandSubtitle}</p>
          <dl>
            <div><dt>{t.footer.email}</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
            <div><dt>{t.footer.location}</dt><dd>{t.footer.address}</dd></div>
            <div>
              <dt>{t.footer.businessInfo}</dt>
              <dd>{t.footer.companyName}<br />{t.footer.business}<br />{t.footer.mailOrder}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </>
  );
}

function PageHero({ lang = "en", t = copy.en, label, title, text, image, visual, showAction = true, hideVisual = false }) {
  return (
    <section className={hideVisual ? "hero page-hero no-visual" : "hero page-hero"}>
      <div className="hero-copy">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p className="hero-text">{text}</p>
        {showAction ? (
          <div className="hero-actions">
            <a className="primary-btn" href={localizePath(lang, "/contact")}>{t.requestQuote} <ArrowRight size={17} /></a>
          </div>
        ) : null}
      </div>
      {hideVisual ? null : (
        <div className="page-hero-visual">
          {visual || <img src={img(image)} alt={title} />}
        </div>
      )}
    </section>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ModelCard({ title, image, models }) {
  return (
    <article className="model-card">
      <img src={img(image)} alt={title} />
      <h3>{title}</h3>
      <ul>{models.map((model) => <li key={model}>{model}</li>)}</ul>
    </article>
  );
}

function ResponsiveTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${row[0]}-${idx}`}>{row.map((cell, cellIdx) => <td key={`${cell}-${cellIdx}`}>{cell || "—"}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationStrip({ items }) {
  return (
    <section className="section application-strip">
      {items.map((item) => (
        <article key={item}>
          <Zap size={22} />
          <span>{item}</span>
        </article>
      ))}
    </section>
  );
}

function Cta({ lang = "en", t = copy.en, title, text }) {
  return (
    <section className="cta-section">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a className="primary-btn" href={localizePath(lang, "/contact")}>{t.requestQuote} <ArrowRight size={17} /></a>
    </section>
  );
}

function Footer({ lang = "en", t = copy.en }) {
  const footerProducts = [
    { label: t.portfolio[0][0], href: "/probe-cards" },
    { label: t.portfolio[1][0], href: "/burn-in-sockets" },
    { label: t.portfolio[2][0], href: "/htol-hast-boards" },
    { label: t.portfolio[3][0], href: "/temperature-controllers" },
    { label: t.portfolio[4][0], href: "/burn-in-sockets#probe-pins" },
  ];

  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>BUYDASH</h2>
        <p>{t.brandSubtitle}</p>
      </div>
      <div className="footer-columns">
        <div>
          <h3>{t.footer.products}</h3>
          <ul>
            {footerProducts.map((item) => (
              <li key={item.href}>
                <a href={localizePath(lang, item.href)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{t.footer.contact}</h3>
          <ul>
            <li>{t.footer.email}: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>{t.footer.website}: <a href="https://www.buydash.co.kr">https://www.buydash.co.kr</a></li>
            <li>{t.footer.location}: {t.footer.address}</li>
          </ul>
        </div>
        <div>
          <h3>{t.footer.businessInfo}</h3>
          <ul>
            <li>{t.footer.companyName}</li>
            <li>{t.footer.business}</li>
            <li>{t.footer.mailOrder}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default App;
