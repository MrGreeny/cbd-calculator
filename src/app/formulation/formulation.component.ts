import { Component, OnInit } from '@angular/core';
import { CarrierOil } from '../../shared/models/carrierOil'



@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss']
})
export class FormulationComponent implements OnInit {

  price: number;
  cbdConcentration: number;
  carrierOilPrice: number;
  chosenExtractType: string;
  productQuantity: number;
  cbdPrice: number;
  cbdQuantity: number;
  
  //ID, Name, Price
  carrierOils: CarrierOil[] = [
    {id: 0, name: "Olive Oil", price: 1.5 },
    {id: 1, name: "Chia Oil", price: 5.0 },
    {id: 2, name: "Hemp Oil", price: 4.0 },
  ];
  selectedCarrierOil: string;


  constructor() { }

  ngOnInit(): void {
    this.cbdConcentration = 0.0;
    this.productQuantity = 0.0;
    this.carrierOilPrice = 0.0;
    this.cbdPrice = 0.0;
    this.cbdQuantity = 0.0;
  }

  onChangeExtractType(event) {
    this.cbdConcentration = 0.0;
  }

  onChangePercentConcentration(percentConcentration){
    this.cbdConcentration = percentConcentration;
    this.cbdQuantity = this.productQuantity * (percentConcentration/100);

    if (this.chosenExtractType === 'flower-extract') {
      this.cbdPrice = 3.0;
      
    } else if ( this.chosenExtractType === 'flower-isolate') {
      this.cbdPrice = 5.0;
      
    }
    else {
      //TODO: ERROR HANDLING
    }
    this.calculatePrice();
  }

  onChangeProductQuantity(productQuantity) {
    this.productQuantity = productQuantity;
    this.calculatePrice();
  }

  onChangeCarrierOil(oil) {
    this.carrierOilPrice = oil.value;
    this.calculatePrice();
  }

  calculatePrice(){
    let costCarrierOil = this.carrierOilPrice * this.productQuantity;
    let costCBD = this.cbdPrice * this.cbdQuantity;
    this.price = costCarrierOil + costCBD;
  }
}




