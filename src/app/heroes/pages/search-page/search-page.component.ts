import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  constructor(private heroesService: HeroesService) {}

  searchInput = new FormControl('');
  options: Hero[] = [];
  filteredOptions?: Observable<Hero[]>;

  ngOnInit() {
    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Hero[] {
    const filterValue = value.toLowerCase();

    this.heroesService.getSuggestions(filterValue).subscribe((hero) => {
      return (this.options = hero);
    });

    return this.options.filter((option) =>
      option.superhero.toLowerCase().includes(filterValue)
    );
  }
}
