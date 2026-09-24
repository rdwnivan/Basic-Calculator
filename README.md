# Calculator

A cross-platform desktop calculator with Basic, Scientific, and Programmer modes.

## Features

- Basic arithmetic (add, subtract, multiply, divide, percent)
- Scientific functions (sin, cos, tan, log, ln, sqrt, x², π, e, factorial)
- Calculation history (persisted in localStorage)
- Responsive dark theme UI
- Packaged as a Windows `.exe` with Electron

## Run (web)

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Build `.exe`

```bash
npm run build:exe
```

Output lands in `release/`:

- `Calculator 1.0.0.exe` — portable, runs without installing
- `Calculator Setup 1.0.0.exe` — NSIS installer

Rebuild whenever the app source changes.

## Files

- `src/main.ts` — App entry point
- `electron/main.ts` — Electron main process (window, lifecycle)
- `electron/preload.ts` — Electron preload bridge
- `src/core/CalculatorEngine.ts` — Calculation logic
- `src/core/HistoryStore.ts` — History persistence (localStorage)
- `src/ui/` — UI components (Display, Keypad, ModeSelector, HistoryPanel)
- `src/styles/main.css` — Styling
