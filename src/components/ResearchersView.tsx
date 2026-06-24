import React, { useState, useMemo } from 'react';
import { ResearcherRecord, ViewTab } from '../types';
import { Download, Upload, Filter, X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, HelpCircle, Clock, Zap, ArrowUpDown, ExternalLink, MoreHorizontal, FileSpreadsheet } from 'lucide-react';

interface ResearchersViewProps {
  researchers: ResearcherRecord[];
  searchQuery: string;
  onNavigateTab: (tab: ViewTab) => void;
  onSelectResearcher?: (researcher: ResearcherRecord) => void;
}

export const ResearchersView: React.FC<ResearchersViewProps> = ({
  researchers,
  searchQuery,
  onNavigateTab,
  onSelectResearcher
}) => {
  const [deptFilter, setDeptFilter] = useState('All');
  const [tenureFilter, setTenureFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Derive unique departments
  const departments = useMemo(() => {
    const depts = new Set(researchers.map(r => r.dept));
    return ['All', ...Array.from(depts)];
  }, [researchers]);

  // Filtered dataset
  const filteredResearchers = useMemo(() => {
    return researchers.filter(r => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = q === '' || 
        r.officialName.toLowerCase().includes(q) || 
        r.empId.toLowerCase().includes(q) ||
        r.dept.toLowerCase().includes(q);

      // Dept match
      const matchDept = deptFilter === 'All' || r.dept === deptFilter;

      // Tenure match
      const matchTenure = tenureFilter === 'All' || r.tenureStatus === tenureFilter;

      // Status match
      const matchStatus = statusFilter === 'All' || r.verificationStatus === statusFilter;

      return matchQuery && matchDept && matchTenure && matchStatus;
    });
  }, [researchers, searchQuery, deptFilter, tenureFilter, statusFilter]);

  const totalFiltered = filteredResearchers.length;
  const paginatedResearchers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredResearchers.slice(start, start + rowsPerPage);
  }, [filteredResearchers, currentPage]);

  const handleClearFilters = () => {
    setDeptFilter('All');
    setTenureFilter('All');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto animate-fadeIn pb-16">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121c28] tracking-tight mb-1">Researcher Master Database</h2>
          <p className="text-sm text-[#434654]">System-wide authority records for verified institutional researchers.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('마스터 전거 메타데이터를 CSV 형식으로 내보냅니다. (선택된 필터 쿼리 적용 완료)')}
            className="bg-white hover:bg-[#f8f9ff] text-[#121c28] border border-[#c3c5d7] px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-[#434654]" />
            <span>Export Data</span>
          </button>

          <button
            onClick={() => alert('인사 시스템 일괄 업데이트용 CSV/Excel 파일을 업로드하세요.\n(자동 컬럼 매칭 알고리즘이 지원됩니다.)')}
            className="bg-[#003fb1] hover:bg-[#1a56db] text-white px-5 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Upload CSV/Excel</span>
          </button>
        </div>
      </div>

      {/* 2. Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-[#dfe9fa] shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-[11px] font-bold text-[#434654] uppercase tracking-wider mb-1.5">DEPARTMENT</label>
          <select
            value={deptFilter}
            onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#f8f9ff] border border-[#c3c5d7] rounded-md px-3 py-2 text-sm text-[#121c28] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
          >
            <option value="All">All Departments</option>
            {departments.filter(d => d !== 'All').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#434654] uppercase tracking-wider mb-1.5">TENURE STATUS</label>
          <select
            value={tenureFilter}
            onChange={(e) => { setTenureFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#f8f9ff] border border-[#c3c5d7] rounded-md px-3 py-2 text-sm text-[#121c28] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
          >
            <option value="All">All Statuses</option>
            <option value="정규직(Tenured)">정규직 (Tenured)</option>
            <option value="계약직(Contract)">계약직 (Contract)</option>
            <option value="겸임/초빙(Adjunct)">겸임/초빙 (Adjunct)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#434654] uppercase tracking-wider mb-1.5">ID VERIFICATION</label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#f8f9ff] border border-[#c3c5d7] rounded-md px-3 py-2 text-sm text-[#121c28] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
          >
            <option value="All">Verified & Unverified</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="CONFLICT">CONFLICT</option>
            <option value="UNCLAIMED">UNCLAIMED</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>

        <div>
          <button
            onClick={handleClearFilters}
            className="w-full bg-[#f8f9ff] hover:bg-[#e5eeff] text-[#121c28] border border-[#c3c5d7] rounded-md px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all h-[38px]"
          >
            <Filter className="w-3.5 h-3.5 text-[#434654]" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* 3. Main Data Table */}
      <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#dfe9fa] bg-[#f8f9ff] text-[#434654] text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#003fb1]">
                    <span>EMPLOYEE ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-6">NAME (OFFICIAL)</th>
                <th className="py-3.5 px-6 text-center">VARIANTS</th>
                <th className="py-3.5 px-6">EXTERNAL IDS</th>
                <th className="py-3.5 px-6">VERIFICATION</th>
                <th className="py-3.5 px-6">LAST UPDATED</th>
                <th className="py-3.5 px-6 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfe9fa] text-sm">
              {paginatedResearchers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#737686]">
                    검색 조건에 일치하는 연구자 기록이 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedResearchers.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-[#f8f9ff] transition-colors group">
                      {/* EMP ID */}
                      <td className="py-4 px-6 font-mono font-bold text-[#121c28]">
                        {item.empId}
                      </td>

                      {/* Name & Dept */}
                      <td className="py-4 px-6">
                        <div 
                          onClick={() => onSelectResearcher && onSelectResearcher(item)}
                          className="font-bold text-[#121c28] hover:text-[#003fb1] cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>{item.officialName}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#003fb1]" />
                        </div>
                        <div className="text-xs text-[#737686] truncate max-w-xs">{item.dept}</div>
                      </td>

                      {/* Variants Badge */}
                      <td className="py-4 px-6 text-center">
                        <span className="bg-[#e5eeff] text-[#003fb1] font-mono font-bold text-xs px-2.5 py-1 rounded-full">
                          0{item.variantsCount}
                        </span>
                      </td>

                      {/* External IDs */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          {item.externalIds.orcid && (
                            <span className="bg-[#eef4ff] text-[#003fb1] border border-[#003fb1]/20 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                              ORCID
                            </span>
                          )}
                          {item.externalIds.scopus && (
                            <span className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30 px-2 py-0.5 rounded text-xs font-mono font-semibold flex items-center gap-1">
                              <span>Scopus</span>
                            </span>
                          )}
                          {item.externalIds.iris && (
                            <span className="bg-[#e5eeff] text-[#1a56db] px-2 py-0.5 rounded text-xs font-mono">
                              IRIS
                            </span>
                          )}
                          {item.externalIds.ror && (
                            <span className="bg-[#d9e3f4] text-[#121c28] px-2 py-0.5 rounded text-xs font-mono">
                              ROR
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Verification Status Badge */}
                      <td className="py-4 px-6">
                        {item.verificationStatus === 'VERIFIED' && (
                          <span className="bg-[#82f5c1]/30 text-[#006c4a] border border-[#006c4a]/20 font-mono font-bold text-xs px-2.5 py-1 rounded">
                            VERIFIED
                          </span>
                        )}
                        {item.verificationStatus === 'CONFLICT' && (
                          <span className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30 font-mono font-bold text-xs px-2.5 py-1 rounded animate-pulse">
                            CONFLICT
                          </span>
                        )}
                        {item.verificationStatus === 'UNCLAIMED' && (
                          <span className="bg-[#d9e3f4] text-[#434654] font-mono font-medium text-xs px-2.5 py-1 rounded">
                            UNCLAIMED
                          </span>
                        )}
                        {item.verificationStatus === 'PENDING' && (
                          <span className="bg-[#ffdcc3] text-[#723b00] font-mono font-semibold text-xs px-2.5 py-1 rounded">
                            PENDING
                          </span>
                        )}
                      </td>

                      {/* Last updated */}
                      <td className="py-4 px-6 font-mono text-xs text-[#737686]">
                        {item.lastUpdated}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => alert(`${item.officialName} 레코드 상세 검사 모드로 진입합니다.`)}
                          className="p-1.5 text-[#737686] hover:text-[#003fb1] hover:bg-[#f8f9ff] rounded transition-all"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination Bar */}
        <div className="p-4 border-t border-[#dfe9fa] bg-[#f8f9ff] flex flex-col sm:flex-row items-center justify-between text-xs text-[#434654] gap-4">
          <div className="flex items-center gap-4 font-mono">
            <span>Total Records: <strong className="text-[#121c28]">1,429</strong></span>
            <span>Verified: <strong className="text-[#006c4a]">1,210</strong></span>
            <span>Conflicts: <strong className="text-[#ba1a1a]">12</strong></span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[#737686]">Rows per page: 25</span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="p-1 rounded hover:bg-[#e5eeff] disabled:opacity-30 disabled:pointer-events-none text-[#121c28]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono font-bold text-[#003fb1] bg-white border border-[#dfe9fa] py-1 rounded shadow-xs">
                {currentPage}
              </span>
              <span className="px-1 text-[#737686]">/</span>
              <span className="px-1 font-mono text-[#737686]">{Math.ceil(totalFiltered / rowsPerPage) || 1}</span>
              <button
                disabled={currentPage >= Math.ceil(totalFiltered / rowsPerPage)}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1 rounded hover:bg-[#e5eeff] disabled:opacity-30 disabled:pointer-events-none text-[#121c28]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Cards Row: Snapshot Chart & Needs Attention Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Integrity Snapshot Chart: 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="font-bold text-base text-[#121c28]">Database Integrity Snapshot</h3>
              <p className="text-xs text-[#737686]">Real-time tracking of ID verification across institutional repositories.</p>
            </div>
            <span className="bg-[#e5eeff] text-[#003fb1] font-mono font-bold text-xs px-3 py-1 rounded">
              98.4% Accuracy
            </span>
          </div>

          {/* Simulated Histogram Bar Chart */}
          <div className="h-36 flex items-end justify-between gap-3 pt-6 px-4">
            {[65, 85, 72, 95, 80, 50, 88, 75, 92, 68, 85, 45].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                <span className="text-[10px] font-mono text-[#003fb1] opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}%
                </span>
                <div 
                  className={`w-full rounded-t transition-all group-hover:brightness-110 ${
                    i === 3 || i === 8 ? 'bg-[#003fb1]' : i === 5 ? 'bg-[#b5c4ff]' : 'bg-[#1a56db]'
                  }`} 
                  style={{ height: `${val}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention Dark Blue Card: 4 cols */}
        <div className="lg:col-span-4 bg-[#003fb1] text-white rounded-lg p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          <div>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-[#82f5c1]" />
            </div>

            <h3 className="text-xl font-bold mb-2">Needs Attention</h3>
            <p className="text-xs text-[#d4dcff] leading-relaxed">
              12 records have conflicting ORCID identifiers that require manual reconciliation.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('workbench')}
            className="w-full bg-white hover:bg-[#f8f9ff] text-[#003fb1] font-bold py-2.5 px-4 rounded-md text-sm transition-all shadow mt-6 text-center"
          >
            Launch Workbench
          </button>
        </div>
      </div>
    </div>
  );
};
