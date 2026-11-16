#!/usr/bin/env bash

# ==============================================================================
#  SHIVAJI RATHOD — Portfolio Dev & Server Management Script
# ==============================================================================

# Move to the script's directory (portfolio root)
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR" || exit 1

# Colors for terminal styling
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Default development port (can be overridden, e.g. PORT=3860 ./manage.sh)
PORT="${PORT:-3860}"

function print_banner() {
  clear
  echo -e "${CYAN}${BOLD}"
  echo "  ╔══════════════════════════════════════════════════════════════╗"
  echo "  ║             SHIVAJI RATHOD — PORTFOLIO MANAGER               ║"
  echo "  ║                 Cybersecurity Portfolio                      ║"
  echo "  ╚══════════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
}

function stop_server() {
  echo -e "\n${YELLOW}⏹️  Searching for running server processes...${NC}"

  # 1. Kill by port (3000, 3001, 3860)
  for p in 3000 3001 3860 "$PORT"; do
    if command -v fuser >/dev/null 2>&1; then
      fuser -k -n tcp "$p" >/dev/null 2>&1
    fi
  done

  # 2. Kill by process name (node/next dev in this folder)
  pkill -f "next dev" >/dev/null 2>&1 || true
  pkill -f "next-server" >/dev/null 2>&1 || true

  # Small sleep to ensure sockets close
  sleep 1
  echo -e "${GREEN}✓ All previous dev server processes stopped.${NC}"
}

function clean_cache() {
  echo -e "\n${YELLOW}🧹 Cleaning build caches (.next, node_modules/.cache)...${NC}"
  rm -rf .next
  rm -rf node_modules/.cache
  echo -e "${GREEN}✓ Build cache wiped clean!${NC}"
}

function start_server() {
  stop_server
  echo -e "\n${BLUE}🚀 Starting Next.js Dev Server on port ${BOLD}${PORT}${NC}..."
  echo -e "${CYAN}ℹ️  Open in your browser: ${BOLD}http://localhost:${PORT}${NC}\n"

  # Run next dev on the designated port
  PORT="$PORT" npm run dev -- -p "$PORT"
}

function hard_refresh() {
  echo -e "\n${BOLD}${YELLOW}🔄 PERFORMING COMPLETE HARD REFRESH...${NC}"
  stop_server
  clean_cache
  echo -e "${GREEN}✓ Cache cleared. Booting up fresh server on port ${PORT}...${NC}"
  echo -e "${CYAN}👉 In your browser, please press ${BOLD}Ctrl + Shift + R${NC} ${CYAN}or open in Incognito!${NC}\n"
  
  PORT="$PORT" npm run dev -- -p "$PORT"
}

function build_production() {
  echo -e "\n${BLUE}🔨 Running Production Build...${NC}"
  clean_cache
  npm run build
}

function optimize_photos() {
  echo -e "\n${CYAN}🖼️  Optimizing 360° Turntable Photos...${NC}"
  npm run photos
}

# CLI Argument Mode
case "$1" in
  start)
    start_server
    exit 0
    ;;
  stop)
    stop_server
    exit 0
    ;;
  refresh|clean|restart)
    hard_refresh
    exit 0
    ;;
  build)
    build_production
    exit 0
    ;;
  photos)
    optimize_photos
    exit 0
    ;;
esac

# Interactive Menu Loop
while true; do
  print_banner
  echo -e "${BOLD}Current Configured Port:${NC} ${GREEN}${PORT}${NC}"
  echo ""
  echo -e "  ${CYAN}[1]${NC}  🟢 ${BOLD}Start Dev Server${NC} (Runs on http://localhost:${PORT})"
  echo -e "  ${CYAN}[2]${NC}  🔴 ${BOLD}Stop Dev Server${NC}  (Kills any lingering Next.js/node servers)"
  echo -e "  ${CYAN}[3]${NC}  🧹 ${BOLD}Hard Refresh / Clean Restart${NC} (Kills old processes + wipes .next + starts fresh)"
  echo -e "  ${CYAN}[4]${NC}  🔨 ${BOLD}Build Project${NC}     (Runs npm run build)"
  echo -e "  ${CYAN}[5]${NC}  🖼️  ${BOLD}Regenerate Photos${NC} (Re-runs 360° photo optimizer)"
  echo -e "  ${CYAN}[6]${NC}  ⚙️  ${BOLD}Change Port${NC}       (Currently: ${PORT})"
  echo -e "  ${CYAN}[0]${NC}  ❌ ${BOLD}Exit${NC}"
  echo ""
  read -rp "  Select an option [0-6]: " choice

  case "$choice" in
    1)
      start_server
      break
      ;;
    2)
      stop_server
      read -rp "Press Enter to return to menu..."
      ;;
    3)
      hard_refresh
      break
      ;;
    4)
      build_production
      read -rp "Press Enter to return to menu..."
      ;;
    5)
      optimize_photos
      read -rp "Press Enter to return to menu..."
      ;;
    6)
      read -rp "Enter new port (e.g. 3000, 3860): " new_port
      if [[ -n "$new_port" ]]; then
        PORT="$new_port"
      fi
      ;;
    0|q|Q)
      echo -e "\n${GREEN}Exiting. Have a great day!${NC}\n"
      exit 0
      ;;
    *)
      echo -e "${RED}Invalid option!${NC}"
      sleep 1
      ;;
  esac
done
