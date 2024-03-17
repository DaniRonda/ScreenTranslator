import { Component, OnInit } from '@angular/core';
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from "@angular/material/dialog";
import {SnapShotPageComponent} from "../snap-shot-page/snap-shot-page.component";
import {LanguageService} from "../../services/language.service";
@Component({
  templateUrl: 'select-language-page.component.html',
  styleUrls: ['select-language-page.component.css']
})
export class SelectLanguagePageComponent implements OnInit{
  earthIcon = faEarthAmerica;
  constructor(
    public dialog: MatDialog,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {

      const select = dropdown.querySelector('.select');
      const caret = dropdown.querySelector('.caret');
      const menu = dropdown.querySelector('.menu');
      const options = dropdown.querySelectorAll('.menu li') ;
      const selected = dropdown.querySelector('.selected') as HTMLElement;

      select?.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret?.classList.toggle('caret-rotate');
        menu?.classList.toggle('menu-open');
      });

      options.forEach(option => {
        option.addEventListener('click', () => {
          if (selected) {
            selected.textContent = option.textContent;
          }
          select?.classList.remove('select-clicked');
          caret?.classList.remove('caret-rotate');
          menu?.classList.remove('menu-open');
          options.forEach(option => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        });
      });
    });
  }

  availableKeywords: string[] = [
    'English', 'Danish', 'German', 'French', 'Spanish', 'Italian', 'Polish', 'Swedish'
  ];

  resultBox: HTMLElement | null = document.querySelector(".result-box");
  inputBox: HTMLInputElement | null = document.getElementById("input-box") as HTMLInputElement;

  onKeyUp(): void {
    let result: string[] = [];
    let input: string = this.inputBox?.value || '';
    if (input.length){
      result = this.availableKeywords.filter((keyword) => {
        return keyword.toLowerCase().includes(input.toLowerCase());
      });
      console.log(result)
    }
    this.display(result);

    if (!result.length && this.resultBox){
      this.resultBox.innerHTML = '';
    }
  }

  display(result: string[]): void {
    const content = result.map((list) => {
      return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    if(this.resultBox)
      this.resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
  }

  selectInput(list: HTMLElement): void {
    if (this.inputBox)
      this.inputBox.value = list.innerHTML;
    if (this.resultBox)
      this.resultBox.innerHTML = '';
  }
  openDialog(): void {
    const selectedLanguage = this.languageService.getSelectedLanguage();
    console.log('Selected language:', selectedLanguage);

    const dialog = this.dialog.open(SnapShotPageComponent, {
      width: '1000px',
      height: '900px',
      data: { selectedLanguage: selectedLanguage }
    });
  }

  selectLanguage(language: string) {
    this.languageService.setSelectedLanguage(language);
  }



}

