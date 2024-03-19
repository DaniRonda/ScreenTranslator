
import {Component, ElementRef, Input, ViewChild, Inject, OnInit, Renderer2} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop, faFont} from '@fortawesome/free-solid-svg-icons';
import Cropper from "cropperjs";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TranslationService} from "../../services/translation.service";
import {LanguageService} from "../../services/language.service";
import {CaptureText, CaptureText2} from "../../models/translation-request";

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
  textIcon = faFont;
  protected readonly earthIcon = faEarthAmerica;
  imageIsOn = true;

  @ViewChild(ImageCroppperComponent) cropperComponent: ImageCroppperComponent | undefined;
  imageCropperElement = document.getElementById('imageholder')
  @ViewChild("image", {static: false})
  public imageElement: ElementRef | any;

  @Input("src")
  public imageSource: string | any;
  private cropper: Cropper | any;
  private isImageCropperInitialized = false;
  imagenum = 0;
  textnum = 0;
  imageBase: string = '';

  picture1: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.imageBase = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase = reader.result as string; // Cast result to string since we know it's either a string or an ArrayBuffer
        this.imageOn();
      };
      reader.readAsDataURL(file);

    }
  }


  openModal = false;
  createNewTextForm: FormGroup;

  createNewFormText: FormGroup;
  canvas2: HTMLCanvasElement | null;

  private imageSubscription: Subscription | undefined;

  public imageDestination: string;


  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,

    private renderer: Renderer2, private elementRef: ElementRef,
    private imageCropperService: ImageCroppperService,
    private errorMessageService: ErrorMessageService,
    private fb: FormBuilder,
  ) {

    this.createNewTextForm = this.fb.group({
      //language: ['', [Validators.required, this.validateLanguage.bind(this)]],
      //imageBase: ['', [Validators.required, this.validateImage.bind(this)]],
    });
    this.createNewFormText = this.fb.group({
      //language: ['', [Validators.required, this.languageValidator]],
      //textContent: ['', Validators.required, this.textValidator],
      })

    this.openModal = true;
    this.imageDestination = "";
    this.canvas2 = null;

  }


  ngOnInit() {
    this.imageSubscription = this.imageCropperService.croppedImage$.subscribe((croppedImage) => {
      this.imageBase = croppedImage;
    });
      this.openModal = true;
      document.getElementById("comment_text")!.remove();
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
        this.imageBase = this.imageElement;
        this.imageIsOn = true;
        this.imagenum = 1;
        this.textnum = 0;
        document.getElementById("comment_text")!.remove();
      });

    } catch (error) {
      console.error("Error capturing screen:", error);
      throw error;
    }
  }

  upload() {

  }
  onImageCropperInit() {
    this.isImageCropperInitialized = true;
  }



  async captureAndTranslate() {

    if (this.imageIsOn == true){
      if (this.createNewTextForm.valid) {
        console.log('Form is valid.');
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
    }
       catch (error) {
          console.error('Error capturing and translating text:', error);
        }
      } else {

        console.log('Form is not valid. Please fill in all required fields.');
      }
    }
    if (this.imageIsOn == false) {
      const textareaElement = document.getElementById('comment_text') as HTMLTextAreaElement;
      if (textareaElement) {
        try {
          const content = textareaElement.value;

          const selectedLanguage = this.languageService.getSelectedLanguage();

          const text: CaptureText2 = {
            language: selectedLanguage,
            content: content
          };

          const translationResponse = await this.translationService.translateText2(text).toPromise();
          console.log('Translation response:', translationResponse);
        } catch (error) {
          console.error('Error capturing and translating text:', error);
        }
      } else {

        console.log('Form is not valid. Please fill in all required fields.');
      }


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
      return {invalidLanguage: 'Please select a valid language.'};
    }

    return null;
  }

  textValidator(control: FormControl): {[key: string]: any} | null {
    const maxLength = 50000;
    if (control.value.length > maxLength) {
      return {maxLengthExceeded: 'Maximum text size exceeded. Please upload a smaller text.'};
    }
    const minLength = 1;
    if (control.value.length <= minLength) {
      return {maxLengthExceeded: 'Please upload some text'};
    }
    return null;
  }

  getImageDestination(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Check every 100 milliseconds if imageDestination is updated
      const interval = setInterval(() => {
        if (this.imageDestination) {
          clearInterval(interval);
          resolve(this.imageDestination);
        }
      }, 100);
    });
  }

imageCropper = document.getElementById("imageCropper")


  textOn(){
    if (this.textnum == 0){
      this.imageIsOn = false;
      console.log("hionce")
      this.textnum = 1;
      this.imagenum = 0;
      this.createTextarea();
      if (!this.imageIsOn)
        document.getElementById("imageCropper")!.remove();
    }


  }
  imageOn(){
    if (this.imagenum == 0){
      this.imageIsOn = true;
      this.imagenum = 1;
      this.textnum = 0;
      document.getElementById("comment_text")!.remove();
    }
  }

  private createTextarea() {
    const textarea = this.renderer.createElement('textarea');
    textarea.setAttribute('placeholder', 'Insert your text');
    textarea.setAttribute('rows', '20');
    textarea.setAttribute('name', 'comment[text]');
    textarea.setAttribute('id', 'comment_text');
    textarea.setAttribute('cols', '40');
    textarea.setAttribute('class', 'ui-autocomplete-input');
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('role', 'textbox');
    textarea.setAttribute('aria-autocomplete', 'list');
    textarea.setAttribute('aria-haspopup', 'true');

    const imageHolderDiv = this.elementRef.nativeElement.querySelector('.imageholder');
    this.renderer.appendChild(imageHolderDiv, textarea);
  }
  sendHttp(){

  }
}



