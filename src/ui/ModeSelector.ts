import { createElement } from '../utils/dom';
import { CalculatorMode } from '../types/calculator';

export class ModeSelector {
    private buttons: Map<CalculatorMode, HTMLElement> = new Map();

    constructor(containerId: string, onModeChange: (mode: CalculatorMode) => void) {
        const container = document.getElementById(containerId)!;
        const modes: CalculatorMode[] = ['basic', 'scientific'];

        modes.forEach(mode => {
            const btn = createElement('button', {
                text: mode.charAt(0).toUpperCase() + mode.slice(1),
                attributes: { class: 'mode-btn' }
            });
            btn.onclick = () => {
                this.setActive(mode);
                onModeChange(mode);
            };
            this.buttons.set(mode, btn);
            container.appendChild(btn);
        });

        // Set Basic as default active
        this.setActive('basic');
    }

    private setActive(mode: CalculatorMode): void {
        this.buttons.forEach((btn, m) => {
            if (m === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}
