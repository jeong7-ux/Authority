export type ViewTab = 'dashboard' | 'workbench' | 'researchers' | 'portal' | 'settings';
export type RoleMode = 'admin' | 'researcher';

export interface UrgentTask {
  id: string;
  name: string;
  idNum: string;
  variant: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ActivityLog {
  id: string;
  type: 'system' | 'admin' | 'conflict' | 'report';
  title: string;
  desc: string;
  time: string;
}

export interface ResearcherRecord {
  id: string;
  empId: string;
  officialName: string;
  dept: string;
  variantsCount: number;
  externalIds: {
    orcid?: string;
    ror?: string;
    scopus?: string;
    iris?: string;
  };
  verificationStatus: 'VERIFIED' | 'CONFLICT' | 'UNCLAIMED' | 'PENDING';
  tenureStatus: '정규직(Tenured)' | '계약직(Contract)' | '겸임/초빙(Adjunct)';
  lastUpdated: string;
  keywords: string[];
}

export interface NameVariant {
  id: string;
  name: string;
  type: 'PRIMARY' | 'SECONDARY' | 'ARCHIVED';
}

export interface MergeRecordData {
  empId: string;
  name: string;
  dept: string;
  keywords: string[];
  orcid?: string;
  ror?: string;
  scopusId?: string;
  uuid: string;
}

export interface SupabaseResearcherName {
  variant_name: string;
  name_type: string;
}

export interface SupabaseResearcherId {
  id_type: string;
  id_value: string;
  is_verified: boolean;
}

export interface SupabaseResearcher {
  id: string;
  employee_id: string;
  name_ko: string;
  name_en_official: string;
  birth_year: number | null;
  email_official: string;
  department_current: string;
  position_current: string | null;
  employment_status: string;
  join_date: string | null;
  retirement_date: string | null;
  research_keywords: string[];
  website_url: string | null;
  created_at: string;
  updated_at: string;
  researcher_names: SupabaseResearcherName[];
  researcher_ids: SupabaseResearcherId[];
}
