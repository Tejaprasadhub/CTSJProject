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
    this.menuItems = [
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
                  "label": "Classes",
                  "url": "admin/classes",
                  "items": []
                },
                {
                  "label": "Subjects",
                  "url": "admin/subjects",
                  "items": []
                },
                {
                  "label": "Qualifications",
                  "url": "admin/qualifications",
                  "items": []
                },
                {
                  "label": "Parents",
                  "url": "admin/parents",
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
                },
                {
                  "label": "Events",
                  "url": "admin/events"
                },
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
