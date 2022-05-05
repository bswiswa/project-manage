import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css'],
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  private searchTerms = new Subject<string>();
  private subscription!: Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.observeSearchTerms();
    this.searchTerms.next('');
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  observeSearchTerms() {
    this.subscription = this.searchTerms
      .pipe(
        // wait 300ms after each keystroke
        debounceTime(300),
        // ignore new term if same as previous
        distinctUntilChanged(),
        // switch to new observable each time term changes
        switchMap((term: string): Observable<Project[]> => {
          this.loading = true;
          return this.projectService.listByName(term);
        })
      )
      .subscribe(
        (data) => {
          this.loading = false;
          this.projects = data;
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error;
        }
      );
  }

  onSaveProject(project: Project) {
    this.projectService.put(project).subscribe(
      (data) => {
        this.projects = this.projects.map((p) => {
          if (p.id === data.id) {
            return data;
          }
          return p;
        });
      },
      (error) => (this.errorMessage = error)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
