export class Display {
    private expressionEl: HTMLElement;
    private resultEl: HTMLElement;

    constructor() {
        this.expressionEl = document.getElementById('display-expression')!;
        this.resultEl = document.getElementById('display-result')!;
    }

    update(expression: string, result: string): void {
        this.expressionEl.textContent = expression;
        this.resultEl.textContent = result;
    }
}
