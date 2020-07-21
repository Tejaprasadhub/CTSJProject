import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  menuItems: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.menuItems =[
        {
          "label": "About Us",
          "url": "admin/aboutUs"
        },
        {
          "label": "Date Entry",
          "url": null,
          "items": [
            [
              {
                "label": "Data Entry",
                "items": [
                  {
                    "label": "Students",
                    "url": "admin/students",
                    "items": []
                  },
                  {
                    "label": "Teachers",
                    "url": "admin/teachers",
                    "items": []
                  },
                  {
                    "label": "Users",
                    "url": "admin/users",
                    "items": []
                  },
                  {
                    "label": "Exams",
                    "url": "admin/exams",
                    "items": []
                  },
                  {
                    "label": "Classes",
                    "url": "admin/classes",
                    "items": []
                  }
                ]
              }              
            ],
            [
              {
                "label": "Additional",
                "items": [
                  {
                    "label": "News",
                    "url": "admin/news",
                    "items": []
                  },
                  {
                    "label": "Achievements",
                    "url": "admin/achivements",
                    "items": []
                  }                  
                ]
              }              
            ]
          ]
        },
        {
          "label": "TimeTable",
          "url": "admin/timetable"
        },
        {
          "label": "Role Access",
          "url": "admin/roleaccess"
        },
        {
          "label": "Events",
          "url": "admin/events"
        },
        {
          "label": "Fees",
          "url": "admin/fees"
        },
        {
          "label": "Statistics",
          "url": "admin/statistics"
        },
        {
          "label": "Settings",
          "url": "admin/settings"
        },
        {
          "label": "Audit Logs",
          "url": "admin/auditlogs"
        }
      ]
  }
}
