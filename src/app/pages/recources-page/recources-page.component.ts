import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { Resource } from '../../entities/resource/recource.model';
import { RecourceApi } from '../../entities/resource/recource.api';

@Component({
  selector: 'app-resources-page',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiPager, TuiTextfield],
  templateUrl: './recources-page.component.html',
  styleUrls: ['./recources-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesPageComponent {
  resources = signal<Resource[]>([]);
  page = signal(1);
  totalPages = signal(1);

  constructor(private api: RecourceApi) {}

  ngOnInit() {
    this.loadResources(this.page());
  }

  loadResources(page: number) {
    this.api.fetchResources(page).subscribe((res) => {
      this.resources.set(res.data);
      this.totalPages.set(res.total_pages || 1);
      this.page.set(page);
    });
  }

  prev() {
    const newPage = Math.max(this.page() - 1, 1);
    if (newPage !== this.page()) this.loadResources(newPage);
    this.page.set(newPage);
    this.loadResources(newPage);
  }

  next() {
    const newPage = Math.min(this.page() + 1, this.totalPages());
    if (newPage !== this.page()) this.loadResources(newPage);
    this.page.set(newPage);
    this.loadResources(newPage);
  }

  goToPage(index: number) {
    this.loadResources(index + 1);
  }
}
