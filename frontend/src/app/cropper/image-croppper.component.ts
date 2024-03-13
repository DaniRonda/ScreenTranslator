import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import Cropper from "cropperjs";

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

  public constructor() {
    this.imageDestination = "";
  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      scalable: false,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL("imageSource");
      }
    });
  }

  public ngOnInit() { }
}
