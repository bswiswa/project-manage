import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { State } from 'src/app/reducers';
import { load, save } from '../shared/state/project.actions';
import {
  getProjects,
  getError,
  getLoading,
  getSaving,
} from '../shared/state/project.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  projects$!: Observable<Project[]>;
  errorMessage$!: Observable<string>;
  loading$!: Observable<boolean>;
  saving$!: Observable<boolean>;
  private subscription!: Subscription;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.projects$ = this.store.pipe(select(getProjects));
    this.errorMessage$ = this.store.pipe(select(getError));
    this.loading$ = this.store.pipe(select(getLoading));
    this.saving$ = this.store.pipe(select(getSaving));
    this.store.dispatch(load());
  }

  onSaveProject(project: Project) {
    this.store.dispatch(save({ project }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
