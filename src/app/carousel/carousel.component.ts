import {Component, ViewChild} from '@angular/core';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = [
    {
      title: "Tổ chức giải đấu dễ dàng",
      link: './assets/img/sport-football-arena-photography.jpg',
    },
    {
      title: "Quản lý đội thể thao đơn giản",
      link: './assets/img/soccer-image.jpg'
    },
    {
      title: "Hỗ trợ các thể thức thi đấu vòng tròn, loại trực tiếp",
      link:'./assets/img/anhbia1.jpg'
    },
    {
      title: "Giúp bạn tiết kiệm nhiều thời gian hơn",
      link:'./assets/img/anhbia2.jpg'
    }

  ]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
