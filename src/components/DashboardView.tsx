import React, { useState } from 'react';
import { UrgentTask, ActivityLog, ViewTab } from '../types';
import { Users, Clock, AlertTriangle, FileCheck, CheckCircle2, XCircle, ArrowUpRight, ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';
import { ResearcherList } from './ResearcherList';

interface DashboardViewProps {
  urgentTasks: UrgentTask[];
  onApproveTask: (taskId: string) => void;
  onRejectTask: (taskId: string) => void;
  activityLogs: ActivityLog[];
  onNavigateTab: (tab: ViewTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  urgentTasks,
  onApproveTask,
  onRejectTask,
  activityLogs,
  onNavigateTab
}) => {
  const [showInsightNotice, setShowInsightNotice] = useState(true);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fadeIn">
      {/* 1. Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Researchers */}
        <div className="bg-white p-6 rounded-lg border border-[#dfe9fa] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#434654] uppercase tracking-wider">전체 연구자</span>
            <div className="p-2 bg-[#e5eeff] text-[#003fb1] rounded-md">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#121c28]">12,482</span>
            <span className="text-xs font-semibold text-[#006c4a] flex items-center">
              +2.4%
            </span>
          </div>
        </div>

        {/* Card 2: Pending Verification */}
        <div className="bg-white p-6 rounded-lg border border-[#dfe9fa] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#003fb1] transition-all" onClick={() => onNavigateTab('workbench')}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#434654] uppercase tracking-wider">검증 대기</span>
            <div className="p-2 bg-[#ffdad6] text-[#ba1a1a] rounded-md">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#ba1a1a]">142</span>
            <span className="text-xs text-[#737686]">이름 변이형</span>
          </div>
        </div>

        {/* Card 3: Duplicate IDs */}
        <div className="bg-white p-6 rounded-lg border border-[#dfe9fa] shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#723b00] transition-all" onClick={() => onNavigateTab('workbench')}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#434654] uppercase tracking-wider">중복 ID</span>
            <div className="p-2 bg-[#ffdcc3] text-[#723b00] rounded-md">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono tracking-tight text-[#723b00]">38</span>
            <span className="text-xs text-[#737686]">충돌 기록</span>
          </div>
        </div>

        {/* Card 4: Data Coverage */}
        <div className="bg-white p-6 rounded-lg border border-[#dfe9fa] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#434654] uppercase tracking-wider">데이터 커버리지</span>
            <div className="p-2 bg-[#82f5c1] text-[#006c4a] rounded-md">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-3xl font-bold font-mono tracking-tight text-[#121c28]">95.2%</span>
              <span className="text-xs font-semibold text-[#434654]">목표: 98%</span>
            </div>
            <div className="w-full bg-[#d9e3f4] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#003fb1] h-full rounded-full transition-all duration-1000" style={{ width: '95.2%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Supabase Researcher List */}
      <div className="mt-8 mb-8">
        <ResearcherList />
      </div>

      {/* 2. Middle Row: Urgent Verification Tasks Table & Matching Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Table: 8 columns */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#dfe9fa] shadow-xs overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#dfe9fa] flex items-center justify-between bg-[#f8f9ff]">
            <h3 className="font-bold text-lg text-[#121c28] tracking-tight">긴급 검증 작업</h3>
            <button 
              onClick={() => onNavigateTab('researchers')}
              className="text-xs font-bold text-[#003fb1] hover:underline flex items-center gap-1"
            >
              <span>전체 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#dfe9fa] bg-[#f8f9ff] text-[#434654] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3 px-6">연구자 성명</th>
                  <th className="py-3 px-6">신청 변이형</th>
                  <th className="py-3 px-6">제출일</th>
                  <th className="py-3 px-6 text-center">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfe9fa] text-sm">
                {urgentTasks.filter(t => t.status === 'pending').length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-[#737686]">
                      현재 대기 중인 긴급 검증 작업이 없습니다.
                    </td>
                  </tr>
                ) : (
                  urgentTasks.filter(t => t.status === 'pending').map((task) => (
                    <tr key={task.id} className="hover:bg-[#f8f9ff] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#121c28]">{task.name}</div>
                        <div className="text-xs font-mono text-[#737686]">ID: {task.idNum}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#121c28]">
                        {task.variant}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-[#434654]">
                        {task.date}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onApproveTask(task.id)}
                            className="p-1.5 text-[#006c4a] hover:bg-[#82f5c1]/30 rounded-full transition-all"
                            title="변이형 승인 (Approve)"
                          >
                            <CheckCircle2 className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => onRejectTask(task.id)}
                            className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-full transition-all"
                            title="변이형 반려 (Reject)"
                          >
                            <XCircle className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Insight Chart Sim: 4 columns */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-[#121c28]">Data Matching Insights</h3>
              <BarChart3 className="w-4 h-4 text-[#003fb1]" />
            </div>
            <p className="text-xs text-[#737686] mb-6">외부 ID 식별 (최근 6개월)</p>

            {/* SVG Line Chart Simulation */}
            <div className="relative h-44 w-full pt-4">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-[#c3c5d7]">
                <div className="border-b border-dashed border-[#dfe9fa] w-full"></div>
                <div className="border-b border-dashed border-[#dfe9fa] w-full"></div>
                <div className="border-b border-dashed border-[#dfe9fa] w-full"></div>
                <div className="border-b border-[#dfe9fa] w-full"></div>
              </div>

              {/* SVG Curve */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueWash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#003fb1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#003fb1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,95 Q50,90 100,75 T200,45 T300,15 L300,120 L0,120 Z"
                  fill="url(#blueWash)"
                />
                <path
                  d="M0,95 Q50,90 100,75 T200,45 T300,15"
                  fill="none"
                  stroke="#003fb1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Data points */}
                <circle cx="0" cy="95" r="4" fill="#003fb1" className="hover:scale-150 transition-transform cursor-pointer" />
                <circle cx="60" cy="88" r="4" fill="#003fb1" className="hover:scale-150 transition-transform cursor-pointer" />
                <circle cx="120" cy="72" r="4" fill="#003fb1" className="hover:scale-150 transition-transform cursor-pointer" />
                <circle cx="180" cy="54" r="4" fill="#003fb1" className="hover:scale-150 transition-transform cursor-pointer" />
                <circle cx="240" cy="35" r="4" fill="#003fb1" className="hover:scale-150 transition-transform cursor-pointer" />
                <circle cx="300" cy="15" r="5" fill="#1a56db" stroke="white" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[11px] font-mono text-[#737686] mt-3 uppercase">
              <span>JUN</span>
              <span>JUL</span>
              <span>AUG</span>
              <span>SEP</span>
              <span>OCT</span>
              <span className="font-bold text-[#003fb1]">NOV</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#dfe9fa] flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#003fb1]"></span>
              <span className="text-xs font-medium text-[#121c28]">해결된 ID</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-[#003fb1]">+18%</span>
              <span className="text-[10px] text-[#737686] block font-mono">MoM</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Recent Activity & System Insight Notice Modal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Timeline: 6 cols */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6">
          <h3 className="font-bold text-lg text-[#121c28] mb-6 tracking-tight">최근 활동</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-[7px] before:w-[2px] before:bg-[#dfe9fa]">
            {activityLogs.map((log) => {
              let dotColor = 'bg-[#737686]';
              if (log.type === 'system') dotColor = 'bg-[#003fb1]';
              if (log.type === 'admin') dotColor = 'bg-[#006c4a]';
              if (log.type === 'conflict') dotColor = 'bg-[#723b00]';

              return (
                <div key={log.id} className="relative flex items-start pl-6 group">
                  <span className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white ${dotColor} shadow-xs`}></span>
                  <div className="flex-1 bg-[#f8f9ff] p-3.5 rounded-md border border-transparent group-hover:border-[#dfe9fa] transition-all">
                    <p className="text-sm font-semibold text-[#121c28] mb-1 leading-snug">{log.title}</p>
                    <p className="text-xs text-[#434654] mb-2">{log.desc}</p>
                    <span className="text-[11px] font-mono text-[#737686] block">{log.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Insight Dark Notice Banner: 6 cols */}
        <div className="lg:col-span-6">
          {showInsightNotice ? (
            <div className="bg-[#00174d] text-white p-8 rounded-lg shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
              {/* Decorative background circle */}
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#1a56db]/20 blur-2xl pointer-events-none"></div>
              
              <div>
                <span className="bg-[#1a56db] text-white font-mono text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase mb-4 inline-block">
                  SYSTEM INSIGHT
                </span>
                
                <h3 className="text-2xl font-bold leading-tight mb-4 text-white">
                  전역 전거 매핑이 95% 임계값에 도달했습니다.
                </h3>
                
                <p className="text-sm text-[#d4dcff] leading-relaxed mb-8 max-w-xl font-normal">
                  IRIS 및 Scopus Hub와의 통합을 통해 지난 학기 동안 성명 모호성을 24% 감소시켰습니다. 
                  자동 매칭 알고리즘이 현재 1,200개의 아카이브 기록에 대해 백그라운드 검증을 실행 중입니다.
                </p>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <button
                  onClick={() => onNavigateTab('workbench')}
                  className="bg-[#1a56db] hover:bg-[#003fb1] text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>보고서 검토</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowInsightNotice(false)}
                  className="bg-transparent hover:bg-white/10 text-[#d4dcff] border border-[#d4dcff]/30 px-6 py-2.5 rounded-md font-semibold text-sm transition-all"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#f8f9ff] border border-[#dfe9fa] rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-12 h-12 text-[#006c4a] mb-3 animate-bounce" />
              <h4 className="font-bold text-[#121c28] text-base mb-1">모든 알림 검토 완료</h4>
              <p className="text-xs text-[#737686] mb-4">현재 확인이 필요한 추가 시스템 인사이트 배너가 없습니다.</p>
              <button 
                onClick={() => setShowInsightNotice(true)} 
                className="text-xs font-semibold text-[#003fb1] underline"
              >
                시스템 인사이트 배너 다시 보기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-6 border-t border-[#dfe9fa] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737686] font-mono gap-4">
        <div>© 2023 기관 전거관리 시스템 (ACS) V2.4.11</div>
        <div className="flex items-center gap-6 font-sans">
          <span className="flex items-center gap-1.5 font-semibold text-[#121c28]">
            <span className="w-2 h-2 rounded-full bg-[#006c4a]"></span>
            <span>시스템 상태: 정상</span>
          </span>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('데이터 개인정보 보호 정책:\n본 시스템은 기관 연구 윤리 규정 및 GDPR 표준을 엄격히 준수하여 저자 식별 메타데이터만을 처리합니다.'); }} className="hover:underline">
            데이터 개인정보 정책
          </a>
        </div>
      </footer>
    </div>
  );
};
