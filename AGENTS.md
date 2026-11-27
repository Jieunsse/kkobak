# 꼬박

작은 그룹이 공부·독서·운동을 인증하는 앱이다. 앱이 마감 판정, 벌금 장부, 정산표를 자동으로 만든다. 꼬박은 돈을 받거나 보내지 않는다. 금액은 계산해서 보여 주기만 한다.

## 레포 지도

모든 문서는 [문서 색인](docs/README.md)에서 찾는다. 새 문서를 만들거나 이름을 바꾸면 색인에 한 줄을 고친다.

| 위치 | 내용 |
|---|---|
| `backend/` | Kotlin + Spring Boot 서버 하나. 모듈: identity, group, verification, judgment, ledger, notification. 모듈 안은 헥사고날 구조(업무 로직과 바깥 연결을 나누는 구조) |
| `app/` | Expo(React Native) 앱 |
| `landing/` | Next.js 소개 페이지 |
| `contracts/` | 서버와 앱이 함께 보는 API 계약 |
| `docs/planning/` | 기획 문서(`planning.md`), 그룹 규칙 명세(`rules-spec.md`), 회원·안전·알림·운영·개인정보 정책, 정책 운영 원칙, 기능 가설(`hypotheses.md`). 앱이 어떻게 동작해야 하는지는 여기가 원본이다 |
| `docs/design/` | 디자인 시스템(`design-system.md`): 색·글자·간격 토큰, 금지 규칙. 화면을 만들 때 먼저 읽는다 |
| `docs/engineering/` | 일하는 흐름(`work-pipeline.md`), GitHub 규칙(`github-conventions.md`) |
| `GLOSSARY.md` | 용어집. 업무 용어의 원본이다. 이름을 지을 때 먼저 읽는다 |

화면 시안은 [피그마](https://www.figma.com/design/gf5NAEGyhDA01o7P0LWoQt/%EA%BC%AC%EB%B0%95?node-id=0-1)에 있다. 화면 티켓에는 프레임 링크가 적혀 있다.

## 일하는 흐름

기능 하나는 아래 순서로 만든다.
1. 설계 세션에서 스펙 이슈를 쓴다(`grill-with-docs`, `to-spec` 스킬).
2. API·로직 티켓을 만든다.
3. 사람이 피그마에 시안을 그린다.
4. 화면 티켓을 만든다.
5. 티켓마다 구현한다.
6. 구현하지 않은 쪽이 리뷰한다.
7. PR을 연다.
8. 사람이 머지한다.
9. 회고한다.

스펙 이슈에는 사용자 흐름, 화면 목록, 화면마다 보여 줄 상태를 적는다. 시안은 이것을 보고 그린다.
정책을 정하거나 바꾸면 `docs/planning/`의 원본 문서와 피그마 「01 정책」 페이지의 요약 카드를 같은 작업에서 함께 고친다. 기획이 바뀌면 「00 기획」 페이지를 고친다.
모든 기능은 가설에서 출발한다. 스펙 이슈에는 [ 가설 ] 블록(가설, 측정, 기준선, 판정 시점)을 두고, `docs/planning/hypotheses.md`(기능 가설)에서 그 기능의 카드 링크를 건다. 측정에 필요한 사용자 행동 기록은 그 기능의 티켓에서 함께 만든다.
티켓 라벨을 보고 누가 구현할지 정한다. 「Codex 구현」 티켓은 Codex가 만들고 Claude가 리뷰한다. 「Claude 구현」 티켓은 사람이 연 Claude 세션이 만들고 Codex가 리뷰한다. 자세한 흐름과 이유는 `docs/engineering/work-pipeline.md`(작업 흐름)에 있다.

## 코드 작성 방식

1. 티켓에서 틀리면 안 되는 것(돈 계산, 판정, 권한, 개인정보, 동시성, 외부 서비스 실패)을 따져 **테스트할 경계 목록**을 만든다. 구현 전에 이 목록을 확인받는다. 테스트는 가능한 한 높은 경계 하나에서 한다(서버는 유스케이스·API, 앱은 화면).
2. 테스트 하나를 쓰고 실패하는 것을 확인한 뒤, 통과할 만큼만 구현한다. 한 번 돌 때마다 결과를 한 줄씩 보고한다.
3. 바꾼 모듈의 테스트와 정적 검사를 실제로 돌린다. 출력 없이 완료라고 하지 않는다.
4. 리팩터링은 리뷰 단계에서 한다.

- 테스트는 레포 테스트 도구(JUnit·Testcontainers, Jest)로 쓴다. 테스트 개수는 경계 목록이 정하고, 구현 코드는 테스트가 요구하는 만큼만 쓴다.
- 기대값은 문서에 정해진 숫자에서 가져온다. 정산 금액은 `docs/planning/rules-spec.md`(그룹 규칙 명세) 7-5절의 검산한 예시를 쓴다.
- 이미 통과한 테스트가 틀려 보이면 멈추고 보고한다. 테스트는 리팩터링 PR에서만 지울 수 있다. 지울 때는 그 테스트를 대신하는 테스트를 PR에 짝지어 적는다.

## PR

- 제목: `<종류>(<영역>): <한글 설명>`. 종류와 영역 목록은 `docs/engineering/github-conventions.md`.
- 브랜치: `<종류>/<이슈 번호>-<영어 설명>`.
- 본문은 `.github/pull_request_template.md`의 칸을 그대로 쓴다. `pr` 스킬이 만든 내용은 이렇게 넣는다. 변경 그림은 상세 칸, 전후 증거는 검증 칸, 머지 위험은 롤백·리뷰 위치 칸에 넣는다.
- 「읽고 이해함」 체크박스는 사람이 체크한다. 에이전트는 빈 칸으로 둔다.

## Review guidelines

리뷰어는 Codex 클라우드 리뷰와 Claude 리뷰다. Claude 리뷰는 기준과 스펙 두 가지를 본다.

- 기준: `CODING_STANDARDS.md`(리뷰 기준)의 모든 항목을 diff와 하나씩 맞춰 본다.
- 스펙: PR이 닫는 티켓, 그 부모 스펙 이슈, `docs/planning/rules-spec.md`(그룹 규칙 명세)의 관련 절과 맞춰 본다.

## Agent skills

### Issue tracker

이슈와 스펙은 GitHub Issues(`Jieunsse/kkobak`)에 둔다. See `docs/agents/issue-tracker.md`.

### Triage labels

맷 포콕 스킬(Matt Pocock이 만든 Claude 작업 스킬 묶음)의 역할 이름을 한글 라벨에 연결한다. `ready-for-agent`(에이전트가 바로 구현할 수 있음)는 「Codex 구현」, `ready-for-human`(사람이 연 세션에서 구현)은 「Claude 구현」이다. See `docs/agents/triage-labels.md`.

### Domain docs

이 레포는 용어집이 하나뿐인 구조(single-context)다. 루트 `GLOSSARY.md`와 `docs/adr/`(되돌리기 어려운 결정 기록)를 본다. See `docs/agents/domain.md`.
