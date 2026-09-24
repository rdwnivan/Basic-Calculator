/**
 * Mathematical utilities and constants
 */

export const CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    TAU: Math.PI * 2,
    SQRT2: Math.SQRT2,
    SQRT1_2: Math.SQRT1_2,
    LN2: Math.LN2,
    LN10: Math.LN10,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E,
} as const;

export type AngleMode = 'deg' | 'rad';

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * Get angle in radians based on current mode
 */
export function getAngleValue(value: number, mode: AngleMode): number {
    return mode === 'deg' ? degToRad(value) : value;
}

/**
 * Convert result from radians to current angle mode
 */
export function fromRadValue(value: number, mode: AngleMode): number {
    return mode === 'deg' ? radToDeg(value) : value;
}

/**
 * Safe math operations that handle edge cases
 */
export const safeMath = {
    add(a: number, b: number): number {
        const result = a + b;
        if (!isFinite(result)) throw new Error('Overflow');
        return result;
    },

    subtract(a: number, b: number): number {
        const result = a - b;
        if (!isFinite(result)) throw new Error('Overflow');
        return result;
    },

    multiply(a: number, b: number): number {
        const result = a * b;
        if (!isFinite(result)) throw new Error('Overflow');
        return result;
    },

    divide(a: number, b: number): number {
        if (b === 0) throw new Error('Division by zero');
        const result = a / b;
        if (!isFinite(result)) throw new Error('Overflow');
        return result;
    },

    power(base: number, exponent: number): number {
        const result = Math.pow(base, exponent);
        if (!isFinite(result) && isFinite(base) && isFinite(exponent)) {
            throw new Error('Overflow');
        }
        return result;
    },

    modulo(a: number, b: number): number {
        if (b === 0) throw new Error('Modulo by zero');
        return a % b;
    },

    sqrt(value: number): number {
        if (value < 0) throw new Error('Square root of negative number');
        return Math.sqrt(value);
    },

    log(value: number, base?: number): number {
        if (value <= 0) throw new Error('Logarithm of non-positive number');
        return base ? Math.log(value) / Math.log(base) : Math.log(value);
    },

    sin(value: number): number {
        return Math.sin(value);
    },

    cos(value: number): number {
        return Math.cos(value);
    },

    tan(value: number): number {
        const cosVal = Math.cos(value);
        if (Math.abs(cosVal) < 1e-15) throw new Error('Tangent undefined');
        return Math.tan(value);
    },

    asin(value: number): number {
        if (value < -1 || value > 1) throw new Error('Invalid input for arcsin');
        return Math.asin(value);
    },

    acos(value: number): number {
        if (value < -1 || value > 1) throw new Error('Invalid input for arccos');
        return Math.acos(value);
    },

    atan(value: number): number {
        return Math.atan(value);
    },

    sinh(value: number): number {
        return Math.sinh(value);
    },

    cosh(value: number): number {
        return Math.cosh(value);
    },

    tanh(value: number): number {
        return Math.tanh(value);
    },

    factorial(n: number): number {
        if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial requires non-negative integer');
        if (n > 170) throw new Error('Overflow');
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },

    percent(value: number): number {
        return value / 100;
    },

    reciprocal(value: number): number {
        if (value === 0) throw new Error('Division by zero');
        return 1 / value;
    },

    square(value: number): number {
        return value * value;
    },

    abs(value: number): number {
        return Math.abs(value);
    },

    round(value: number, precision: number = 0): number {
        const factor = Math.pow(10, precision);
        return Math.round(value * factor) / factor;
    },

    floor(value: number): number {
        return Math.floor(value);
    },

    ceil(value: number): number {
        return Math.ceil(value);
    },

    trunc(value: number): number {
        return Math.trunc(value);
    },
};

/**
 * Bitwise operations for programmer mode
 */
export const bitwise = {
    and(a: bigint, b: bigint): bigint { return a & b; },
    or(a: bigint, b: bigint): bigint { return a | b; },
    xor(a: bigint, b: bigint): bigint { return a ^ b; },
    not(a: bigint, bitWidth: number): bigint {
        const mask = (BigInt(1) << BigInt(bitWidth)) - BigInt(1);
        return (~a) & mask;
    },
    shl(a: bigint, b: number, bitWidth: number): bigint {
        const mask = (BigInt(1) << BigInt(bitWidth)) - BigInt(1);
        return (a << BigInt(b)) & mask;
    },
    shr(a: bigint, b: number): bigint {
        return a >> BigInt(b);
    },
    rol(a: bigint, b: number, bitWidth: number): bigint {
        const mask = (BigInt(1) << BigInt(bitWidth)) - BigInt(1);
        const shift = BigInt(b % bitWidth);
        return ((a << shift) | (a >> (BigInt(bitWidth) - shift))) & mask;
    },
    ror(a: bigint, b: number, bitWidth: number): bigint {
        const mask = (BigInt(1) << BigInt(bitWidth)) - BigInt(1);
        const shift = BigInt(b % bitWidth);
        return ((a >> shift) | (a << (BigInt(bitWidth) - shift))) & mask;
    },
};

/**
 * Check if a value is a valid number for calculations
 */
export function isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && isFinite(value) && !isNaN(value);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Round to significant figures
 */
export function roundToSignificantFigures(value: number, figures: number): number {
    if (value === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(value)));
    const factor = Math.pow(10, figures - 1 - magnitude);
    return Math.round(value * factor) / factor;
}