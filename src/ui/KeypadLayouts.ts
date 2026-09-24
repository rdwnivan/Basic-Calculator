import { ButtonDef } from '../types/calculator';

const DIGITS: ButtonDef[] = [
    { label: '7', action: '7', type: 'digit' },
    { label: '8', action: '8', type: 'digit' },
    { label: '9', action: '9', type: 'digit' },
    { label: '4', action: '4', type: 'digit' },
    { label: '5', action: '5', type: 'digit' },
    { label: '6', action: '6', type: 'digit' },
    { label: '1', action: '1', type: 'digit' },
    { label: '2', action: '2', type: 'digit' },
    { label: '3', action: '3', type: 'digit' },
    { label: '0', action: '0', type: 'digit', span: 2 },
    { label: '.', action: '.', type: 'digit' },
];

const ACTIONS: ButtonDef[] = [
    { label: 'C', action: 'C', type: 'action' },
    { label: 'CE', action: 'CE', type: 'action' },
    { label: '⌫', action: 'backspace', type: 'action' },
    { label: '=', action: '=', type: 'equals' },
];

const OPERATORS: ButtonDef[] = [
    { label: '÷', action: '/', type: 'operator' },
    { label: '×', action: '*', type: 'operator' },
    { label: '-', action: '-', type: 'operator' },
    { label: '+', action: '+', type: 'operator' },
];

export const BASIC_LAYOUT: ButtonDef[] = [
    // Baris 1: Actions & Modulo
    ACTIONS[0], ACTIONS[1], { label: '%', action: '%', type: 'operator' }, OPERATORS[0],

    // Baris 2: 7 8 9 *
    DIGITS[0], DIGITS[1], DIGITS[2], OPERATORS[1],

    // Baris 3: 4 5 6 -
    DIGITS[3], DIGITS[4], DIGITS[5], OPERATORS[2],

    // Baris 4: 1 2 3 +
    DIGITS[6], DIGITS[7], DIGITS[8], OPERATORS[3],

    // Baris 5: 0 . =
    DIGITS[9], DIGITS[10], ACTIONS[3], { label: '±', action: '+/-', type: 'action' }
];

export const SCIENTIFIC_LAYOUT: ButtonDef[] = [
    // Baris 1: Scientific Functions
    { label: 'sin', action: 'sin', type: 'function' },
    { label: 'cos', action: 'cos', type: 'function' },
    { label: 'tan', action: 'tan', type: 'function' },
    { label: 'π', action: 'pi', type: 'function' },

    // Baris 2: Scientific Functions
    { label: 'log', action: 'log', type: 'function' },
    { label: 'ln', action: 'ln', type: 'function' },
    { label: '√', action: 'sqrt', type: 'function' },
    { label: 'e', action: 'e', type: 'function' },

    // Baris 3: Powers & Factorial
    { label: 'x²', action: 'x^2', type: 'function' },
    { label: 'xʸ', action: 'x^y', type: 'function' },
    { label: 'n!', action: 'n!', type: 'function' },
    { label: 'C', action: 'C', type: 'action' },

    // Basic keys
    ...BASIC_LAYOUT.slice(4) // Reuse basic digit/operator layout
];