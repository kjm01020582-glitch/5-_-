import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Zap, 
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import { ECRItem, ECRChecklist, ChangeClassification } from '../types';

interface ECREvaluationFormProps {
  onSubmit: (newECR: ECRItem) => void;
  onCancel: () => void;
}

export const ECREvaluationForm: React.FC<ECREvaluationFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    partNumber: '',
    partName: '',
    processStage: '의장 조립 1공정',
    requester: '김생기 책임 (생산기술팀)',
    department: '생산기술부 조립공정설계파트',
    changeType: '도면 간섭 회피 위치 조정',
    changeDescription: '',
    standardVersion: 'STD-ECO-2026-v2',
  });

  const [checklist, setChecklist] = useState<ECRChecklist>({
    withinTolerance: true,
    noJigModification: true,
    safetyRegulatoryFree: true,
    assemblyCycleTimeNeutral: true,
    noToolInterference: true,
  });

  // Calculate classification dynamically
  const calculateClassification = (list: ECRChecklist): {
    classification: ChangeClassification;
    reason: string;
    handoffCount: number;
    waitTime: number;
  } => {
    const checks = [
      list.withinTolerance,
      list.noJigModification,
      list.safetyRegulatoryFree,
      list.assemblyCycleTimeNeutral,
      list.noToolInterference,
    ];
    const trueCount = checks.filter(Boolean).length;

    if (!list.safetyRegulatoryFree) {
      return {
        classification: 'major',
        reason: '안전/법규/주요 보안 사양 저촉 가능성 있음 - 전사 5단계 정규 심의 필수',
        handoffCount: 5,
        waitTime: 48.0,
      };
    }

    if (trueCount === 5) {
      return {
        classification: 'minor',
        reason: '5대 정량 기준 100% 충족: 설비 개조 없고 공차 범위 내 미세조정. 그린패스 즉시 착수',
        handoffCount: 1,
        waitTime: 0.1,
      };
    } else if (trueCount >= 3) {
      return {
        classification: 'standard',
        reason: '일부 기준 확인 필요(치공구 또는 CT 미세영향) - 파트장 1단계 간소화 승인 배정',
        handoffCount: 2,
        waitTime: 3.5,
      };
    } else {
      return {
        classification: 'major',
        reason: '기준 미충족 다수 (설비 개조/치수 중대 영향) - 정규 5단계 심의 진행',
        handoffCount: 5,
        waitTime: 52.0,
      };
    }
  };

  const evalResult = calculateClassification(checklist);

  const handleCheckboxToggle = (key: keyof ECRChecklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Quick Presets
  const applyPreset = (presetType: 'minor' | 'standard' | 'major') => {
    if (presetType === 'minor') {
      setFormData({
        title: '엔진룸 센서 고정 브래킷 볼트 홀 1.8mm 이동',
        partNumber: 'EN-88410-A11',
        partName: 'Engine Room O2 Sensor Bracket',
        processStage: '의장 조립 2공정',
        requester: '김생기 책임 (생산기술팀)',
        department: '생산기술부 조립공정설계파트',
        changeType: '단순 홀 위치 미세조정',
        changeDescription: '작업자 토크렌치 접근 각도 개선을 위해 브래킷 고정 홀을 좌측으로 1.8mm 미세 이동',
        standardVersion: 'STD-ECO-2026-v2',
      });
      setChecklist({
        withinTolerance: true,
        noJigModification: true,
        safetyRegulatoryFree: true,
        assemblyCycleTimeNeutral: true,
        noToolInterference: true,
      });
    } else if (presetType === 'standard') {
      setFormData({
        title: '도어 록 액추에이터 고정 가이드 핀 형상 변경',
        partNumber: 'DR-81310-L04',
        partName: 'Door Lock Actuator Guide Pin',
        processStage: '도어 조립 1공정',
        requester: '이지원 선임 (생산기술팀)',
        department: '생산기술부 조립공정설계파트',
        changeType: '가이드 핀 공차 보정',
        changeDescription: '압입 편차 보정을 위해 가이드 핀 직경 공차를 ±0.1mm에서 ±0.3mm로 완화 검토 (지그 간섭 재확인 필요)',
        standardVersion: 'STD-ECO-2026-v2',
      });
      setChecklist({
        withinTolerance: true,
        noJigModification: false, // 지그 간섭 확인 필요
        safetyRegulatoryFree: true,
        assemblyCycleTimeNeutral: true,
        noToolInterference: true,
      });
    } else {
      setFormData({
        title: '브레이크 페달 브래킷 마운팅 볼트 사양 변경 (안전 핵심 사양)',
        partNumber: 'BR-58700-S01',
        partName: 'Brake Pedal Mounting Assembly',
        processStage: '샤시 조립 3공정',
        requester: '오설계 책임 (R&D 제동설계팀)',
        department: 'R&D 제동개발실',
        changeType: '주요 체결 강도 사양 변경',
        changeDescription: '비상 제동 시 페달 지지 강성 향상을 위해 체결 볼트 규격 상향 및 체결 토크 변경',
        standardVersion: 'STD-ECO-2026-v2',
      });
      setChecklist({
        withinTolerance: false,
        noJigModification: false,
        safetyRegulatoryFree: false, // 안전 법규 사양
        assemblyCycleTimeNeutral: false,
        noToolInterference: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('변경 건 제목을 입력해주세요.');
      return;
    }

    const newId = `ECR-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newECR: ECRItem = {
      id: newId,
      title: formData.title,
      partNumber: formData.partNumber || 'PART-GEN-990',
      partName: formData.partName || 'Assembly Component',
      processStage: formData.processStage,
      requester: formData.requester,
      department: formData.department,
      createdAt: formattedDate,
      changeType: formData.changeType,
      changeDescription: formData.changeDescription || '현장 조립성 개선을 위한 설계변경 건',
      standardVersion: formData.standardVersion,
      checklist,
      classification: evalResult.classification,
      classificationReason: evalResult.reason,
      status: evalResult.classification === 'minor' ? 'fast_track_started' : (evalResult.classification === 'standard' ? 'pending_standard_review' : 'pending_major_review'),
      handoffCount: evalResult.handoffCount,
      waitTimeHours: evalResult.waitTime,
      leadTimeSavedHours: Math.max(0, 48 - evalResult.waitTime),
      timeline: [
        {
          timestamp: formattedDate,
          stage: 'ECR 접수 및 영향도 자동 평가',
          actor: formData.requester,
          action: `시스템에 ECR 등록 완료. 판정: [${evalResult.classification.toUpperCase()}]`,
        },
        ...(evalResult.classification === 'minor'
          ? [
              {
                timestamp: formattedDate,
                stage: '그린패스 발급 (선진행 착수)',
                actor: '시스템',
                action: '승인대기 0초 즉시 전환. 조립 공정설계 착수 허가증 발행',
              },
            ]
          : []),
      ],
    };

    onSubmit(newECR);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Preset Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>ECR 접수 & 위중도 자동 평가기</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">STD-ECO-v2.0</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              신규 ECR 등록 및 5대 영향도 체크리스트
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">테스트 프리셋:</span>
            <button
              type="button"
              onClick={() => applyPreset('minor')}
              className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer"
            >
              경미 (그린패스)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('standard')}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
            >
              일반 (1단계)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('major')}
              className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md transition-colors cursor-pointer"
            >
              중대 (정규심의)
            </button>
          </div>
        </div>

        {/* Dynamic Classification Preview Banner */}
        <div className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
          evalResult.classification === 'minor'
            ? 'bg-emerald-50/70 border-emerald-300'
            : evalResult.classification === 'standard'
            ? 'bg-blue-50/70 border-blue-300'
            : 'bg-rose-50/70 border-rose-300'
        }`}>
          <div className="flex items-start gap-3">
            {evalResult.classification === 'minor' ? (
              <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : evalResult.classification === 'standard' ? (
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white font-mono shadow-2xs">
                  {evalResult.classification === 'minor'
                    ? '그린패스 (GREEN PASS)'
                    : evalResult.classification === 'standard'
                    ? '일반 변경 (STANDARD REVIEW)'
                    : '중대 변경 (MAJOR APPROVAL)'}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {evalResult.classification === 'minor'
                    ? '승인 대기 0초 즉시 착수 허가'
                    : evalResult.classification === 'standard'
                    ? '파트장 1단계 간소화 승인'
                    : '전사 5단계 정규 심의 필수'}
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1">{evalResult.reason}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-2 sm:pt-0 sm:pl-4 shrink-0 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">넘겨주기 횟수</span>
              <strong className="text-slate-900 text-sm">
                {evalResult.handoffCount}회
                <span className="text-[10px] text-slate-500 font-normal ml-1">(기존 5회)</span>
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">결재 대기시간</span>
              <strong className="text-slate-900 text-sm">{evalResult.waitTime} hr</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            1. 변경 대상 파트 및 기본 정보 입력 (PDF 기획서 7절 프로토타입 입력 범위)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1.5">
                변경 요청 제목 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 엔진룸 와이어링 하네스 고정 클램프 홀 위치 2.5mm 이격 변경"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                조립 공정 단계 <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.processStage}
                onChange={(e) => setFormData({ ...formData, processStage: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              >
                <option value="의장 조립 1공정">의장 조립 1공정</option>
                <option value="의장 조립 2공정">의장 조립 2공정</option>
                <option value="샤시 조립 1공정">샤시 조립 1공정</option>
                <option value="샤시 조립 2공정">샤시 조립 2공정</option>
                <option value="도어 조립 공정">도어 조립 공정</option>
                <option value="전동화 배터리 조립">전동화 배터리 조립</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                품번 (Part Number)
              </label>
              <input
                type="text"
                value={formData.partNumber}
                onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                placeholder="예: WH-91820-A03"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                품명 (Part Name)
              </label>
              <input
                type="text"
                value={formData.partName}
                onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
                placeholder="예: Engine Main Harness Bracket"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                변경 유형
              </label>
              <input
                type="text"
                value={formData.changeType}
                onChange={(e) => setFormData({ ...formData, changeType: e.target.value })}
                placeholder="예: 단순 간섭 회피 위치 보정"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1.5">
                변경 사유 및 세부 내용 설명
              </label>
              <textarea
                rows={3}
                value={formData.changeDescription}
                onChange={(e) => setFormData({ ...formData, changeDescription: e.target.value })}
                placeholder="작업자 조립성 향상 및 핀치 포인트(Pinch Point) 방지를 위한 구체적 변경 배경을 기술하세요."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* 5-Point Checklist Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                2. 위중도 사전 평가 5대 체크리스트 (합의 기준 기반)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                5개 항목이 모두 충족(AND)되어야 심의 대기 없는 '경미(그린패스)'로 자동 발급됩니다.
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500">
              충족: {Object.values(checklist).filter(Boolean).length} / 5
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'withinTolerance' as keyof ECRChecklist,
                label: '1. 치수 및 공차 변동량 ±0.5mm 이내',
                desc: '도면 치수 변동이 경미하며 인접 부품과의 클리어런스가 충분히 확보되어 조립 공차 누적 위험이 없음',
              },
              {
                key: 'noJigModification' as keyof ECRChecklist,
                label: '2. 설비 및 치공구(Jig) 신규 제작 / 개조 불필요',
                desc: '현재 조립 라인의 전용 지그, 체결 로봇 핑거, 로케이션 핀의 가공 또는 신규 설비 투자가 전혀 발생하지 않음',
              },
              {
                key: 'safetyRegulatoryFree' as keyof ECRChecklist,
                label: '3. 법규, 안전, 충돌, 배출 등 주요 보안 사양 무관',
                desc: '자동차 안전 기준, 에어백 전개, 제동/조향, 배출가스 인증 등 법규/신뢰성 핵심 관리 항목과 일체 무관함',
              },
              {
                key: 'assemblyCycleTimeNeutral' as keyof ECRChecklist,
                label: '4. 작업 사이클타임(CT) 3초 이내 또는 영향 없음',
                desc: '작업자의 작업 부하를 증가시키지 않으며 공정 라인 밸런스(Line Balancing) 및 생산 택트타임에 영향 없음',
              },
              {
                key: 'noToolInterference' as keyof ECRChecklist,
                label: '5. 공구 간섭 및 체결성 사전 적합 검증 완료',
                desc: '표준 너트러너 및 토크렌치 접근 각도(Tool Clearance) 3D 시뮬레이션 검토가 완료되어 작업자 간섭이 없음',
              },
            ].map((item) => {
              const isChecked = checklist[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleCheckboxToggle(item.key)}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-slate-50/80 border-slate-300 hover:border-slate-400'
                      : 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxToggle(item.key)}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-slate-600 leading-relaxed block">
                      {item.desc}
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isChecked ? '충족 (OK)' : '미충족 (NO)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ECR 등록 및 즉시 워크플로우 반영</span>
          </button>
        </div>
      </form>
    </div>
  );
};
