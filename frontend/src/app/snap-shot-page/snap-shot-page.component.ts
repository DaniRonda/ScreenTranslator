import { Component } from '@angular/core';
import {faCamera, faEarthAmerica, faFileExport} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-snap-shot-page',
  templateUrl: './snap-shot-page.component.html',
  styleUrls: ['./snap-shot-page.component.css']
})
export class SnapShotPageComponent {
  cameraIcon = faCamera;
  exportIcon = faFileExport;
  protected readonly earthIcon = faEarthAmerica;
}
