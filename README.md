# 수도권 광역전철 정보 (SeoulSubway)
### __**[23345줄 노가다!]**__ 역 정보 목록: public/js/stations.json
### 전철 노선도: index.html   

## 0. 제작목적
- 전동차 및 역 정보를 쉽게 검색할 수 있다.
- 사용자 간 전동차 편성 정보를 공유할 수 있다.

## 1. 주요 기능
- [X] 역 정보 검색
- [X] 전동차 시간표 및 위치 조회
- [ ] 사용자 간 열차 지연 정보 공유
- [ ] 사용자 간 전동차 편성 정보 공유
- [X] 사용자 간 커뮤니티에서 각종 정보 공유

## 2. 데이터베이스 구성
### 1) 회원(users)
테이블 설명
|칼럼|설명|
|---|---|
|id|고유 ID(자동갱신)|
|name|사용자의 닉네임|
|email|사용자의 이메일|
|password|사용자의 비밀번호(암호화로 저장됨)|
|reg_date|사용자의 가입 날짜(자동갱신)|

테이블 에시
|id|name|email|password|reg_date|
|---|---|---|---|---|
|712|홍은표|hackg179@gmail.com|abc123|2020-06-15 12:11:57|

명령어
```sql
CREATE TABLE users (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(16) NOT NULL,
    email longtext NOT NULL,
    password longtext NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2) 전동차 정보(train)
* 여기에 없는 정보는 공사로부터 제공받는 정보를 호출합니다.

테이블 설명
|칼럼|설명|
|---|---|
|lineno|전동차 호선|
|id|전동차의 열차번호|
|delay|지연 시간(초)|
|formation|전동차의 편성번호|

테이블 에시
|lineno|id|delay|formation|
|---|---|---|---|
|3|S3328|671|334|

명령어
```sql
CREATE TABLE train (
    lineno varchar(16) NOT NULL,
    id varchar(16) NOT NULL,
    delay INT(16) NOT NULL,
    formation varchar(16) NOT NULL
);
```

### 3) 질문게시판(questions)
테이블 설명
|칼럼|설명|
|---|---|
|id|질문 고유 ID(자동갱신)|
|title|글 제목|
|content|내용|
|category|답변현황|
|writer|글쓴이(자동갱신)|
|comments|답변내용|
|reg_date|등록일자(자동갱신)|

테이블 에시
|id|title|content|category|writer|comments|reg_date|
|---|---|---|---|---|---|---|
|348|버그신고|지하철 노선도에 버그가 있습니다. 고쳐주세요.|해결완료|홍은표|해결했습니다. 감사합니다|2020-06-15 12:11:57|

명령어
```sql
CREATE TABLE questions (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title varchar(256) NOT NULL,
    content longtext NOT NULL,
    category varchar(50) NOT NULL,
    writer varchar(16) NOT NULL,
    comments longtext NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 제작자 및 도움을 주신 분들
- 사이트 총 책임자: 홍은표(potato179)
- 기타 도움: 강유찬
* 열차 사진: http://www.trainfrontview.net/
