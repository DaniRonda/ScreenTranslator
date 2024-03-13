import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport, faCheck, faCrop} from '@fortawesome/free-solid-svg-icons';
import Cropper from "cropperjs";
@Component({
  selector: 'app-snap-shot-page',
  templateUrl: 'snap-shot-page.component.html',
  styleUrls: ['snap-shot-page.component.css']
})
export class SnapShotPageComponent {
  imageSrc: string | undefined;
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  checkIcon = faCheck;
  cropIcon = faCrop;
  protected readonly earthIcon = faEarthAmerica;

  @ViewChild("image", { static: false })
  public imageElement: ElementRef | any;

  @Input("src")
  public imageSource: string | any;

  public imageDestination: string;
  private cropper: Cropper | any;

  public constructor() {
    this.imageDestination = "";
  }
  picture: string = '';
  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL("image/png");
      }
    });
  }
  picture1: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.picture = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.picture = reader.result as string; // Cast result to string since we know it's either a string or an ArrayBuffer
      };
      reader.readAsDataURL(file);
    }
  }


  public ngOnInit() { }

  async capture() {
    try {

      const stream = await navigator.mediaDevices.getDisplayMedia({});
      const vid = document.createElement("video");
      const image = document.getElementById("image") as HTMLImageElement;
      vid.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        this.picture = "";
        if (ctx) { // Check if ctx is not null
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.canvas.width = vid.videoWidth;
          ctx.canvas.height = vid.videoHeight;
          ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
          stream.getVideoTracks()[0].stop();
          let a = document.createElement("a");

          a.click();
          this.picture = canvas.toDataURL("imageSource");
          this.imageSource = canvas.toDataURL("imageSource");
        } else {
          console.error("Unable to get 2D context for canvas.");
        }
      });
      vid.srcObject = stream;
      vid.play();
      this.picture = '';

    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  }
  upload(){

  }


}
