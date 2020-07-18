import { Component, OnInit } from '@angular/core';
import { Order, OrderType } from 'src/shared/models/order';

@Component({
  selector: 'app-flower-extract',
  templateUrl: './flower-extract.component.html',
  styleUrls: ['./flower-extract.component.scss']
})
export class FlowerExtractComponent implements OnInit {



  public price: number;
  public quantity: number;
  public pricePerGramm: number;
  public order: Order;


  constructor() { }

  ngOnInit(): void {
    this.price = 0.0;
    this.quantity = 0.0;
    this.pricePerGramm = 0.0;
    this.order = new Order();
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
      this.pricePerGramm = 5.0;
      this.price = this.pricePerGramm * this.quantity * 0.33;
    } else if (this.quantity >= 5000 && this.quantity < 10000) {
      this.pricePerGramm = 4.0;
      this.price = this.pricePerGramm * this.quantity * 0.33;
    } else if (this.quantity >= 10000) {
      this.pricePerGramm = 3.0;
      this.price = this.pricePerGramm * this.quantity * 0.33;
    }

    this.fillOrder();
  }
  fillOrder(){
    this.order.quantity = this.quantity;
    this.order.calculatedPrice = this.price;
    this.order.orderType  = OrderType.FlowerExtract;
    this.order.pricePerGram = this.pricePerGramm;
    //this.order.concentration = this.percentIsolate;
  }
}
