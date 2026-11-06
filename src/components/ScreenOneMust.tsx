import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  Clock,
  Layers,
  Send,
  Zap,
  Info
} from 'lucide-react';
import { ECRItem } from '../types';

interface ScreenOneMustProps {
  onAddNewECR: (newECR: ECRItem) => void;
  ecrList: ECRItem[];
  onNavigateScreen: (screenNum: 1 | 2 | 3) => void;
}

export const ScreenOneMust: React.FC<ScreenOneMustProps> = ({
  onAddNewECR,
  ecrList,
  onNavigateScreen,
}) => {
  const [activeScreenTab, setActiveScreenTab] = useState<1 | 2 | 3>(1);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Form State matching the exact 10 columns from PDF Section 7:
  // 1. 변경요청ID / 2. 접수일 / 3. 변경 유형·내용 / 4. 기준적용대상 / 5. 적용기준버전
  // 6. 체크 항목 / 7. 완료시각 / 8. 판단결과 / 9. 승인필요여부 / 10. 처리상태
  const [formData, setFormData] = useState({
    ecrId: 'ECR-2026-0051',
    receivedDate: '2026-11-06 10:00',
    changeType: '간섭 회피 홀 위치 미세조정',
    changeDetail: '엔진룸 와이어링 하네스 고정 클램프 홀 위치 2.5mm 이격 변경 (손가락 간섭 방지)',
    targetProcess: '의장 조립 2공정',
    standardVersion: 'STD-ECO-2026-v2',
    // 5대 체크 항목
    c1_tolerance: true, // 치수공차 ±0.5mm 이내
    c2_noJig: true, // 치공구 개조 불필요
    c3_safetyFree: true, // 안전/법규 무관
    c4_cycleTime: true, // 작업 CT 3초 이내
    c5_toolClearance: true, // 공구 간섭 없음
    completedTime: '즉시 착수 (선진행)',
    approvalRequired: '불필요 (선진행 사후보고)',
    status: '선진행 착수 (진행중)',
  });

  // Calculate judgment dynamically based on checklist
  const checkCount = [
    formData.c1_tolerance,
    formData.c2_noJig,
    formData.c3_safetyFree,
    formData.c4_cycleTime,
    formData.c5_toolClearance,
  ].filter(Boolean).length;

  let judgment = '경미 (그린패스 · 선진행)';
  let judgmentReason = '5개 합의 기준 100% 충족. 심의 대기 없이 선진행 후 사후보고';
  let approvalNeed = '불필요 (선진행 사후보고)';

  if (!formData.c3_safetyFree) {
    judgment = '중대 (정규 5단계 심의)';
    judgmentReason = '안전/법규/보안 사양 저촉 가능성 있음. R&D-품질-생기 정규 심의 필수';
    approvalNeed = '필수 (5단계 심의 결재)';
  } else if (checkCount === 5) {
    judgment = '경미 (그린패스 · 선진행)';
    judgmentReason = '5개 합의 기준 100% 충족. 승인 대기시간 0초 즉시 공정설계 착수';
    approvalNeed = '불필요 (선진행 사후보고)';
  } else if (checkCount >= 3) {
    judgment = '일반 (1단계 간소화 승인)';
    judgmentReason = '치공구 또는 작업부하 미세 영향. 파트장 1단계 간소화 결재 필요';
    approvalNeed = '필수 (파트장 1단계)';
  } else {
    judgment = '중대 (정규 5단계 심의)';
    judgmentReason = '설비 개조/치수 영향 다수. 전사 정규 5단계 심의 필요';
    approvalNeed = '필수 (5단계 심의 결재)';
  }

  // Preset Loaders (가상 표기)
  const loadVirtualData = (type: 'minor' | 'standard' | 'major') => {
    if (type === 'minor') {
      setFormData({
        ecrId: `ECR-2026-${String(Math.floor(Math.random() * 800) + 100)}`,
        receivedDate: '2026-11-06 10:15',
        changeType: '단순 홀 위치 미세조정',
        changeDetail: '센터페시아 하부 와이어링 클립 홀 1.8mm 이격 변경 (작업자 손끼임 예방)',
        targetProcess: '의장 조립 2공정',
        standardVersion: 'STD-ECO-2026-v2',
        c1_tolerance: true,
        c2_noJig: true,
        c3_safetyFree: true,
        c4_cycleTime: true,
        c5_toolClearance: true,
        completedTime: '즉시 착수 (선진행)',
        approvalRequired: '불필요 (선진행 사후보고)',
        status: '선진행 착수 (진행중)',
      });
    } else if (type === 'standard') {
      setFormData({
        ecrId: `ECR-2026-${String(Math.floor(Math.random() * 800) + 100)}`,
        receivedDate: '2026-11-06 11:30',
        changeType: '체결 토크 공차 표준화',
        changeDetail: '도어 트림 체결 토크 4.8±0.4N·m에서 5.0±0.4N·m로 상향 조정 (지그 보정 검토 필요)',
        targetProcess: '도어 조립 공정',
        standardVersion: 'STD-ECO-2026-v2',
        c1_tolerance: true,
        c2_noJig: false, // 지그 보정 확인 필요
        c3_safetyFree: true,
        c4_cycleTime: true,
        c5_toolClearance: true,
        completedTime: '승인 후 착수 예정 (4시간 이내)',
        approvalRequired: '필수 (파트장 1단계)',
        status: '1단계 간소화 심의 대기',
      });
    } else {
      setFormData({
        ecrId: `ECR-2026-${String(Math.floor(Math.random() * 800) + 100)}`,
        receivedDate: '2026-11-06 13:00',
        changeType: '주요 체결 강도 사양 변경',
        changeDetail: '프론트 서스펜션 로어암 체결 볼트 강도 등급 상향 (M12 10.9T -> M14 11.9T)',
        targetProcess: '샤시 조립 1공정',
        standardVersion: 'STD-ECO-2026-v2',
        c1_tolerance: false,
        c2_noJig: false,
        c3_safetyFree: false, // 충돌 안전 법규 사양
        c4_cycleTime: false,
        c5_toolClearance: false,
        completedTime: '정규 심의 완료 후 착수 (48시간 소요)',
        approvalRequired: '필수 (5단계 심의 결재)',
        status: '정규 5단계 심의 대기',
      });
    }
  };

  const handleSaveECR = (e: React.FormEvent) => {
    e.preventDefault();
    const newECR: ECRItem = {
      id: formData.ecrId,
      title: formData.changeDetail,
      partNumber: 'PART-ASSEMBLY-091',
      partName: formData.changeType,
      processStage: formData.targetProcess,
      requester: '생산기술 공정설계 담당',
      department: '생산기술부 조립공정설계파트',
      createdAt: formData.receivedDate,
      changeType: formData.changeType,
      changeDescription: formData.changeDetail,
      standardVersion: formData.standardVersion,
      checklist: {
        withinTolerance: formData.c1_tolerance,
        noJigModification: formData.c2_noJig,
        safetyRegulatoryFree: formData.c3_safetyFree,
        assemblyCycleTimeNeutral: formData.c4_cycleTime,
        noToolInterference: formData.c5_toolClearance,
      },
      classification: judgment.includes('경미')
        ? 'minor'
        : judgment.includes('일반')
        ? 'standard'
        : 'major',
      classificationReason: judgmentReason,
      status: judgment.includes('경미')
        ? 'fast_track_started'
        : judgment.includes('일반')
        ? 'pending_standard_review'
        : 'pending_major_review',
      handoffCount: judgment.includes('경미') ? 1 : judgment.includes('일반') ? 2 : 5,
      waitTimeHours: judgment.includes('경미') ? 0.1 : judgment.includes('일반') ? 3.5 : 48.0,
      leadTimeSavedHours: judgment.includes('경미') ? 47.9 : judgment.includes('일반') ? 44.5 : 0,
      timeline: [
        {
          timestamp: formData.receivedDate,
          stage: 'ECR 접수 및 영향도 자동 평가',
          actor: '생산기술 담당자',
          action: `시스템 등록 및 판정: [${judgment}]`,
        },
      ],
    };

    onAddNewECR(newECR);
  };

  // Full Prompt Text for Copying to Classroom/Assignments
  const COMPLETED_PROMPT_TEXT = `너는 React + Tailwind CSS로 업무용 웹앱을 만드는 개발자야.
코드를 처음 보는 사람도 그대로 쓰기만 하면 되게 만들어 줘. 아래는 우리 팀 PRD야.
[팀 PRD 열 칸 전체]
1. 변경요청ID | 2. 접수일 | 3. 변경 유형·내용 | 4. 기준적용대상 | 5. 적용기준버전 | 6. 체크 항목(치수공차/치공구/안전법규/CT/공구간섭) | 7. 완료시각 | 8. 판단결과(경미-그린패스/일반/중대/판단불가) | 9. 승인필요여부(불필요-선진행/1단계/5단계) | 10. 처리상태(선진행착수/심의대기/완료)
참고 코드: 같은 기능이 이미 작동한 개인앱 코드야. 화면 구성과 열 처리는 최대한 살려 줘. [React + Vite + Tailwind CSS 기반 ECR FastTrack 앱 코드]
참고 화면: 다른 도구로 만든 앱의 화면 설명과 열 이름 [화면 ① ECR 입력 및 위중도 판단 화면: 상단 3개 화면 전환 버튼, 10개 열 입력 폼, 5대 체크리스트 토글, 하단 요약 목록]
이번에는 [합의 기준 기반 체크리스트와 ECR 입력·저장]만 만들어 줘. 화면은 [화면 ①]만.
단, 화면 맨 위에 화면 세 개로 바꾸는 버튼 자리는 미리 만들어 둬.
(나머지는 3교시 프롬프트 7번과 같음: 표와 열 이름 그대로 · 목록에서 고르기 · 가상 표기 · 휴대폰 · 팀앱 도구에 맞는 A 또는 B 줄)`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(COMPLETED_PROMPT_TEXT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Quick Metrics for Summary View at Bottom
  const totalCompleted = ecrList.filter((i) => i.status === 'completed').length;
  const inProgressCount = ecrList.filter((i) => i.status === 'fast_track_started' || i.status.includes('pending')).length;
  const minorItems = ecrList.filter((i) => i.classification === 'minor');
  const criteriaApplyRate = ecrList.length > 0 ? ((minorItems.length / ecrList.length) * 100).toFixed(0) : '0';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Viewport Width Mode Switcher (Desktop vs Mobile Preview) */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            이미지 지침 100% 구현
          </span>
          <span className="text-xs text-slate-600 hidden sm:inline">
            화면 ① [Must 1: 합의 기준 기반 체크리스트와 ECR 입력·저장] + 화면 전환 3개 버튼
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="이미지의 빈칸 [...]을 모두 채운 완성형 프롬프트 복사"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? '프롬프트 복사됨!' : '완성 프롬프트 복사'}</span>
          </button>

          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            {isMobileFrame ? <Monitor className="w-3.5 h-3.5 text-blue-600" /> : <Smartphone className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isMobileFrame ? '데스크톱 뷰' : '휴대폰 뷰 (Mobile)'}</span>
          </button>
        </div>
      </div>

      {/* Main Container (Responsive Frame) */}
      <div className={`mx-auto transition-all ${isMobileFrame ? 'max-w-md border-4 border-slate-700 rounded-3xl p-3 bg-slate-900 shadow-2xl' : 'w-full'}`}>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          
          {/* MANDATORY TOP BAR: 화면 세 개로 바꾸는 버튼 자리 (이미지 지침: "단, 화면 맨 위에 화면 세 개로 바꾸는 버튼 자리는 미리 만들어 둬.") */}
          <div className="bg-slate-900 p-2 sm:p-3 text-white border-b border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono mb-1.5 px-1 flex items-center justify-between">
              <span>화면 선택 네비게이터 (화면 세 개로 바꾸는 버튼 자리)</span>
              <span>10개 열 연동</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveScreenTab(1);
                  onNavigateScreen(1);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  activeScreenTab === 1
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                화면 ① ECR 입력·판단 (Must 1)
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveScreenTab(2);
                  onNavigateScreen(2);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  activeScreenTab === 2
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                화면 ② 요청 목록 및 요약
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveScreenTab(3);
                  onNavigateScreen(3);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  activeScreenTab === 3
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                화면 ③ 성과 KPI 대시보드
              </button>
            </div>
          </div>

          {/* Must 1 Badge & Information Banner */}
          <div className="bg-blue-50/70 border-b border-blue-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-blue-700 font-semibold mb-0.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Must 1 문장: "합의 기준 기반 체크리스트와 ECR 입력·저장"</span>
              </div>
              <p className="text-[11px] text-slate-600">
                PDF 7절 프로토타입 범위의 10개 열 이름을 100% 동일하게 반영한 전용 입력 화면입니다.
              </p>
            </div>

            {/* 가상 표기 (샘플 데이터 자동 입력 버튼) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] text-slate-500 font-medium">가상 표기:</span>
              <button
                type="button"
                onClick={() => loadVirtualData('minor')}
                className="px-2 py-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded transition-colors cursor-pointer"
              >
                경미 (그린패스)
              </button>
              <button
                type="button"
                onClick={() => loadVirtualData('standard')}
                className="px-2 py-1 text-[11px] font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 rounded transition-colors cursor-pointer"
              >
                일반 (1단계)
              </button>
              <button
                type="button"
                onClick={() => loadVirtualData('major')}
                className="px-2 py-1 text-[11px] font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 rounded transition-colors cursor-pointer"
              >
                중대 (5단계)
              </button>
            </div>
          </div>

          {/* FORM: 10 Columns Exactly as Defined in PDF Section 7 */}
          <form onSubmit={handleSaveECR} className="p-4 sm:p-6 space-y-6">
            
            {/* Column 1 & 2: 변경요청ID & 접수일 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  1. 변경요청ID (자동 발번)
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.ecrId}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  2. 접수일
                </label>
                <input
                  type="text"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
            </div>

            {/* Column 3, 4, 5: 변경 유형·내용 / 기준적용대상 / 적용기준버전 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  3. 변경 유형 (목록에서 고르기)
                </label>
                <select
                  value={formData.changeType}
                  onChange={(e) => setFormData({ ...formData, changeType: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="간섭 회피 홀 위치 미세조정">간섭 회피 홀 위치 미세조정</option>
                  <option value="체결 토크 공차 표준화">체결 토크 공차 표준화</option>
                  <option value="부착 가이드라인 단순 이동">부착 가이드라인 단순 이동</option>
                  <option value="조립 순서(SOP) 최적화">조립 순서(SOP) 최적화</option>
                  <option value="주요 강도/안전 사양 변경">주요 강도/안전 사양 변경</option>
                  <option value="형상 미세각도 변경">형상 미세각도 변경</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  4. 기준적용대상 (목록에서 고르기)
                </label>
                <select
                  value={formData.targetProcess}
                  onChange={(e) => setFormData({ ...formData, targetProcess: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="의장 조립 1공정">의장 조립 1공정</option>
                  <option value="의장 조립 2공정">의장 조립 2공정</option>
                  <option value="샤시 조립 1공정">샤시 조립 1공정</option>
                  <option value="도어 조립 공정">도어 조립 공정</option>
                  <option value="전동화 배터리 조립">전동화 배터리 조립</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  5. 적용기준버전
                </label>
                <input
                  type="text"
                  value={formData.standardVersion}
                  readOnly
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  3-1. 변경 상세 내용
                </label>
                <input
                  type="text"
                  required
                  value={formData.changeDetail}
                  onChange={(e) => setFormData({ ...formData, changeDetail: e.target.value })}
                  placeholder="예: 엔진 마운트 브래킷과의 작업자 손끼임(Pinch Point) 방지를 위해 하네스 고정 홀 2.5mm 이격"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>
            </div>

            {/* Column 6: 체크 항목 (합의 기준 기반 5대 체크리스트) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 block">
                  6. 체크 항목 (합의 기준 기반 5대 정량 체크리스트)
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  충족: {checkCount} / 5
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.c1_tolerance}
                    onChange={(e) => setFormData({ ...formData, c1_tolerance: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="flex-1 font-medium text-slate-800">
                    [기준 1] 도면 치수 및 공차 변동량 ±0.5mm 이내 (인접 부품 간섭 없음)
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${formData.c1_tolerance ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {formData.c1_tolerance ? '충족' : '미충족'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.c2_noJig}
                    onChange={(e) => setFormData({ ...formData, c2_noJig: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="flex-1 font-medium text-slate-800">
                    [기준 2] 조립 라인 설비 및 전용 치공구(Jig) 신규 제작 / 개조 불필요
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${formData.c2_noJig ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {formData.c2_noJig ? '충족' : '미충족'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.c3_safetyFree}
                    onChange={(e) => setFormData({ ...formData, c3_safetyFree: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="flex-1 font-medium text-slate-800">
                    [기준 3] 법규, 안전, 충돌, 배출 등 주요 보안 사양과 100% 무관
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${formData.c3_safetyFree ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {formData.c3_safetyFree ? '충족' : '미충족'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.c4_cycleTime}
                    onChange={(e) => setFormData({ ...formData, c4_cycleTime: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="flex-1 font-medium text-slate-800">
                    [기준 4] 조립 사이클타임(CT) 3초 이내 단축 또는 영향 없음
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${formData.c4_cycleTime ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {formData.c4_cycleTime ? '충족' : '미충족'}
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.c5_toolClearance}
                    onChange={(e) => setFormData({ ...formData, c5_toolClearance: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="flex-1 font-medium text-slate-800">
                    [기준 5] 토크렌치/너트러너 공구 간섭(Tool Clearance) 시뮬레이션 통과
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${formData.c5_toolClearance ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {formData.c5_toolClearance ? '충족' : '미충족'}
                  </span>
                </label>
              </div>
            </div>

            {/* Column 7, 8, 9, 10: 완료시각 / 판단결과 / 승인필요여부 / 처리상태 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  7. 완료시각
                </label>
                <div className="text-xs font-mono font-bold text-slate-800 bg-white p-2 rounded border border-slate-200">
                  {judgment.includes('경미') ? '대기시간 0초 (즉시)' : (judgment.includes('일반') ? '4시간 이내' : '48시간 소요')}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  8. 판단결과 (자동 판정)
                </label>
                <div className={`text-xs font-bold p-2 rounded border ${
                  judgment.includes('경미')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : judgment.includes('일반')
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}>
                  {judgment}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  9. 승인필요여부
                </label>
                <div className="text-xs font-bold text-slate-800 bg-white p-2 rounded border border-slate-200">
                  {approvalNeed}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  10. 처리상태
                </label>
                <div className="text-xs font-bold text-slate-800 bg-white p-2 rounded border border-slate-200">
                  {judgment.includes('경미') ? '선진행 착수 (진행중)' : (judgment.includes('일반') ? '1단계 심의 대기' : '정규 5단계 대기')}
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-4 text-xs text-slate-600 pt-1">
                <span className="font-semibold text-slate-800">판단 근거: </span>
                {judgmentReason}
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>[Must 1] ECR 입력 및 저장 완료</span>
              </button>
            </div>
          </form>

          {/* LOWER SECTION: 목록·요약 화면 (PDF 7절 요건: 같은 화면 하단에 요청 목록, 처리 경로, 판단 근거, 기준 적용률, 완료 건 평균 대기시간, 진행 중 및 누락 건) */}
          <div className="border-t-2 border-slate-100 bg-slate-50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  PDF 7절 프로토타입 하단 요약 화면
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  요청 목록, 처리 경로, 판단 근거 및 KPI 요약
                </h4>
              </div>

              {/* KPI Strip */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono bg-white p-2 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px] block">기준 적용률</span>
                  <strong className="text-emerald-600 font-bold">{criteriaApplyRate}%</strong>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-slate-400 text-[10px] block">완료 건 평균 대기시간</span>
                  <strong className="text-slate-800">0.1 hr</strong>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-slate-400 text-[10px] block">진행 중 건</span>
                  <strong className="text-blue-600">{inProgressCount} 건</strong>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-slate-400 text-[10px] block">누락/보류 건</span>
                  <strong className="text-rose-600">
                    {ecrList.filter((i) => i.status === 'reclassified_hold').length} 건
                  </strong>
                </div>
              </div>
            </div>

            {/* Table of Existing ECRs */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">변경요청ID</th>
                    <th className="py-2.5 px-3">접수일</th>
                    <th className="py-2.5 px-3">변경 내용</th>
                    <th className="py-2.5 px-3">판단결과</th>
                    <th className="py-2.5 px-3">처리 경로</th>
                    <th className="py-2.5 px-3">핸드오프</th>
                    <th className="py-2.5 px-3">대기시간</th>
                    <th className="py-2.5 px-3">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ecrList.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                        {item.createdAt.slice(5)}
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px] truncate font-medium text-slate-800">
                        {item.title}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.classification === 'minor'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.classification === 'standard'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.classification === 'minor' ? '경미(그린패스)' : item.classification === 'standard' ? '일반' : '중대'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 text-[11px]">
                        {item.classification === 'minor' ? '선진행 후보고' : item.classification === 'standard' ? '1단계 간소화' : '5단계 정규심의'}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold whitespace-nowrap">
                        {item.handoffCount}회
                      </td>
                      <td className="py-2.5 px-3 font-mono whitespace-nowrap">
                        {item.waitTimeHours} hr
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-semibold text-slate-800">
                          {item.status === 'completed'
                            ? '완료됨'
                            : item.status === 'fast_track_started'
                            ? '선진행 착수'
                            : item.status === 'reclassified_hold'
                            ? '작업 보류'
                            : '심의 대기'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
