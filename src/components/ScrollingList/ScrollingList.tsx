import React, { useState, useEffect, useRef } from 'react'

import './ScrollingList.scss'

// Interfaces
import { Project } from '../../interfaces/Project'
import { ScrollingListProps } from '../../interfaces/ScrollingListProps'

// Utils
import { getFinishedProjects, setFinishedProjects } from '../../utils/LocalStorage'
import { scrollProjects, markProjectAsDone, removeProjectFromFinished } from '../../utils/ScrollingListUtils'

export default function ScrollingList({ projects: allProjects }: ScrollingListProps): JSX.Element {
    const [projects, setProjects] = useState<Project[]>([])
    const [finishedProjects, setFinishedProjectsState] = useState<Project[]>(getFinishedProjects())
    const [scrolling, setScrolling] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const listRef = useRef<HTMLDivElement | null>(null)

    const scrollList = () => scrollProjects(listRef, projects, setScrolling, setSelectedProject)
    const markAsDone = () => markProjectAsDone(selectedProject, finishedProjects, setFinishedProjectsState, setFinishedProjects, setProjects, setSelectedProject)
    const removeFromFinished = (projectToRemove: Project) => removeProjectFromFinished(projectToRemove, allProjects, finishedProjects, setFinishedProjectsState, setFinishedProjects, setProjects)

    useEffect(() => {
        setProjects(allProjects.filter((project) => !finishedProjects.some((finishedProject) => finishedProject.id === project.id)))
    }, [allProjects, finishedProjects])

    return (
        <div className="scrolling-list-container">
            {allProjects.length > 0 && <>
                {projects.length > 0 && <>
                    <button onClick={scrollList} disabled={scrolling}>Scroll</button>
                    <div className="list" ref={listRef}>
                        {projects.concat(projects).map((project, index) => (
                            <div key={index} className="list-item">
                                {project.title}
                            </div>
                        ))}
                    </div>
                </>}
                {selectedProject && (
                    <div className="selected-project">
                        <h3>{selectedProject.title}</h3>
                        <p>{selectedProject.description}</p>
                        <button onClick={markAsDone}>Done</button>
                    </div>
                )}
                {finishedProjects.length > 0 &&
                    <div className="finished-projects">
                        <h3>Projects Finished: ({finishedProjects.length}/{allProjects.length})</h3>
                        {finishedProjects.map((project) => (
                            <div key={project.id}>
                                {project.title} <button onClick={() => removeFromFinished(project)}>Remove</button>
                            </div>
                        ))}
                    </div>
                }
            </>}
        </div>
    )
}
