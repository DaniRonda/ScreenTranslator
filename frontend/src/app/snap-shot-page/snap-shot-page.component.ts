import {Component, OnInit} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop} from '@fortawesome/free-solid-svg-icons';
import {TranslationService} from "../../services/translation.service";


@Component({
  selector: 'app-snap-shot-page',
  templateUrl: 'snap-shot-page.component.html',
  styleUrls: ['snap-shot-page.component.css']
})
export class SnapShotPageComponent implements OnInit{
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  checkIcon = faCheck;
  cropIcon = faCrop;
  protected readonly earthIcon = faEarthAmerica;
  errorMessage: string = '';
  availableKeywords: string[] = [];

  constructor(private translationService: TranslationService) {}
  ngOnInit(): void {
    this.translationService.getSupportedLanguages()
      .subscribe(
        (languages: string[]) => {
          this.availableKeywords = languages;
        },
        (error) => {
          console.error('Error fetching supported languages:', error);
        }
      );
  }

  async capture() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({});
      const vid = document.createElement("video");
      vid.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) { // Check if ctx is not null
          ctx.canvas.width = vid.videoWidth;
          ctx.canvas.height = vid.videoHeight;
          ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
          stream.getVideoTracks()[0].stop();
          let a = document.createElement("a");
          a.download = "ss.png";
          a.href = canvas.toDataURL("image/png");
          a.click();
        } else {
          console.error("Unable to get 2D context for canvas.");
        }
      });
      vid.srcObject = stream;
      vid.play();
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  }



  translateText(sourceLanguage: string, targetLanguage: string, sourceText: string): void {
    this.errorMessage = '';
    this.translationService.translateText(sourceLanguage, targetLanguage, sourceText)
      .subscribe(
        (response: any) => {
          console.log('Translated text:', response[0].translations[0].text);

         // TODO update UI with translated text
        },
        (error) => {
          console.error('Translation error:', error);
          this.errorMessage = 'Translation error occurred. Please try again.';
        }
      );
  }



}
