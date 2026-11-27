// PR 제목·브랜치·본문 검사. 규칙 원본: docs/engineering/github-conventions.md
export const TYPES = ['feat', 'fix', 'refactor', 'perf', 'test', 'docs', 'style', 'build', 'ci', 'chore', 'revert'];
export const SCOPES = ['identity', 'group', 'verification', 'judgment', 'ledger', 'notification', 'app', 'landing', 'contracts', 'infra', 'docs'];
const ISSUE_REQUIRED = ['feat', 'fix', 'refactor', 'perf', 'test'];
const SECTIONS = ['요약', '결정 필요', '테스트 항목', '리뷰 위치', '롤백', '검증'];
const BANNED = ['짚', '끌어내', '해당', '진행하', '수행하', '를 통해', '을 통해', '에 대해', '기반으로'];
const CHECKBOX = '읽고 이해함';

function sections(body) {
  const map = {};
  let current = null;
  for (const line of body.split('\n')) {
    const h = line.match(/^## (.+?)\s*$/);
    if (h) { current = h[1]; map[current] = ''; continue; }
    if (current) map[current] += line + '\n';
  }
  for (const k of Object.keys(map)) map[k] = map[k].trim();
  return map;
}

export function checkPr({ title, branch, body = '', files = [] }) {
  const errors = [];
  const types = TYPES.join('|');

  if (!new RegExp(`^(${types})\\((${SCOPES.join('|')})\\): \\S`).test(title)) {
    errors.push(`제목은 "<종류>(<영역>): <설명>" 형식이어야 합니다. 영역: ${SCOPES.join(', ')}`);
  }

  const withIssue = new RegExp(`^(${types})/\\d+-[a-z0-9-]+$`);
  const withoutIssue = new RegExp(`^(${TYPES.filter((t) => !ISSUE_REQUIRED.includes(t)).join('|')})/[a-z0-9-]+$`);
  if (!branch.startsWith('dependabot/') && !withIssue.test(branch) && !withoutIssue.test(branch)) {
    errors.push(`브랜치는 "<종류>/<이슈 번호>-<영어 설명>" 형식이어야 합니다. ${ISSUE_REQUIRED.join('·')}는 이슈 번호가 필요합니다.`);
  }

  const clean = body.replace(/<!--[\s\S]*?-->/g, '').replace(/<details>[\s\S]*?<\/details>/g, '').replace(/^Closes.*$/gm, '');
  const s = sections(clean);

  for (const name of SECTIONS) {
    if (!(name in s)) errors.push(`본문에 "## ${name}" 칸이 없습니다.`);
  }

  const summary = s['요약'] ?? '';
  const sentences = (summary.match(/[.!?](?=\s|$)/g) || []).length || (summary ? 1 : 0);
  if (!summary) errors.push('요약이 비어 있습니다.');
  else if (sentences > 2) errors.push(`요약은 두 문장 이하여야 합니다. 지금 ${sentences}문장입니다.`);

  const review = s['리뷰 위치'] ?? '';
  const focus = review !== '' && review !== '없음';
  if (focus) {
    const items = (review.match(/^### /gm) || []).length;
    const checked = (review.match(new RegExp(`^- \\[[xX]\\] ${CHECKBOX}`, 'gm')) || []).length;
    const boxes = (review.match(new RegExp(`^- \\[[ xX]\\] ${CHECKBOX}`, 'gm')) || []).length;
    if (items === 0) errors.push('리뷰 위치는 "### 1. 파일 경로" 항목으로 쓰거나 "없음"이라고 씁니다.');
    if (items > 3) errors.push(`리뷰 위치는 최대 3곳입니다. 지금 ${items}곳입니다.`);
    if (boxes < items) errors.push(`리뷰 위치 항목마다 "- [ ] ${CHECKBOX}" 체크박스가 있어야 합니다.`);
    if (checked < boxes) errors.push(`리뷰 위치의 "${CHECKBOX}"를 사람이 모두 체크해야 머지할 수 있습니다.`);
  }

  const decision = s['결정 필요'] ?? '';
  const discuss = decision !== '' && decision !== '없음';

  const screens = files.some((f) => f.startsWith('app/') || f.startsWith('landing/'));
  if (screens && !(s['스크린샷'] ?? '').trim()) {
    errors.push('app/ 또는 landing/이 바뀌었습니다. 스크린샷 칸에 전후 화면을 넣어 주세요.');
  }

  const banned = BANNED.filter((w) => (title + '\n' + clean).includes(w));
  if (banned.length) errors.push(`금지어가 있습니다: ${banned.join(', ')}`);

  return { errors, labels: { '중점 리뷰': focus, '논의 필요': discuss } };
}
