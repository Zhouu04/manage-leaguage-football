import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-pager',
  template: `
    <!--begin::Pagination-->
    <div
      class="d-flex align-items-center  flex-wrap {{
        totalPage != 1 ? ' justify-content-between' : 'justify-content-start'
      }}"
    >
      <div class="d-flex flex-wrap py-2 mr-3" *ngIf="totalPage > 1">
        <ng-container *ngIf="currentPage !== 1">
          <a (click)="previous()" href="javascript:;" class="btn btn-icon btn-sm btn-light mr-2 my-1">
            <i class="la la-angle-left icon-xs text-muted"></i
            ></a>
        </ng-container>
        <ng-container *ngIf="totalSegment > 1 && currentSegment > 1">
          <a href="javascript:;" class="btn btn-icon btn-sm btn-light mr-2 my-1" (click)="previousSegment()"
          ><i class="ki ki-bold-arrow-back icon-xs"></i>
            <a href="javascript:;" class="btn btn-icon btn-sm border-0 btn-light mr-2 my-1">...</a>
          </a>
        </ng-container>
        <ng-container *ngFor="let idx of listPage">
          <a
            (click)="page(idx)"
            href="javascript:;"
            class="btn btn-icon btn-sm border-0 btn-light btn-hover-primary mr-2 my-1"
            [class.active]="currentPage === idx"
          >{{ idx }}</a
          >
        </ng-container>
        <ng-container *ngIf="totalSegment > 1 && currentSegment < totalSegment">
          <a (click)="nextSegment()" href="javascript:;" class="btn btn-icon btn-sm border-0 btn-light mr-2 my-1"
          >...</a
          >
        </ng-container>
        <ng-container *ngIf="currentPage !== totalPage && totalPage > 0">
          <a (click)="next()" href="javascript:;" class="btn btn-icon btn-sm btn-light mr-2 my-1"
          ><i class="la la-angle-right icon-xs text-muted"></i
          ></a>
        </ng-container>
      </div>
      <div class="d-flex align-items-center py-1" *ngIf="showAdvanced">
        <div class="d-flex align-items-center">
          <div class="mr-2">
            <input
              type="number"
              [value]="currentPage"
              (change)="changePage($event.target.value)"
              style="max-width: 60px;"
              [min]="1"
              [max]="totalPage"
              class="form-control form-control-solid form-control-sm mr-2 bg-light text-right"
            />
          </div>

          <label class="mr-2 col-form-label"> / {{ totalPage }} </label>
        </div>

        <select
          (change)="changeRecordPerPage($event.target.value)"
          class="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light"
          style="width: 75px;"
          [ngModel]="recordPerPage"
        >
          <option *ngFor="let n of arrayRecordPerPage" [value]="n">{{ n }}</option>
        </select>
        <span class="text-muted"
        ><span translate="common.pager.show" class="text-muted"></span>
          {{ totalRecord < recordPerPage ? totalRecord : recordPerPage }} <span translate="common.pager.of"> </span>
          {{ totalRecord }} {{ recordName ? recordName.toLowerCase() : 'records' }}</span
        >
      </div>
      <div class="d-flex text-muted" *ngIf="totalPage === 0">
        <span>
          <span translate="common.pager.noHave" class=""> </span>
          {{ recordName ? recordName.toLowerCase() : 'records' }}
        </span>
      </div>
    </div>
    <!--end:: Pagination-->
  `,
  standalone: true,
  imports: [
    FormsModule
  ],
  styles: []
})
export class PagingComponent implements OnChanges {
  @Input() totalRecord: number;
  @Input() pagePerSegment = 6;
  @Input() recordName = 'recordName';
  @Input() currentPage = 1;
  @Output() pageClick = new EventEmitter<number>();

  @Input() showAdvanced = true;

  @Input() arrayRecordPerPage: number[];

  @Output() recordPerPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() recordPerPage = 20;

  totalPage: number;
  listPage: Array<number> = [];

  currentSegment = 1;
  totalSegment: number;

  maxPageInSegment: number;
  minPageInSegment: number;

  ngOnChanges(changes: any) {
    this.totalPage = Math.ceil(this.totalRecord / this.recordPerPage);
    this.totalSegment = Math.ceil(this.totalPage / this.pagePerSegment);

    this.renderSement();
  }

  renderSement() {
    this.minPageInSegment = (this.currentSegment - 1) * this.pagePerSegment + 1;
    this.maxPageInSegment = this.minPageInSegment + this.pagePerSegment;

    if (this.arrayRecordPerPage == null || this.arrayRecordPerPage.length === 0) {
      this.arrayRecordPerPage = [10, 20, 30, 50, 60, 100, 150, 200];
    }

    this.listPage = [];
    for (let i = this.minPageInSegment; i <= this.maxPageInSegment; i++) {
      if (i > this.totalPage) {
        break;
      }

      this.listPage.push(i);
    }
  }

  previousSegment() {
    this.currentSegment -= 1;
    this.renderSement();
  }

  previous() {
    this.currentPage -= 1;
    if (this.currentPage < this.minPageInSegment) {
      this.previousSegment();
    }
    this.pageClick.emit(this.currentPage);
  }

  changeRecordPerPage(rp: any) {
    this.recordPerPage = parseInt(rp, 0);

    this.totalPage = Math.ceil(this.totalRecord / this.recordPerPage);
    this.totalSegment = Math.ceil(this.totalPage / this.pagePerSegment);

    this.renderSement();

    this.currentPage = 0;
    this.currentSegment = 1;

    this.recordPerPageChange.emit(this.recordPerPage);

    this.page(1);
  }

  changePage(idx: string) {
    const num = parseInt(idx, 0);
    if (num === this.currentPage) {
      return;
    }

    this.page(num);

    this.setCurrentSagment();

    this.renderSement();
  }

  page(idx: number) {
    if (idx === this.currentPage) {
      return;
    }

    if (idx > this.totalPage) {
      idx = this.totalPage;
    } else if (idx < 0) {
      idx = 1;
    }

    this.currentPage = idx;
    this.pageClick.emit(this.currentPage);
  }

  nextSegment() {
    this.currentSegment += 1;
    this.renderSement();
  }

  next() {
    this.currentPage += 1;
    if (this.currentPage > this.maxPageInSegment) {
      this.nextSegment();
    }
    this.pageClick.emit(this.currentPage);
  }

  private setCurrentSagment() {
    this.currentSegment = Math.ceil(this.currentPage / this.pagePerSegment);
  }
}
