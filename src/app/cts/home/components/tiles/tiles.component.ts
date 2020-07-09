import { Component, OnInit } from '@angular/core';
import { Tiles } from 'src/app/cts/shared/models/tiles';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  MyTilesArray:Array<Tiles>;
  tilesUrl:any;
  tiles: any[];
  responsiveOptions;
  constructor(private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.MyTilesArray = [
      new Tiles(565, 'students','blue'),
      new Tiles(56, 'teachers','green'),
      new Tiles(40, 'users','lightblue'),
      new Tiles(6, 'exams','yellow'),
      new Tiles(10, 'classes','pink'),
      new Tiles(24, 'sections','blue')
    ];    

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  this.tiles=[
    {
      "brand": "VW",
      "year": 2012,
      "color": "Orange",
      "vin": "dsad231ff"
    },
    {
      "brand": "Audi",
      "year": 2011,
      "color": "Black",
      "vin": "gwregre345"
    },
    {
      "brand": "Renault",
      "year": 2005,
      "color": "Gray",
      "vin": "h354htr"
    },
    {
      "brand": "BMW",
      "year": 2003,
      "color": "Blue",
      "vin": "j6w54qgh"
    },
    {
      "brand": "Mercedes",
      "year": 1995,
      "color": "Orange",
      "vin": "hrtwy34"
    },
    {
      "brand": "Volvo",
      "year": 2005,
      "color": "Black",
      "vin": "jejtyj"
    },
    {
      "brand": "Honda",
      "year": 2012,
      "color": "Yellow",
      "vin": "g43gr"
    },
    {
      "brand": "Jaguar",
      "year": 2013,
      "color": "Orange",
      "vin": "greg34"
    },
    {
      "brand": "Ford",
      "year": 2000,
      "color": "Black",
      "vin": "h54hw5"
    },
    {
      "brand": "Fiat",
      "year": 2013,
      "color": "Red",
      "vin": "245t2s"
    }
  ]
  }
  routing(tileObject){
    // this.router.navigate(tileObject.name)
    this.router.navigate([tileObject.name], {relativeTo: this.route});
  }



}
