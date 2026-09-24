/**
 * Number formatting utilities
 */

export interface FormatOptions {
    precision?: number;
    useGrouping?: boolean;
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    base?: 2 | 8 | 10 | 16;
    bitWidth?: 8 | 16 | 32 | 64;
    signed?: boolean;
}

const DEFAULT_OPTIONS: Required<FormatOptions> = {
    precision: 10,
    useGrouping: true,
    notation: 'standard',
    base: 10,
    bitWidth: 64,
    signed: true,
};

/**
 * Format a number for display
 */
export function formatNumber(
    value: number | bigint | string,
    options: FormatOptions = {}
): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    // Handle base conversion
    if (opts.base !== 10) {
        return formatBase(value, opts.base, opts.bitWidth, opts.signed);
    }

    // Handle regular decimal formatting
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);

    if (!isFinite(num)) {
        return String(value);
    }

    if (opts.notation === 'scientific') {
        return num.toExponential(opts.precision);
    }

    if (opts.notation === 'engineering') {
        return toEngineeringNotation(num, opts.precision);
    }

    // Standard formatting with locale
    return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: opts.precision,
        useGrouping: opts.useGrouping,
    }).format(num);
}

/**
 * Format number in different bases (for programmer mode)
 */
function formatBase(
    value: number | bigint | string,
    base: 2 | 8 | 10 | 16,
    bitWidth: 8 | 16 | 32 | 64,
    signed: boolean
): string {
    let num: bigint;

    if (typeof value === 'string') {
        // Try to parse as decimal first
        const parsed = BigInt(value);
        num = parsed;
    } else if (typeof value === 'bigint') {
        num = value;
    } else {
        num = BigInt(Math.trunc(value));
    }

    // Apply bit width mask
    const mask = getBitMask(bitWidth);
    let masked = num & mask;

    // Handle signed interpretation
    if (signed && bitWidth > 0) {
        const signBit = BigInt(1) << BigInt(bitWidth - 1);
        if ((masked & signBit) !== 0n) {
            // Negative number in two's complement
            masked = masked - (BigInt(1) << BigInt(bitWidth));
        }
    }

    switch (base) {
        case 2:
            return masked.toString(2).padStart(bitWidth, '0');
        case 8:
            return masked.toString(8);
        case 16:
            return masked.toString(16).toUpperCase();
        default:
            return masked.toString();
    }
}

/**
 * Get bit mask for given width
 */
function getBitMask(bitWidth: 8 | 16 | 32 | 64): bigint {
    switch (bitWidth) {
        case 8: return 0xFFn;
        case 16: return 0xFFFFn;
        case 32: return 0xFFFFFFFFn;
        case 64: return 0xFFFFFFFFFFFFFFFFn;
        default: return 0xFFFFFFFFFFFFFFFFn;
    }
}

/**
 * Convert to engineering notation (exponent multiple of 3)
 */
function toEngineeringNotation(num: number, precision: number): string {
    if (num === 0) return '0';

    const absNum = Math.abs(num);
    const exponent = Math.floor(Math.log10(absNum));
    const engExp = Math.floor(exponent / 3) * 3;
    const mantissa = num / Math.pow(10, engExp);

    const mantissaStr = mantissa.toFixed(precision).replace(/\.?0+$/, '');

    if (engExp === 0) {
        return mantissaStr;
    }

    return `${mantissaStr}e${engExp >= 0 ? '+' : ''}${engExp}`;
}

/**
 * Parse a formatted number string back to a number
 */
export function parseFormatted(value: string, base: 2 | 8 | 10 | 16 = 10): number {
    const cleaned = value.replace(/,/g, '').replace(/\s+/g, '').toLowerCase();

    if (base !== 10) {
        return parseInt(cleaned, base);
    }

    // Handle scientific notation
    if (cleaned.includes('e')) {
        return parseFloat(cleaned);
    }

    return parseFloat(cleaned);
}

/**
 * Format for display with proper handling of large numbers
 */
export function formatDisplay(value: number | bigint | string, maxLength: number = 20): string {
    const str = formatNumber(value);

    if (str.length <= maxLength) {
        return str;
    }

    // Try scientific notation if too long
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isFinite(num)) {
        return num.toExponential(6);
    }

    return str.slice(0, maxLength - 3) + '...';
}