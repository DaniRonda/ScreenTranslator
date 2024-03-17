import {Component, ElementRef, Input, ViewChild, Inject, OnInit} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop} from '@fortawesome/free-solid-svg-icons';
import Cropper from "cropperjs";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TranslationService} from "../../services/translation.service";
import {LanguageService} from "../../services/language.service";
import {CaptureText} from "../../models/translation-request";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ImageCroppperComponent} from '../cropper/image-croppper.component';
import {ImageCroppperService} from '../../services/image.croppper.service';
import {Subscription} from 'rxjs';
import { ErrorMessageService } from '../../services/error.Service';

@Component({
  selector: 'app-snap-shot-page',
  templateUrl: 'snap-shot-page.component.html',
  styleUrls: ['snap-shot-page.component.css']
})


export class SnapShotPageComponent implements OnInit {

  imageSrc: string | undefined;
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  checkIcon = faCheck;
  cropIcon = faCrop;
  protected readonly earthIcon = faEarthAmerica;

  @ViewChild("image", {static: false})
  public imageElement: ElementRef | any;

  @Input("src")
  public imageSource: string | any;
  private cropper: Cropper | any;
  picture1: string | ArrayBuffer | null = null;

  openModal = false;
  createNewTextForm: FormGroup;
  private imageSubscription: Subscription | undefined;
  imageBase: string | undefined;
  public imageDestination: string;


  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private imageCropperService: ImageCroppperService,
    private errorMessageService: ErrorMessageService,
    private fb: FormBuilder
  ) {

    this.createNewTextForm = this.fb.group({
      language: ['', [Validators.required, this.validateLanguage.bind(this)]],
      imageBase: ['', [Validators.required, this.validateImage.bind(this)]],
    });
    this.openModal = true;
    this.imageDestination = "";
  }

  ngOnInit() {
    this.imageSubscription = this.imageCropperService.croppedImage$.subscribe((croppedImage) => {
      this.imageBase = croppedImage;
    });
  }

  ngOnDestroy() {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }


  public ngAfterViewInit() {
    if (this.imageElement) {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: true,
        scalable: false,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL("imageSource");
        }
      });
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageBase = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase = reader.result as string; // Cast result to string since we know it's either a string or an ArrayBuffer
      };
      reader.readAsDataURL(file);
    }
  }


  async capture(): Promise<string> {
    try {
      const image = document.getElementById("image") as HTMLImageElement;
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
            this.imageBase = canvas.toDataURL("imageSource");
          } else {
            stream.getVideoTracks()[0].stop();
            reject(new Error("Unable to get 2D context for canvas."));
          }
        });

        vid.srcObject = stream;
        vid.play();
        this.imageBase = '';
      });

    } catch (error) {
      console.error("Error capturing screen:", error);
      throw error;
    }
  }

  async captureAndTranslate() {
    /*if (this.createNewTextForm.valid) {
      console.log('Form is valid.');
*/
    try {
        const imageBase64 = this.imageBase;
        console.log('Cropped image:', imageBase64);

        const selectedLanguage = this.languageService.getSelectedLanguage();
        console.log('Selected language:', selectedLanguage);

        const text: CaptureText = {
          language: selectedLanguage,
          imageBase: imageBase64
        };

        console.log('Text to be translated:', text);

        const translationResponse = await this.translationService.translateText(text).toPromise();
        console.log('Translation response:', translationResponse);
      } catch (error) {
        console.error('Error capturing and translating text:', error);
      }
    /*} else {

      console.log('Form is not valid. Please fill in all required fields.');
    }*/
  }

  validateImage(control: AbstractControl): ValidationErrors | null {
    const errorMessage = this.errorMessageService.base64Validator(control.value);
    return errorMessage ? { 'invalidImage': errorMessage } : null;
  }

  validateLanguage(control: AbstractControl): ValidationErrors | null {
    const errorMessage = this.errorMessageService.languageValidator(control.value);
    return errorMessage ? { 'invalidLanguage': errorMessage } : null;
  }

}
