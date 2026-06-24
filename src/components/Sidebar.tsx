import React from 'react';
import { ViewTab, RoleMode } from '../types';
import { LayoutDashboard, Briefcase, Users, Settings, HelpCircle, ShieldCheck, UserCheck } from 'lucide-react';

interface SidebarProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  roleMode: RoleMode;
  onRoleModeChange: (mode: RoleMode) => void;
  urgentConflictsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  roleMode,
  onRoleModeChange,
  urgentConflictsCount
}) => {
  return (
    <aside className="w-[260px] bg-[#f8f9ff] border-r border-[#dfe9fa] flex flex-col justify-between shrink-0 min-h-screen select-none">
      <div>
        {/* Brand Logo */}
        <div className="p-6 border-b border-[#dfe9fa]">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-[#003fb1]" />
            <h1 className="font-bold text-lg tracking-tight text-[#003fb1]">기관 전거관리 시스템</h1>
          </div>
          <p className="text-xs text-[#434654] font-medium tracking-wide uppercase">ACS Authority Control</p>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              currentTab === 'dashboard'
                ? 'bg-[#003fb1] text-white shadow-xs'
                : 'text-[#121c28] hover:bg-[#e5eeff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>대시보드</span>
            </div>
          </button>

          <button
            onClick={() => onTabChange('workbench')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              currentTab === 'workbench'
                ? 'bg-[#003fb1] text-white shadow-xs'
                : 'text-[#121c28] hover:bg-[#e5eeff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4" />
              <span>워크벤치</span>
            </div>
            {urgentConflictsCount > 0 && (
              <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono font-bold ${
                currentTab === 'workbench' ? 'bg-white text-[#003fb1]' : 'bg-[#ba1a1a] text-white'
              }`}>
                {urgentConflictsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('researchers')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
              currentTab === 'researchers'
                ? 'bg-[#003fb1] text-white shadow-xs'
                : 'text-[#121c28] hover:bg-[#e5eeff]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>연구자 관리</span>
            </div>
          </button>
        </nav>
      </div>

      <div>
        {/* Settings & Support */}
        <div className="p-4 space-y-1 border-t border-[#dfe9fa]">
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all ${
              currentTab === 'settings' ? 'bg-[#e5eeff] text-[#003fb1] font-semibold' : 'text-[#434654] hover:bg-[#e5eeff]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => alert('기관 전거관리 지원팀 문의:\n연락처: support@acs-portal.edu\n내선: 4092')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm text-[#434654] hover:bg-[#e5eeff] transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </button>
        </div>

        {/* Role Switcher Banner */}
        <div className="p-4 border-t border-[#dfe9fa] bg-[#eef4ff]">
          <div className="text-[11px] font-bold text-[#003fb1] uppercase tracking-wider mb-2">포털 보기 전환 (Mode Switch)</div>
          <div className="grid grid-cols-2 p-1 bg-[#d9e3f4] rounded-md gap-1">
            <button
              onClick={() => onRoleModeChange('admin')}
              className={`py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                roleMode === 'admin' ? 'bg-[#003fb1] text-white shadow-xs' : 'text-[#434654] hover:text-[#121c28]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>관리자 콘솔</span>
            </button>
            <button
              onClick={() => onRoleModeChange('researcher')}
              className={`py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                roleMode === 'researcher' ? 'bg-[#006c4a] text-white shadow-xs' : 'text-[#434654] hover:text-[#121c28]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>연구자 포털</span>
            </button>
          </div>
        </div>

        {/* User Info Footnote */}
        <div className="p-4 border-t border-[#dfe9fa] flex items-center gap-3 bg-white">
          <div className="w-8 h-8 rounded-full bg-[#1a56db] text-white flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#121c28] truncate">기관 관리자</p>
            <p className="text-[11px] font-mono text-[#737686] truncate">admin@acs-portal.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
