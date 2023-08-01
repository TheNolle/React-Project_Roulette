import React, { useEffect, useState } from 'react'

import './App.scss'

// Interfaces
import { Project } from './interfaces/Project'

// Utils
import { getProjects, setProjects as setProjectsInLocalStorage } from './utils/LocalStorage'

// Components
import ProjectEditor from './components/ProjectEditor/ProjectEditor'
import ScrollingList from './components/ScrollingList/ScrollingList'

export default function App() {
    const [projects, setProjects] = useState<Project[]>(getProjects())
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setProjects(getProjects())
    }, [])

    const updateProjects = (updatedProjects: Project[]) => {
        setProjectsInLocalStorage(updatedProjects)
        setProjects(updatedProjects)
    }

    return (
        <div className="app-container">
            <ProjectEditor projects={projects} updateProjects={updateProjects} setIsEditing={setIsEditing} />
            <ScrollingList projects={projects} isEditing={isEditing} />
        </div>
    )
}
