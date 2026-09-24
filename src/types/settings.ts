/**
 * Settings type definitions
 */

export type Theme = 'light' | 'dark' | 'system';
export type AngleMode = 'deg' | 'rad';
export type ProgrammerBase = 'dec' | 'hex' | 'oct' | 'bin';
export type ProgrammerBitWidth = 8 | 16 | 32 | 64;

export interface CalculatorSettings {
    theme: Theme;
    precision: number;
    angleMode: AngleMode;
    programmerBase: ProgrammerBase;
    programmerBitWidth: ProgrammerBitWidth;
    showHistory: boolean;
}
