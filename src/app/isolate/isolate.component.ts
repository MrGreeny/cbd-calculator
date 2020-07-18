import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IsolateData } from "../../shared/models/isolateData"
import { Order, OrderType } from "../../shared/models/order"


@Component({
  selector: 'app-isolate',
  templateUrl: './isolate.component.html',
  styleUrls: ['./isolate.component.scss']
})
export class IsolateComponent implements OnInit {

  public price: number;
  public quantity: number;
  public pricePerGramm: number;
  public moq: number;
  public maxq: number;
  public isolateData: IsolateData;
  public percentIsolate: number;
  public order: Order;

  constructor(private httpClient: HttpClient) {}



  ngOnInit(): void {
    this.price = 0.0;
    this.quantity = 0.0;
    this.pricePerGramm = 0.0;
    this.order = new Order();

    this.httpClient.get("assets/data/isolate.json").subscribe( (data: IsolateData) => {
      console.log(data);

      this.moq = data.moq;
      this.maxq = data.maxq;
      this.percentIsolate = data.isolatePercentage;
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  calculatePrice(quantity){
    this.quantity = quantity;
    if (this.quantity > 0 && this.quantity < 5000) {
      this.pricePerGramm = 3.0;
      this.price = this.pricePerGramm * this.quantity;
    } else if (this.quantity >= 5000 && this.quantity < 10000) {
      this.pricePerGramm = 2.5;
      this.price = this.pricePerGramm * this.quantity;
    } else if (this.quantity >= 10000) {
      this.pricePerGramm = 2.0;
      this.price = this.pricePerGramm * this.quantity;
    }

    this.fillOrder();
  }

  fillOrder(){
    this.order.quantity = this.quantity;
    this.order.calculatedPrice = this.price;
    this.order.orderType  = OrderType.Isolate;
    this.order.concentration = this.percentIsolate;
    this.order.pricePerGram = this.pricePerGramm;
  }
}
