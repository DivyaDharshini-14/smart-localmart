// Global type declarations for external libraries

interface JQuery {
    owlCarousel(options?: any): JQuery;
    stellar(options?: any): JQuery;
    waypoint(callback: (direction: string) => void, options?: any): JQuery;
    animateNumber(options: any, duration?: number): JQuery;
    magnificPopup(options?: any): JQuery;
    datepicker(options?: any): JQuery;
}

interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
    AOS: {
        init(options?: any): void;
        refresh(): void;
    };
    scrollax: {
        init(): void;
    };
}

declare var $: JQueryStatic;
declare var jQuery: JQueryStatic;

