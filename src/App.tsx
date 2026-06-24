import React, { useState } from 'react';
import { ViewTab, RoleMode, UrgentTask, ActivityLog, ResearcherRecord, NameVariant } from './types';
import { 
  initialUrgentTasks, 
  initialActivityLogs, 
  initialResearchers, 
  initialPortalVariants, 
  workbenchRecordA, 
  workbenchRecordB 
} from './mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { WorkbenchView } from './components/WorkbenchView';
import { ResearchersView } from './components/ResearchersView';
import { ResearcherPortalView } from './components/ResearcherPortalView';
import { SettingsView } from './components/SettingsView';
import { Menu, X, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [roleMode, setRoleMode] = useState<RoleMode>('admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Application State
  const [urgentTasks, setUrgentTasks] = useState<UrgentTask[]>(initialUrgentTasks);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [researchers, setResearchers] = useState<ResearcherRecord[]>(initialResearchers);
  const [portalVariants, setPortalVariants] = useState<NameVariant[]>(initialPortalVariants);

  // Handler: Role Mode change
  const handleRoleModeChange = (newMode: RoleMode) => {
    setRoleMode(newMode);
    if (newMode === 'researcher') {
      setCurrentTab('portal');
    } else if (currentTab === 'portal') {
      setCurrentTab('dashboard');
    }
  };

  // Handler: Urgent task approve
  const handleApproveTask = (taskId: string) => {
    const target = urgentTasks.find(t => t.id === taskId);
    if (!target) return;

    setUrgentTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'approved' } : t));
    
    // Add activity log
    const newLog: ActivityLog = {
      id: `a-${Date.now()}`,
      type: 'admin',
      title: `관리자 [JS]가 ${target.name}의 변이형(${target.variant})을 승인했습니다.`,
      desc: `사번 ${target.idNum} 기록에 공식 출판 메타데이터 연결 완료.`,
      time: '방금 전'
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Handler: Urgent task reject
  const handleRejectTask = (taskId: string) => {
    setUrgentTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'rejected' } : t));
  };

  // Handler: Workbench merge confirmation
  const handleConfirmWorkbenchMerge = (mergedData: any) => {
    // Update researchers list
    setResearchers(prev => prev.map(r => {
      if (r.empId === 'EMP-00921') {
        return {
          ...r,
          officialName: mergedData.name,
          dept: mergedData.dept,
          verificationStatus: 'VERIFIED',
          lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
      }
      return r;
    }));

    // Add activity log
    const log: ActivityLog = {
      id: `a-${Date.now()}`,
      type: 'system',
      title: `큐레이션 워크벤치에서 Eleanor Vance 레코드 병합 확정`,
      desc: `승인된 소속 부서: ${mergedData.dept} | ORCID 및 ROR 통합 검증 완료.`,
      time: '방금 전'
    };
    setActivityLogs(prev => [log, ...prev]);
  };

  // Handler: Add portal variant
  const handleAddPortalVariant = (name: string, type: any) => {
    const newVariant: NameVariant = {
      id: `v-${Date.now()}`,
      name,
      type
    };
    setPortalVariants(prev => [...prev, newVariant]);
  };

  // Handler: Remove portal variant
  const handleRemovePortalVariant = (id: string) => {
    setPortalVariants(prev => prev.filter(v => v.id !== id));
  };

  const urgentConflictsCount = urgentTasks.filter(t => t.status === 'pending').length;
  const notificationsCount = urgentConflictsCount + (researchers.filter(r => r.verificationStatus === 'CONFLICT').length > 0 ? 1 : 0);

  // Render view router
  const renderMainView = () => {
    if (roleMode === 'researcher' || currentTab === 'portal') {
      return (
        <ResearcherPortalView
          variants={portalVariants}
          onAddVariant={handleAddPortalVariant}
          onRemoveVariant={handleRemovePortalVariant}
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            urgentTasks={urgentTasks}
            onApproveTask={handleApproveTask}
            onRejectTask={handleRejectTask}
            activityLogs={activityLogs}
            onNavigateTab={setCurrentTab}
          />
        );
      case 'workbench':
        return (
          <WorkbenchView
            recordA={workbenchRecordA}
            recordB={workbenchRecordB}
            onConfirmMerge={handleConfirmWorkbenchMerge}
            onSplitRecord={() => {}}
          />
        );
      case 'researchers':
        return (
          <ResearchersView
            researchers={researchers}
            searchQuery={searchQuery}
            onNavigateTab={setCurrentTab}
            onSelectResearcher={(r) => {
              if (r.empId === 'EMP-00921' || r.verificationStatus === 'CONFLICT') {
                setCurrentTab('workbench');
              } else {
                alert(`${r.officialName} (${r.empId})\n소속: ${r.dept}\n상태: ${r.verificationStatus}\n키워드: ${r.keywords.join(', ')}`);
              }
            }}
          />
        );
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView
            urgentTasks={urgentTasks}
            onApproveTask={handleApproveTask}
            onRejectTask={handleRejectTask}
            activityLogs={activityLogs}
            onNavigateTab={setCurrentTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden bg-[#f8f9ff] border-b border-[#dfe9fa] p-4 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#003fb1]" />
          <span className="font-bold text-base text-[#003fb1]">기관 전거관리 시스템</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-[#121c28] hover:bg-[#e5eeff]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 flex">
          <div className="w-[260px] bg-[#f8f9ff] h-full shadow-2xl overflow-y-auto animate-fadeIn">
            <Sidebar
              currentTab={currentTab}
              onTabChange={(tab) => {
                setCurrentTab(tab);
                setMobileMenuOpen(false);
                if (roleMode === 'researcher') setRoleMode('admin');
              }}
              roleMode={roleMode}
              onRoleModeChange={(mode) => {
                handleRoleModeChange(mode);
                setMobileMenuOpen(false);
              }}
              urgentConflictsCount={urgentConflictsCount}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Desktop Sidebar (Fixed 260px) */}
      <div className="hidden md:block shrink-0 sticky top-0 h-screen overflow-y-auto">
        <Sidebar
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            if (roleMode === 'researcher') setRoleMode('admin');
          }}
          roleMode={roleMode}
          onRoleModeChange={handleRoleModeChange}
          urgentConflictsCount={urgentConflictsCount}
        />
      </div>

      {/* Main Fluid Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          currentTab={currentTab}
          roleMode={roleMode}
          onTabChange={setCurrentTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notificationsCount={notificationsCount}
        />

        <main className="flex-1 overflow-y-auto">
          {renderMainView()}
        </main>
      </div>
    </div>
  );
}
