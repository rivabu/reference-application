package com.rients.org.sourceviewer.executables;

import java.io.IOException;

import com.rients.org.sourceviewer.domain.Project;

public class UnzipAndUploadProcessor {
	String zipFile = null;
	String root = "E://UPLOAD";
	
	public static void main(String[] args) {
		UnzipAndUploadProcessor processor = new UnzipAndUploadProcessor();
		processor.proces();
	}

	private void proces() {
		try {
			Initializer init = new Initializer();
			Project project = init.getZipfile(root);
			zipFile = root + "//input//" + project.getName() + ".zip";
			DirCleaner dirCleaner = new DirCleaner();
			dirCleaner.cleanup(root);
			Unzip unzip = new Unzip(zipFile, root);
			unzip.unzipFunction();
			RestClient client = new RestClient();
			int projectId = client.store(project);
			System.out.println("project id: " + projectId);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
	}
}
