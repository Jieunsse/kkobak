# 데이터베이스는 PostgreSQL, 데이터 접근은 Spring Data JPA

서버 데이터베이스로 PostgreSQL을, 데이터 접근 방식으로 Spring Data JPA를 쓴다(2026-11-27, 사용자 결정). 구현의 절반을 Codex가 맡으므로 Claude와 Codex가 가장 많이 본 JPA를 골랐다.

## Considered Options

- MySQL 8: 채용 공고에서 자주 보이는 기술이라 검토했지만 사용자가 PostgreSQL을 골랐다.
- Exposed(Kotlin 전용 SQL 라이브러리): 4주 일정 안에 새로 배우는 비용이 커서 고르지 않았다.
