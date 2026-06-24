import React, { useState } from 'react';
import { NameVariant } from '../types';
import { Lock, Plus, Pencil, Trash2, Globe, Share2, ExternalLink, RefreshCw, CheckCircle2, Circle, HelpCircle, ShieldCheck, AlertCircle } from 'lucide-react';

interface ResearcherPortalViewProps {
  variants: NameVariant[];
  onAddVariant: (name: string, type: any) => void;
  onRemoveVariant: (id: string) => void;
}

export const ResearcherPortalView: React.FC<ResearcherPortalViewProps> = ({
  variants,
  onAddVariant,
  onRemoveVariant
}) => {
  const [keywords, setKeywords] = useState(['Quantum Dynamics', 'Field Theory', 'Topological Insulators']);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [scopusInput, setScopusInput] = useState('');
  const [scopusVerified, setScopusVerified] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantType, setNewVariantType] = useState<'PRIMARY' | 'SECONDARY' | 'ARCHIVED'>('SECONDARY');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAddKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newKeywordInput.trim()) {
      setKeywords([...keywords, newKeywordInput.trim()]);
      setNewKeywordInput('');
    }
  };

  const handleRemoveKeyword = (target: string) => {
    setKeywords(keywords.filter(k => k !== target));
  };

  const handleSaveAll = () => {
    setToastMsg('프로필 변경사항이 성공적으로 저장되어 전거 서버로 전송되었습니다.');
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto animate-fadeIn pb-28 relative">
      {/* Toast feedback */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#003fb1] text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-[#82f5c1]" />
          <span className="font-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Add Variant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4 shadow-2xl animate-scaleUp">
            <h3 className="font-bold text-lg text-[#121c28]">새 성명 변이형 추가</h3>
            <p className="text-xs text-[#737686]">학술 논문 색인에 표기되는 새로운 성명 변이형 형태를 등록합니다.</p>
            
            <div>
              <label className="block text-xs font-semibold text-[#434654] mb-1">논문 표기 성명 (예: Rostova, E. M.)</label>
              <input
                type="text"
                value={newVariantName}
                onChange={e => setNewVariantName(e.target.value)}
                placeholder="Rostova, Elena M."
                className="w-full border border-[#c3c5d7] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#434654] mb-1">사용 유형 분류</label>
              <select
                value={newVariantType}
                onChange={e => setNewVariantType(e.target.value as any)}
                className="w-full border border-[#c3c5d7] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
              >
                <option value="SECONDARY">보조 (SECONDARY)</option>
                <option value="PRIMARY">기본 (PRIMARY)</option>
                <option value="ARCHIVED">아카이브 (ARCHIVED)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#737686] hover:bg-gray-100 rounded"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (newVariantName.trim()) {
                    onAddVariant(newVariantName.trim(), newVariantType);
                    setNewVariantName('');
                    setShowAddModal(false);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#003fb1] text-white rounded hover:bg-[#1a56db]"
              >
                추가 확정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dfe9fa]">
        <div>
          <h2 className="text-2xl font-bold text-[#121c28] tracking-tight mb-1">
            다시 환영합니다, Elena Rostova 박사님
          </h2>
          <div className="flex items-center gap-2 font-mono text-xs text-[#737686]">
            <span>사번: <strong className="text-[#121c28]">ACS-8842-ER</strong></span>
          </div>
        </div>

        <div>
          <span className="bg-[#82f5c1]/40 text-[#006c4a] border border-[#006c4a]/20 font-semibold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>검증된 전거 관리 상태</span>
          </span>
        </div>
      </div>

      {/* 2. Grid Layout: Left Col (Official, Variants, Keywords) & Right Col (External IDs, Completion, Help) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ===================== LEFT COLUMN: 7 COLS ===================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: 공식 신원 정보 */}
          <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#f0f4fa] pb-3">
              <h3 className="font-bold text-base text-[#121c28]">공식 신원 정보</h3>
              <Lock className="w-4 h-4 text-[#737686]" title="기관 등록처 동기화 데이터 (잠금)" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6">
              <div>
                <span className="text-xs font-semibold text-[#737686] block mb-0.5">법적 성명</span>
                <span className="font-bold text-[#121c28]">Elena Rostova</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#737686] block mb-0.5">소속 부서</span>
                <span className="font-bold text-[#121c28]">Department of Theoretical Physics</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#737686] block mb-0.5">현재 직위</span>
                <span className="font-medium text-[#121c28]">Senior Research Fellow</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#737686] block mb-0.5">계약 상태</span>
                <span className="font-bold text-[#006c4a]">정규직</span>
              </div>
            </div>

            <div className="bg-[#f8f9ff] border border-[#dfe9fa] rounded p-3 text-xs text-[#737686] italic">
              * 핵심 인사 데이터는 기관 등록처에서 관리하며 이 포털을 통해 수정할 수 없습니다.
            </div>
          </div>

          {/* Card 2: 성명 변이형 */}
          <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-[#121c28]">성명 변이형</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-bold text-[#003fb1] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 변이형 추가</span>
              </button>
            </div>
            <p className="text-xs text-[#737686] mb-4">정확한 레코드 병합을 위해 출판 색인에 이름이 표시되는 방식을 관리하세요.</p>

            <div className="border border-[#dfe9fa] rounded-md overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#f8f9ff] border-b border-[#dfe9fa] text-xs font-semibold text-[#737686]">
                    <th className="py-2.5 px-4">논문 표기 성명</th>
                    <th className="py-2.5 px-4">사용 유형</th>
                    <th className="py-2.5 px-4 text-right">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfe9fa]">
                  {variants.map((v) => (
                    <tr key={v.id} className="hover:bg-[#f8f9ff]">
                      <td className="py-3 px-4 font-bold text-[#121c28]">
                        {v.name}
                      </td>
                      <td className="py-3 px-4">
                        {v.type === 'PRIMARY' && (
                          <span className="bg-[#e5eeff] text-[#003fb1] text-[11px] font-bold px-2 py-0.5 rounded">
                            기본(PRIMARY)
                          </span>
                        )}
                        {v.type === 'SECONDARY' && (
                          <span className="bg-[#f0f4fa] text-[#434654] text-[11px] font-medium px-2 py-0.5 rounded">
                            보조(SECONDARY)
                          </span>
                        )}
                        {v.type === 'ARCHIVED' && (
                          <span className="bg-[#d9e3f4] text-[#737686] text-[11px] font-mono px-2 py-0.5 rounded">
                            아카이브(ARCHIVED)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {v.type !== 'PRIMARY' && (
                          <button
                            onClick={() => onRemoveVariant(v.id)}
                            className="text-[#737686] hover:text-[#ba1a1a] p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const edited = prompt('변이형 성명 수정:', v.name);
                            if (edited && edited.trim()) {
                              v.name = edited.trim();
                              setToastMsg('수정되었습니다.');
                              setTimeout(() => setToastMsg(null), 2000);
                            }
                          }}
                          className="text-[#737686] hover:text-[#003fb1] p-1"
                          title="수정"
                        >
                          <Pencil className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: 연구 키워드 및 프로필 */}
          <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 space-y-5">
            <div>
              <h3 className="font-bold text-base text-[#121c28] mb-1">연구 키워드 및 프로필</h3>
              <span className="text-xs font-semibold text-[#737686] block mb-3">연구 키워드</span>
              
              <div className="flex flex-wrap items-center gap-2 p-2 border border-[#c3c5d7] rounded-md bg-[#f8f9ff]">
                {keywords.map((kw, i) => (
                  <span key={i} className="bg-[#dfe9fa] text-[#121c28] font-medium text-xs px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xs">
                    <span>{kw}</span>
                    <button onClick={() => handleRemoveKeyword(kw)} className="hover:text-[#ba1a1a]">
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newKeywordInput}
                  onChange={e => setNewKeywordInput(e.target.value)}
                  onKeyDown={handleAddKeyword}
                  placeholder="키워드 추가 후 Enter..."
                  className="bg-transparent text-xs pl-1 py-1 focus:outline-none text-[#121c28] placeholder-[#737686] min-w-[140px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#737686] uppercase mb-1">개인/연구실 웹사이트</label>
                <div className="flex items-center border border-[#c3c5d7] rounded bg-white px-3 py-1.5 text-xs text-[#121c28]">
                  <Globe className="w-3.5 h-3.5 text-[#737686] mr-2 shrink-0" />
                  <input type="text" defaultValue="https://rostova-lab.physics.edu" className="w-full focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#737686] uppercase mb-1">LINKEDIN 프로필</label>
                <div className="flex items-center border border-[#c3c5d7] rounded bg-white px-3 py-1.5 text-xs text-[#121c28]">
                  <Share2 className="w-3.5 h-3.5 text-[#737686] mr-2 shrink-0" />
                  <input type="text" defaultValue="linkedin.com/in/e-rostova-physics" className="w-full focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== RIGHT COLUMN: 5 COLS ===================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 4: 외부 식별자 */}
          <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-base text-[#121c28]">외부 식별자</h3>

            {/* Box 1: ORCID */}
            <div className="p-4 rounded-lg border border-[#dfe9fa] bg-[#f8f9ff] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#121c28] flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-[#a6ce39] text-white flex items-center justify-center text-[10px] font-black">iD</span>
                  <span>ORCID iD</span>
                </span>
                <span className="text-[11px] font-bold text-[#006c4a] bg-[#82f5c1]/40 px-2 py-0.5 rounded">
                  인증됨
                </span>
              </div>

              <div className="font-mono text-sm font-bold text-[#003fb1]">
                0000-0002-1825-0097
              </div>

              <button
                onClick={() => {
                  setToastMsg('ORCID 동기화 API 호출 완료: 최신 논문 4편이 갱신되었습니다.');
                  setTimeout(() => setToastMsg(null), 3000);
                }}
                className="w-full bg-[#121c28] hover:bg-[#27313e] text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>메타데이터 갱신</span>
              </button>
            </div>

            {/* Box 2: Scopus ID */}
            <div className="p-4 rounded-lg border border-[#dfe9fa] bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#121c28]">Scopus ID</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  scopusVerified ? 'bg-[#82f5c1]/40 text-[#006c4a]' : 'bg-[#d9e3f4] text-[#434654]'
                }`}>
                  {scopusVerified ? '인증됨' : '미인증'}
                </span>
              </div>

              <input
                type="text"
                value={scopusInput}
                onChange={e => setScopusInput(e.target.value)}
                placeholder={scopusVerified ? "57204910300" : "Scopus Author ID 입력"}
                disabled={scopusVerified}
                className="w-full bg-[#f8f9ff] border border-[#c3c5d7] rounded px-3 py-1.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
              />

              {!scopusVerified && (
                <button
                  onClick={() => {
                    if (scopusInput.trim().length > 5) {
                      setScopusVerified(true);
                      setToastMsg('Elsevier OAuth 검증 완료! Scopus ID가 연동되었습니다.');
                      setTimeout(() => setToastMsg(null), 3000);
                    } else {
                      alert('올바른 9~11자리 Scopus Author ID를 입력하세요.');
                    }
                  }}
                  className="w-full bg-white hover:bg-[#f8f9ff] text-[#003fb1] border border-[#003fb1] py-2 rounded text-xs font-semibold transition-all shadow-xs"
                >
                  Elsevier를 통해 인증
                </button>
              )}
            </div>

            {/* Box 3: IRIS 번호 */}
            <div className="p-4 rounded-lg border border-[#dfe9fa] bg-[#f8f9ff] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#121c28] block mb-0.5">IRIS 번호</span>
                <span className="font-mono text-xs text-[#434654] font-semibold">IRI-66-8224-X</span>
              </div>
              <span className="text-[11px] font-bold text-[#006c4a] bg-[#82f5c1]/40 px-2 py-0.5 rounded">
                인증됨
              </span>
            </div>
          </div>

          {/* Card 5: 프로필 완성도 */}
          <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-base text-[#121c28]">프로필 완성도</span>
              <div className="text-right">
                <span className="font-mono font-bold text-base text-[#003fb1]">{scopusVerified ? '95%' : '85%'}</span>
                <span className="text-xs text-[#737686] block">{scopusVerified ? '100%까지 1단계 남음' : '100%까지 3단계 남음'}</span>
              </div>
            </div>

            <div className="w-full bg-[#d9e3f4] h-2 rounded-full overflow-hidden">
              <div className="bg-[#003fb1] h-full rounded-full transition-all duration-700" style={{ width: scopusVerified ? '95%' : '85%' }}></div>
            </div>

            <div className="space-y-2.5 text-xs pt-2">
              <div className="flex items-center gap-2 text-[#121c28] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#006c4a]" />
                <span>공식 ID 검증 완료</span>
              </div>
              <div className="flex items-center gap-2 text-[#121c28] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#006c4a]" />
                <span>ORCID 연결됨</span>
              </div>
              <div className={`flex items-center gap-2 ${scopusVerified ? 'text-[#121c28] font-medium' : 'text-[#737686]'}`}>
                {scopusVerified ? <CheckCircle2 className="w-4 h-4 text-[#006c4a]" /> : <Circle className="w-4 h-4 text-[#737686]" />}
                <span>Scopus Author ID 인증 필요</span>
              </div>
            </div>
          </div>

          {/* Card 6: 도움말 위젯 */}
          <div className="bg-[#ffdcc3]/40 border border-[#ffb77d] rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#723b00] font-bold text-sm">
              <HelpCircle className="w-5 h-5" />
              <span>도움이 필요하신가요?</span>
            </div>
            <p className="text-xs text-[#723b00] leading-relaxed">
              공식 신원 정보가 올바르지 않은 경우 소속 부서의 인사 담당자에게 문의하십시오.
            </p>
            <button
              onClick={() => alert('지원 티켓이 생성되었습니다. (접수 번호: #TK-8842)\n인사처 DB 관리자가 24시간 이내에 확인합니다.')}
              className="text-xs font-bold text-[#723b00] underline block pt-1 hover:text-black"
            >
              지원 티켓 생성
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-[260px] right-0 bg-white border-t border-[#dfe9fa] px-8 py-4 flex items-center justify-between z-30 shadow-lg">
        <span className="text-xs font-mono text-[#737686]">최종 업데이트: 2023년 10월 24일 14:32</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('변경된 모든 입력 내용을 취소하고 기존 포털 상태로 복구했습니다.')}
            className="px-5 py-2 text-xs font-semibold text-[#434654] bg-[#f8f9ff] hover:bg-[#dfe9fa] border border-[#c3c5d7] rounded transition-all"
          >
            변경취소
          </button>
          <button
            onClick={handleSaveAll}
            className="px-6 py-2 text-xs font-semibold bg-[#003fb1] hover:bg-[#1a56db] text-white rounded shadow-sm transition-all"
          >
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
};
