import React from 'react'

import './ProjectList.scss'

// Interfaces
import { Project } from '../../interfaces/Project'

// Utils
import { getProjects } from '../../utils/LocalStorage'

export default function ProjectList(): JSX.Element {
    const projects: Project[] = getProjects()

    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.id} className="project-item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}
