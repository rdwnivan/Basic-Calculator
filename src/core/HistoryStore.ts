/**
 * History persistence store (web-only)
 */

import { HistoryEntry } from '../types/calculator';

const STORAGE_KEY = 'calculator-history';

export class HistoryStore {
    private entries: HistoryEntry[] = [];

    constructor() {
        this.load();
    }

    private load(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                this.entries = JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load history:', e);
            this.entries = [];
        }
    }

    private save(): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
        } catch (e) {
            console.warn('Failed to save history:', e);
        }
    }

    get(): HistoryEntry[] {
        return [...this.entries];
    }

    add(entry: HistoryEntry): void {
        this.entries.unshift(entry);
        if (this.entries.length > 1000) {
            this.entries.pop();
        }
        this.save();
    }

    clear(): void {
        this.entries = [];
        this.save();
    }
}

// Singleton instance
export const historyStore = new HistoryStore();
