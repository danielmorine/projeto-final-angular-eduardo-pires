import { Address } from "./address";

export class Provider {
    id: string;
    name:string;
    documentNumber:string;
    isActive:boolean;
    typeProvider:number;
    address:Address;
}