FROM hayd/deno:alpine-1.1.3

WORKDIR /app 

COPY . .

USER deno 

CMD ["run", "--alow-net", "--alow-read", "src/mod.ts"]

EXPOSE 8000
