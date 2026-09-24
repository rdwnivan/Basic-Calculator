import './styles/main.css';
import { CalculatorEngine } from './core/CalculatorEngine';
import { Keypad } from './ui/Keypad';
import { Display } from './ui/Display';
import { ModeSelector } from './ui/ModeSelector';
import { HistoryPanel } from './ui/HistoryPanel';
import { BASIC_LAYOUT, SCIENTIFIC_LAYOUT } from './ui/KeypadLayouts';
import { on } from './utils/dom';
import { historyStore } from './core/HistoryStore';

const engine = new CalculatorEngine();
const display = new Display();
const keypad = new Keypad('keypad', action => engine.handleAction(action));
new ModeSelector('mode-selector-container', mode => {
    engine.setMode(mode);
    switch (mode) {
        case 'basic': keypad.render(BASIC_LAYOUT); break;
        case 'scientific': keypad.render(SCIENTIFIC_LAYOUT); break;
    }
});
const history = new HistoryPanel();

engine.subscribe(state => {
    display.update(state.expression, state.display);
});

// Auto-refresh history when new calculation occurs
engine.subscribe(() => {
    history.render(historyStore.get());
});

// History toggle
on(document.getElementById('history-toggle'), 'click', () => {
    history.toggle();
    const btn = document.getElementById('history-toggle')!;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
});

keypad.render(BASIC_LAYOUT);
history.render(historyStore.get());
