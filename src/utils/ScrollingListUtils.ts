import { Project } from '../interfaces/Project'

export const scrollProjects = (
    listRef: React.MutableRefObject<HTMLDivElement | null>,
    projects: Project[],
    setScrolling: (value: boolean) => void,
    setSelectedProject: (project: Project | null) => void
) => {
    setScrolling(true)
    setSelectedProject(null)
    if (listRef.current) {
        listRef.current.scrollTop = 0
    }
    let position = 0
    const speed = 5
    const interval = setInterval(() => {
        if (listRef.current) {
            position += speed
            listRef.current.scrollTop = position
            if (position >= listRef.current.scrollHeight / 2) {
                position = 0
            }
        }
    }, 10)

    setTimeout(() => {
        clearInterval(interval)
        setScrolling(false)
        const randomIndex = Math.floor(Math.random() * projects.length)
        const selectedItem = projects[randomIndex]
        setSelectedProject(selectedItem)
        if (listRef.current) {
            listRef.current.scrollTop = randomIndex * 40
        }
    }, 3000)
}

export const markProjectAsDone = (
    selectedProject: Project | null,
    finishedProjects: Project[],
    setFinishedProjectsState: (projects: Project[]) => void,
    setFinishedProjects: (projects: Project[]) => void,
    setProjects: (updateFn: (projects: Project[]) => Project[]) => void,
    setSelectedProject: (project: Project | null) => void
) => {
    if (selectedProject) {
        const newFinishedProjects = [...finishedProjects, selectedProject]
        setFinishedProjectsState(newFinishedProjects)
        setFinishedProjects(newFinishedProjects)
        setProjects(projects => projects.filter((project) => project.id !== selectedProject.id))
        setSelectedProject(null)
    }
}

export const removeProjectFromFinished = (
    projectToRemove: Project,
    allProjects: Project[],
    finishedProjects: Project[],
    setFinishedProjectsState: (projects: Project[]) => void,
    setFinishedProjects: (projects: Project[]) => void,
    setProjects: (updateFn: (projects: Project[]) => Project[]) => void,
) => {
    const newFinishedProjects = finishedProjects.filter((project) => project.id !== projectToRemove.id)
    setFinishedProjectsState(newFinishedProjects)
    setFinishedProjects(newFinishedProjects)
    if (allProjects.some((project) => project.id === projectToRemove.id)) {
        setProjects(projects => [...projects, projectToRemove])
    }
}
