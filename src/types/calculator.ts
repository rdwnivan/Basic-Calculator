/**
 * Calculator type definitions
 */

export type CalculatorMode = 'basic' | 'scientific';

export type ButtonType = 'digit' | 'operator' | 'function' | 'action' | 'equals' | 'memory';

export interface ButtonDef {
    label: string;
    action: string;
    type: ButtonType;
    span?: number;       // grid column span
    className?: string;  // extra CSS class
    disabled?: boolean;
}

export interface HistoryEntry {
    id: string;
    expression: string;
    result: string;
    mode: CalculatorMode;
    timestamp: number;
}

export interface CalculatorState {
    display: string;
    expression: string;
    currentValue: string;
    previousValue: string;
    operator: string | null;
    waitingForOperand: boolean;
    memory: number;
    mode: CalculatorMode;
    parenthesesDepth: number;
    hasResult: boolean;
    error: string | null;
}
