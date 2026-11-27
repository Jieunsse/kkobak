import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkPr } from './pr-rules.mjs';

const template = readFileSync(new URL('../pull_request_template.md', import.meta.url), 'utf8');
const filled = template.replace('## 요약\n', '## 요약\n정산표 화면을 추가한다. 그룹장이 기간 끝에 누가 얼마를 낼지 바로 본다.\n');
const ok = { title: 'feat(ledger): 정산표 계산 추가', branch: 'feat/12-settlement-table', body: filled, files: ['backend/x.kt'] };

test('양식대로 채운 PR은 통과한다', () => {
  assert.deepEqual(checkPr(ok).errors, []);
  assert.deepEqual(checkPr(ok).labels, { '중점 리뷰': false, '논의 필요': false });
});

test('빈 템플릿은 요약이 비어 실패한다', () => {
  assert.ok(checkPr({ ...ok, body: template }).errors.some((e) => e.includes('요약이 비어')));
});

test('영역 목록 밖 제목과 이슈 번호 없는 feat 브랜치는 실패한다', () => {
  const r = checkPr({ ...ok, title: 'feat(web): 화면', branch: 'feat/settlement' });
  assert.equal(r.errors.length, 2);
});

test('docs 브랜치는 이슈 번호가 없어도 된다', () => {
  assert.deepEqual(checkPr({ ...ok, title: 'docs(docs): 설계 문서 추가', branch: 'docs/work-pipeline' }).errors, []);
});

test('리뷰 위치 체크박스가 비어 있으면 실패하고, 체크하면 통과하며 중점 리뷰가 붙는다', () => {
  const item = '### 1. backend/ledger/Settlement.kt\n보증금 상한 계산\n- [ ] 읽고 이해함\n';
  const body = filled.replace(/## 리뷰 위치\n([\s\S]*?)없음\n/, `## 리뷰 위치\n${item}`);
  assert.ok(checkPr({ ...ok, body }).errors.some((e) => e.includes('모두 체크')));
  const done = checkPr({ ...ok, body: body.replace('- [ ]', '- [x]') });
  assert.deepEqual(done.errors, []);
  assert.equal(done.labels['중점 리뷰'], true);
});

test('요약이 세 문장이면 실패한다', () => {
  const body = filled.replace('바로 본다.', '바로 본다. 세 번째 문장이다.');
  assert.ok(checkPr({ ...ok, body }).errors.some((e) => e.includes('두 문장')));
});

test('app 변경에 스크린샷이 없으면 실패한다', () => {
  assert.ok(checkPr({ ...ok, files: ['app/screens/Group.tsx'] }).errors.some((e) => e.includes('스크린샷')));
});

test('금지어가 있으면 실패한다', () => {
  const body = filled.replace('바로 본다.', '해당 금액을 본다.');
  assert.ok(checkPr({ ...ok, body }).errors.some((e) => e.includes('금지어')));
});

test('결정 필요에 내용이 있으면 논의 필요가 붙는다', () => {
  const body = filled.replace('## 결정 필요\n없음', '## 결정 필요\n벌금 상한을 보증금으로 둘지');
  assert.equal(checkPr({ ...ok, body }).labels['논의 필요'], true);
});
