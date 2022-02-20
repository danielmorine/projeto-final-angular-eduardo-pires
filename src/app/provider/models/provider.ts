import { Address } from "./address";

export interface Provider {
    id: string;
    name:string;
    documentNumber:string;
    isActive: string | boolean;
    typeProvider: string | number;
    address:Address;
}