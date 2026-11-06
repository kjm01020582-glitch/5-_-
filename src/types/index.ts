export type ChangeClassification = 'minor' | 'standard' | 'major' | 'uncertain';

export type WorkflowStatus = 
  | 'fast_track_started' // 경미 선진행 즉시착수 (대기 0초)
  | 'pending_standard_review' // 1단계 간소화 승인 대기
  | 'pending_major_review' // 기존 5단계 정규 심의 대기
  | 'completed' // 공정설계 및 변경 완료
  | 'reclassified_hold'; // 오분류 감지 후 중대 변경으로 롤백 보류

export interface ECRChecklist {
  withinTolerance: boolean; // 1. 치수/공차 변동 ±0.5mm 이내
  noJigModification: boolean; // 2. 설비 및 치공구(Jig) 신규제작/개조 불필요
  safetyRegulatoryFree: boolean; // 3. 법규, 안전, 충돌, 배출 등 주요 보안 사양 무관
  assemblyCycleTimeNeutral: boolean; // 4. 조립 사이클타임(CT) 3초 이내 또는 영향 없음
  noToolInterference: boolean; // 5. 공구 간섭 및 인터페이스 체결성 사전 적합 검증 완료
}

export interface ECRTimelineEvent {
  timestamp: string;
  stage: string;
  actor: string;
  action: string;
  note?: string;
}

export interface ECRItem {
  id: string;
  title: string;
  partNumber: string;
  partName: string;
  processStage: string;
  requester: string;
  department: string;
  createdAt: string;
  changeType: string;
  changeDescription: string;
  standardVersion: string;
  checklist: ECRChecklist;
  classification: ChangeClassification;
  classificationReason: string;
  status: WorkflowStatus;
  handoffCount: number; // 기존 정규 5회 대비 현재 핸드오프 횟수
  waitTimeHours: number; // 결재 대기 시간 (hr)
  leadTimeSavedHours: number; // 절감된 리드타임
  isRollbackCase?: boolean;
  timeline: ECRTimelineEvent[];
}

export interface KPISummary {
  totalECR: number;
  minorCount: number;
  fastTrackCount: number;
  fastTrackRate: number; // %
  avgHandoffCount: number; // 회
  targetHandoffCount: number; // 3회 이하
  avgWaitHours: number; // 시간
  baselineWaitHours: number; // 48시간
  totalHoursSaved: number; // 누적 절감 시간
}
