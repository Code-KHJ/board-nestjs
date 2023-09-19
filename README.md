<h1>소개</h1>
Nest.js로 개발한 익명 게시판 CRUD 프로젝트입니다.<br>
주요 기능으로 댓글, 대댓글이 있으며 글 수정, 삭제를 위해서 비밀번호 검증을 구현하였습니다.<br>
<br>
<h1>기술스택</h1>
언어: Node.js v20.5.0, TypeScript / yarn berry<br>
프레임워크: Nest.js<br>
주요 패키지: typeorm, swagger, mysql2, bcrypt, jest 등<br>
데이터베이스: MySQL<br>
기타 툴: Yarn Berry, Git, VS Code<br>
<br>
<h1>설치 및 실행방법</h1>
#프로젝트 실행 전에 <b>Node.js v20.5.0, Yarn Berry</b>를 준비해주세요.<br><br>
1. 소스파일 압축 해제<br><br>
2. 프로젝트 폴더로 이동<br>
<code>cd BOARD-NESTJS</code><br><br>
3. 프로젝트 패키지 설치<br>
<code>yarn install</code><br><br>
4. 데이터베이스 환경변수 설정<br>
&#x2022; MySQL에서 데이터베이스를 생성합니다. <br>
&#x2022; .env파일에 사용할 데이터베이스 정보를 입력합니다.<br>
<code>DB_HOST=your_db_host<br>
DB_PORT=your_db_port<br>
DB_USER=your_db_user<br>
DB_PASSWORD=your_db_password<br>
DB_DATABASE=your_db_database</code><br><br>
5.프로젝트를 실행합니다.<br>
<code>yarn start</code>
<br><br>
<h1>사용방법</h1>
API명세서를 참고하여 게시글 CRUD, 댓글 CRUD 기능을 활용합니다.<br>
API 문서 : http://localhost:3000/api
<br><br>
<h1>테스트</h1>
e2e테스트 실행<br>
<code>yarn test:e2e</code><br><br>
mocking 하지 않고 데이터베이스에 실제로 데이터를 생성, 조회, 수정, 삭제하도록 e2e테스트를 작성하였습니다.<br>
<br>
<h3>작성자 김현준<br>guswns212000@gmail.com</h3>
