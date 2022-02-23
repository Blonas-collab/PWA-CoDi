import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Cocktails } from './cocktails';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService extends Dexie{
    cocktails!: Dexie.Table<Cocktails, string>;
    constructor() {
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
  }
