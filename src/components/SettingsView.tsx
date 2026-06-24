import React from 'react';
import { Settings, Shield, Key, Database, Server } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="p-8 max-w-[1000px] mx-auto space-y-6 animate-fadeIn">
      <div className="border-b border-[#dfe9fa] pb-4">
        <h2 className="text-2xl font-bold text-[#121c28]">시스템 환경 설정 (System Settings)</h2>
        <p className="text-sm text-[#434654]">기관 전거관리 시스템의 매칭 임계값, 외부 색인 Hub 및 보안 키를 구성합니다.</p>
      </div>

      <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs divide-y divide-[#dfe9fa]">
        <div className="p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#e5eeff] text-[#003fb1] rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#121c28]">자동 매칭 임계값 규칙</h4>
              <p className="text-xs text-[#737686] mt-1">성명 모호성 알고리즘이 ORCID 및 Scopus ID를 일괄 연동하기 위한 신뢰도 최소 기준점입니다.</p>
            </div>
          </div>
          <select className="bg-[#f8f9ff] border border-[#c3c5d7] rounded px-3 py-1.5 text-xs font-mono font-bold text-[#003fb1]">
            <option>95.0% (권장 기본값)</option>
            <option>98.0% (보수적 승인)</option>
            <option>90.0% (빠른 동기화)</option>
          </select>
        </div>

        <div className="p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#82f5c1]/30 text-[#006c4a] rounded-lg">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#121c28]">출판사 Hub 색인 주기</h4>
              <p className="text-xs text-[#737686] mt-1">Elsevier Scopus 및 IRIS 국가 학술 등록처와의 백그라운드 데이터 교환 동기화 간격입니다.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#006c4a] bg-[#e5f8ee] px-2.5 py-1 rounded">
            매일 02:00 UTC (자동)
          </span>
        </div>

        <div className="p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#ffdad6] text-[#ba1a1a] rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#121c28]">관리자 감사 로그 보관 정책</h4>
              <p className="text-xs text-[#737686] mt-1">레코드 병합 및 분리 작업에 대한 불변성 감사 추적(Immutable Audit Trail) 유지 기간입니다.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#121c28]">
            영구 보관 (Permanent)
          </span>
        </div>
      </div>
    </div>
  );
};
