import {Component, Inject, OnInit} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TranslationService} from "../../services/translation.service";
import {LanguageService} from "../../services/language.service";
import {CaptureText} from "../../models/translation-request";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-snap-shot-page',
  templateUrl: 'snap-shot-page.component.html',
  styleUrls: ['snap-shot-page.component.css']
})
export class SnapShotPageComponent implements OnInit {
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  checkIcon = faCheck;
  cropIcon = faCrop;
  protected readonly earthIcon = faEarthAmerica;

  openModal = false;
  errorMessage: any;
  selectedLanguage: string = '';
  createNewTextForm: FormGroup;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {

    this.createNewTextForm = this.fb.group({
      language: ['', [Validators.required, this.languageValidator]],
      imageBase: ['', Validators.required, this.base64Validator],
    });
  }

  ngOnInit(): void {
    this.openModal = true;
  }


  async capture(): Promise<string> {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({});
      const vid = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      return new Promise<string>((resolve, reject) => {
        vid.addEventListener("loadedmetadata", () => {
          if (ctx) {
            ctx.canvas.width = vid.videoWidth;
            ctx.canvas.height = vid.videoHeight;
            ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
            stream.getVideoTracks()[0].stop();
            let base64Image = canvas.toDataURL("image/png");
            resolve(base64Image);
          } else {
            stream.getVideoTracks()[0].stop();
            reject(new Error("Unable to get 2D context for canvas."));
          }
        });

        vid.srcObject = stream;
        vid.play();
      });
    } catch (error) {
      console.error("Error capturing screen:", error);
      throw error;
    }
  }


  async captureAndTranslate() {
    if (this.createNewTextForm.valid) {
      try {
        const imageBase64 = await this.capture();
        const selectedLanguage = this.languageService.getSelectedLanguage();

        const text: CaptureText = {
          language: selectedLanguage,
          imageBase: imageBase64
        };

        const translationResponse = await this.translationService.translateText(text).toPromise();
        console.log('Translation response:', translationResponse);

      } catch (error) {
        console.error('Error capturing and translating text:', error);
      }
    } else {
      console.log('Form is not valid. Please fill in all required fields.');
    }
  }


  //after capture() and before captureandtranslate()
  //Update the form with the captured image data
  async updateImgData() {
    try {
      const imageBase64 = await this.capture();
      this.createNewTextForm.patchValue({
        imageBase: imageBase64
      });
    } catch (error) {
      console.error('Error capturing screen:', error);
    }
  }


  base64Validator(control: FormControl): { [key: string]: any } | null {
    if (!control.value) {
      return {required: 'Image data is required.'};
    }

    if (!control.value.startsWith('data:image')) {
      return {invalidImageFormat: 'Invalid image format. Please provide a valid image.'};
    }

    const maxLength = 5000000;
    if (control.value.length > maxLength) {
      return {maxLengthExceeded: 'Maximum file size exceeded. Please upload a smaller image.'};
    }

    return null;
  }

  languageValidator(control: FormControl): { [key: string]: any } | null {
    const validLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Danish', 'Polish'];
    const selectedLanguage = control.value;

    if (!validLanguages.includes(selectedLanguage)) {
      return { invalidLanguage: 'Please select a valid language.' };
    }

    return null;
  }

}
