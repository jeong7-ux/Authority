import React from 'react';
import { ViewTab, RoleMode } from '../types';
import { Search, Bell, History, Shield, User } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  roleMode: RoleMode;
  onTabChange: (tab: ViewTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  roleMode,
  onTabChange,
  searchQuery,
  onSearchChange,
  notificationsCount
}) => {
  const getTitle = () => {
    if (roleMode === 'researcher') {
      return (
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#003fb1] text-base tracking-tight">연구자 포털</span>
          <div className="h-4 w-[1px] bg-[#c3c5d7]"></div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-[#003fb1] font-semibold border-b-2 border-[#003fb1] pb-1">내 프로필</span>
            <span className="text-[#434654] hover:text-[#121c28] cursor-pointer">연구 실적</span>
            <span className="text-[#434654] hover:text-[#121c28] cursor-pointer">소속 정보</span>
          </div>
        </div>
      );
    }

    switch (currentTab) {
      case 'dashboard':
        return <h2 className="text-xl font-bold text-[#121c28] tracking-tight">관리자 콘솔 개요</h2>;
      case 'workbench':
        return <h2 className="text-xl font-bold text-[#121c28] tracking-tight">큐레이션 워크벤치</h2>;
      case 'researchers':
        return <h2 className="text-xl font-bold text-[#121c28] tracking-tight">Researcher Master Database</h2>;
      case 'settings':
        return <h2 className="text-xl font-bold text-[#121c28] tracking-tight">시스템 설정 (System Settings)</h2>;
      default:
        return <h2 className="text-xl font-bold text-[#121c28] tracking-tight">관리자 콘솔</h2>;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#dfe9fa] px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-6 flex-1">
        {getTitle()}
      </div>

      <div className="flex items-center gap-6">
        {/* Search Input */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-[#737686] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentTab !== 'researchers' && roleMode === 'admin') {
                onTabChange('researchers');
              }
            }}
            placeholder={roleMode === 'researcher' ? "레코드 검색..." : "사번 또는 이름으로 검색..."}
            className="w-full bg-[#f8f9ff] border border-[#c3c5d7] rounded-md pl-9 pr-4 py-1.5 text-sm text-[#121c28] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#003fb1] focus:bg-white transition-all"
          />
        </div>

        {/* Quick links in workbench mode */}
        {roleMode === 'admin' && currentTab === 'workbench' && (
          <div className="hidden xl:flex items-center gap-4 text-xs font-semibold text-[#434654]">
            <span className="hover:text-[#003fb1] cursor-pointer">내 프로필</span>
            <span className="hover:text-[#003fb1] cursor-pointer">출판물</span>
            <span className="hover:text-[#003fb1] cursor-pointer">소속</span>
          </div>
        )}

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('새로운 전거 매핑 알림 3건이 있습니다.\n1. ORCID 자동 연동 12건\n2. 물리학과 변이형 대기 5건')}
            className="relative p-2 text-[#434654] hover:bg-[#f8f9ff] hover:text-[#003fb1] rounded-full transition-all"
          >
            <Bell className="w-5 h-5" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            )}
          </button>

          <button 
            onClick={() => alert('백그라운드 동기화 큐레이션 엔진이 작동 중입니다. (마지막 동기화: 2분 전)')}
            className="p-2 text-[#434654] hover:bg-[#f8f9ff] hover:text-[#003fb1] rounded-full transition-all"
            title="동기화 기록 및 내역"
          >
            <History className="w-5 h-5" />
          </button>

          <div className="h-6 w-[1px] bg-[#dfe9fa] mx-1"></div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 cursor-pointer p-1 pl-2 rounded-full hover:bg-[#f8f9ff] transition-all">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xs ${
              roleMode === 'admin' ? 'bg-[#003fb1]' : 'bg-[#006c4a]'
            }`}>
              {roleMode === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <span className="text-xs font-bold text-[#121c28] hidden sm:inline">
              {roleMode === 'admin' ? '관리자 [JS]' : 'Dr. Rostova'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
