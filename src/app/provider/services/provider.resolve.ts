import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Provider } from '../models/provider';
import { ProviderService } from './provider.service';

@Injectable()
export class ProviderResolve implements Resolve<Provider> {

    constructor(private service: ProviderService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.params['id']);
    }
}