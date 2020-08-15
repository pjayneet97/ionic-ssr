import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  data = null;
  id = 42;
  constructor(private titleService: Title, private metaService: Meta,private http: HttpClient,@Inject(PLATFORM_ID) private platformId,private transferState: TransferState) { }

  ngOnInit() {
    this.titleService.setTitle('Devdactic SSR');
    this.metaService.updateTag({ name: 'description', content: 'The Devdactic SSR Page' });
    // Twitter
    this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ property: 'twitter:title', content: 'NEW ARTICLE OUT NOW' });
    this.metaService.updateTag({ property: 'twitter:description', content: 'Check out this cool article' });
    this.metaService.updateTag({ property: 'twitter:image', content: 'https://i0.wp.com/devdactic.com/wp-content/uploads/2020/05/ionic-in-app-purchase-capacitor.png?w=1620&ssl=1' });
    // Facebook
    this.metaService.updateTag({ property: 'og:url', content: '/second' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:description', content: 'My Ionic SSR Page' });
    this.metaService.updateTag({ property: 'og:title', content: 'My SSR Title!' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://i0.wp.com/devdactic.com/wp-content/uploads/2020/05/ionic-in-app-purchase-capacitor.png?w=1620&ssl=1' });
    this.loadata();
  }

  loadata() {
    const DATA_KEY = makeStateKey('pokemon-' + this.id);
    if (this.transferState.hasKey(DATA_KEY)) {
      console.log('Fetch data from State!');
      this.data = this.transferState.get(DATA_KEY, null);
      this.transferState.remove(DATA_KEY);
    } else {
      console.log('Get Data from API...');
      this.http
        .get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        .subscribe((res) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(DATA_KEY, res);
          } else {
            this.data = res;
          }
        });
    }
  }

}
