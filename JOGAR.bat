@echo off
rem === Aventura do ABC e 123 — abre o jogo COM microfone funcionando ===
rem O navegador bloqueia o microfone quando o jogo abre por duplo clique (file://).
rem Este atalho sobe um servidorzinho local (precisa do Node.js) e abre o navegador.
title Aventura do ABC e 123

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado - abrindo o jogo do jeito simples, SEM microfone.
  echo Para o microfone funcionar, peca para instalar o Node.js em nodejs.org
  start "" "%~dp0index.html"
  timeout /t 5 >nul
  exit /b
)

start "Aventura do ABC e 123 - servidor (pode minimizar, NAO fechar)" /min node "%~dp0servidor.js"

rem espera o servidor responder de verdade (ate ~10s) antes de abrir o navegador
set tentativas=0
:espera
curl -s -o nul http://127.0.0.1:8123/ 2>nul
if not errorlevel 1 goto abrir
set /a tentativas+=1
if %tentativas% geq 20 goto abrir
timeout /t 1 /nobreak >nul
goto espera

:abrir
start "" http://127.0.0.1:8123
exit /b
