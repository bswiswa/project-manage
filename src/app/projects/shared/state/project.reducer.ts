import { Project } from '../project.model';
import { State } from 'src/app/reducers';
import { createReducer, on } from '@ngrx/store';
import {
  load,
  loadSuccess,
  loadFail,
  save,
  saveSuccess,
  saveFail,
} from './project.actions';

export interface ProjectState {
  loading: boolean;
  saving: boolean;
  error: string;
  projects: Project[];
}

export const initialState: ProjectState = {
  loading: false,
  saving: false,
  error: '',
  projects: [],
};

export const getProjects = (state: State) => state.projectState.projects;
export const getLoading = (state: State) => state.projectState.loading;
export const getSaving = (state: State) => state.projectState.saving;
export const getError = (state: State) => state.projectState.error;

export const projectReducer = createReducer(
  initialState,
  on(load, (state) => ({ ...state, loading: true })),
  on(loadSuccess, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
    saving: false,
  })),
  on(loadFail, (state, { error }) => ({ ...state, error, loading: false })),
  on(save, (state) => ({ ...state, saving: true })),
  on(saveSuccess, (state, { project }) => {
    const updatedProjects = state.projects.map((item) =>
      project.id === item.id ? project : item
    );
    return {
      ...state,
      projects: updatedProjects,
      saving: false,
    };
  }),
  on(saveFail, (state, { error }) => ({ ...state, error, saving: false }))
);
