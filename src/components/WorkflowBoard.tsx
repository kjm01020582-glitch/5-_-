import React, { useState } from 'react';
import { 
  GitFork, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  History, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';
import { ECRItem, WorkflowStatus } from '../types';

interface WorkflowBoardProps {
  ecrList: ECRItem[];
  onCompleteFastTrack: (id: string) => void;
  onRollbackECR: (id: string, reason: string) => void;
}

export const WorkflowBoard: React.FC<WorkflowBoardProps> = ({
  ecrList,
  onCompleteFastTrack,
  onRollbackECR,
}) => {
  const [selectedECR, setSelectedECR] = useState<ECRItem | null>(null);
  const [rollbackTarget, setRollbackTarget] = useState<ECRItem | null>(null);
  const [rollbackReason, setRollbackReason] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'fast_track' | 'review' | 'completed' | 'hold'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = ecrList.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requester.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'fast_track') return item.status === 'fast_track_started';
    if (statusFilter === 'review') return item.status === 'pending_standard_review' || item.status === 'pending_major_review';
    if (statusFilter === 'completed') return item.status === 'completed';
    if (statusFilter === 'hold') return item.status === 'reclassified_hold';
    return true;
  });

  const handleRollbackSubmit = () => {
    if (!rollbackTarget) return;
    if (!rollbackReason.trim()) {
      alert('롤백/재분류 사유를 입력해주세요.');
      return;
    }
    onRollbackECR(rollbackTarget.id, rollbackReason);
    setRollbackTarget(null);
    setRollbackReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>실시간 ECR 처리 경로 및 핸드오프 추적</span>
            <span aria-hidden="true">·</span>
            <span>총 {ecrList.length}건 등록</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            ECR 워크플로우 & 예외/롤백 관리 보드
          </h2>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              전체 ({ecrList.length})
            </button>
            <button
              onClick={() => setStatusFilter('fast_track')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'fast_track' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              그린존 선진행 ({ecrList.filter((i) => i.status === 'fast_track_started').length})
            </button>
            <button
              onClick={() => setStatusFilter('review')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'review' ? 'bg-white text-blue-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              심의 대기 ({ecrList.filter((i) => i.status.includes('pending')).length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              완료 ({ecrList.filter((i) => i.status === 'completed').length})
            </button>
            <button
              onClick={() => setStatusFilter('hold')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === 'hold' ? 'bg-white text-rose-700 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              롤백/보류 ({ecrList.filter((i) => i.status === 'reclassified_hold').length})
            </button>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="품번, ECR 번호, 신청자..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Grid of ECR Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item) => {
          const isMinor = item.classification === 'minor';
          const isStandard = item.classification === 'standard';
          const isHold = item.status === 'reclassified_hold';

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-sm ${
                isHold
                  ? 'border-rose-300 bg-rose-50/20'
                  : item.status === 'fast_track_started'
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono font-bold text-slate-900">{item.id}</span>
                  <span>{item.processStage}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Part Info */}
                <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">품번:</span>
                    <span className="font-mono font-medium text-slate-800">{item.partNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">품명:</span>
                    <span className="truncate max-w-[180px] text-slate-800">{item.partName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">신청자:</span>
                    <span className="text-slate-800">{item.requester}</span>
                  </div>
                </div>

                {/* Status & Handoff Summary */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">핸드오프 (넘겨주기)</span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.handoffCount}회{' '}
                      <span className="text-[10px] text-slate-500 font-normal">
                        ({item.handoffCount <= 2 ? '대폭 감축' : '기존 정규'})
                      </span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">결재 대기시간</span>
                    <span className="font-mono font-bold text-slate-900">
                      {item.waitTimeHours} hr
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block">절감 리드타임</span>
                    <span className="font-mono font-bold text-emerald-600">
                      +{item.leadTimeSavedHours} hr
                    </span>
                  </div>
                </div>

                {/* Classification Note */}
                <div className="mt-3 text-[11px] text-slate-600 leading-tight">
                  <span className="font-semibold text-slate-700">판정 근거: </span>
                  {item.classificationReason}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedECR(item)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium py-1 cursor-pointer"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>타임라인 이력</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {item.status === 'fast_track_started' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setRollbackTarget(item)}
                        className="px-2.5 py-1 text-rose-600 bg-rose-50 hover:bg-rose-100 font-semibold rounded-md transition-colors cursor-pointer"
                        title="기획 선배 질문 2 반영: 오분류 시 즉시 작업보류 및 정규심의 롤백"
                      >
                        오분류 롤백
                      </button>
                      <button
                        type="button"
                        onClick={() => onCompleteFastTrack(item.id)}
                        className="px-2.5 py-1 text-white bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        선진행 완료
                      </button>
                    </>
                  )}

                  {item.status === 'completed' && (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      완료됨
                    </span>
                  )}

                  {item.status === 'reclassified_hold' && (
                    <span className="text-rose-700 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      작업 보류 (롤백됨)
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Modal */}
      {selectedECR && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {selectedECR.id} 타임스탬프 감사 이력
                </span>
                <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs">
                  {selectedECR.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedECR(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {selectedECR.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-4 border-l-2 border-blue-200 last:border-transparent text-xs">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-600" />
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[11px] mb-0.5">
                    <span>{event.timestamp}</span>
                    <span>{event.actor}</span>
                  </div>
                  <span className="font-bold text-slate-900 block">{event.stage}</span>
                  <p className="text-slate-600 mt-0.5">{event.action}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedECR(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rollback Confirmation Modal (Senior Question #2 Implementation) */}
      {rollbackTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-rose-200">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold">오분류 롤백 및 작업 보류 (Rollback SOP)</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              기획 선배 질문 2번 반영: 경미 건으로 선진행 중이던 <strong className="text-slate-900">{rollbackTarget.id}</strong> 건에 대해
              품질/안전 결함이 뒤늦게 확인되었을 경우, 즉시 선진행을 중단하고 '정규 심의'로 강제 회수합니다.
            </p>

            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              롤백 및 재분류 사유 <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={rollbackReason}
              onChange={(e) => setRollbackReason(e.target.value)}
              placeholder="예: 3D 시뮬레이션 결과 토크렌치 접근 각도에서 인접 브래킷 간섭 2mm 발견. 중대 심의로 전환 필요."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900 mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setRollbackTarget(null);
                  setRollbackReason('');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleRollbackSubmit}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer transition-colors shadow-xs"
              >
                즉시 작업 보류 및 롤백 실행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
