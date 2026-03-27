declare module '@cashfreepayments/cashfree-js' {
    export function load(_options: { mode: "sandbox" | "production" }): Promise<any>;
}