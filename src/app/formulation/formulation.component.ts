import { Component, OnInit } from '@angular/core';
import { CarrierOil } from '../../shared/models/carrierOil'
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { HttpClient } from "@angular/common/http";
import { Order, OrderType } from 'src/shared/models/order';


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
  productQuantityGram: number;
  cbdPrice: number;
  cbdQuantity: number;

  costCarrierOil: number;
  costCBD: number;
  
  carrierOils: any = [];
  selectedCarrierOil = '';
  public order: Order;


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cbdConcentration = 0.0;
    this.productQuantity = 0.0;
    this.productQuantityGram = 0.0;
    this.carrierOilPrice = 0.0;
    this.cbdPrice = 0.0;
    this.cbdQuantity = 0.0;
    this.costCarrierOil = 0.0;
    this.costCBD= 0.0;
    this.order = new Order();

    this.httpClient.get("assets/data/carrierOils.json").subscribe(data =>{
      console.log(data);
      this.carrierOils = data;
    });

  }

  onChangeExtractType(event) {
    this.cbdConcentration = 0.0;
  }

  onChangePercentConcentration(percentConcentration){
    this.cbdConcentration = percentConcentration;
    this.productQuantityGram = this.productQuantity * 1000;
    this.cbdQuantity = this.productQuantityGram * (percentConcentration/100);
    this.calculateCBDPrice()
    this.calculatePrice();
  }

  onChangeProductQuantity(productQuantity) {
    //Kilograms in gramms
    this.productQuantity = productQuantity;
    this.productQuantityGram = this.productQuantity * 1000;
    this.cbdQuantity = this.productQuantityGram * (this.cbdConcentration/100);
    this.calculateCBDPrice();
    this.calculatePrice();
  }

  onChangeCarrierOil(oil) {

    //NOTE: Here, because of "cyclic object value" WTF?
  
    this.order.carrierOil = oil.value;
    // this.selectedCarrierOil = JSON.stringify(oil);
    this.carrierOilPrice = oil.value.price;
    this.calculatePrice();
  }


  calculateCBDPrice() {
    let quantity = this.cbdQuantity
    if (this.chosenExtractType === 'flower-extract') {

      if (quantity > 0 && quantity < 5000) {
        this.cbdPrice = 5.0;
        this.price = this.cbdPrice * quantity * 0.33;
      } else if (quantity >= 5000 && quantity < 10000) {
        this.cbdPrice = 4.0;
        this.price = this.cbdPrice * quantity * 0.33;
      } else if (quantity >= 10000) {
        this.cbdPrice = 3.0;
        this.price = this.cbdPrice * quantity * 0.33;
      }
      //TODO: else & error handling

    } else if ( this.chosenExtractType === 'isolate') {

      console.log('isolate');
      if (quantity > 0 && quantity < 5000) {
        this.cbdPrice = 3.0;
        this.price = this.cbdPrice * quantity;
      } else if (quantity >= 5000 && quantity < 10000) {
        this.cbdPrice = 2.5;
        this.price = this.cbdPrice * quantity;
      } else if (quantity >= 10000) {
        this.cbdPrice = 2.0;
        this.price = this.cbdPrice * quantity;
      }      
    }
    else {
      //TODO: ERROR HANDLING
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  calculatePrice(){
    this.costCarrierOil = this.carrierOilPrice * this.productQuantity;
    this.costCBD = this.cbdPrice * this.cbdQuantity;
    this.price = this.costCarrierOil + this.costCBD;
    this.fillOrder();
  }

  fillOrder(){

    this.order.isFormulation = true;

    if (this.chosenExtractType === 'flower-extract') { 
      this.order.orderType = OrderType.FlowerExtract;
    } else if (this.chosenExtractType === 'isolate') {
      this.order.orderType = OrderType.Isolate;
    }

    this.order.concentration = this.cbdConcentration;
    this.order.calculatedPrice = this.price;
    this.order.quantity = this.productQuantity;
    this.order.pricePerGram = this.cbdPrice;
    //NOTE: oil type is in the onChangeCarrierOil method
    //TODO: Refactor!
  }
}




