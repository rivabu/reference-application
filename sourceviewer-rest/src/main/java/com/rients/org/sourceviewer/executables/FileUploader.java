package com.rients.org.sourceviewer.executables;

import java.io.File;
import java.io.IOException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;

import com.rients.org.sourceviewer.domain.FileContent;
import com.rients.org.sourceviewer.domain.Tree;
import com.rients.org.sourceviewer.domain.TreeElement;
import com.rients.org.sourceviewer.domain.Type;

public class FileUploader {

	public void uploadFiles(Tree tree, int projectId) throws IOException {
		for (TreeElement elem : tree.getElements()) {
			if (elem.getType().equals(Type.node)) {
				System.out.println("uploading: " + elem.getFileId());
				String file = FileUtils.readFileToString(new File(elem.getFileId()));
				System.out.println("fileLength: " + file.length());
				byte[] encoded = Base64.encodeBase64(file.getBytes());
				System.out.println("Base64 Encoded String : " + new String(encoded));
				RestClient restClient = new RestClient();
				FileContent fileContent = new FileContent();
				fileContent.setEncodedContent(new String(encoded));
				fileContent.setProjectId(projectId);
				fileContent.setName(elem.getName());
				String fileId = restClient.store(fileContent);
				elem.setFileId(fileId);
			}
		}
	}

}
