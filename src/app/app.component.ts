import {Component, OnInit} from '@angular/core';
import {CanonicalLinkService} from '../shared/services/canonical-link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private canonicalLinkService: CanonicalLinkService) { }

  ngOnInit(): void {
    this.canonicalLinkService.setCanonicalURL();
  }
}
