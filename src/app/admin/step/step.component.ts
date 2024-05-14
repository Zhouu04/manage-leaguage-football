import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
  providers: [MessageService, ]
})
export class StepComponent {
  items: MenuItem[];

  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Tạo giải đấu và mùa giải',
        routerLink: '',
      },
      {
        label: 'Thêm đội bóng',
        routerLink: ''
      },
      {
        label: 'Xem lịch thi đấu',
        routerLink: ''
      }
    ];

    // this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
    //   this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
    // });
  }


}
