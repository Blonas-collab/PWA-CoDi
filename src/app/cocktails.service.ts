import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Cocktails } from './cocktails';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService extends Dexie{
    cocktails!: Dexie.Table<Cocktails, string>;
    constructor(private httpClient: HttpClient) {
      super('CocktailsDB');
      this.version(1).stores({
        cocktails: 'id'
      });
    }

  getAll() {
      return this.cocktails.toArray();
    }

    add(cocktail: string, hashtag: string) {
      this.cocktails.add({ cocktail, id: v4(), hashtag });
    }

    async sync() {
      const allCocktails = await this.getAll();
      const syncedCocktails = await this.httpClient.post<Cocktails[]>('http://localhost:3030/sync', allCocktails).toPromise();
      this.cocktails.bulkPut(syncedCocktails!);
    }

  }
