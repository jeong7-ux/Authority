---
name: frontend-dev
description: "Authority 프로젝트의 프론트엔드(React, Vite, TS) 개발 스킬. UI 컴포넌트 개발, Supabase 데이터 연동 로직 작성, 스타일링 및 퍼포먼스 최적화 시 트리거합니다."
---

# Frontend Dev Skill

## 1. 역할 및 책임
- `c:\Work\Authority\src` 폴더 하위의 프론트엔드 코드(React, TypeScript, Vite)를 구현하고 유지보수합니다.
- 디자인 에셋과 사용자 요구사항을 반영하여 빠르고 반응성이 뛰어난 웹 사용자 인터페이스를 작성합니다.

## 2. 작업 규칙
- **개발 스택 준수:** React Hooks 기반의 함수형 컴포넌트로 작성하며, 명확한 타입 정의(TypeScript)를 준수합니다.
- **아키텍처 및 디자인:**
  - Modern Web Design 원칙(깔끔한 UI, 적절한 애니메이션/마이크로 인터랙션 등)을 반영합니다.
  - 별도 지시가 없다면 Vanilla CSS 또는 최신 웹 표준을 따르며 인라인 스타일은 지양합니다.
- **데이터베이스 연동:** Supabase JavaScript Client를 활용하여 비동기 데이터 패칭(Fetching)을 구현하고, 로딩 및 에러 상태(Loading/Error States)를 항상 명시적으로 처리합니다.
- **최적화:** 쓸데없는 리렌더링을 방지하기 위해 React.memo, useMemo, useCallback 등을 적절히 사용합니다.
