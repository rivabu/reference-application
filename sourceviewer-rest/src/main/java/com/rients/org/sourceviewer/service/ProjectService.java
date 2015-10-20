package com.rients.org.sourceviewer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rients.org.sourceviewer.dao.ProjectDAO;

@Service
public class ProjectService {

	@Autowired
	ProjectDAO projectDao;
	
	public List<ProjectBo> listProjects() {
		return projectDao.getAll();
	}

	public ProjectBo getProjectById(int id) {
		return projectDao.readById(id);
	}

	public void removeProject(int id) {
		projectDao.deleteById(id);
	}

	public int addProject(ProjectBo p) {
		int id = projectDao.getMaxId() + 1;
		p.setId(id);
		projectDao.create(p);
		return id;
	}

	public int updateProject(ProjectBo p) {
		projectDao.update(p);
		return p.getId();
		
	}

}
