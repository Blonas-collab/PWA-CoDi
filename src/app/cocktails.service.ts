import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Cocktails } from './cocktails';
import { v4 } from 'uuid';
import { HttpClient } from '@angular/common/http';

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

    add(title: string, hashtag: string, date: Date) {
      this.cocktails.add({ title, id: v4(), hashtag, date});
    }

    async sync() {
      const allCocktails = await this.getAll();
      const syncedCocktails = await this.httpClient.post<Cocktails[]>('http://localhost:3030/sync', allCocktails).toPromise();
      this.cocktails.bulkPut(syncedCocktails!);
    }

  }
