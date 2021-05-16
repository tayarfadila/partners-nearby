import { Endpoint } from '../help/Endpoint';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  NgZone,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordinatesModel } from 'src/app/help/Coordinates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  radius: number = 6371.0087714;
  maxDisctanceInKm: number = 10;
  rows: any = [];
  loading = false;
  columns: any;
  fields: any;
  errorMsg: string = '';
  mainLocation: CoordinatesModel = {
    latitude: 51.5144636,
    longitude: -0.142571,
  };
  mainLocationName: string = 'Starbucks Cafe Central London ';

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private vref: ViewContainerRef
  ) {}

  ngOnInit() {
    this.fields = [
      { name: 'Url Name', prop: 'urlName', sortable: true },
      {
        name: 'Organization',
        prop: 'organization',
        sortable: true,
      },
      { name: 'Customer Locations', prop: 'customerLocations', sortable: true },
      //{ name: 'Will Work Remotely', prop: 'willWorkRemotely', sortable: true },
      { name: 'Website', prop: 'website', sortable: true },
      //{ name: 'Services', prop: 'services', sortable: true },
      {
        name: 'Offices',
        prop: 'offices',
        sortable: true,
        subFields: [
          {
            name: 'Location',
            prop: 'location',
          },
          {
            name: 'Address',
            prop: 'address',
          },
          //{
          //name: 'Coordinates',
          //prop: 'coordinates',
          //},
        ],
      },
    ];
    this.reloadTable();
  }
  reloadTable() {
    let that = this;
    this.loading = true;
    let lat1 = this.mainLocation.latitude,
      long1 = this.mainLocation.longitude;
    try {
      this.http.get('assets/partners.json').subscribe(
        (result: any) => {
          this.loading = false;
          let closeCompanies: Object[] = [];
          if (result && result.length) {
            result.forEach((el: any) => {
              let offices = el && el['offices'];
              if (offices && offices.length) {
                let found = offices.find((off: any) => {
                  let coords = off && off['coordinates'].split(',');
                  let distance = this.getGreatCircleDistance(
                    long1,
                    coords[1],
                    lat1,
                    coords[0]
                  );
                  return distance <= this.maxDisctanceInKm;
                });
                if (found) closeCompanies.push(el);
              }
            });
          }
          closeCompanies.sort(
            (a: any, b: any) =>
              (a['organization'] + '' || '').localeCompare(
                b['organization'] + ''
              ) * 1
          );
          this.rows = closeCompanies;
        },
        (err) => {
          this.loading = false;
          this.errorMsg = !Endpoint.isNullOrEmpty(err)
            ? err.statusText
            : 'Error in data request';
        }
      );
    } catch (error) {
      this.loading = false;
      console.log({ error });
    }
  }
  updateRange(event: any) {
    let that = this;
    const val = event.target.value;
    // filter our data
    console.log(val);
    this.maxDisctanceInKm = Number(val);
    this.reloadTable();
  }
  getGreatCircleDistance(
    long1: number,
    long2: number,
    lat1: number,
    lat2: number
  ) {
    let d;
    long1 = this.toRadians(long1);
    long2 = this.toRadians(long2);
    lat1 = this.toRadians(lat1);
    lat2 = this.toRadians(lat2);
    d = this.radius * this.getCentralAngle(long1, long2, lat1, lat2);
    return d;
  }
  getCentralAngle(long1: number, long2: number, lat1: number, lat2: number) {
    return Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.cos(this.absoluteDifference(long1, long2))
    );
  }
  toRadians(num: number) {
    let rad = 0;
    if (num) {
      rad = (num * Math.PI) / 180;
    }
    return rad;
  }
  absoluteDifference(a: number, b: number) {
    return Math.abs(a - b);
  }
}
