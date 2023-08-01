import React, { useState, useEffect, useRef } from 'react'

import './ScrollingList.scss'

// Interfaces
import { Project } from '../../interfaces/Project'
import { ScrollingListProps } from '../../interfaces/ScrollingListProps'

// Utils
import { getFinishedProjects, setFinishedProjects } from '../../utils/LocalStorage'
import { scrollProjects, markProjectAsDone, removeProjectFromFinished } from '../../utils/ScrollingListUtils'

export default function ScrollingList({ projects: allProjects, isEditing }: ScrollingListProps): JSX.Element {
    const [projects, setProjects] = useState<Project[]>([])
    const [finishedProjects, setFinishedProjectsState] = useState<Project[]>(getFinishedProjects())
    const [scrolling, setScrolling] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [filterTagsInput, setFilterTagsInput] = useState<string>('')
    const [filterTags, setFilterTags] = useState<string[]>([])
    const listRef = useRef<HTMLDivElement | null>(null)

    const scrollList = () => scrollProjects(listRef, projects, setScrolling, setSelectedProject)
    const markAsDone = () => markProjectAsDone(selectedProject, finishedProjects, setFinishedProjectsState, setFinishedProjects, setProjects, setSelectedProject)
    const removeFromFinished = (projectToRemove: Project) => removeProjectFromFinished(projectToRemove, allProjects, finishedProjects, setFinishedProjectsState, setFinishedProjects, setProjects)
    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilterTagsInput(e.target.value)
    const applyFilters = () => setFilterTags(filterTagsInput.split(', '))

    useEffect(() => {
        const filteredProjects = allProjects.filter((project) => {
            return !finishedProjects.some((finishedProject) => finishedProject.id === project.id) &&
                (filterTags.length === 0 || filterTags.every((tag) => project.tags?.includes(tag)))
        })
        setProjects(filteredProjects)
    }, [allProjects, finishedProjects, filterTags])

    return (
        <div className="scrolling-list-container">
            {allProjects.length > 0 && <>
                <div className="filters">
                    <input type="text" placeholder="Filter by tags (comma separated)" onChange={handleFilterInputChange} disabled={isEditing} />
                    <button onClick={applyFilters} disabled={isEditing}>Apply Filters</button>
                </div>
                {projects.length > 0 && <>
                    <button onClick={scrollList} disabled={scrolling || isEditing}>Scroll</button>
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
