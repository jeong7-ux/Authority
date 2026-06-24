import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, ExternalLink, Mail, Building, Briefcase } from 'lucide-react';

interface Researcher {
  id: string;
  employee_id: string;
  name_ko: string;
  name_en_official: string;
  email_official: string;
  department_current: string;
  position_current: string;
  research_keywords: string[];
}

export const ResearcherList: React.FC = () => {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const { data, error } = await supabase
          .from('researchers')
          .select('*')
          .order('name_ko', { ascending: true })
          .limit(12); // 메인 페이지이므로 12개만 보여줌

        if (error) throw error;
        setResearchers(data || []);
      } catch (err: any) {
        console.error('Error fetching researchers:', err);
        setError(err.message || '연구원 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchResearchers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#e5eeff] border-t-[#003fb1] rounded-full animate-spin"></div>
          <p className="text-sm text-[#737686] font-medium">연구원 목록을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-lg p-6 text-center">
        <p className="text-sm text-[#ba1a1a] font-bold">오류 발생: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#dfe9fa] shadow-xs overflow-hidden flex flex-col">
      <div className="p-6 border-b border-[#dfe9fa] flex items-center justify-between bg-[#f8f9ff]">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#003fb1]" />
          <h3 className="font-bold text-lg text-[#121c28] tracking-tight">주요 연구원 프로필 (Supabase 연동)</h3>
        </div>
        <span className="text-xs font-semibold text-[#003fb1] bg-[#e5eeff] px-2.5 py-1 rounded-full">
          Total: {researchers.length}명 노출 중
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {researchers.map((researcher) => (
            <div 
              key={researcher.id} 
              className="border border-[#dfe9fa] rounded-lg p-5 hover:border-[#003fb1] hover:shadow-md transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-[#121c28] text-base group-hover:text-[#003fb1] transition-colors flex items-center gap-1">
                    {researcher.name_ko}
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-[#737686] font-mono">{researcher.employee_id}</p>
                </div>
              </div>

              <div className="space-y-2 mt-2 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-[#434654]">
                  <Building className="w-4 h-4 text-[#737686]" />
                  <span className="truncate">{researcher.department_current}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#434654]">
                  <Briefcase className="w-4 h-4 text-[#737686]" />
                  <span>{researcher.position_current}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#434654]">
                  <Mail className="w-4 h-4 text-[#737686]" />
                  <span className="truncate text-xs">{researcher.email_official}</span>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#f8f9ff]">
                {researcher.research_keywords?.slice(0, 3).map((keyword, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-medium bg-[#f8f9ff] text-[#434654] border border-[#dfe9fa] px-2 py-0.5 rounded-sm"
                  >
                    {keyword}
                  </span>
                ))}
                {(researcher.research_keywords?.length || 0) > 3 && (
                  <span className="text-[10px] font-medium bg-[#f8f9ff] text-[#434654] border border-[#dfe9fa] px-2 py-0.5 rounded-sm">
                    +{(researcher.research_keywords?.length || 0) - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
