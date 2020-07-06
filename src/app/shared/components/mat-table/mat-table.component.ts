import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-mat-table",
  templateUrl: "./mat-table.component.html",
  styleUrls: ["./mat-table.component.css"]
})
export class MatTableComponent implements OnInit {
  @Input() link: string;
  @Input() data$: any;
  @Input() displayedColumns: string;
  @Input() receipt: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log("displayedColumns", this.displayedColumns);
    console.log("data", this.data$);
    console.log("link", this.link);
  }
}
