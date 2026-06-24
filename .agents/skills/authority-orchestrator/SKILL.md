---
name: authority-orchestrator
description: "Authority 프로젝트(Supabase, React)의 기능 개발을 총괄하는 오케스트레이터. '개발해줘', '기능 추가해줘', 'Authority 구현해줘' 등의 요청 시 반드시 트리거되어 db-admin, frontend-dev, qa-reviewer 워크플로우를 지휘합니다."
---

# Authority Orchestrator Skill

Authority 프로젝트의 전반적인 개발 생명주기를 총괄하는 메인 오케스트레이터 스킬입니다.

## 1. 역할 및 책임
- 사용자로부터 기능 개발 요청을 받아, 하위 전문 스킬(DB, Frontend, QA)에 작업을 분배합니다.
- 전체 개발 파이프라인의 진행 상황을 단계별로 추적하고 모니터링합니다.

## 2. 워크플로우 (파이프라인 패턴)
기능 개발은 기본적으로 다음의 파이프라인 순서를 따릅니다.

1. **Phase 1: 요구사항 분석 및 DB 검토 (`db-admin` 트리거)**
   - 목표 기능을 파악하고, 현재 Supabase 데이터베이스 스키마(`researchers` 등)가 해당 기능을 지원할 수 있는지 점검합니다.
   - 필요시 테이블 구조 변경이나 데이터 마이그레이션을 지시합니다.
2. **Phase 2: 프론트엔드 구현 (`frontend-dev` 트리거)**
   - 변경/확인된 DB 스키마를 바탕으로, React/Vite 환경에서 UI 및 비즈니스 로직을 작성합니다.
   - Supabase 클라이언트와 연동하여 실제 데이터를 렌더링하는 코드를 구현합니다.
3. **Phase 3: 품질 검증 및 GitHub 반영 (`qa-reviewer` 트리거)**
   - 작성된 코드의 무결성, 성능, UI/UX 결함을 검토합니다.
   - 이상이 없다고 판단되면 `git commit` 및 `git pull/push` 워크플로우를 수행하여 GitHub에 안전하게 반영합니다.

## 3. 에러 및 예외 처리
- 특정 Phase에서 실패할 경우(예: 프론트엔드에서 API 연동 에러 발생 시), 이전 Phase(DB 점검)로 돌아가 문제를 해결하거나 사용자에게 명확한 실패 사유와 해결책을 제시하여 승인을 받습니다.
