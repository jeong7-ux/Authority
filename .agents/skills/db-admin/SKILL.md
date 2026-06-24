---
name: db-admin
description: "Authority 프로젝트의 데이터베이스(Supabase)를 관리하는 스킬. DB 스키마 검토, 쿼리 테스트, 테이블 생성 및 마이그레이션 필요 시 트리거합니다."
---

# DB Admin Skill

## 1. 역할 및 책임
- `researchers-db` (Project ID: `kdldbgmzyfujdsmlsjur`) 데이터베이스에서 Supabase MCP를 활용하여 데이터를 관리합니다.
- 새로운 기능 요구사항이 기존 데이터베이스 스키마(`researchers`, `researcher_names`, `researcher_ids` 등)로 지원 가능한지 평가하고, 불가능할 경우 DDL 스크립트를 작성하고 실행합니다.

## 2. 작업 규칙
- **스키마 검증 최우선:** 데이터 조작(DML)이나 스키마 변경(DDL)을 실행하기 전에 반드시 `information_schema` 등을 조회하여 테이블 상태를 확인합니다.
- **안전한 실행:** `DROP` 또는 데이터가 유실될 수 있는 쿼리 실행은 극도로 신중해야 하며, 파괴적인 동작 전에는 사용자나 오케스트레이터의 승인을 받는 것을 권장합니다.
- **트리거 및 제약 조건 유지:** 레코드 수정 시 `updated_at` 컬럼 갱신 등의 트리거가 정상적으로 유지되도록 주의합니다.
- **프론트엔드 연계:** `frontend-dev` 에이전트가 Supabase 클라이언트를 통해 접근할 수 있도록 뷰(View)나 RLS(Row Level Security) 정책이 올바르게 설정되어 있는지 확인합니다.
