package com.rients.org.sourceviewer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rients.org.sourceviewer.dao.TreeDAO;

@Service
public class TreeService {

	@Autowired
	TreeDAO TreeDao;
	
	public TreeBo getTreeById(int id) {
		return TreeDao.readById(id);
	}

	public void removeTree(int id) {
		TreeDao.deleteById(id);
	}

	public int addTree(TreeBo p) {
		int id = TreeDao.getMaxId() + 1;
		p.setId(id);
		TreeDao.create(p);
		return id;
	}

	public int updateTree(TreeBo p) {
		TreeDao.update(p);
		return p.getId();
		
	}

}
