import React from 'react';
import { ShieldCheck, AlertOctagon, Scale, Users, CheckCircle2, FileText } from 'lucide-react';
import { CRITERIA_DEFINITIONS } from '../data/mockData';

export const CriteriaView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>부서 간 사전 합의 기준 (SOP)</span>
          <span aria-hidden="true">·</span>
          <span>기준 버전: STD-ECO-2026-v2.0</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          3개 부서(생기·R&D·품질) 설계변경 위중도 합의 기준표 & 롤백 SOP
        </h2>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          기획 선배 질문 1번("경미와 중대를 가르는 기준은 무엇이고 누구와 합의할까?")과 2번("오분류가 나면 어떻게 되돌릴까?")에 대한
          전사 표준 합의 기준 및 안전 거버넌스 규정집입니다.
        </p>
      </div>

      {/* Stakeholder Sign-off Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-900">전사 합의 승인 완료:</span>
          <span className="text-slate-600">설계변경 위중도 표준 협의회 의결</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            생산기술부장 [서명]
          </span>
          <span className="flex items-center gap-1 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            R&D 차체/의장설계실장 [서명]
          </span>
          <span className="flex items-center gap-1 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            품질보증총괄실장 [서명]
          </span>
        </div>
      </div>

      {/* Criteria Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>설계변경 위중도 5대 평가 영역 및 등급 분류 기준</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">5대 기준 AND 충족 시 경미(그린패스)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 text-xs font-semibold uppercase">
              <tr>
                <th className="py-3 px-4 w-40">평가 영역</th>
                <th className="py-3 px-4 text-emerald-800 bg-emerald-50/70">
                  경미 변경 (그린패스 · 선진행)
                </th>
                <th className="py-3 px-4 text-blue-800 bg-blue-50/70">
                  일반 변경 (1단계 간소화)
                </th>
                <th className="py-3 px-4 text-rose-800 bg-rose-50/70">
                  중대 변경 (정규 5단계 심의)
                </th>
                <th className="py-3 px-4 w-36">주관 합의 부서</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 text-xs leading-relaxed">
              {CRITERIA_DEFINITIONS.map((def, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/50">
                    {def.category}
                  </td>
                  <td className="py-3 px-4 text-emerald-950 font-medium bg-emerald-50/20">
                    {def.minorRule}
                  </td>
                  <td className="py-3 px-4 text-blue-950 bg-blue-50/20">
                    {def.standardRule}
                  </td>
                  <td className="py-3 px-4 text-rose-950 font-semibold bg-rose-50/20">
                    {def.majorRule}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {def.stakeholder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rollback SOP & Edge Case Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rollback SOP */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <AlertOctagon className="w-5 h-5" />
            <h3 className="text-base font-bold">오분류 긴급 롤백(Rollback) 절차 규정</h3>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            경미 건으로 분류되어 선진행(공정설계) 중이던 ECR에서 잠재적 품질 결함이나 간섭이 사후 발견될 경우의 안전 대책입니다.
          </p>

          <ol className="list-decimal pl-5 space-y-2.5 text-xs text-slate-700">
            <li>
              <strong className="text-slate-900">긴급 보류 발령:</strong> 품질보증팀 또는 R&D 검토자는 워크플로우 보드에서 [오분류 롤백] 버튼을 즉시 실행하여 ECR 상태를 '작업 보류(Hold)'로 강제 동결합니다.
            </li>
            <li>
              <strong className="text-slate-900">선진행 산출물 락(Lock):</strong> 현재까지 작성된 도면 및 작업지도서(SOP)의 현장 양산 라인 배포를 시스템 레벨에서 자동 차단합니다.
            </li>
            <li>
              <strong className="text-slate-900">정규 5단계 심의 강제 이관:</strong> R&D/품질/생기 3개 부서 합동 비상 심의회 안건으로 자동 전환되며, 오분류 원인을 분석하여 기준표 보완 보드에 등록합니다.
            </li>
          </ol>
        </div>

        {/* Gray Zone Protocol */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-bold">판단 불가(Gray Zone) 안건 처리 규칙</h3>
          </div>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            신규 공법, 이종 소재 체결, 또는 체크리스트 판정이 모호한 건에 대한 안전 우선(Fail-Safe) 운영 원칙입니다.
          </p>

          <ul className="list-disc pl-5 space-y-2.5 text-xs text-slate-700">
            <li>
              <strong className="text-slate-900">Fail-Safe 원칙:</strong> 판단이 불확실한 경우 절대 그린패스(선진행)를 발급하지 않으며, 보수적 기준에 따라 '심의 대기'로 라우팅합니다.
            </li>
            <li>
              <strong className="text-slate-900">24시간 신속 판정 큐:</strong> 생기파트장과 R&D 주관 연구원이 24시간 이내에 3D DMU(Digital Mock-up)로 합동 간섭을 검토합니다.
            </li>
            <li>
              <strong className="text-slate-900">기준표 자동 개정:</strong> 해결된 판단 불가 사례는 분기별 기준표(STD-ECO) 개정 회의에서 공식 기준 규칙으로 승격 반영됩니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
