/**
 * DOM utility functions
 */

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options: {
        class?: string | string[];
        id?: string;
        attributes?: Record<string, string>;
        text?: string;
        html?: string;
        children?: (HTMLElement | string)[];
        events?: Record<string, EventListener>;
    } = {}
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);

    if (options.class) {
        const classes = Array.isArray(options.class) ? options.class : [options.class];
        element.classList.add(...classes);
    }

    if (options.id) {
        element.id = options.id;
    }

    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.html) {
        element.innerHTML = options.html;
    }

    if (options.children) {
        options.children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
    }

    if (options.events) {
        Object.entries(options.events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }

    return element;
}

export function $(selector: string, parent: Element | Document = document): Element | null {
    return parent.querySelector(selector);
}

export function $$(selector: string, parent: Element | Document = document): NodeListOf<Element> {
    return parent.querySelectorAll(selector);
}

export function on<K extends keyof HTMLElementEventMap>(
    element: Element | null,
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions
): () => void {
    if (!element) return () => {};
    element.addEventListener(event, handler as EventListener, options);
    return () => element.removeEventListener(event, handler as EventListener, options);
}

export function delegate<K extends keyof HTMLElementEventMap>(
    parent: Element,
    selector: string,
    event: K,
    handler: (event: HTMLElementEventMap[K], target: Element) => void
): () => void {
    const listener = (event: Event) => {
        const target = event.target as Element;
        const matched = target.closest(selector);
        if (matched && parent.contains(matched)) {
            handler(event as HTMLElementEventMap[K], matched);
        }
    };
    parent.addEventListener(event, listener);
    return () => parent.removeEventListener(event, listener);
}

export function addClass(element: Element, ...classes: string[]): void {
    element.classList.add(...classes);
}

export function removeClass(element: Element, ...classes: string[]): void {
    element.classList.remove(...classes);
}

export function toggleClass(element: Element, className: string, force?: boolean): boolean {
    return element.classList.toggle(className, force);
}

export function hasClass(element: Element, className: string): boolean {
    return element.classList.contains(className);
}

export function setAttributes(element: Element, attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

export function getAttribute(element: Element, name: string): string | null {
    return element.getAttribute(name);
}

export function data(element: Element, key: string): string | null {
    return element.getAttribute(`data-${key}`);
}

export function setData(element: Element, key: string, value: string): void {
    element.setAttribute(`data-${key}`, value);
}