import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import Cropper from "cropperjs";
import { ImageCroppperService } from "../../services/image.croppper.service";

@Component({
  selector: 'image-cropper',
  templateUrl: 'cropper.html',
  styleUrls: ['cropper.css']
})
export class ImageCroppperComponent implements OnInit {

  @ViewChild("image", { static: false })
  public imageElement: ElementRef | any;

  @Input("src")
  public imageSource: string | any ;

  public imageDestination: string;
  private cropper: Cropper | any;

  constructor(private imageCropperService: ImageCroppperService) {
    this.imageDestination = "";

  }

  public ngAfterViewInit() {

    if (this.imageElement) {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: true,
        scalable: false,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          const croppedImage = canvas.toDataURL("image/png");
          this.imageDestination = croppedImage;

          this.imageCropperService.sendCroppedImage(croppedImage);
        },
        aspectRatio: 1,
        cropBoxResizable: true,
        cropBoxMovable: true,
        viewMode: 1,
      });
    }
  }
  public ngOnInit() { }

  printcheck2(){
    console.log("hi")
  }
}
