import React, { useState } from 'react'

import './ProjectEditor.scss'

// Interfaces
import { ProjectEditorProps } from '../../interfaces/ProjectEditorProps'
import { Project } from '../../interfaces/Project'

// Utils
import { removeProject, editProject, addProject } from '../../utils/ProjectEditorUtils'

export default function ProjectEditor({ projects, updateProjects, setIsEditing }: ProjectEditorProps): JSX.Element {
    const [addingProject, setAddingProject] = useState(false)
    const [newProject, setNewProject] = useState<Project>({ id: '', title: '', description: '', tags: [], images: [], steps: [] })
    const [editingProject, setEditingProject] = useState<Project | null>(null)

    const handleAddClick = () => {
        setAddingProject(true)
        setIsEditing(true)
    }

    const handleCreateClick = () => {
        if (newProject.title) {
            addProject(newProject, projects, updateProjects)
            setNewProject({ id: '', title: '', description: '' })
            setAddingProject(false)
            setIsEditing(false)
        }
    }

    const handleEditClick = (project: Project) => {
        setEditingProject(project)
        setIsEditing(true)
    }

    const handleSaveClick = () => {
        if (editingProject) {
            editProject(editingProject, projects, updateProjects)
            setEditingProject(null)
            setIsEditing(false)
        }
    }

    const cancelCreate = () => {
        setNewProject({ id: '', title: '', description: '' })
        setAddingProject(false)
        setIsEditing(false)
    }

    return (
        <div className="project-editor">
            <h2>All Projects ({projects.length})</h2>
            <button onClick={handleAddClick}>Add New Project</button>
            {addingProject ? (
                <div className="add-form">
                    <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                    <textarea placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                    <input placeholder="Tags" type="text" value={newProject.tags?.join(', ')} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(', ') })} />
                    <input placeholder="Images" type="text" value={newProject.images?.join(', ')} onChange={(e) => setNewProject({ ...newProject, images: e.target.value.split(', ') })} />
                    <input placeholder="Steps" type="text" value={newProject.steps?.join(', ')} onChange={(e) => setNewProject({ ...newProject, steps: e.target.value.split(', ') })} />
                    <button onClick={handleCreateClick}>Create</button>
                    <button onClick={cancelCreate}>Cancel</button>
                </div>
            ) : editingProject ? (
                <div className="edit-form">
                    <input placeholder="Title" type="text" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
                    <textarea placeholder="Description" value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
                    <input placeholder="Tags" type="text" value={editingProject.tags?.join(', ')} onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(', ') })} />
                    <input placeholder="Images" type="text" value={editingProject.images?.join(', ')} onChange={(e) => setEditingProject({ ...editingProject, images: e.target.value.split(', ') })} />
                    <input placeholder="Steps" type="text" value={editingProject.steps?.join(', ')} onChange={(e) => setEditingProject({ ...editingProject, steps: e.target.value.split(', ') })} />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div className="project-list">
                    {projects.map((project) => (
                        <div key={project.id} className="project-item">
                            <div>{project.title}</div>
                            <button onClick={() => handleEditClick(project)}>Edit</button>
                            <button onClick={() => removeProject(project.id, projects, updateProjects)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
