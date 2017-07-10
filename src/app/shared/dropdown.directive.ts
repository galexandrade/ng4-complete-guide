import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open')
    menuOppened = false;

    /*
    constructor(private elRef: ElementRef, private renderer: Renderer2){        
    }
    */

    @HostListener('click') click(eventData: Event){
        this.menuOppened = !this.menuOppened;
    }

    
    /*
    @HostListener('click') click(eventData: Event){
        console.log(this.menuOppened);
        if(!this.menuOppened)
            this.renderer.addClass(this.elRef.nativeElement, 'open');
        else
            this.renderer.removeClass(this.elRef.nativeElement, 'open');

        this.menuOppened = !this.menuOppened;
        console.log(this.menuOppened);
    }
    */
}