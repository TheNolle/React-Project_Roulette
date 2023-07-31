import { Project } from '../interfaces/Project'
import { v4 as uuidv4 } from 'uuid'

import { PROJECT_KEY, setProjects } from './LocalStorage'

export const removeProject = (
    projectId: string,
    projects: Project[],
    updateProjects: (projects: Project[]) => void
) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId)
    updateProjects(updatedProjects)
}

export const editProject = (
    updatedProject: Project,
    projects: Project[],
    updateProjects: (projects: Project[]) => void
) => {
    const newProjects = projects.map((project) => project.id === updatedProject.id ? updatedProject : project)
    localStorage.setItem(PROJECT_KEY, JSON.stringify(newProjects))
    updateProjects(newProjects)
}

export const addProject = (newProject: Project, projects: Project[], updateProjects: (projects: Project[]) => void) => {
    const projectWithId = { ...newProject, id: uuidv4() }
    const updatedProjects = [...projects, projectWithId]
    updateProjects(updatedProjects)
    setProjects(updatedProjects)
}