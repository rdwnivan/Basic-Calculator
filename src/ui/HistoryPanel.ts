import { createElement, on } from '../utils/dom';
import { HistoryEntry } from '../types/calculator';
import { historyStore } from '../core/HistoryStore';

export class HistoryPanel {
    private list: HTMLElement;
    private empty: HTMLElement;
    private container: HTMLElement;

    constructor() {
        this.container = document.getElementById('history-panel')!;
        this.list = document.getElementById('history-list')!;
        this.empty = document.getElementById('history-empty')!;

        // Handle clear history
        on(document.getElementById('clear-history'), 'click', () => {
            historyStore.clear();
            this.render(historyStore.get());
        });

        // Handle close history
        on(document.getElementById('close-history'), 'click', () => {
            this.toggle();
        });
    }

    toggle(): void {
        this.container.classList.toggle('visible');
    }

    render(entries: HistoryEntry[]): void {
        this.list.innerHTML = '';
        if (entries.length === 0) {
            this.empty.hidden = false;
        } else {
            this.empty.hidden = true;
            entries.forEach(entry => {
                this.list.appendChild(createElement('div', {
                    class: 'history-item',
                    children: [
                        createElement('div', { class: 'history-expr', text: entry.expression }),
                        createElement('div', { class: 'history-res', text: entry.result })
                    ]
                }));
            });
        }
    }
}
