import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit, OnChanges {
  public heroes: Hero[] = [];
  constructor(private heroesService: HeroesService) {}

  @Input()
  options: Hero[] = [];

  ngOnInit(): void {
    this.heroesService.getHeros().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      const currentOptions = changes['options'].currentValue;
      this.heroes = currentOptions;
    }
  }
}
