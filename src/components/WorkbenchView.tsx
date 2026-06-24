import React, { useState } from 'react';
import { MergeRecordData } from '../types';
import { Split, GitMerge, AlertTriangle, Check, X, ArrowDownToLine, ShieldAlert, CheckCircle2, FileWarning } from 'lucide-react';

interface WorkbenchViewProps {
  recordA: MergeRecordData;
  recordB: MergeRecordData;
  onConfirmMerge: (mergedData: any) => void;
  onSplitRecord: () => void;
}

export const WorkbenchView: React.FC<WorkbenchViewProps> = ({
  recordA,
  recordB,
  onConfirmMerge,
  onSplitRecord
}) => {
  // State for which record won each field: 'A' | 'B'
  const [selectedFields, setSelectedFields] = useState<{
    empId: 'A' | 'B';
    name: 'A' | 'B';
    dept: 'A' | 'B';
    keywords: 'A' | 'B';
  }>({
    empId: 'A',
    name: 'A',
    dept: 'A', // Conflict resolved by user picking A or B
    keywords: 'A'
  });

  const [showAlertNotice, setShowAlertNotice] = useState(true);
  const [mergeSuccessToast, setMergeSuccessToast] = useState<string | null>(null);

  const handleToggleField = (field: keyof typeof selectedFields, source: 'A' | 'B') => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: source
    }));
  };

  const handleExecuteMerge = () => {
    const finalMerged = {
      empId: selectedFields.empId === 'A' ? recordA.empId : recordB.empId,
      name: selectedFields.name === 'A' ? recordA.name : recordB.name,
      dept: selectedFields.dept === 'A' ? recordA.dept : recordB.dept,
      keywords: selectedFields.keywords === 'A' ? recordA.keywords : recordB.keywords,
      orcid: recordA.orcid,
      ror: recordB.ror,
      scopusId: recordA.scopusId
    };

    setMergeSuccessToast(`성공적으로 병합되었습니다! (승인 부서: ${finalMerged.dept})`);
    onConfirmMerge(finalMerged);
    setTimeout(() => setMergeSuccessToast(null), 5000);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto animate-fadeIn relative pb-24">
      {/* Toast Notification */}
      {mergeSuccessToast && (
        <div className="fixed top-20 right-8 z-50 bg-[#006c4a] text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold text-sm">{mergeSuccessToast}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121c28] tracking-tight mb-1">큐레이션 워크벤치</h2>
          <p className="text-sm text-[#434654]">연구자 식별 데이터의 통합 및 분리를 통해 레코드 모호성을 해결합니다.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onSplitRecord();
              alert('레코드가 성공적으로 분리되었습니다. 두 기록이 독립적인 식별자로 등록됩니다.');
            }}
            className="bg-white hover:bg-[#f8f9ff] text-[#121c28] border border-[#c3c5d7] px-5 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
          >
            <Split className="w-4 h-4 rotate-90 text-[#434654]" />
            <span>레코드 분리</span>
          </button>

          <button
            onClick={handleExecuteMerge}
            className="bg-[#003fb1] hover:bg-[#1a56db] text-white px-6 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
          >
            <GitMerge className="w-4 h-4" />
            <span>병합 확정</span>
          </button>
        </div>
      </div>

      {/* Dual Pane Grid: Record A & Record B */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ===================== RECORD A (LEFT) ===================== */}
        <div className={`bg-white rounded-lg border-2 shadow-sm transition-all ${
          selectedFields.dept === 'A' ? 'border-[#003fb1]' : 'border-[#dfe9fa]'
        }`}>
          {/* Card Title Banner */}
          <div className="p-5 border-b border-[#dfe9fa] flex items-center justify-between bg-[#f8f9ff] rounded-t-lg">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#003fb1] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                A
              </span>
              <div>
                <h3 className="font-bold text-base text-[#121c28]">연구자 A (원본)</h3>
                <span className="text-xs font-mono text-[#737686]">UUID: {recordA.uuid}</span>
              </div>
            </div>

            <span className="bg-[#82f5c1]/40 text-[#006c4a] border border-[#006c4a]/20 text-xs font-bold px-2.5 py-1 rounded">
              검증됨
            </span>
          </div>

          {/* Fields Table */}
          <div className="p-6 space-y-4 text-sm">
            {/* Field 1: 사번 */}
            <div className="flex items-center justify-between py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase w-28">사번</span>
              <span className="font-mono font-bold text-[#121c28] flex-1">{recordA.empId}</span>
              <input
                type="checkbox"
                checked={selectedFields.empId === 'A'}
                onChange={() => handleToggleField('empId', 'A')}
                className="w-5 h-5 accent-[#003fb1] rounded cursor-pointer"
              />
            </div>

            {/* Field 2: 성명 */}
            <div className="flex items-center justify-between py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase w-28">성명</span>
              <span className="font-bold text-[#121c28] flex-1">{recordA.name}</span>
              <input
                type="checkbox"
                checked={selectedFields.name === 'A'}
                onChange={() => handleToggleField('name', 'A')}
                className="w-5 h-5 accent-[#003fb1] rounded cursor-pointer"
              />
            </div>

            {/* Field 3: 소속 부서 (CONFLICT HIGHLIGHT) */}
            <div className="flex items-center justify-between p-3 rounded-md bg-[#ffdad6]/60 border border-[#ba1a1a]/30 transition-all">
              <span className="text-xs font-bold text-[#ba1a1a] uppercase w-28 flex items-center gap-1">
                <FileWarning className="w-3.5 h-3.5" />
                <span>소속 부서</span>
              </span>
              <span className="font-bold text-[#ba1a1a] flex-1">{recordA.dept}</span>
              <input
                type="checkbox"
                checked={selectedFields.dept === 'A'}
                onChange={() => handleToggleField('dept', 'A')}
                className="w-5 h-5 accent-[#ba1a1a] rounded cursor-pointer"
              />
            </div>

            {/* Field 4: 연구 키워드 */}
            <div className="py-2 border-b border-[#f0f4fa]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#434654] uppercase">연구 키워드</span>
                <input
                  type="checkbox"
                  checked={selectedFields.keywords === 'A'}
                  onChange={() => handleToggleField('keywords', 'A')}
                  className="w-4 h-4 accent-[#003fb1] rounded cursor-pointer"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recordA.keywords.map((k, idx) => (
                  <span key={idx} className="bg-[#e5eeff] text-[#003fb1] px-2.5 py-1 rounded text-xs font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Field 5: 외부 식별자 */}
            <div className="py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase block mb-2">외부 식별자</span>
              <div className="space-y-1 font-mono text-xs text-[#121c28]">
                <div className="flex justify-between">
                  <span className="text-[#737686]">ORCID</span>
                  <span className="font-semibold">{recordA.orcid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">SCOPUS ID</span>
                  <span className="font-semibold">{recordA.scopusId}</span>
                </div>
              </div>
            </div>

            {/* Field 6: 최근 활동 Placeholder thumbnail */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#434654] uppercase block mb-2">최근 활동</span>
              <div className="border border-dashed border-[#dfe9fa] rounded-lg p-4 bg-[#f8f9ff] flex items-center justify-center h-24 relative overflow-hidden">
                {/* Simulated activity curve */}
                <svg className="w-32 h-16 opacity-60" viewBox="0 0 100 50">
                  <path d="M0,45 Q20,40 40,30 T80,10 L100,5" fill="none" stroke="#003fb1" strokeWidth="3" />
                  <path d="M0,45 Q20,40 40,30 T80,10 L100,5 L100,50 L0,50 Z" fill="#003fb1" opacity="0.15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== RECORD B (RIGHT) ===================== */}
        <div className={`bg-white rounded-lg border-2 shadow-sm transition-all ${
          selectedFields.dept === 'B' ? 'border-[#003fb1]' : 'border-[#dfe9fa]'
        }`}>
          {/* Card Title Banner */}
          <div className="p-5 border-b border-[#dfe9fa] flex items-center justify-between bg-[#f8f9ff] rounded-t-lg">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#006c4a] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                B
              </span>
              <div>
                <h3 className="font-bold text-base text-[#121c28]">연구자 B (대상)</h3>
                <span className="text-xs font-mono text-[#737686]">UUID: {recordB.uuid}</span>
              </div>
            </div>

            <span className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/20 text-xs font-bold px-2.5 py-1 rounded">
              미인증
            </span>
          </div>

          {/* Fields Table */}
          <div className="p-6 space-y-4 text-sm">
            {/* Field 1: 사번 */}
            <div className="flex items-center justify-between py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase w-28">사번</span>
              <span className="font-mono font-bold text-[#121c28] flex-1">{recordB.empId}</span>
              <input
                type="checkbox"
                checked={selectedFields.empId === 'B'}
                onChange={() => handleToggleField('empId', 'B')}
                className="w-5 h-5 accent-[#003fb1] rounded cursor-pointer"
              />
            </div>

            {/* Field 2: 성명 */}
            <div className="flex items-center justify-between py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase w-28">성명</span>
              <span className="font-bold text-[#121c28] flex-1">{recordB.name}</span>
              <input
                type="checkbox"
                checked={selectedFields.name === 'B'}
                onChange={() => handleToggleField('name', 'B')}
                className="w-5 h-5 accent-[#003fb1] rounded cursor-pointer"
              />
            </div>

            {/* Field 3: 소속 부서 (CONFLICT HIGHLIGHT) */}
            <div className="flex items-center justify-between p-3 rounded-md bg-[#ffdad6]/60 border border-[#ba1a1a]/30 transition-all">
              <span className="text-xs font-bold text-[#ba1a1a] uppercase w-28 flex items-center gap-1">
                <FileWarning className="w-3.5 h-3.5" />
                <span>소속 부서</span>
              </span>
              <span className="font-bold text-[#ba1a1a] flex-1">{recordB.dept}</span>
              <input
                type="checkbox"
                checked={selectedFields.dept === 'B'}
                onChange={() => handleToggleField('dept', 'B')}
                className="w-5 h-5 accent-[#ba1a1a] rounded cursor-pointer"
              />
            </div>

            {/* Field 4: 연구 키워드 */}
            <div className="py-2 border-b border-[#f0f4fa]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#434654] uppercase">연구 키워드</span>
                <input
                  type="checkbox"
                  checked={selectedFields.keywords === 'B'}
                  onChange={() => handleToggleField('keywords', 'B')}
                  className="w-4 h-4 accent-[#003fb1] rounded cursor-pointer"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recordB.keywords.map((k, idx) => (
                  <span key={idx} className="bg-[#d9e3f4] text-[#121c28] px-2.5 py-1 rounded text-xs font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Field 5: 외부 식별자 */}
            <div className="py-2 border-b border-[#f0f4fa]">
              <span className="text-xs font-semibold text-[#434654] uppercase block mb-2">외부 식별자</span>
              <div className="space-y-1 font-mono text-xs text-[#121c28]">
                <div className="flex justify-between">
                  <span className="text-[#737686]">ROR ID</span>
                  <span className="font-semibold text-blue-600 hover:underline cursor-pointer truncate max-w-[200px]" title={recordB.ror}>
                    {recordB.ror}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">SCOPUS ID</span>
                  <span className="font-semibold">{recordB.scopusId}</span>
                </div>
              </div>
            </div>

            {/* Field 6: Drop zone prompt */}
            <div className="pt-2">
              <div className="border-2 border-dashed border-[#c3c5d7] rounded-lg p-6 bg-[#f8f9ff] flex flex-col items-center justify-center text-center h-28 gap-2 hover:border-[#003fb1] transition-colors cursor-pointer">
                <ArrowDownToLine className="w-6 h-6 text-[#737686]" />
                <p className="text-xs font-medium text-[#737686] max-w-xs leading-normal">
                  원본 레코드를 덮어쓰거나 추가할 필드를 이 레코드에서 선택하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Alert Banner (Bottom Right, as in Screenshot 2) */}
      {showAlertNotice && (
        <div className="fixed bottom-16 right-8 z-40 bg-[#121c28] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center justify-between gap-6 max-w-md border border-[#434654] animate-slideUp">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ffd5b6] shrink-0" />
            <div>
              <p className="font-bold text-sm text-white mb-0.5">조치 필요</p>
              <p className="text-xs text-[#c3c5d7]">부서 필드에 대한 수동 선택이 필요합니다.</p>
            </div>
          </div>
          <button
            onClick={() => setShowAlertNotice(false)}
            className="text-[#737686] hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Status Bar (Screenshot 2 footer style) */}
      <div className="mt-8 pt-4 border-t border-[#dfe9fa] flex flex-col sm:flex-row items-center justify-between text-xs font-sans gap-4">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#ba1a1a] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>1건의 심각한 충돌 감지: 소속 부서 불일치</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-[#006c4a] font-semibold font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>외부 식별자 일치: Scopus 57204910300</span>
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[#737686]">
          <span>감사 로그 ID: #992-Curate</span>
          <span className="text-[#121c28] font-bold">처리 준비 완료</span>
        </div>
      </div>
    </div>
  );
};
