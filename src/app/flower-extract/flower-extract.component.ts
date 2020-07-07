import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower-extract',
  templateUrl: './flower-extract.component.html',
  styleUrls: ['./flower-extract.component.scss']
})
export class FlowerExtractComponent implements OnInit {

  public price: number;
  public quantity: number;
  public pricePerGramm: number;

  constructor() { }

  ngOnInit(): void {
    this.price = 0.0;
    this.quantity = 0.0;
    this.pricePerGramm = 0.0;
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
  }
}
