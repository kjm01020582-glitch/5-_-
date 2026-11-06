import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ScreenOneMust } from './components/ScreenOneMust';
import { PRDViewer } from './components/PRDViewer';
import { ECREvaluationForm } from './components/ECREvaluationForm';
import { WorkflowBoard } from './components/WorkflowBoard';
import { KPIDashboard } from './components/KPIDashboard';
import { CriteriaView } from './components/CriteriaView';
import { INITIAL_ECR_LIST } from './data/mockData';
import { ECRItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('screen1');
  const [ecrList, setEcrList] = useState<ECRItem[]>(INITIAL_ECR_LIST);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleAddNewECR = (newECR: ECRItem) => {
    setEcrList((prev) => [newECR, ...prev]);
    showNotification(
      newECR.classification === 'minor'
        ? `[Must 1 저장 완료 · 그린패스] ${newECR.id} - 승인대기 없이 선진행 착수되었습니다!`
        : `[Must 1 저장 완료] ${newECR.id} - ${newECR.classification === 'standard' ? '1단계 간소화 승인' : '정규 심의'}로 배정되었습니다.`
    );
  };

  const handleNavigateScreen = (screenNum: 1 | 2 | 3) => {
    if (screenNum === 1) setActiveTab('screen1');
    else if (screenNum === 2) setActiveTab('board');
    else if (screenNum === 3) setActiveTab('kpi');
  };

  const handleCompleteFastTrack = (id: string) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setEcrList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'completed',
            timeline: [
              ...item.timeline,
              {
                timestamp: formatted,
                stage: '공정설계 완료 및 사후보고',
                actor: item.requester,
                action: '도면 수정 및 조립 작업표준서(SOP) 개정 완료, 유관부서 사후 공유',
              },
            ],
          };
        }
        return item;
      })
    );
    showNotification(`${id} 공정설계 선진행이 완료 처리되었습니다.`);
  };

  const handleRollbackECR = (id: string, reason: string) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setEcrList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'reclassified_hold',
            classification: 'major',
            handoffCount: 5,
            leadTimeSavedHours: 0,
            isRollbackCase: true,
            classificationReason: `[오분류 롤백 발령] ${reason}`,
            timeline: [
              ...item.timeline,
              {
                timestamp: formatted,
                stage: '오분류 롤백 및 작업 동결',
                actor: '품질/설계 합동검토',
                action: `사유: ${reason}. 선진행 즉시 중단 및 정규 5단계 심의로 강제 이관`,
              },
            ],
          };
        }
        return item;
      })
    );
    showNotification(`[롤백 처리 완료] ${id} 작업이 즉시 동결되고 정규 심의로 이관되었습니다.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 animate-in fade-in slide-in-from-top-2">
          {notification}
        </div>
      )}

      {/* Global Top Bar Contract */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onNewECRClick={() => setActiveTab('screen1')}
        ecrCount={ecrList.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'screen1' && (
          <ScreenOneMust
            onAddNewECR={handleAddNewECR}
            ecrList={ecrList}
            onNavigateScreen={handleNavigateScreen}
          />
        )}
        {activeTab === 'board' && (
          <WorkflowBoard
            ecrList={ecrList}
            onCompleteFastTrack={handleCompleteFastTrack}
            onRollbackECR={handleRollbackECR}
          />
        )}
        {activeTab === 'kpi' && <KPIDashboard ecrList={ecrList} />}
        {activeTab === 'prd' && <PRDViewer />}
        {activeTab === 'criteria' && <CriteriaView />}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>ECR FastTrack</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>경미 설계변경 등급별 승인 축소 기획서 기반 실무 플랫폼</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('screen1')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              화면 ① ECR 입력 (Must 1)
            </button>
            <button
              onClick={() => setActiveTab('board')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              화면 ② 워크플로우
            </button>
            <button
              onClick={() => setActiveTab('kpi')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              화면 ③ 성과 KPI
            </button>
            <button
              onClick={() => setActiveTab('prd')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              PRD 상세 정의서
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
