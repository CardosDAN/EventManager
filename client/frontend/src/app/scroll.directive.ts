import { Directive,ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Check the scroll position
        if (scrollPosition > 50) {
            // If scrolled down more than 50 pixels, add the black background
            this.renderer.addClass(this.el.nativeElement, 'bg-black');
        } else {
            // Otherwise, remove the black background
            this.renderer.removeClass(this.el.nativeElement, 'bg-black');
        }
    }

}
