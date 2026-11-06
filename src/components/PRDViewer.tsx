import React, { useState } from 'react';
import { 
  Copy, 
  Download, 
  Printer, 
  Check, 
  Search, 
  BookOpen, 
  FileCheck2, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PRD_MARKDOWN_CONTENT } from '../data/mockData';

export const PRDViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('all');

  const handleCopy = () => {
    navigator.clipboard.writeText(PRD_MARKDOWN_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([PRD_MARKDOWN_CONTENT], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ECR_FastTrack_PRD_요구사항정의서_초안.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner / Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>기획 다이어리 연계 실무 구현</span>
              <span aria-hidden="true">·</span>
              <span>작성 직무: 조립 공정설계 (생산기술)</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">PRD-ECO-v1.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              상세 요구사항 정의서 & 제품 요구사항 문서 (PRD)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              기획서 PDF(1~6p)의 <strong className="text-slate-900 font-semibold">3대 렌즈 원인 분석, 절차 렌즈 핵심 원인(★), SCAMPER 아이디어, 기획 선배 코멘트 및 3대 질문</strong>을
              실무 소프트웨어 아키텍처와 상세 기능 명세(FR-001~010), 비기능 요건(NFR), 오분류 롤백 SOP로 완전 구현한 공식 정의서입니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="마크다운 전문 복사"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '마크다운 복사'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Markdown 파일 다운로드"
            >
              <Download className="w-4 h-4" />
              <span>.md 다운로드</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>문서 인쇄 / PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Filter & Anchor Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setActiveSection('problem')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'problem'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              문제 정의 & 3대 렌즈
            </button>
            <button
              onClick={() => setActiveSection('scamper')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'scamper'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              SCAMPER & 최종안
            </button>
            <button
              onClick={() => setActiveSection('fr')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'fr'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              기능 명세 (FR)
            </button>
            <button
              onClick={() => setActiveSection('kpi')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSection === 'kpi'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              KPI & 선배 Q&A
            </button>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="요구사항 검색 (예: 그린존, FR-002, 롤백...)"
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Main Document Sections */}
      <div className="space-y-8">
        {/* Section 1: Executive Summary */}
        {(activeSection === 'all' || activeSection === 'problem') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>SECTION 01</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              1. 프로젝트 개요 & 직무 문제정의
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 block mb-1">한 줄 요약 (PDF 기획서 1절)</span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  생산기술 담당자가 조립 공정설계에서 경미한 설계변경을 할 때도 심의 승인이 끝날 때까지 기다리는 문제를,
                  변경 등급(영향도)별로 승인 단계를 줄여서 풀어보는 기획.
                </p>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-100">
                <span className="text-xs font-semibold text-blue-700 block mb-1">문제정의 한 문장 (PDF 기획서 2절)</span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  생산기술 담당자는 도면 설계를 수정할 때 설계변경의 영향도나 경미함에 따라 구분하지 않고 승인이 끝날 때까지 대기하고,
                  그 결과 설계변경을 승인 받을 때까지 불필요한 시간이 소요돼요.
                </p>
              </div>
            </div>

            {/* Structured Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold text-slate-700 uppercase">
                  <tr>
                    <th className="py-2.5 px-4">구분</th>
                    <th className="py-2.5 px-4">현황 (As-Is)</th>
                    <th className="py-2.5 px-4">시스템 개선 후 (To-Be)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 text-xs sm:text-sm">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">대상 직무</td>
                    <td className="py-3 px-4">생산기술 담당자 (조립 공정설계)</td>
                    <td className="py-3 px-4 text-blue-700 font-medium">생산기술 / R&D 설계 / 품질보증 합동 워크스페이스</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">발생 상황</td>
                    <td className="py-3 px-4">도면 설계를 수정하고 작업표준서(SOP)를 개정할 때</td>
                    <td className="py-3 px-4">ECR 등록 즉시 5대 영향도 체크리스트 실시간 판정</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">결재 대기</td>
                    <td className="py-3 px-4 text-rose-600">모든 건 일괄 5단계 정규 심의 결재 완료까지 대기 (건당 48~72시간)</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">경미 건 승인대기 0초 즉시 착수 (선진행 후보고)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">핸드오프 (넘겨주기)</td>
                    <td className="py-3 px-4">부서 간 결재 이관 5회 이상 발생</td>
                    <td className="py-3 px-4 font-semibold">경미 건 1회, 일반 2회로 축소 (목표 3회 이하 달성)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Section 2: 3-Lens Root Cause Analysis */}
        {(activeSection === 'all' || activeSection === 'problem') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <Layers className="w-4 h-4" />
              <span>SECTION 02</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              2. 원인과 근거 분석 (3대 렌즈)
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              PDF 기획서 3절의 분석 프레임워크를 기반으로 직무 낭비를 세부 분해하고 핵심 원인(★)을 시스템적으로 타겟팅했습니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lens 1 */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Lens 01</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">정보 렌즈 (동작 낭비)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  도면과 과거 품질 이력이 여러 폴더에 흩어져 있어 개별 검색하는 동작 낭비 발생. 부서 간 자료 탐색 및 검토 시간 낭비.
                </p>
                <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-700">
                  <span className="font-semibold block text-slate-900">확인할 질문:</span>
                  이 문제가 여전히 발생하는가? (과거 유사 ECR 검색 2.4시간 소요)
                </div>
              </div>

              {/* Lens 2 */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Lens 02</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">기준 렌즈 (불량 낭비)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  수기 엑셀과 육안으로 공구 간섭을 검토해서 체결 불량과 작업부하를 놓치는 불량 낭비 발생. 실제 차량 조립 시 조립불량률 유발.
                </p>
                <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-700">
                  <span className="font-semibold block text-slate-900">확인할 질문:</span>
                  지난달의 불량률이 얼마였는가? (간섭 검토 누락 월 3건 발생)
                </div>
              </div>

              {/* Lens 3 - Core */}
              <div className="border-2 border-blue-500 rounded-xl p-5 bg-blue-50/20 relative">
                <div className="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center justify-between">
                  <span>Lens 03 (★ 핵심 원인)</span>
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">집중 타겟</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">절차 렌즈 (승인 대기 낭비)</h3>
                <p className="text-xs text-slate-700 leading-relaxed mb-4">
                  <strong>ECR 작성 후 설계담당자의 심의 결재가 날 때까지 후속 공정설계가 멈추는 승인 대기 낭비가 1곳 발생.</strong>
                  연구개발과 생산기술 간 승인 리드타임이 길어져 양산 일정이 지연됨.
                </p>
                <div className="text-xs bg-white p-2.5 rounded border border-blue-200 text-slate-800">
                  <span className="font-semibold block text-blue-700">해결 솔루션:</span>
                  경미 변경의 심의 결재 대기를 전면 제거하고 '선진행 후승인' 그린존 규칙 적용!
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: SCAMPER & Selected Solution */}
        {(activeSection === 'all' || activeSection === 'scamper') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>SECTION 03</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              3. SCAMPER 아이디어 도출 및 최종 선정안
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              PDF 기획서 4절과 5절의 발상 기법을 통해 원인을 직접 겨냥한 최적 솔루션을 설계했습니다.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">S (대체)</strong>
                자유 서술형 신청서를 5대 정량 영향도 체크로 대체
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">C (결합)</strong>
                변경 요청서와 위중도 판정 점수를 단일 웹 폼에 결합
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">A (응용)</strong>
                사전 승인 구역(Green Zone Fast-Track) 규칙 적용
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">M (수정)</strong>
                일괄 5단계 심의를 등급별(0단계/1단계/5단계) 차등 축소
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">P (다른 용도)</strong>
                과거 변경 이력을 표준 공차 기준표(SOP) 자산으로 활용
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">E (제거)</strong>
                경미 변경 건의 사전 심의 대기 시간을 완전 제거 (대기 0초)
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <strong className="text-slate-900 block mb-1 font-semibold">R (반전)</strong>
                사전승인 $\rightarrow$ 작업 순서를 선진행 $\rightarrow$ 후보고 순서로 역전
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block mb-1 font-semibold">AI TOP 1위 추천</strong>
                영향도 체크로 경미 변경 자동 분류 및 즉시 착수
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <h4 className="text-sm font-bold text-emerald-950 mb-1">
                최종안 및 고른 이유 (PDF 5절)
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong>최종안:</strong> 승인 단계를 변경 등급별로 축소해요. 경미한 변경은 심의 대기 없이 처리하고, 중대한 변경만 기존 승인을 거치게 하는 방식이에요.<br/>
                <strong>고른 이유:</strong> 위중도 기준의 시각적 표준화로 직관적 의사결정을 유도하여 리드타임을 단축할 수 있어서예요. 불필요한 결재 대기를 없애 넘겨주기 횟수와 대기 낭비를 직접 줄여요.
              </p>
            </div>
          </section>
        )}

        {/* Section 4: Functional Requirements (FR) */}
        {(activeSection === 'all' || activeSection === 'fr') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <FileCheck2 className="w-4 h-4" />
              <span>SECTION 04</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              4. 기능 요구사항 명세 (Functional Requirements)
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              프로토타입 범위(PDF 7절)의 Must 요건 및 시스템 연계 스펙을 표준 FR 번호 체계로 정의했습니다.
            </p>

            <div className="space-y-4">
              {[
                {
                  id: 'FR-001',
                  priority: 'P0 (Must)',
                  title: 'ECR 기본 정보 및 접수 항목 등록',
                  desc: '변경요청ID(자동 채번), 접수일시, 변경 유형·내용, 품번, 품명, 공정단계, 신청자/부서 정보를 저장한다.',
                  input: '품번, 품명, 공정명, 변경 설명 텍스트',
                  output: '신규 ECR 레코드 생성 및 고유 ID 발번',
                },
                {
                  id: 'FR-002',
                  priority: 'P0 (Must)',
                  title: '5대 정량 영향도 체크리스트 평가 엔진',
                  desc: '합의 기준 기반 5대 체크 항목(치수공차 ±0.5mm 이내, 설비/치공구 개조 불필요, 안전/법규 무관, CT 영향 3초 이내, 공구간섭 없음)을 판정한다.',
                  input: '5개 불리언 체크박스 상태',
                  output: '경미(그린패스), 일반, 중대, 판단불가 자동 분류 및 사유 생성',
                },
                {
                  id: 'FR-003',
                  priority: 'P0 (Must)',
                  title: '그린패스(Green Pass) 선진행 즉시 착수 처리',
                  desc: '5개 항목 모두 충족된 경미 건은 결재 대기 없이 즉시 착수 상태(대기 0초)로 전환되며, 핸드오프 카운트를 1회로 고정한다.',
                  input: '경미 분류 이벤트',
                  output: '대기시간 0.0hr 기록, 후속 공정설계 착수 허가증 발급',
                },
                {
                  id: 'FR-004',
                  priority: 'P0 (Must)',
                  title: '등급별 워크플로우 분기 및 알림',
                  desc: '일반 변경은 1단계 파트장 간소화 결재 라인(목표 4시간), 중대 변경은 R&D/품질/생기 5단계 정규 심의 라인으로 자동 라우팅한다.',
                  input: '분류 등급',
                  output: '단계별 담당자 큐(Queue) 할당 및 모바일/웹 알림',
                },
                {
                  id: 'FR-005',
                  priority: 'P0 (Must)',
                  title: '실시간 핸드오프(넘겨주기) 및 타임스탬프 감사 로그',
                  desc: 'ECR 생성, 등급 판정, 승인, 이관, 완료의 모든 행위를 타임스탬프, 담당자, 액션으로 기록하고 핸드오프 누적 횟수를 실시간 계산한다.',
                  input: '상태 전이 이벤트',
                  output: '불변 타임라인 로그 및 핸드오프 횟수 집계',
                },
                {
                  id: 'FR-006',
                  priority: 'P1 (Critical)',
                  title: '오분류 롤백(Rollback / 보완요청) 긴급 안전장치',
                  desc: '경미 선진행 건에서 품질/설계 리스크가 뒤늦게 발견된 경우, 즉시 선진행을 동결하고 "중대 변경으로 재분류 및 작업 보류" 상태로 되돌린다.',
                  input: '오분류 사유 입력 및 롤백 실행',
                  output: '작업 보류 전환, 정규 심의 배정, 양산 배포 락(Lock)',
                },
                {
                  id: 'FR-007',
                  priority: 'P0 (Must)',
                  title: '실시간 KPI 통계 분석 및 비교 집계',
                  desc: '핸드오프 횟수(As-Is 5회 vs To-Be), 경미 건 즉시 처리 비율(%), 평균 대기시간 감축률(%), 누적 절감 시간을 자동 계산한다.',
                  input: 'ECR 전체 데이터셋',
                  output: 'KPI 대시보드 카드, 절감 시간 지표, 달성률 그래프',
                },
                {
                  id: 'FR-008',
                  priority: 'P1 (Important)',
                  title: '3개 부서 사전 합의 기준표 대조 뷰어',
                  desc: '생기-R&D-품질이 합의한 치수공차, 치공구, 안전법규, 택트타임 기준표를 상시 열람하고 버전(v2.0)을 대조할 수 있도록 제공한다.',
                  input: '기준표 조회 요청',
                  output: '영역별 허용 조건 상세 표 및 개정 이력',
                },
                {
                  id: 'FR-009',
                  priority: 'P1 (Important)',
                  title: 'PRD 및 요구사항 정의서 전문 복사 & .md 다운로드',
                  desc: '기획서 원문과 상세 시스템 정의서를 Markdown 파일로 내보내거나 인쇄/PDF로 저장할 수 있도록 지원한다.',
                  input: '내보내기 클릭',
                  output: '클립보드 복사 / .md 파일 다운로드 / 브라우저 인쇄 창',
                },
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{item.priority}</span>
                  </div>
                  <p className="text-xs text-slate-700 mb-2 leading-relaxed">{item.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div>
                      <strong className="text-slate-700">입력:</strong> {item.input}
                    </div>
                    <div>
                      <strong className="text-slate-700">출력:</strong> {item.output}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Non-Functional Requirements (NFR) */}
        {(activeSection === 'all' || activeSection === 'fr') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <Sliders className="w-4 h-4" />
              <span>SECTION 05</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              5. 비기능 요구사항 명세 (Non-Functional Requirements)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono font-bold text-slate-700 block mb-1">NFR-001 성능 및 지연시간</span>
                <p className="text-slate-600 leading-relaxed">
                  5대 체크리스트 변경 시 등급 자동 분류 및 예상 절감시간 연산은 100ms 이내에 즉각 반응하여 현장 작업자의 대기 피로를 제거해야 함.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono font-bold text-slate-700 block mb-1">NFR-002 안전 우선(Fail-Safe) 설계</span>
                <p className="text-slate-600 leading-relaxed">
                  체크 항목 중 하나라도 미확인되거나 불확실한 경우 기본값을 '경미'로 취급하지 않으며, 안전을 위해 최소 '일반' 또는 '판단불가'로 보수적 분류함.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono font-bold text-slate-700 block mb-1">NFR-003 감사 추적 무결성 (Auditability)</span>
                <p className="text-slate-600 leading-relaxed">
                  모든 ECR 판정 이력 및 타임스탬프는 삭제되지 않고 타임라인 이벤트로 영구 보존되어 IATF 16949 자동차 품질 감사를 완벽 통과할 수 있어야 함.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono font-bold text-slate-700 block mb-1">NFR-004 다바이스 적합성 (Tablet/PC)</span>
                <p className="text-slate-600 leading-relaxed">
                  공장 조립 현장용 산업용 태블릿(10인치 이상) 및 사무실 1440px 모니터 환경에서 가로 잘림 없이 직관적인 터치 및 클릭이 가능해야 함.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: KPI & Senior Mentor Feedback Reflection */}
        {(activeSection === 'all' || activeSection === 'kpi') && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>SECTION 06 & 07</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              6. KPI 목표 정의 및 기획 선배 피드백 반영 (Q&A)
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              PDF 6절, 8절의 기획 선배 코멘트(과정 KPI 목표 '이상' 보정, 3대 핵심 질문)를 완벽하게 반영했습니다.
            </p>

            {/* KPI Table with Senior Fix */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg mb-8">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2.5 px-4">지표명</th>
                    <th className="py-2.5 px-4">현재값 (As-Is)</th>
                    <th className="py-2.5 px-4">목표값 (To-Be)</th>
                    <th className="py-2.5 px-4">선배 코멘트 보완 사항</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 text-xs">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      결과 KPI: 경미 설계변경 넘겨주기(핸드오프) 횟수
                    </td>
                    <td className="py-3 px-4 font-mono">5회 (가정)</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">3회 이하 (최대 1회)</td>
                    <td className="py-3 px-4 text-slate-600">ECR 발행부터 공정설계 착수까지 거치는 부서 간 결재 단계 수</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      과정 KPI: 경미 변경 즉시 처리 적용 비율 (%)
                    </td>
                    <td className="py-3 px-4 font-mono">0% (전건 대기)</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">80% 이상 달성</td>
                    <td className="py-3 px-4 text-emerald-700 font-medium">
                      ★ 선배 피드백 반영: '3 이하' 오류를 '80% 이상'으로 보정하고 단위(%) 명시
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      효율 지표: 경미 건 평균 승인 대기시간
                    </td>
                    <td className="py-3 px-4 font-mono">48.0 시간</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">0.2 시간 이내</td>
                    <td className="py-3 px-4 text-slate-600">그린존 선진행 즉시 착수를 통해 대기시간 99% 단축</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Senior Mentor 3 Questions Callout */}
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>기획 선배의 핵심 질문 3가지에 대한 시스템 구현 해답 (PDF 8절)</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">
                  Q1. '경미'와 '중대'를 가르는 체크 항목은 구체적으로 무엇이고 누구와 합의할까?
                </span>
                <p className="text-slate-700 leading-relaxed mb-2">
                  <strong>시스템 해답:</strong> 생산기술, R&D(설계), 품질보증 3자 합동 '설계변경 위중도 표준 협의체'를 통해 확정된 5대 정량 체크 항목을 앱에 내장했습니다.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>도면 치수 및 공차 변동량 ±0.5mm 이내 및 인접 클리어런스 확보 여부</li>
                  <li>조립 라인의 설비/치공구(Jig) 신규 제작 및 가공 불필요 여부</li>
                  <li>자동차 안전/법규/배출가스/보안 규격과 100% 무관한지 여부</li>
                  <li>작업자의 조립 사이클타임(CT) 3초 이내 또는 영향 없음</li>
                  <li>너트러너 및 토크 공구 접근성(Tool Clearance) 사전 시뮬레이션 검증 완료</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">
                  Q2. 판단 불가인 건은 어떤 경로로 보내고, 오분류가 나면 어떻게 되돌릴까?
                </span>
                <p className="text-slate-700 leading-relaxed mb-2">
                  <strong>시스템 해답:</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block mb-1">1) 판단 불가 건</strong>
                    그린패스를 즉시 차단하고 '전문가 협의 큐'로 라우팅되어 24시간 내 R&D 및 생기 파트장이 합동 재판정.
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-rose-600 block mb-1">2) 오분류 롤백 (Rollback SOP)</strong>
                    경미 건 진행 중 결함 리스크가 발견되면 워크플로우 보드에서 [오분류 롤백] 클릭 시 즉시 공정설계 작업이 '작업 보류(Hold)'로 동결되며 정규 5단계 심의로 강제 전환.
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm mb-1">
                  Q3. 현재 대기시간과 넘겨주기 횟수를 어떤 기록으로 확인할 수 있을까?
                </span>
                <p className="text-slate-700 leading-relaxed">
                  <strong>시스템 해답:</strong> 모든 ECR마다 불변 타임스탬프 이벤트 로그(Event Log)를 저장합니다.
                  접수일시, 분류판정일시, 선진행착수일시, 승인완료일시가 기록되며, 결재선 이관 이벤트마다 핸드오프 카운터가 투명하게 집계되어 상시 감사 가능합니다.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
