import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { fadeIn } from '../../animations/fadeIn';

@Component({
  selector: 'qd-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [ fadeIn ]
})
export class LoaderComponent {
  constructor(public loader_: LoaderService) {}
}
