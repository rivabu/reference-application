package com.rients.org.sourceviewer.executables;

import java.io.File;
import java.io.IOException;

import com.rients.org.sourceviewer.domain.Project;

public class Initializer {

	public Project getZipfile(String root) throws IOException {
		Project project = new Project();
		File directory = new File(root + "//input");
		if(directory.exists()) {
		    File[] files = directory.listFiles();
		    if(files != null) { //some JVMs return null for empty dirs
			    if (files.length > 1) {
	            	System.out.println("multiple files found in input directory. Exit");
					System.exit(-1);
			    }
		        for(File f: files) {
		            if(f.isDirectory()) {
		            	System.out.println("directory found in input");
						System.exit(-1);
		            } else {
		            	String projectName = f.getName().substring(0, f.getName().indexOf("."));
		            	project.setName(projectName);
		            	project.setDescription("The description new for the " + f.getName() + " project");
		            }
		        }
		    } else {
				System.out.println("no zip file found!");
				System.exit(-1);
		    }

		} else {
			System.out.println("input directory missing!");
			System.exit(-1);
		}
		return project;
	}

}
