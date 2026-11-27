# 꼬박

소규모 그룹이 공부·독서·운동 인증을 하고, 마감 판정과 벌금 장부, 정산표를 자동으로 만드는 앱이다. 꼬박은 돈을 받거나 보내지 않는다. 금액은 계산해서 보여 주기만 한다.

## 레포 지도

| 위치 | 내용 |
|---|---|
| `backend/` | Kotlin + Spring Boot 서버 하나. 모듈: identity, group, verification, judgment, ledger, notification. 모듈 안은 헥사고날 구조 |
| `app/` | Expo(React Native) 앱 |
| `landing/` | Next.js 소개 페이지 |
| `contracts/` | 서버와 앱이 함께 보는 API 계약 |
| `docs/planning/` | 기획(`planning.md`), 그룹 규칙 명세(`rules-spec.md`), 회원·안전·알림 정책, 기능 가설(`hypotheses.md`). 동작의 원본 |
| `docs/design/` | 디자인 시스템(`design-system.md`): 색·글자·간격 토큰, 금지 규칙. 화면을 만들 때 먼저 읽는다 |
| `docs/engineering/` | 일하는 흐름(`work-pipeline.md`), GitHub 규칙(`github-conventions.md`) |
| `GLOSSARY.md` | 도메인 용어 원본. 이름을 지을 때 먼저 읽는다 |

화면 시안은 [피그마](https://www.figma.com/design/gf5NAEGyhDA01o7P0LWoQt/%EA%BC%AC%EB%B0%95?node-id=0-1)에 있다. 화면 티켓에는 프레임 링크가 적혀 있다.

## 일하는 흐름

기능마다 설계 세션(grill-with-docs → to-spec) → API·로직 티켓 → 사람이 피그마 시안 → 화면 티켓 → 티켓마다 구현 → 교차 리뷰 → PR → 사람이 머지 → retro.
스펙 이슈에는 사용자 흐름, 화면 목록, 화면마다 보여 줄 상태를 적는다. 시안은 이것을 보고 그린다.
정책을 정하거나 바꾸면 `docs/planning/`의 원본 문서와 피그마 「01 정책」 페이지 요약 카드를 같은 작업 안에서 함께 고친다(기획은 「00 기획」).
모든 기능은 가설에서 출발한다. 스펙 이슈에는 [ 가설 ] 블록(가설, 측정, 기준선, 판정 시점)을 두고 `docs/planning/hypotheses.md`의 카드를 가리킨다. 측정에 필요한 사용자 행동 기록은 그 기능의 티켓 안에서 함께 만든다.
티켓 라벨이 구현자를 정한다: 「Codex 구현」은 Codex가 만들고 Claude가 리뷰한다. 「Claude 구현」은 사람이 연 Claude 세션이 만들고 Codex가 리뷰한다. 자세한 흐름과 이유는 `docs/engineering/work-pipeline.md`.

## 코드 작성 방식

1. 티켓에서 틀리면 안 되는 것(돈 계산, 판정, 권한, 개인정보, 동시성, 외부 실패)을 따져 **테스트할 경계 목록**을 만들고, 구현 전에 확인받는다. 경계는 가능한 한 높은 곳 하나다(서버는 유스케이스·API, 앱은 화면).
2. 테스트 하나를 쓰고 _red_를 확인한 뒤, 통과할 만큼만 구현한다. 사이클마다 결과를 한 줄씩 보고한다.
3. 바꾼 모듈의 테스트와 정적 검사를 실제로 돌린다. 출력 없이 완료라고 하지 않는다.
4. 리팩터링은 리뷰 단계에서 한다.

- 테스트는 레포 테스트 도구(JUnit·Testcontainers, Jest)로 쓴다. 테스트 개수는 경계 목록이 정하고, 구현 코드는 테스트가 요구하는 만큼만 쓴다.
- 기대값은 정해진 숫자에서 가져온다. 정산 금액은 `docs/planning/rules-spec.md` 7-5절의 검산한 예시를 쓴다.
- 이미 통과한 테스트가 틀려 보이면 멈추고 보고한다. 테스트를 지울 수 있는 곳은 리팩토링 PR뿐이고, 대신하는 테스트를 PR에 짝지어 적는다.

## PR

- 제목: `<종류>(<영역>): <한글 설명>`. 종류와 영역 목록은 `docs/engineering/github-conventions.md`.
- 브랜치: `<종류>/<이슈 번호>-<영어 설명>`.
- 본문은 `.github/pull_request_template.md` 칸을 그대로 쓴다. `pr` 스킬의 변경 그림은 상세, 전후 증거는 검증, 머지 위험은 롤백·리뷰 위치 칸에 넣는다.
- 「읽고 이해함」 체크박스는 사람이 체크한다. 에이전트는 빈 칸으로 둔다.

## Review guidelines

리뷰어(Codex 클라우드 리뷰, Claude 두 축 리뷰)는 `CODING_STANDARDS.md`의 모든 항목을 diff에 대 본다. 스펙 축은 PR이 닫는 티켓과 그 부모 스펙 이슈, `docs/planning/rules-spec.md`의 해당 절과 대조한다.

## Agent skills

### Issue tracker

이슈와 스펙은 GitHub Issues(`Jieunsse/kkobak`)에 있다. See `docs/agents/issue-tracker.md`.

### Triage labels

맷 포콕 역할 이름을 한글 라벨에 연결한다(`ready-for-agent` = Codex 구현, `ready-for-human` = Claude 구현). See `docs/agents/triage-labels.md`.

### Domain docs

single-context: 루트 `GLOSSARY.md`와 `docs/adr/`. See `docs/agents/domain.md`.
