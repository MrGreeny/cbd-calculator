import { CarrierOil } from './carrierOil';

export class Order {
    orderType: OrderType;
    quantity: number;
    concentration: number;
    calculatedPrice: number;
    pricePerGram: number;
    timestamp: string;
    email: string;
    carrierOil: CarrierOil;
    isFormulation = false;
}

export enum OrderType {
    Isolate = "Isolate",
    FlowerExtract = "Flower Extract",
    // Formulation = "Formulation",
}