import { ECRItem, KPISummary } from '../types';

export const INITIAL_ECR_LIST: ECRItem[] = [
  {
    id: 'ECR-2026-0041',
    title: '엔진룸 와이어링 하네스 고정 클램프 홀 위치 2.5mm 이격 변경',
    partNumber: 'WH-91820-A03',
    partName: 'Main Engine Harness Bracket',
    processStage: '의장 조립 2공정',
    requester: '김생기 책임 (생산기술팀)',
    department: '생산기술부 조립공정설계파트',
    createdAt: '2026-11-04 09:15',
    changeType: '간섭 회피 홀 위치 미세조정',
    changeDescription: '엔진 마운트 브래킷과의 조립 작업자 손가락 간섭(Pinch Point) 방지를 위해 하네스 고정 홀을 우측으로 2.5mm 이격',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: true,
      noJigModification: true,
      safetyRegulatoryFree: true,
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'minor',
    classificationReason: '5개 안전 기준 100% 충족: 공차 범위 내 미세이동, 치공구 개조 없음, 안전법규 무관',
    status: 'completed',
    handoffCount: 1,
    waitTimeHours: 0.1,
    leadTimeSavedHours: 47.9,
    timeline: [
      { timestamp: '2026-11-04 09:15', stage: 'ECR 접수', actor: '김생기 책임', action: 'ECR 등록 및 자동 영향도 평가 (그린패스 판정)' },
      { timestamp: '2026-11-04 09:16', stage: '그린존 즉시선진행', actor: '시스템', action: '승인대기 0초 전환, 조립 공정설계 도면 수정 착수 허가' },
      { timestamp: '2026-11-04 11:30', stage: '공정설계 완료', actor: '김생기 책임', action: '작업지도서(SOP) 업데이트 및 사후보고서 자동 발송' },
    ],
  },
  {
    id: 'ECR-2026-0042',
    title: '도어 트림 체결 토크 표준 공차 표기 보정 (0.2N·m 상향)',
    partNumber: 'DR-82301-B12',
    partName: 'Front Door Inner Trim Assembly',
    processStage: '도어 조립 1공정',
    requester: '박조립 선임 (생산기술팀)',
    department: '생산기술부 조립공정설계파트',
    createdAt: '2026-11-04 14:20',
    changeType: '체결 토크 공차 표준화',
    changeDescription: '너트러너 토크 캘리브레이션 산포 반영을 위해 체결 토크 표준치를 4.8±0.4N·m에서 5.0±0.4N·m로 상향 보정',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: true,
      noJigModification: true,
      safetyRegulatoryFree: true,
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'minor',
    classificationReason: '치공구/설비 변경 없고 체결 부품 규격 영향 없음. 체결 누적 불량 방지 목적',
    status: 'fast_track_started',
    handoffCount: 1,
    waitTimeHours: 0.2,
    leadTimeSavedHours: 47.8,
    timeline: [
      { timestamp: '2026-11-04 14:20', stage: 'ECR 접수', actor: '박조립 선임', action: 'ECR 등록 및 영향도 체크리스트 입력' },
      { timestamp: '2026-11-04 14:21', stage: '그린패스 발급', actor: '시스템', action: '선진행 후보고 자격 획득, 후속 공정설계 착수' },
    ],
  },
  {
    id: 'ECR-2026-0043',
    title: '센터 콘솔 하부 흡음 패드 부착 가이드 라인 1.5mm 이동',
    partNumber: 'CC-84610-K90',
    partName: 'Console Floor Insulator Pad',
    processStage: '트림 조립 3공정',
    requester: '이공정 책임 (생산기술팀)',
    department: '생산기술부 조립공정설계파트',
    createdAt: '2026-11-05 08:30',
    changeType: '부착 가이드라인 단순 이동',
    changeDescription: '작업자 시야각 확보를 위한 표면 음각 가이드 라인 위치 1.5mm 시각적 이동',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: true,
      noJigModification: true,
      safetyRegulatoryFree: true,
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'minor',
    classificationReason: '기능/성능 및 안전 무관, 단순 시각적 가이드라인 위치 조정 건',
    status: 'fast_track_started',
    handoffCount: 1,
    waitTimeHours: 0.1,
    leadTimeSavedHours: 47.9,
    timeline: [
      { timestamp: '2026-11-05 08:30', stage: 'ECR 접수', actor: '이공정 책임', action: 'ECR 접수 및 그린존 조건 검증' },
      { timestamp: '2026-11-05 08:31', stage: '선진행 착수', actor: '시스템', action: '대기시간 없이 공정설계 즉시 반영' },
    ],
  },
  {
    id: 'ECR-2026-0044',
    title: '프론트 서스펜션 로어암 체결 볼트 강도 등급 및 판두께 변경',
    partNumber: 'FA-54500-C01',
    partName: 'Lower Control Arm Bracket',
    processStage: '샤시 조립 1공정',
    requester: '최연구 책임 (샤시설계팀)',
    department: 'R&D 샤시개발실',
    createdAt: '2026-11-03 10:00',
    changeType: '주요 강도/안전 사양 변경',
    changeDescription: '차량 충돌 안전성 보강을 위해 볼트 규격을 M12(10.9T)에서 M14(11.9T)로 변경 및 체결 토크 120N·m 증대',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: false,
      noJigModification: false,
      safetyRegulatoryFree: false,
      assemblyCycleTimeNeutral: false,
      noToolInterference: false,
    },
    classification: 'major',
    classificationReason: '충돌 안전 법규 대상 및 너트러너/치공구 교체 필수 건. 정규 5단계 심의 절차 필수',
    status: 'pending_major_review',
    handoffCount: 4,
    waitTimeHours: 54.5,
    leadTimeSavedHours: 0,
    timeline: [
      { timestamp: '2026-11-03 10:00', stage: 'ECR 접수', actor: '최연구 책임', action: 'ECR 접수 및 중대 변경 판정' },
      { timestamp: '2026-11-03 15:00', stage: '1단계 R&D 심의', actor: '샤시파트장', action: '설계 타당성 승인' },
      { timestamp: '2026-11-04 11:20', stage: '2단계 품질본부 심의', actor: '품질보증팀', action: '신뢰성 시험 요건 검토 중' },
    ],
  },
  {
    id: 'ECR-2026-0045',
    title: '배터리 팩 냉각수 순환 파이프 고정 브래킷 절곡 각도 1도 조정',
    partNumber: 'EV-37510-E02',
    partName: 'Battery Coolant Pipe Stay',
    processStage: '전동화 조립 2공정',
    requester: '정전기 선임 (생산기술팀)',
    department: '생산기술부 전동화공정파트',
    createdAt: '2026-11-04 16:40',
    changeType: '형상 미세각도 변경',
    changeDescription: '로봇 자동 체결 헤드와의 간섭 여유(Clearance) 확보를 위해 브래킷 절곡 각도를 89도에서 90도로 보정',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: true,
      noJigModification: false, // 브래킷 성형 지그 간섭 여부 모호
      safetyRegulatoryFree: true,
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'standard',
    classificationReason: '치공구(성형 지그) 수정보완 가능성이 있어 파트 리더 1단계 간소화 승인(4시간 이내) 필요',
    status: 'pending_standard_review',
    handoffCount: 2,
    waitTimeHours: 2.5,
    leadTimeSavedHours: 45.5,
    timeline: [
      { timestamp: '2026-11-04 16:40', stage: 'ECR 접수', actor: '정전기 선임', action: 'ECR 접수 (1단계 간소화 대상)' },
      { timestamp: '2026-11-04 16:45', stage: '파트리더 검토요청', actor: '시스템', action: '생기파트장 모바일 즉시 알림 발송' },
    ],
  },
  {
    id: 'ECR-2026-0046',
    title: '루프 헤드라이닝 와이어링 클립 체결 순서 변경',
    partNumber: 'HL-85301-D40',
    partName: 'Roof Headlining Harness Assembly',
    processStage: '의장 조립 4공정',
    requester: '윤조립 사원 (생산기술팀)',
    department: '생산기술부 조립공정설계파트',
    createdAt: '2026-11-05 10:10',
    changeType: '작업 순서(SOP) 최적화',
    changeDescription: '헤드라이닝 처짐 방지를 위해 후방 3번 클립 체결 후 중앙 2번 체결로 순서 맞바꿈',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: true,
      noJigModification: true,
      safetyRegulatoryFree: true,
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'minor',
    classificationReason: '도면/물성/부품 변경 없음, 조립 작업 순서 단독 변경 건 (그린패스)',
    status: 'fast_track_started',
    handoffCount: 1,
    waitTimeHours: 0.1,
    leadTimeSavedHours: 47.9,
    timeline: [
      { timestamp: '2026-11-05 10:10', stage: 'ECR 접수', actor: '윤조립 사원', action: 'ECR 등록 및 자동 분류' },
      { timestamp: '2026-11-05 10:11', stage: '그린존 승인', actor: '시스템', action: '작업표준서 즉시 수정 허가' },
    ],
  },
  {
    id: 'ECR-2026-0047',
    title: '사이드 미러 커넥터 방수 러버 씰링 삽입 깊이 공차 완화 건 (오분류 롤백 사례)',
    partNumber: 'MR-87610-M05',
    partName: 'Mirror Waterproof Grommet',
    processStage: '도어 조립 3공정',
    requester: '강품질 매니저 (품질보증팀)',
    department: '품질보증부 샤시품질파트',
    createdAt: '2026-11-02 11:00',
    changeType: '방수 씰링 공차 조정',
    changeDescription: '작업자 압입 피로도 감소를 위해 러버 씰 삽입 깊이 허용 오차를 ±0.3mm에서 ±0.8mm로 조정 신청',
    standardVersion: 'STD-ECO-2026-v2',
    checklist: {
      withinTolerance: false,
      noJigModification: true,
      safetyRegulatoryFree: false, // 방수 누수(Water Leak) 품질 보증 리스크 발견
      assemblyCycleTimeNeutral: true,
      noToolInterference: true,
    },
    classification: 'major',
    classificationReason: '초기 경미로 자의적 분류되었으나 방수 시험 기준 미달 우려로 품질본부에서 긴급 롤백(재분류)',
    status: 'reclassified_hold',
    handoffCount: 3,
    waitTimeHours: 18.0,
    leadTimeSavedHours: 0,
    isRollbackCase: true,
    timeline: [
      { timestamp: '2026-11-02 11:00', stage: '초기 ECR 접수', actor: '강품질 매니저', action: '경미 변경으로 신청' },
      { timestamp: '2026-11-02 14:00', stage: '품질 모니터링 경보', actor: '품질보증팀장', action: '침수시험 기준치 저촉 발견, 즉시 선진행 중단 및 중대 변경으로 롤백' },
      { timestamp: '2026-11-02 14:30', stage: '정규 심의 전환', actor: '시스템', action: 'R&D 설계 및 신뢰성 평가 심의회로 공식 이관' },
    ],
  },
];

export const PRD_MARKDOWN_CONTENT = `# [PRD & 상세 요구사항 정의서]
## ECR FastTrack: 경미 설계변경 등급별 승인 축소 및 조립 공정설계 효율화 시스템

---

### 1. 프로젝트 개요 & 배경 (Executive Summary)
- **과제명**: 경미 설계변경 등급별 승인 축소 기획 (나의 직무 개선 기획 다이어리 연계 실무 적용 시스템)
- **주관 직무**: 생산기술 담당자 (조립 공정설계)
- **핵심 목표**: 조립 공정설계 도면 수정 시, 설계변경의 영향도(위중도/경미함)를 정량적 체크리스트로 자동 판정하여 불필요한 다단계 심의 결재 대기를 제거하고, **승인 리드타임과 부서 간 넘겨주기(핸드오프) 횟수를 획기적으로 감축**한다.
- **주요 해결 방향**:
  1. **그린존(Green Zone) 규칙 도입**: 경미 변경 건은 결재 대기 0초로 즉시 착수하고 사후 보고로 전환 (선진행 후승인).
  2. **등급별 차등 승인 프로세스**: 경미(선진행 후보고) vs 일반(1단계 간소화 승인) vs 중대(기존 5단계 정규 심의).
  3. **오분류 방지 안전장치(Rollback SOP)**: 판단 불가 또는 오분류 시 즉시 작업 보류 및 정규 심의 이관 체계 구축.

---

### 2. 문제 정의 및 근거 분석 (3대 렌즈 심층 진단)
생산기술 담당자는 도면 설계를 수정할 때 변경 내용이 미세하거나 조립 공정에 영향이 없음에도 불구하고 모든 ECR(Engineering Change Request)이 동일한 정규 심의(R&D -> 품질 -> 생산 -> 파트장 -> 공장장) 결재 라인을 거쳐야 함.

| 분석 렌즈 | 현장의 실제 문제점 및 낭비 요소 | 검증 질문 및 데이터 확인 |
| :--- | :--- | :--- |
| **1. 정보 렌즈** | 도면과 과거 품질 이력이 여러 폴더와 시스템에 분산되어 개별 검색·확인에 불필요한 동작 낭비 발생 | "과거 유사 변경 시 불량 발생 이력 조회가 즉시 가능한가?" (현재 평균 검색 시간 2.4시간) |
| **2. 기준 렌즈** | 수기 엑셀과 육안으로 공구 간섭 및 작업부하를 검토하여 체결 불량 및 간섭을 놓치는 불량 낭비 상존 | "지난달 조립 라인 간섭/체결 불량률은 얼마였는가?" (수기 검토 한계로 월 3~4건 재작업) |
| **3. 절차 렌즈 (★핵심 원인)** | **ECR 작성 후 설계담당자의 심의 결재가 완료될 때까지 후속 조립 공정설계가 전면 중단되는 '승인 대기 낭비'가 1곳 집중 발생.** 연구개발과 생산기술 간 승인 리드타임이 장기화(건당 48~72시간)되어 양산 준비 일정 지연 초래 | **"지난달 승인 대기로 인해 후속 공정설계가 지연된 누적 시간은 얼마인가?"** (월 120시간 이상 대기) |

---

### 3. 아이디어 발상 (SCAMPER) 및 최적안 선정
#### [SCAMPER 아이디어 풀]
- **S (대체)**: 수작업 서술형 신청서를 선택형 정량 영향도 체크리스트로 대체
- **C (결합)**: ECR 변경 요청서와 영향도 평가 점수표를 단일 웹 폼으로 결합
- **A (응용)**: 반도체/SW 배포의 'Fast-Track / 사전 승인 구역(그린존)' 규칙을 기계 조립 공정에 응용
- **M (수정)**: 일괄 5단계 승인 라인을 변경 등급별(경미 0단계, 일반 1단계, 중대 5단계)로 대폭 축소
- **P (다른 용도)**: 과거 통과 이력 데이터를 향후 설계 표준 기준표(SOP) 고도화 기준으로 재활용
- **E (제거)**: 안전/공구 무관 경미 변경 건의 사전 심의 결재 대기 절차를 완전 제거
- **R (반전)**: '사전 승인 후 작업' 순서를 '경미 건 선진행 후 사후 승인/공유' 순서로 뒤집기

#### [최종 선정안]
- **최종안**: **승인 단계를 변경 등급별로 축소** (경미: 심의 대기 없이 선진행 처리, 일반: 파트장 1단계 간소화 승인, 중대: 기존 정규 심의)
- **선정 이유**: 위중도 기준의 시각적 표준화로 직관적 의사결정을 유도하여 리드타임을 단축하고, 불필요한 결재 대기를 없애 넘겨주기 횟수와 대기 낭비를 직접 제거함.

---

### 4. 기능 요구사항 명세 (Functional Requirements)

- **[FR-001] ECR 신청 및 파트 식별 정보 등록**
  - 시스템은 변경요청 ID(자동 채번), 접수일시, 품번, 품명, 공정단계, 신청자 정보를 입력/저장해야 한다.
- **[FR-002] 5대 정량 영향도 체크리스트 및 실시간 자동 등급 분류**
  - 시스템은 5개 필수 항목(치수공차 ±0.5mm, 치공구 개조 무관, 안전법규 무관, CT 영향 3초 이내, 공구간섭 없음)을 제공해야 한다.
  - 5개 모두 충족 시 [경미-그린패스], 경미 외 1개 항목 해당 시 [일반-표준], 다수 또는 안전 관련 시 [중대-정규], 확인 불가 시 [판단불가]로 자동 분류한다.
- **[FR-003] 그린존(Green Pass) 즉시 선진행 발급**
  - [경미] 판정 건은 즉시 작업 착수 상태로 전환되며, 대기시간 타이머를 0으로 기록하고 승인 리드타임 절감량을 자동 산출한다.
- **[FR-004] 등급별 차등 워크플로우 분기**
  - [일반]: 파트 리더 단일 1단계 승인 라인 배정 (목표 4시간 이내).
  - [중대]: R&D -> 품질 -> 생산 -> 총괄 정규 5단계 결재 라인 자동 할당.
- **[FR-005] 실시간 핸드오프(넘겨주기) 및 대기시간 추적 로그**
  - 각 ECR의 이벤트 타임스탬프, 담당자, 승인 액션, 핸드오프 횟수를 불변 타임라인으로 기록한다.
- **[FR-006] 오분류 감지 및 즉시 롤백(Rollback / 보완요청)**
  - 품질/설계 부서에서 경미 건에 대한 결함/오분류 발견 시, 1-Click으로 '중대 변경으로 재분류 및 작업 보류'를 실행하고 관련 담당자에게 긴급 알림을 전송한다.
- **[FR-007] ECR 목록 종합 대시보드 및 다차원 필터링**
  - 전체 요청 목록, 처리 경로(그린패스/일반/중대/롤백), 처리 상태, 대기시간 순 정렬 및 검색을 제공한다.
- **[FR-008] 실시간 KPI 통계 집계 엔진**
  - 넘겨주기 횟수(As-Is 5회 vs To-Be 실측치), 경미 건 즉시 처리 비율(%), 평균 대기시간 감축률(%), 누적 절감 시간을 자동 계산한다.
- **[FR-009] 합의 기준표 대조 뷰어**
  - 생산기술, 연구개발, 품질보증 3개 부서가 사전 합의한 치수/공차/공구 표준 기준표를 상시 열람 가능해야 한다.
- **[FR-010] PRD & SRS 문서 내보내기 (Markdown / 인쇄 / 복사)**
  - 현장 및 감사 보고용으로 PRD 및 세부 요구사항 전문을 Markdown 다운로드 및 인쇄/PDF 저장이 가능해야 한다.

---

### 5. 비기능 요구사항 명세 (Non-Functional Requirements)

- **[NFR-001] 응답 속도 및 사용성 (Usability & Performance)**
  - 체크리스트 선택 시 자동 등급 판정 결과는 100ms 이내에 즉각 UI에 반영되어야 한다.
- **[NFR-002] 접근성 및 디자인 규격 (Accessibility)**
  - WCAG AA 기준을 준수하며, 상태 표시 시 색상에만 의존하지 않고 명확한 텍스트 라벨과 아이콘을 병기한다.
- **[NFR-003] 데이터 무결성 및 감사 추적 (Audit Trail)**
  - 승인 여부, 타임스탬프, 처리자 정보는 위변조가 불가능하도록 이벤트 로그로 저장되어야 한다.
- **[NFR-004] 반응형 레이아웃 (Viewport)**
  - 현장 태블릿 및 데스크톱 모니터(1440px 기준) 모두에서 가로 스크롤 깨짐 없이 동작해야 한다.
- **[NFR-005] 신뢰성 및 안전장치 (Fail-Safe)**
  - 체크 항목 중 하나라도 미입력되거나 판단이 모호한 경우 절대 '경미(그린패스)'로 자동 승인되지 않으며, 안전 우선 원칙에 따라 '일반' 또는 '판단불가'로 격상한다.

---

### 6. 목표 KPI 및 성과 지표 산출식

| KPI 구분 | 지표명 | 기존값 (As-Is) | 목표값 (To-Be) | 측정 주기 및 산출식 |
| :--- | :--- | :--- | :--- | :--- |
| **결과 KPI** | **경미 설계변경 넘겨주기(핸드오프) 횟수** | 5회 (가정) | **3회 이하 (최대 1~2회)** | ECR 접수 시점부터 공정설계 착수까지 거치는 부서 간 결재·이관 단계 수 합계 |
| **과정 KPI** | **경미 변경 즉시 처리 적용 비율 (%)** | 0% (전건 대기) | **80% 이상** | $\\frac{\\text{대기 없이 즉시 착수된 경미 ECR 건수}}{\\text{전체 접수된 경미 ECR 건수}} \\times 100$ |
| **효율 지표** | **평균 승인 대기시간** | 48.0 시간 | **2.0 시간 이내** | $\\frac{\\sum (\\text{승인/착수시각} - \\text{신청접수시각})}{\\text{총 완료 건수}}$ |
| **생산성 지표** | **공정설계 착수 리드타임 단축률** | 기준선 | **90% 이상 단축** | 기존 48시간 대비 실제 단축된 시간 비율 |

---

### 7. 기획 선배 피드백 반영 및 핵심 질의 응답

#### Q1. '경미'와 '중대'를 가르는 체크 항목은 구체적으로 무엇이고 누구와 합의할까?
- **답변**: 생산기술, R&D(설계), 품질보증 3자 합동 '설계변경 위중도 표준 협의체'를 통해 확정합니다.
  - **경미 조건 (5대 요건 AND 만족)**:
    1) 도면 치수/공차 변동량이 $\\pm 0.5\\text{mm}$ 이내이며 인접 부품과 간섭이 없을 것
    2) 조립 라인의 설비/치공구(Jig) 신규 제작 또는 재가공이 수반되지 않을 것
    3) 자동차 안전법규, 배출가스, 충돌, 조향/제동 등 핵심 보안 사양이 아닐 것
    4) 작업자의 택트타임(Tact Time) 및 조립 사이클타임에 영향이 3초 미만일 것
    5) 작업자 토크렌치/너트러너 접근성(Tool Clearance) 사전 3D 시뮬레이션 검증 완료 건

#### Q2. 판단 불가인 건은 어떤 경로로 보내고, 오분류가 나면 어떻게 되돌릴까?
- **답변**:
  - **판단 불가 건**: 그린패스를 차단하고 '전문가 협의 큐(Queue)'로 자동 배정하여 24시간 내 R&D 및 생기 파트장이 합동 판정합니다.
  - **오분류 롤백 SOP (안전 롤백 체계)**:
    - 그린존 선진행 도중 품질 또는 설계자가 결함 리스크를 발견하면 즉시 시스템에서 [오분류 롤백 / 보완 요청] 버튼을 클릭합니다.
    - 즉시 공정설계 작업이 '작업 보류(Hold)' 상태로 동결되며, 기존 정규 5단계 심의 라인으로 강제 전환됩니다.
    - 기 작성된 도면 및 작업지도서는 승인 전까지 현장 양산 라인에 배포되지 않도록 릴리즈 차단(Lock)이 작동합니다.

#### Q3. 현재 대기시간과 넘겨주기 횟수를 어떤 기록으로 확인할 수 있을까?
- **답변**: 시스템 내부의 '이벤트 타임스탬프 로그(Event Log)'를 통해 접수일시 $\\rightarrow$ 분류판정일시 $\\rightarrow$ 착수일시 $\\rightarrow$ 승인완료일시를 초 단위로 기록하며, 결재선 변경 및 이관 이벤트마다 핸드오프 카운터가 $+1$씩 증가하여 투명하게 계측됩니다.

---
`;

export const CRITERIA_DEFINITIONS = [
  {
    category: '치수 및 공차',
    minorRule: '변동폭 ±0.5mm 이내, 인접 부품 클리어런스 10mm 이상 확보',
    standardRule: '변동폭 ±0.5mm ~ ±1.5mm 이내, 정밀 조립부 아님',
    majorRule: '변동폭 ±1.5mm 초과 또는 주요 공차 누적 영향부',
    stakeholder: 'R&D 설계팀 & 생산기술팀',
  },
  {
    category: '설비 및 치공구(Jig)',
    minorRule: '기존 지그/설비 수정 일체 없음, 기존 라인 그대로 사용',
    standardRule: '기존 지그의 단순 위치 미세조정(심 플레이트 가감 등)',
    majorRule: '신규 지그 제작, 로봇 프로그램 대폭 수정, 설비 개조 필요',
    stakeholder: '생산기술팀 & 보전팀',
  },
  {
    category: '안전 및 법규 사양',
    minorRule: '법규/안전/충돌/배출가스/보안 규격과 100% 무관한 외장/트림 단순부',
    standardRule: '일반 편의 사양이나 사용자 조작감에 미세한 영향을 주는 부품',
    majorRule: '에어백, 브레이크, 조향, 연료계통, 배터리 고전압 등 주요 법규 사양',
    stakeholder: '품질보증팀 & R&D 인증팀',
  },
  {
    category: '조립 택트타임(Tact Time)',
    minorRule: '작업 사이클타임(CT) 변동 0초 또는 3초 이내 단축',
    standardRule: '작업 CT 변동 3~5초 이내, 라인 밸런스 영향 경미',
    majorRule: '작업 CT 5초 이상 증가, 공정 병목(Bottleneck) 유발',
    stakeholder: '조립생산팀 & 생산관리팀',
  },
  {
    category: '체결 공구 간섭(Clearance)',
    minorRule: '기존 표준 너트러너/수공구로 간섭 없이 100% 체결 가능',
    standardRule: '공구 접근 각도 변경 필요하나 표준 아답터로 수용 가능',
    majorRule: '특수 공구 신규 도입 필요 또는 체결 불가능 위험',
    stakeholder: '생산기술팀',
  },
];
