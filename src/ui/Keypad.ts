import { createElement, delegate } from '../utils/dom';
import { ButtonDef } from '../types/calculator';

export class Keypad {
    private container: HTMLElement;

    constructor(containerId: string, onAction: (action: string) => void) {
        this.container = document.getElementById(containerId)!;

        delegate(this.container, 'button', 'click', (event, target) => {
            const action = target.getAttribute('data-action');
            if (action) onAction(action);
        });
    }

    render(buttons: ButtonDef[]): void {
        this.container.innerHTML = '';
        buttons.forEach(btn => {
            const button = createElement('button', {
                text: btn.label,
                attributes: {
                    'data-action': btn.action,
                    'class': `btn btn-${btn.type}`
                }
            });
            if (btn.span) button.style.gridColumn = `span ${btn.span}`;
            this.container.appendChild(button);
        });
    }
}
