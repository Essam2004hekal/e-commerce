import { Component, OnInit } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#carousel-1').owlCarousel({
      loop: true,
      margin: 10,
      autoplay:true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    });
  }

}
