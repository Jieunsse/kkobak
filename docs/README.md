# 꼬박 문서 색인

꼬박의 모든 문서는 이 색인에서 찾는다. 새 문서를 만들거나 문서 이름을 바꾸면 이 표에 한 줄을 고친다.

## 처음 읽는 순서

1. [기획 문서](planning/planning.md) 1장과 5장: 왜 만드는지, 무엇을 정했는지
2. [용어집](../GLOSSARY.md): 그룹장, 인증일, 판정, 장부 같은 말의 뜻
3. [그룹 규칙 명세](planning/rules-spec.md): 꼬박이 실제로 어떻게 동작하는지
4. [작업 흐름](engineering/work-pipeline.md): 기능을 어떤 순서로 설계하고 만들고 검증하는지

## 기획과 정책

동작의 원본이다. 코드와 화면이 이 문서와 다르면 문서를 기준으로 고친다.

| 문서 | 담은 것 | 이럴 때 읽는다 |
|---|---|---|
| [기획 문서](planning/planning.md) | 문제 정의, 근거 조사, 다른 산업에서 가져온 원리, 결정 기록 | 왜 이렇게 정했는지 알고 싶을 때 |
| [그룹 규칙 명세](planning/rules-spec.md) | 그룹 설정, 인증 기준, 판정, 이의 제기, 쉬는 날, 들어오고 나가기, 장부, 정산표 | 인증·판정·돈 계산을 만들거나 고칠 때 |
| [회원·참여 정책](planning/member-group-policy.md) | 로그인, 계정 삭제, 초대 링크, 참여 제한, 내보내기, 그룹 상태 | 가입·그룹 만들기·초대를 만들 때 |
| [안전 정책](planning/safety-policy.md) | 부적절한 사진 걸러내기, 신고, 차단, 운영자 조치 | 신고·차단·운영 도구를 만들 때 |
| [알림 정책](planning/notification-policy.md) | 알림 종류, 보내는 시각, 끌 수 있는 알림 | 알림을 만들 때 |
| [운영 정책](planning/operations-policy.md) | 사진·초대 화면 공개 범위, 공유 카드, 문의 응대, 남용 한도, 업데이트·점검, 입력·표시 규칙, 목록 정렬, 요청 제한, 운영 도구, 서비스 종료 | 공개 범위·공유·입력칸·운영 도구를 만들 때 |
| [개인정보 정책](planning/personal-data-policy.md) | 받는 정보, 맡기는 업체와 국외 이전, 보관 기간 표, 지우는 방식, 로그 원칙, 본인·수사기관 요청 | 데이터를 저장·삭제·로그로 남길 때, 개인정보처리방침을 쓸 때 |
| [정책 운영 원칙](planning/meta-policy.md) | 정책끼리 부딪힐 때 우선순위, 바뀐 정책의 적용 시점, 변경 고지 기간, 예외 처리, 설정값 원칙 | 정책을 바꾸거나 두 정책이 부딪힐 때 |
| [엣지 케이스 정책](planning/edge-cases.md) | 위 정책이 답하지 않는 경계 상황 75개 | 시각이 겹치거나 규칙 두 개가 부딪히는 경우를 만들 때 |
| [기능 가설](planning/hypotheses.md) | 기능마다 세운 가설, 측정 방법, 맞음·틀림 기준선 | 스펙을 쓸 때, 출시 뒤 판정할 때 |

## 설계

| 문서 | 담은 것 | 이럴 때 읽는다 |
|---|---|---|
| [디자인 시스템](design/design-system.md) | 색(밝은·어두운 모드), 글자, 간격, 금지 규칙, 로고 규칙, 첫 부품 | 화면을 그리거나 만들 때 |
| [피그마](https://www.figma.com/design/gf5NAEGyhDA01o7P0LWoQt) | 「00 기획」·「01 정책」 요약, 「03 부품」, 「04 로고」, 화면 시안 | 시안을 볼 때. 기획·정책 페이지는 요약이고 원본은 레포다 |

## 일하는 방식

| 문서 | 담은 것 | 이럴 때 읽는다 |
|---|---|---|
| [작업 흐름](engineering/work-pipeline.md) | 가설 → 스펙 → 시안 → 티켓 → 구현 → 리뷰 → 검증 순서, 한 주 일정, Claude와 Codex 역할 | 일을 시작하기 전에 |
| [GitHub 규칙](engineering/github-conventions.md) | 라벨, 브랜치 이름, PR 제목, 영역, 이슈·PR 양식, 칸반 | 이슈나 PR을 만들 때 |
| [리뷰 기준](../CODING_STANDARDS.md) | 리뷰어가 diff에 대 보는 판단 기준 | 리뷰할 때 |
| [AGENTS.md](../AGENTS.md) | Claude와 Codex가 매번 지키는 규칙 | 에이전트에게 일을 맡길 때 |

## 결정 기록 (ADR)

되돌리기 어렵고, 맥락 없이 보면 놀랍고, 실제로 여러 선택지 중에 고른 결정만 남긴다.

| 번호 | 결정 |
|---|---|
| [0001](adr/0001-postgresql-jpa.md) | 데이터베이스는 PostgreSQL, 데이터 접근은 Spring Data JPA |
| [0002](adr/0002-invite-page-in-landing.md) | 초대 웹 화면은 소개 페이지(Next.js)에서 만든다 |
| [0003](adr/0003-posthog-for-product-analytics.md) | 사용자 행동 기록은 PostHog 하나로 한다 |

## 에이전트 설정

맷 포콕 스킬(Matt Pocock이 만든 Claude 작업 스킬 묶음)이 읽는 설정 파일이다. 스킬이 영어로 읽으므로 영어로 둔다.

| 문서 | 담은 것 |
|---|---|
| [issue-tracker.md](agents/issue-tracker.md) | 이슈를 GitHub Issues에 두고 `gh` 명령으로 다루는 방법 |
| [triage-labels.md](agents/triage-labels.md) | 스킬의 영어 역할 이름과 우리 한글 라벨의 대응 |
| [domain.md](agents/domain.md) | 용어집과 ADR을 읽는 방법 |
