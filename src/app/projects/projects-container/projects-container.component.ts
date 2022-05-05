import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.css'],
})
export class ProjectsContainerComponent implements OnInit {
  projects: Project[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loading = true;
    this.projectService.list().subscribe(
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
}
