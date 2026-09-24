# Calculator

A simple web-based calculator with Basic and Scientific modes.

## Features

- Basic arithmetic (add, subtract, multiply, divide, percent)
- Scientific functions (sin, cos, tan, log, ln, sqrt, x², π, e, factorial)
- Calculation history (persisted in localStorage)
- Responsive dark theme UI

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Files

- `src/main.ts` — App entry point
- `src/core/CalculatorEngine.ts` — Calculation logic
- `src/core/HistoryStore.ts` — History persistence (localStorage)
- `src/ui/` — UI components (Display, Keypad, ModeSelector, HistoryPanel)
- `src/styles/main.css` — Styling
