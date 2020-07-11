import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { GraphsService } from "./graphs.service";
import { AuthenticationService } from "../../services/authentication.service";
@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.css"]
})
export class GraphsComponent implements OnInit {
  @ViewChild("myCanvas", { static: true }) element: ElementRef;
  @ViewChild("profit", { static: true }) elementProfit: ElementRef;
  @ViewChild("sales", { static: true }) elementSales: ElementRef;
  @ViewChild("products", { static: true }) elementProducts: ElementRef;
  salesMonth: any;

  constructor(
    private graphService: GraphsService,
    private authentication: AuthenticationService
  ) {}

  ngOnInit() {
    new Chart(this.element.nativeElement, {
      type: "bar",
      data: {
        labels: ["Bicicleta", "Pedal", "Corrente", "Pneu", "Câmera", "Cubo"],
        datasets: [
          {
            label: "Top 5 Vendas",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     }
        //   ]
        // }
      }
    });
    new Chart(this.elementProfit.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: ["Julho", "Junho", "Agosto"],
        datasets: [
          {
            label: "Lucro Últimos três meses",
            data: [1800, 3500, 2000, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        layout: {}
      }
    });
    new Chart(this.elementSales.nativeElement, {
      type: "pie",
      data: {
        labels: ["Julho", "Junho", "Agosto"],
        datasets: [
          {
            label: "Lucro Últimos três meses",
            data: [1800, 3500, 2000, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        layout: {}
      }
    });

    new Chart(this.elementProducts.nativeElement, {
      type: "line",
      data: {
        labels: ["Julho", "Junho", "Agosto"],
        datasets: [
          {
            label: "Lucro Últimos três meses",
            data: [1800, 3500, 2000, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        layout: {}
      }
    });
    this.listSalesMonth();
  }

  async listSalesMonth() {
    await this.graphService
      .listSalesMonth(this.authentication.business)
      .subscribe((data: any) => {
        console.log(data);
        this.salesMonth = data;
      });
  }
}
