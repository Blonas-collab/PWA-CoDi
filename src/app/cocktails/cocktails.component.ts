import { Component, OnInit } from '@angular/core';
import { Cocktails } from '../cocktails';
import { CocktailsService } from '../cocktails.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Cocktails[] = [];

  constructor(private cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.loadCocktails();
  }

  async add(title: string, hashtag: string, date: Date) {
    await this.cocktailsService.add(title, hashtag, date);
    await this.loadCocktails();
  }

  async sync() {
    await this.cocktailsService.sync();
    await this.loadCocktails();
  }

  async loadCocktails() {
    this.cocktails = await this.cocktailsService.getAll();
  }
}
