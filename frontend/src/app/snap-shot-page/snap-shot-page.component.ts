import {Component} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {TranslationService} from "../../services/translation.service";

@Component({
  selector: 'app-snap-shot-page',
  templateUrl: 'snap-shot-page.component.html',
  styleUrls: ['snap-shot-page.component.css']
})
export class SnapShotPageComponent {
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  checkIcon = faCheck;
  cropIcon = faCrop;
  protected readonly earthIcon = faEarthAmerica;

  openModal= false;
  selectedLanguage: string = '';
  errorMessage: any;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private translationService: TranslationService
  ) {
    this.openModal = true;
  }

  async capture() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({});
      const vid = document.createElement("video");

      vid.addEventListener("loadedmetadata", async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) { // Check if ctx is not null
          ctx.canvas.width = vid.videoWidth;
          ctx.canvas.height = vid.videoHeight;
          ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
          stream.getVideoTracks()[0].stop();

          const imgData = canvas.toDataURL("image/png");

          // Call translation service to detect language and translate
          const translatedText = await this.translationService.translateTo(this.selectedLanguage, imgData);

          console.log('Translated text:', translatedText);
          // Perform actions with the translated text as needed

        } else {
          console.error("Unable to get 2D context for canvas.");
        }
      });

      vid.srcObject = stream;
      vid.play();
    } catch (error) {
      console.error("Error capturing screen:", error);
      this.errorMessage = error;
    }
  }



}
