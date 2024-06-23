import { Component } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-website';

  isComponentVisible :boolean = false;

  showComponent() {
    console.log('showed');
    
    this.isComponentVisible =  true;
  }

  hideComponent() {
    console.log('hidden');
    this.isComponentVisible = false;
  }

  back_top() {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
}
