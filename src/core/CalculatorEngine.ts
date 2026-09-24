/**
 * Main calculator engine
 */

import { safeMath } from '../utils/math';
import { CalculatorMode, CalculatorState } from '../types/calculator';
import { historyStore } from './HistoryStore';

type EventHandler = (state: CalculatorState) => void;

export class CalculatorEngine {
    private state: CalculatorState;
    private listeners: Set<EventHandler> = new Set();

    constructor(initialMode: CalculatorMode = 'basic') {
        this.state = this.getInitialState(initialMode);
    }

    private getInitialState(mode: CalculatorMode): CalculatorState {
        return {
            display: '0',
            expression: '',
            currentValue: '0',
            previousValue: '0',
            operator: null,
            waitingForOperand: false,
            memory: 0,
            mode,
            parenthesesDepth: 0,
            hasResult: false,
            error: null,
        };
    }

    public subscribe(handler: EventHandler): () => void {
        this.listeners.add(handler);
        return () => this.listeners.delete(handler);
    }

    private emit(): void {
        this.listeners.forEach(handler => handler({ ...this.state }));
    }

    public handleAction(action: string): void {
        if (this.state.error) {
            this.clear();
        }

        switch (action) {
            case 'C': this.clear(); break;
            case 'CE': this.clearEntry(); break;
            case 'backspace': this.backspace(); break;
            case '=': this.calculate(); break;
            case '.': this.appendDecimal(); break;
            case '+/-': this.toggleSign(); break;
            case '(':
            case ')':
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
            case 'ln':
            case 'sqrt':
            case 'x^2':
            case 'x^y':
            case 'n!':
            case 'pi':
            case 'e':
            case 'and':
            case 'or':
            case 'xor':
            case 'not':
            case 'shl':
            case 'shr':
                this.handleFunction(action);
                break;
            default:
                if (['+', '-', '*', '/', '%'].includes(action)) {
                    this.setOperator(action);
                } else {
                    this.appendDigit(action);
                }
        }
        this.emit();
    }

    private clear(): void {
        this.state = this.getInitialState(this.state.mode);
    }

    private clearEntry(): void {
        this.state.currentValue = '0';
        this.state.display = '0';
    }

    private backspace(): void {
        if (this.state.currentValue.length > 1) {
            this.state.currentValue = this.state.currentValue.slice(0, -1);
        } else {
            this.state.currentValue = '0';
        }
        this.state.display = this.state.currentValue;
    }

    private appendDigit(digit: string): void {
        if (this.state.waitingForOperand) {
            this.state.currentValue = digit;
            this.state.waitingForOperand = false;
        } else {
            this.state.currentValue = this.state.currentValue === '0' ? digit : this.state.currentValue + digit;
        }
        this.state.display = this.state.currentValue;
        this.state.hasResult = false;
    }

    private appendDecimal(): void {
        if (!this.state.currentValue.includes('.')) {
            this.state.currentValue += '.';
            this.state.display = this.state.currentValue;
        }
    }

    private toggleSign(): void {
        const val = parseFloat(this.state.currentValue);
        this.state.currentValue = String(-val);
        this.state.display = this.state.currentValue;
    }

    private setOperator(operator: string): void {
        if (this.state.operator && !this.state.waitingForOperand) {
            this.calculate();
        }
        this.state.previousValue = this.state.currentValue;
        this.state.operator = operator;
        this.state.waitingForOperand = true;
        this.state.expression = `${this.state.previousValue} ${operator}`;
    }

    private calculate(): void {
        const a = parseFloat(this.state.previousValue);
        const b = parseFloat(this.state.currentValue);

        try {
            let result = 0;
            switch (this.state.operator) {
                case '+': result = safeMath.add(a, b); break;
                case '-': result = safeMath.subtract(a, b); break;
                case '*': result = safeMath.multiply(a, b); break;
                case '/': result = safeMath.divide(a, b); break;
                case '%': result = safeMath.modulo(a, b); break;
                default: return;
            }
            this.state.currentValue = String(result);
            this.state.display = this.state.currentValue;
            this.state.expression = `${this.state.previousValue} ${this.state.operator} ${b} =`;

            // Persist to history
            historyStore.add({
                id: crypto.randomUUID(),
                expression: `${this.state.previousValue} ${this.state.operator} ${b}`,
                result: this.state.currentValue,
                mode: this.state.mode,
                timestamp: Date.now()
            });

            this.state.operator = null;
            this.state.waitingForOperand = true;
            this.state.hasResult = true;
        } catch (e) {
            this.state.error = (e as Error).message;
            this.state.display = this.state.error;
        }
    }

    private handleFunction(fn: string): void {
        const val = parseFloat(this.state.currentValue);
        let result = 0;

        try {
            switch (fn) {
                case 'sin': result = safeMath.sin(val); break;
                case 'cos': result = safeMath.cos(val); break;
                case 'tan': result = safeMath.tan(val); break;
                case 'log': result = safeMath.log(val, 10); break;
                case 'ln': result = safeMath.log(val); break;
                case 'sqrt': result = safeMath.sqrt(val); break;
                case 'x^2': result = safeMath.square(val); break;
                case 'n!': result = safeMath.factorial(val); break;
                case 'pi': result = 3.141592653589793; break;
                case 'e': result = 2.718281828459045; break;
                default:
                    this.state.display = 'Error';
                    return;
            }
            this.state.currentValue = String(result);
            this.state.display = this.state.currentValue;
            this.state.expression = `${fn}(${val})`;
            this.state.hasResult = true;
        } catch (e) {
            this.state.error = (e as Error).message;
            this.state.display = this.state.error;
        }
    }

    public setMode(mode: CalculatorMode): void {
        this.state.mode = mode;
        this.clear();
        this.emit();
    }

    public getState(): CalculatorState {
        return { ...this.state };
    }
}
