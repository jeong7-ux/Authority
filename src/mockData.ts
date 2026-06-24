import { UrgentTask, ActivityLog, ResearcherRecord, NameVariant, MergeRecordData } from './types';

export const initialUrgentTasks: UrgentTask[] = [
  {
    id: 't-1',
    name: 'Dr. Elena Rodriguez',
    idNum: 'ACS-77291',
    variant: 'E. M. Rodriguez-Silvas',
    date: '2023-11-02',
    status: 'pending'
  },
  {
    id: 't-2',
    name: 'Marcus T. Thorne',
    idNum: 'ACS-44810',
    variant: 'Thorne, M. Terrence',
    date: '2023-10-30',
    status: 'pending'
  },
  {
    id: 't-3',
    name: 'Sarah Jenkins-Lee',
    idNum: 'ACS-10922',
    variant: 'Sarah J. Lee',
    date: '2023-10-28',
    status: 'pending'
  },
  {
    id: 't-4',
    name: 'Prof. Wei Zhang',
    idNum: 'ACS-33901',
    variant: 'W. Zhang (Biological Sciences)',
    date: '2023-10-25',
    status: 'pending'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'a-1',
    type: 'system',
    title: '시스템이 12개의 ORCID 충돌을 자동으로 해결했습니다.',
    desc: '백그라운드 매칭 스케줄러가 검증 알고리즘을 완료했습니다.',
    time: '2분 전'
  },
  {
    id: 'a-2',
    type: 'admin',
    title: '관리자 [JS]가 물리학과의 이름 변이형 5건을 승인했습니다.',
    desc: '이론물리학 및 응용광학 클러스터의 전거 매핑 업데이트.',
    time: '1시간 전'
  },
  {
    id: 'a-3',
    type: 'conflict',
    title: '인문학 클러스터에서 새로운 고밀도 충돌이 감지되었습니다.',
    desc: 'Scopus Hub 저자 ID와 내부 인사 DB 간 성명 모호성 발생.',
    time: '3시간 전'
  },
  {
    id: 'a-4',
    type: 'report',
    title: '주간 커버리지 보고서가 생성되어 보관되었습니다.',
    desc: '전체 데이터 식별률 95.2% 도달 기념 리포트.',
    time: '어제'
  }
];

export const initialResearchers: ResearcherRecord[] = [
  {
    id: 'r-1',
    empId: 'ACS-2024-001',
    officialName: 'Dr. Helena V. Sorensen',
    dept: 'Dept. of Applied Mathematics',
    variantsCount: 4,
    externalIds: { orcid: '0000-0001-9821-3342', iris: 'IRI-44-1293' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-11-28 09:42',
    keywords: ['Applied Math', 'Stochastic Processes', 'Graph Theory']
  },
  {
    id: 'r-2',
    empId: 'ACS-2024-042',
    officialName: 'Prof. Marcus Thorne',
    dept: 'Bio-Molecular Engineering',
    variantsCount: 1,
    externalIds: { scopus: '57192839100' },
    verificationStatus: 'CONFLICT',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-12-15 14:10',
    keywords: ['Bio-Engineering', 'Crispr', 'Enzyme Kinetics']
  },
  {
    id: 'r-3',
    empId: 'ACS-2023-119',
    officialName: 'Linda G. Zhao',
    dept: 'Institute for Policy Research',
    variantsCount: 2,
    externalIds: {},
    verificationStatus: 'UNCLAIMED',
    tenureStatus: '계약직(Contract)',
    lastUpdated: '2024-01-02 11:05',
    keywords: ['Public Policy', 'Urban Economics', 'Demographics']
  },
  {
    id: 'r-4',
    empId: 'ACS-2024-088',
    officialName: 'Dr. Simon Petrakis',
    dept: 'Materials Science Cluster',
    variantsCount: 6,
    externalIds: { orcid: '0000-0003-1123-9988' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-10-30 16:30',
    keywords: ['Polymers', 'Nano-materials', 'Superconductors']
  },
  {
    id: 'r-5',
    empId: 'ACS-8842-ER',
    officialName: 'Dr. Elena Rostova',
    dept: 'Department of Theoretical Physics',
    variantsCount: 3,
    externalIds: { orcid: '0000-0002-1825-0097', iris: 'IRI-66-8224-X' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-10-24 14:32',
    keywords: ['Quantum Dynamics', 'Field Theory', 'Topological Insulators']
  },
  {
    id: 'r-6',
    empId: 'EMP-00921',
    officialName: 'Dr. Eleanor Vance',
    dept: 'Quantum Physics Dept.',
    variantsCount: 5,
    externalIds: { orcid: '0000-0002-1825-0097', scopus: '57204910300' },
    verificationStatus: 'CONFLICT',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2024-01-10 16:15',
    keywords: ['Entanglement', 'Cryogenics', 'Optics']
  },
  {
    id: 'r-7',
    empId: 'ACS-2024-112',
    officialName: 'Dr. David K. Miller',
    dept: 'Chemical Engineering',
    variantsCount: 2,
    externalIds: { orcid: '0000-0002-4412-8811', ror: 'https://ror.org/02x1' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2024-01-05 10:20',
    keywords: ['Catalysis', 'Green Chemistry', 'Kinetics']
  },
  {
    id: 'r-8',
    empId: 'ACS-2023-095',
    officialName: 'Prof. Jin-Woo Park',
    dept: 'Computer Science',
    variantsCount: 4,
    externalIds: { orcid: '0000-0003-9911-2233', scopus: '55112233', iris: 'IRI-99-11' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-12-20 18:00',
    keywords: ['Artificial Intelligence', 'Distributed Systems', 'Security']
  },
  {
    id: 'r-9',
    empId: 'ACS-2024-031',
    officialName: 'Sarah Jenkins-Lee',
    dept: 'Department of Sociology',
    variantsCount: 3,
    externalIds: { scopus: '58112390' },
    verificationStatus: 'PENDING',
    tenureStatus: '겸임/초빙(Adjunct)',
    lastUpdated: '2023-10-28 11:12',
    keywords: ['Social Networks', 'Computational Social Science']
  },
  {
    id: 'r-10',
    empId: 'ACS-2023-220',
    officialName: 'Dr. Robert Chen',
    dept: 'Neuroscience Center',
    variantsCount: 1,
    externalIds: { orcid: '0000-0001-5544-3322' },
    verificationStatus: 'VERIFIED',
    tenureStatus: '정규직(Tenured)',
    lastUpdated: '2023-11-15 09:30',
    keywords: ['fMRI', 'Cognitive Science', 'Neural Coding']
  }
];

export const initialPortalVariants: NameVariant[] = [
  { id: 'v-1', name: 'Rostova, E.', type: 'PRIMARY' },
  { id: 'v-2', name: 'Rostova, Elena', type: 'SECONDARY' },
  { id: 'v-3', name: 'Rostova-Semyonova, Elena', type: 'ARCHIVED' }
];

export const workbenchRecordA: MergeRecordData = {
  empId: 'EMP-00921',
  name: 'Dr. Eleanor Vance',
  dept: 'Quantum Physics Dept.',
  keywords: ['Entanglement', 'Cryogenics', 'Optics'],
  orcid: '0000-0002-1825-0097',
  scopusId: '57204910300',
  uuid: '8829-XJ-001'
};

export const workbenchRecordB: MergeRecordData = {
  empId: 'EMP-00921-X',
  name: 'Eleanor T. Vance',
  dept: 'Applied Material Sciences',
  keywords: ['Entanglement', 'Solid State Physics', 'Nano-materials'],
  ror: 'https://ror.org/05dx0jn59',
  scopusId: '57204910300',
  uuid: '4410-KM-992'
};
