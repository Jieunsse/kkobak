# 꼬박 디자인 시스템

마지막 수정: 2026-11-27
피그마: [꼬박](https://www.figma.com/design/gf5NAEGyhDA01o7P0LWoQt) 「02 파운데이션」·「03 부품」·「04 로고」 페이지. 값의 원본은 이 문서이고, 피그마 변수와 코드 토큰은 이 문서를 따른다.

크루런 v4 디자인 시스템(`bukang/docs/decisions/design.md`, `v4-spec.md`)에서 구조와 규칙을 가져왔다. 토큰 3단계, 이름 짓는 방식, 4의 배수 간격, 글자 크기 5단계, 금지 규칙이 크루런에서 왔다. 색, 글꼴, 로고는 꼬박용으로 새로 정했다.

## 1. 성격

**위트 있는 총무.** 알림, 빈 화면, 인증 카드 문구는 장난스럽다("깜박이 될 위기!"). 판정, 장부, 정산표처럼 돈과 숫자가 나오는 화면은 단정하고 정확하다. 위트는 문구에만 두고 숫자 화면에는 두지 않는다.

## 2. 색

형광펜 노랑과 먹색 두 가지로 꼬박을 알아보게 한다. 노랑은 공부할 때 형광펜으로 칠한 느낌이다.

### 원시값 (화면에 직접 쓰지 않는다)
| 이름 | 값 |
|---|---|
| `yellow/50~900` | #FFFBE0, #FFF5B3, #FFEC80, #FFE24D, **#FFD91A**(400, 형광펜), #F2C800, #C9A400, #8F7400, #5C4B00, #2E2600 |
| `ink/0~950` | #FFFFFF, #FCFBF8(25, 종이), #F6F5F1, #ECEAE4, #DAD7CF, #BEBAB0, #9A968C, #77736A, #57544D, #3D3B36, #26251F, #171612, #0E0D0B |
| `green/50·100·400·500·600·900` | #EEF8F0, #D3EED9, #5CC27F, #2E9E55, #237F43, #0E2E18 |
| `amber/50·100·400·500·600·900` | #FFF5E6, #FFE6BF, #FFAB33, #E08A00, #B86F00, #3A2400 |
| `red/50·100·400·500·600·900` | #FFF1EE, #FFDCD5, #FF7A63, #E5482F, #C2361F, #3D120A |

회색 대신 살짝 따뜻한 먹색(`ink`)을 쓴다. 차가운 회색은 기본값처럼 보인다.

### 용도 (밝은 모드 / 어두운 모드)
| 이름 | 밝은 | 어두운 | 쓰는 곳 |
|---|---|---|---|
| `bg/default` | ink/25 | ink/950 | 화면 바탕 |
| `bg/subtle` | ink/50 | ink/900 | 묶음 바탕(꼭 필요할 때만) |
| `bg/elevated` | ink/0 | ink/800 | 시트, 다이얼로그, 입력칸 |
| `bg/inverse` | ink/900 | ink/50 | 토스트 |
| `bg/highlight` | yellow/400 | yellow/500 | 도장, 형광펜 강조 |
| `bg/highlight-subtle` | yellow/100 | yellow/900 | 오늘 할 일 강조 줄 |
| `bg/success-subtle` · `bg/warning-subtle` · `bg/danger-subtle` | green·amber·red/50 | green·amber·red/900 | 판정 배지 바탕 |
| `text/primary` | ink/900 | ink/50 | 본문 |
| `text/secondary` | ink/600 | ink/300 | 보조 글 |
| `text/tertiary` | ink/500 | ink/400 | 비활성 아닌 가장 약한 글 |
| `text/disabled` | ink/300 | ink/600 | 비활성 |
| `text/inverse` | ink/0 | ink/900 | `bg/inverse` 위 |
| `text/on-highlight` | ink/900 | ink/950 | `bg/highlight` 위 |
| `text/success` · `text/warning` · `text/danger` | green·amber·red/600 | green·amber·red/400 | 판정 글자 |
| `border/default` | ink/200 | ink/700 | 입력칸 테두리 |
| `border/strong` | ink/400 | ink/500 | 선택된 칩 |
| `border/focus` | ink/900 | yellow/400 | 포커스 |
| `border/danger` | red/600 | red/400 | 오류 입력칸 |
| `action/primary` · `action/primary-text` | ink/900 · ink/0 | yellow/400 · ink/950 | 주 버튼 |
| `action/secondary` · `action/secondary-text` | ink/100 · ink/900 | ink/800 · ink/50 | 보조 버튼 |
| `action/danger` · `action/danger-text` | red/600 · ink/0 | red/500 · ink/0 | 위험 버튼 |

- 주 버튼은 밝은 모드에서 먹색, 어두운 모드에서 형광펜 노랑이다. 어두운 바탕에서는 노랑 면이 가장 잘 보이기 때문이다.
- 노랑은 글자색으로 쓰지 않는다. 흰 바탕에서 대비가 부족하다.
- 배경과 글자는 정해진 짝으로만 쓴다: `bg/highlight` 위에는 `text/on-highlight`, `bg/inverse` 위에는 `text/inverse`, `action/*` 위에는 `action/*-text`.
- 판정 색: 정상 = success, 지각 = warning, 결석 = danger, 쉬는 날 = `text/secondary`.

## 3. 글자

- 글꼴: Pretendard. 피그마에 설치되기 전까지는 Noto Sans KR로 만들고, 설치 뒤 글자 스타일의 글꼴만 바꾼다.
- 숫자(금액, 연속 일수)는 고정폭 숫자(tabular)로 써서 자릿수가 흔들리지 않게 한다. 피그마 글자 스타일에는 아직 넣지 않았고, 코드에서 `font-variant-numeric: tabular-nums`로 적용한다.
- 굵기는 Regular, Medium, Bold 세 개만 쓴다.

| 스타일 | 크기/줄 높이 | 쓰는 곳 |
|---|---|---|
| `caption` | 12/16 | 시각, 보조 표시 |
| `body` | 16/24 | 본문, 버튼, 입력 |
| `title3` | 20/28 | 화면 안 묶음 제목 |
| `title2` | 24/32 | 화면 제목 |
| `number` | 32/36 Bold | 금액, 연속 일수 |

## 4. 간격, 둥글기, 그림자

- 간격: `space/4·8·12·16·24·32·48·64·96`. 모든 값은 4의 배수다. 화면 좌우 여백은 16이다.
- 둥글기: `radius/0·4·8·12·16·full`. 버튼과 입력칸은 12, 시트는 16, 칩은 full.
- 그림자: `shadow/field`(누를 수 있는 흰 면), `shadow/sm`(떠 있는 상자), `shadow/md`(시트·토스트), `shadow/lg`(다이얼로그). 떠 있는 것에만 쓴다.

## 5. AI가 만든 것 같은 디자인 금지

크루런에서 가져온 규칙:
- 회색 카드 바탕, 회색 테두리 카드, 줄 구분선을 쓰지 않는다. 여백으로 묶는다.
- 그림자는 떠 있는 것에만 쓴다.
- 같은 정보를 한 화면에 두 번 보여 주지 않는다.
- 돈·권리·법적 고지가 아닌 설명 문장을 붙이지 않는다.
- 배지는 사용자가 무언가를 해야 할 때만 붙인다.
- 강조 버튼(주 버튼)은 한 화면에 하나만 둔다.
- 글자 버튼, 밑줄 버튼, 버튼 안의 화살표를 쓰지 않는다.
- 영문 대문자 작은 제목(Eyebrow)을 쓰지 않는다.
- 탭 화면에는 큰 제목을 두지 않는다.

꼬박에서 더한 규칙:
- 보라·파랑 그라데이션, 반짝이는 효과, 유리 효과를 쓰지 않는다.
- 이모지를 아이콘 대신 쓰지 않는다. 아이콘은 선 굵기 1.5의 선 아이콘 하나만 쓴다.
- 모든 것을 카드에 담지 않는다. 목록은 목록으로 둔다.
- 의미 없는 장식 그림을 넣지 않는다. 빈 화면은 도장 기호와 문구로 채운다.
- 가운데 정렬한 큰 제목과 부제목 묶음을 쓰지 않는다. 글은 왼쪽 정렬이다.
- 둥글기는 위 단계 밖의 값을 쓰지 않는다.
- 시안을 만들면 impeccable 스킬로 점검한다.

## 6. 브랜딩

- 이름: 꼬박. 한 줄 소개: 깜박하면 벌금, 꼬박하면 자랑.
- 로고: "꼬박" 글자 로고와 출석 도장 기호. 앱 아이콘과 인증 카드에는 도장만 쓴다. 「04 로고」 페이지의 시안 세 개 중에서 고른다.
- 캐릭터: 첫 버전에는 없다.
- 다크 모드: 첫 버전부터 지원한다. 색은 용도 이름으로만 써서 두 모드가 같은 이름을 쓴다.

## 7. 첫 부품

| 부품 | 변형 |
|---|---|
| Button | 종류(주·보조·위험) × 크기(48·40·32) × 상태(기본·비활성) |
| TextField | 상태(기본·포커스·오류·비활성) |
| Chip | 선택(켬·끔) |
| VerdictBadge | 판정(정상·지각·결석·쉬는 날) |
| Stamp | 상태(꼬박·깜박·쉬는 날) |
