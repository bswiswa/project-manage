import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Input() project!: Project;
  projectForm: FormGroup;
  @Output() save = new EventEmitter<Project>();

  constructor() {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(this.project.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.project.description),
      budget: new FormControl(this.project.budget),
      isActive: new FormControl(this.project.isActive),
    });
  }

  onCancelClick(event: Event) {
    event.preventDefault();
    this.cancel.emit();
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }
    this.save.emit({ ...this.project, ...this.projectForm.value });
  }
}
