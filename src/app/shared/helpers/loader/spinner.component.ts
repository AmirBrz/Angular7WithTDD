import { Component, Input, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-spinner',
    template: `<div class="preloader" *ngIf="isSpinnerVisible">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
    styles: [`.preloader{
        position: absolute;
        margin: 0 auto;
        width: 100%;
        height: 100%;
       z-index: 100; 
          background: #fff;
      }
      .spinner {
        width: 60px;
        height: 60px;
        top:35%; 
        position: relative;
        margin: 100px auto;
      }
      
      .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #1976d2;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        
        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
      }
      
      .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
      }
      
      @-webkit-keyframes sk-bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
      }
      
      @keyframes sk-bounce {
        0%, 100% { 
          transform: scale(0.0);
          -webkit-transform: scale(0.0);
        } 50% { 
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
      }`],
    encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible = true;

    @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {
        this.detectRouteChanged();
    }

    detectRouteChanged() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isSpinnerVisible = true;
            } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.isSpinnerVisible = false;
            }
        }, () => {
            this.isSpinnerVisible = false;
        });
    }

    ngOnDestroy(): void {
        this.isSpinnerVisible = false;
    }
}
