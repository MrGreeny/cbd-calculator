import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IsolateComponent } from './isolate/isolate.component';
import { FlowerExtractComponent } from './flower-extract/flower-extract.component';
import { OrderType, Order } from 'src/shared/models/order';
import { FormulationComponent } from './formulation/formulation.component';
import { AddressInputComponent } from './address-input/address-input.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  private order: Order;
  selected = '';
  
  @ViewChild(IsolateComponent)
  isolateComponent: IsolateComponent;

  @ViewChild(FlowerExtractComponent)
  flowerExtractComponent: FlowerExtractComponent;

  @ViewChild(FormulationComponent)
  formulationComponent: FormulationComponent;

  @ViewChild(AddressInputComponent)
  addressInputComponent: AddressInputComponent;

  constructor(
    private http: HttpClient,
    ) {}

  ngOnInit(): void {
    this.order = new Order();
  }


  onSubmit() {
    let message = '';
    
    if (this.selected === 'isolate') {
      this.order = this.isolateComponent.order;

    } else if (this.selected === 'flower-extract' ) {
      this.order = this.flowerExtractComponent.order;
    } else if (this.selected === 'formulation') {
      this.order = this.formulationComponent.order;
    } else {
      //TODO: error
    }

    this.order.email = this.addressInputComponent.email;
    this.order.timestamp = Date().toString();
    
    message = JSON.stringify(this.order);
    console.log(message);

    console.log("submit form!")
    this.http.post<any>(
      'https://formspree.io/xayplvzl', 
      { text: 'New Order', message: message }).subscribe( (data: { next: string, ok: boolean }) => {
        
        console.log(JSON.stringify("respose  data: " + data))
        console.log(data.ok);
        console.log(data.next);

        if (data.ok) {
          console.log('Order sent!')
        }
      })
  }

}
