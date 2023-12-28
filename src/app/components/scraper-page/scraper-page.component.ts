import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-scraper-page',
  templateUrl: './scraper-page.component.html',
  styleUrl: './scraper-page.component.scss'
})
export class ScraperPageComponent implements OnInit {

  logs: string[] = [];
  lines: number = 500;

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.commonService.loadScrapLogs(this.lines).subscribe((r) => this.logs = r);
    }, 5000)
  }
}
