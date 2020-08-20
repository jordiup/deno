# Run from terminal with: 
# docker build -t jordiup/nasa-deno .

FROM hayd/alpine-deno:1.3.0

WORKDIR /app 

COPY . . 

USER deno 

CMD ["run", "--allow-net", "--alow-read", "src/mod.ts"]

EXPOSE 8000