/**
 * Settings persistence store
 */

import type { CalculatorSettings } from '../types/settings';

const STORAGE_KEY = 'calculator-settings';

export interface SettingsStoreEvents {
    change: (settings: CalculatorSettings) => void;
}

type EventHandler<T> = (data: T) => void;

export class SettingsStore {
    private settings: CalculatorSettings;
    private listeners: Map<keyof SettingsStoreEvents, Set<EventHandler<any>>> = new Map();

    constructor() {
        this.settings = this.load();
    }

    private load(): CalculatorSettings {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load settings:', e);
        }
        return this.getDefaults();
    }

    private getDefaults(): CalculatorSettings {
        return {
            theme: 'system',
            precision: 10,
            angleMode: 'deg',
            programmerBase: 'dec',
            programmerBitWidth: 64,
            showHistory: true,
        };
    }

    private save(): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Failed to save settings:', e);
        }
    }

    get(): CalculatorSettings {
        return { ...this.settings };
    }

    get<K extends keyof CalculatorSettings>(key: K): CalculatorSettings[K] {
        return this.settings[key];
    }

    set<K extends keyof CalculatorSettings>(key: K, value: CalculatorSettings[K]): void {
        this.settings[key] = value;
        this.save();
        this.emit('change', this.get());
    }

    setAll(settings: Partial<CalculatorSettings>): void {
        this.settings = { ...this.settings, ...settings };
        this.save();
        this.emit('change', this.get());
    }

    reset(): void {
        this.settings = this.getDefaults();
        this.save();
        this.emit('change', this.get());
    }

    // Event system
    on<K extends keyof SettingsStoreEvents>(event: K, handler: EventHandler<SettingsStoreEvents[K]>): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
        return () => this.off(event, handler);
    }

    off<K extends keyof SettingsStoreEvents>(event: K, handler: EventHandler<SettingsStoreEvents[K]>): void {
        this.listeners.get(event)?.delete(handler);
    }

    private emit<K extends keyof SettingsStoreEvents>(event: K, data: SettingsStoreEvents[K]): void {
        this.listeners.get(event)?.forEach(handler => handler(data));
    }
}

// Singleton instance
export const settingsStore = new SettingsStore();