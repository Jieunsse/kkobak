# 꼬박

깜박하면 벌금, 꼬박하면 자랑.

꼬박은 4~8명 그룹이 공부·독서·운동 목표를 정하고 매일 사진으로 인증하는 앱이다. 꼬박이 인증을 확인하고, 마감에 판정하고, 벌금 장부와 정산표를 만든다. 돈은 받거나 보내지 않는다. 그룹은 지금처럼 모임통장으로 직접 정산한다.

## 지금 상태

기획과 정책을 정하고, 첫 기능의 스펙을 쓴 단계다. 아직 코드는 없다.

## 문서

모든 문서는 [문서 색인](docs/README.md)에서 시작한다.

| 하고 싶은 일 | 볼 곳 |
|---|---|
| 꼬박이 무엇이고 왜 만드는지 | [기획 문서](docs/planning/planning.md) |
| 꼬박이 어떻게 동작하는지 | [그룹 규칙 명세](docs/planning/rules-spec.md) |
| 일하는 순서 | [작업 흐름](docs/engineering/work-pipeline.md) |
| 에이전트에게 일을 맡기기 | [AGENTS.md](AGENTS.md) |
| 화면과 디자인 | [피그마](https://www.figma.com/design/gf5NAEGyhDA01o7P0LWoQt), [디자인 시스템](docs/design/design-system.md) |

## 만드는 것

| 부분 | 기술 |
|---|---|
| 앱 | Expo (React Native) |
| 소개·초대 웹 | Next.js |
| 서버 | Kotlin, Spring Boot, PostgreSQL |
| 사용자 행동 기록 | PostHog |
