# Node.js 18.18.0 기반 이미지 사용
FROM node:18.20.0-slim

# 컨테이너 작업 디렉토리
WORKDIR /app
ADD . /app
RUN npm i

# 나머지 코드 전체 복사
COPY . .

# 서버 포트 오픈
EXPOSE 8080

# 서버 실행 명령
ENTRYPOINT ["node", "app.js"]

