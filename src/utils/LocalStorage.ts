import { Project } from '../interfaces/Project'

export const PROJECT_KEY = 'project_roulette'
export const FINISHED_PROJECT_KEY = 'finishedProjects'

export const initializeProjects = () => {
    const existingProjects = localStorage.getItem(PROJECT_KEY)
    if (!existingProjects) {
        const projects: Project[] = []
        localStorage.setItem(PROJECT_KEY, JSON.stringify(projects))
    }
}

export const getProjects = (): Project[] => {
    const projects = localStorage.getItem(PROJECT_KEY)
    return projects ? JSON.parse(projects) : []
}

export const setProjects = (projects: Project[]) => {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(projects))
}

export const getFinishedProjects = (): Project[] => {
    const finishedProjects = localStorage.getItem(FINISHED_PROJECT_KEY)
    return finishedProjects ? JSON.parse(finishedProjects) : []
}

export const setFinishedProjects = (finishedProjects: Project[]) => {
    localStorage.setItem(FINISHED_PROJECT_KEY, JSON.stringify(finishedProjects))
}
