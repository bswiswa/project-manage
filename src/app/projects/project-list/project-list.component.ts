import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];
  editingProject: Project | null = null;
  @Output() saveProject = new EventEmitter<Project>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(event: any) {
    this.editingProject = event.editingProject;
    console.log(this.editingProject);
  }

  onCancel() {
    this.editingProject = null;
  }

  onSave(project: Project) {
    this.editingProject = null;
    this.saveProject.next(project);
  }
}
