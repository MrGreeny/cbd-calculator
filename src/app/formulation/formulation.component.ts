import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss']
})
export class FormulationComponent implements OnInit {

  public quantity: number;
  chosenExtractType: string;


  constructor() { }

  ngOnInit(): void {
    this.quantity = 0.0;

  }

  calculatePrice(quantity){
    // this.quantity = quantity;
    // if (this.quantity > 0 && this.quantity < 5000) {
    //   this.pricePerGramm = 5.0;
    //   this.price = this.pricePerGramm * this.quantity * 0.33;
    // } else if (this.quantity >= 5000 && this.quantity < 10000) {
    //   this.pricePerGramm = 4.0;
    //   this.price = this.pricePerGramm * this.quantity * 0.33;
    // } else if (this.quantity >= 10000) {
    //   this.pricePerGramm = 3.0;
    //   this.price = this.pricePerGramm * this.quantity * 0.33;
    // }
  }

}

// (input)="calculatePriceIsolate($event.value)" 
// [value]="quantityIsolate">

