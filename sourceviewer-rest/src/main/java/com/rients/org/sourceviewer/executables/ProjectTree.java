package com.rients.org.sourceviewer.executables;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.rients.org.sourceviewer.domain.Tree;
import com.rients.org.sourceviewer.domain.TreeElement;
import com.rients.org.sourceviewer.domain.Type;

public class ProjectTree {
	int counter = 1;
	List<TreeElement> list;

	public static void main(String args[]) throws IOException {
		ProjectTree pt = new ProjectTree();
		pt.generate(1, "TheCrudder", "E://UPLOAD");
	}
	public Tree generate(int projectId, String projectName, String root) throws IOException {
		File directory = new File(root + "//processing//" + projectName);
		Tree tree = new Tree();
		tree.setId(projectId);
		this.list = tree.getElements();
		TreeElement rootElem = new TreeElement();
		rootElem.setId(counter);
		counter++;
		rootElem.setType(Type.root);
		rootElem.setName(projectName);
		list.add(rootElem);
		
		generateStructure(directory);
		
		TreeElement endroot = new TreeElement();
		endroot.setId(counter);
		counter++;
		endroot.setType(Type.endroot);
		endroot.setName(projectName);
		list.add(endroot);
		
		return tree;
	}

	public void generateStructure(File folder) throws IOException {
		
	    File[] files = folder.listFiles();
	    if(files != null) { //some JVMs return null for empty dirs
	        for(File f: files) {
	            if(f.isDirectory()) {
	            	TreeElement dir = new TreeElement();
	            	dir.setId(counter);
		    		counter++;
		    		dir.setType(Type.dir);
		    		dir.setName(f.getName());
		    		dir.setExtension(null);
		    		dir.setFileId(null);
		    		list.add(dir);
		    		
	            	generateStructure(f);
	            	
	            	TreeElement enddir = new TreeElement();
	            	enddir.setId(counter);
		    		counter++;
		    		enddir.setType(Type.enddir);
		    		enddir.setName(null);
		    		enddir.setExtension(null);
		    		enddir.setFileId(null);
		    		list.add(enddir);
	            	
	            } else {
	            	TreeElement file = new TreeElement();
	        		file.setId(counter);
	        		counter++;
	        		file.setType(Type.node);
	        		file.setName(f.getName());
	        		file.setExtension(getExtension(f.getName()));
	        		file.setFileId(f.getCanonicalPath());
	        		list.add(file);
	            }
	        }
	    }
	}
	

	private String getExtension(String filename) {
		String extension = "txt";
		System.out.println(filename);
		if (filename.indexOf(".") > 0 && !filename.endsWith(".")) {
			extension = filename.substring(filename.indexOf(".") + 1);
		}
		return extension;
	}
}
