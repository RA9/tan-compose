
// Define types for component description
export type Theme = Record<string, string>;
export type Styles = Record<string, string>;

export interface EventEmitter {
    name: string;
    handler: (e: Event) => void;
}

export interface DescribeOptions {
    tag?: string;
    theme?: Theme;
    beforeMount?: () => void;
    afterMount?: () => void;
    action?: (event: Event) => void;
    className?: string;
    styles?: Styles;
    parent?: string;
    children?: DescribeOptions[];
    attributes?: Record<string, string>;
    emit?: EventEmitter[];
}
