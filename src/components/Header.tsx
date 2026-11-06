import React from 'react';
import { FileText, PlusCircle, CheckSquare, GitFork, BarChart3, ShieldCheck } from 'lucide-react';

export type ActiveTab = 'screen1' | 'board' | 'kpi' | 'prd' | 'criteria';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onNewECRClick: () => void;
  ecrCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onNewECRClick,
  ecrCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('screen1')}
              className="text-left group cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                ECR FastTrack
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500">
                조립 공정설계 경미 변경 간소화 & PRD
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onTabChange('screen1')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'screen1'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>화면 ① ECR 입력 (Must 1)</span>
            </button>

            <button
              onClick={() => onTabChange('board')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'board'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>화면 ② 워크플로우 보드</span>
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                {ecrCount}
              </span>
            </button>

            <button
              onClick={() => onTabChange('kpi')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'kpi'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>화면 ③ 성과 KPI</span>
            </button>

            <button
              onClick={() => onTabChange('prd')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'prd'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>상세 PRD 정의서</span>
            </button>

            <button
              onClick={() => onTabChange('criteria')}
              className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'criteria'
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>기준표 & SOP</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNewECRClick}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ 화면 ① 즉시 입력</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => onTabChange('prd')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'prd' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            PRD 요구사항서
          </button>
          <button
            onClick={() => onTabChange('screen1')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'screen1' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            화면 ① ECR 입력
          </button>
          <button
            onClick={() => onTabChange('board')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'board' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            워크플로우 ({ecrCount})
          </button>
          <button
            onClick={() => onTabChange('kpi')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'kpi' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            성과 KPI
          </button>
          <button
            onClick={() => onTabChange('criteria')}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'criteria' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            기준표 & SOP
          </button>
        </div>
      </div>
    </header>
  );
};
