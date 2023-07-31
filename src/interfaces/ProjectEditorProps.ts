import { Project } from './Project'

export interface ProjectEditorProps {
    projects: Project[]
    updateProjects: (projects: Project[]) => void
}