import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoolStoreProductsService } from '../coolstore-products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters = [];
  activatedRoute: ActivatedRoute;
  coolStoreService: CoolStoreProductsService;
  loadedSide = '';
  subscription:Subscription;

  constructor(activatedRoute:ActivatedRoute, coolStoreService:CoolStoreProductsService) {
    this.activatedRoute = activatedRoute;
    this.coolStoreService  = coolStoreService;

  }


  ngOnInit(): void {
    this.coolStoreService.fetchCharacters();

    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.coolStoreService.getCharacters(params['side'])
        this.loadedSide = params['side'];
      }
    );
    this.subscription = this.coolStoreService.characterChanged.subscribe(
      () => {
        this.characters = this.coolStoreService.getCharacters(this.loadedSide);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }



}
