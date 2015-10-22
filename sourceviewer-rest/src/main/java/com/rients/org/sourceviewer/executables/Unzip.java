package com.rients.org.sourceviewer.executables;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.commons.io.FileUtils;

public class Unzip {

	String zipFile = null;
	String processingFolder = null;
	String root = null;
	List<String> ignores = null;

	public Unzip(String zipFile, String root) {
		super();
		this.zipFile = zipFile;
		this.processingFolder = root + "//processing";
		this.root = root;
	}

	public static void main(String[] args) throws IOException {
		Unzip unzip = new Unzip("e://UPLOAD//input//TheCrudder.zip", "E://UPLOAD");

		unzip.unzipFunction();

	}

	public void loadIgnoreFiles() throws IOException {
		ignores = FileUtils.readLines(new File(root + "//ignorefiles.txt"));
	}

	private boolean ignoreMe(String filename) {
		boolean returnValue = false;
		for (String ignore : ignores) {
			if (ignore.startsWith(".")) {
				if (filename.endsWith(ignore)) {
					System.out.println("filename: " + filename + " ignored");
					returnValue = true;
					break;
				}
			} else {
				if (filename.indexOf(ignore) != -1) {
					System.out.println("filename: " + filename + " ignored");
					returnValue = true;
					break;
				}
			}
		}
		return returnValue;
	}

	void unzipFunction() throws IOException {
		if (ignores == null) {
			loadIgnoreFiles();
		}
		File directory = new File(processingFolder);

		// if the output directory doesn't exist, create it
		if (!directory.exists())
			directory.mkdirs();

		// buffer for read and write data to file
		byte[] buffer = new byte[2048];

		try {
			FileInputStream fInput = new FileInputStream(zipFile);
			ZipInputStream zipInput = new ZipInputStream(fInput);

			ZipEntry entry = zipInput.getNextEntry();

			while (entry != null) {
				String entryName = entry.getName();
				if (!ignoreMe(entryName)) {
					createDirs(processingFolder, entryName);
					File file = new File(processingFolder + File.separator + entryName);

					System.out.println("Unzip file " + entryName + " to " + file.getAbsolutePath());

					// create the directories of the zip directory
					if (entry.isDirectory()) {
						File newDir = new File(file.getAbsolutePath());
						if (!newDir.exists()) {
							boolean success = newDir.mkdirs();
							if (success == false) {
								System.out.println("Problem creating Folder");
							}
						}
					} else {
						FileOutputStream fOutput = new FileOutputStream(file);
						int count = 0;
						while ((count = zipInput.read(buffer)) > 0) {
							// write 'count' bytes to the file output stream
							fOutput.write(buffer, 0, count);
						}
						fOutput.close();
					}
					// close ZipEntry and take the next one
				}
				zipInput.closeEntry();
				entry = zipInput.getNextEntry();
			}

			// close the last ZipEntry
			zipInput.closeEntry();

			zipInput.close();
			fInput.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void createDirs(String destinationFolder, String entryName) {
		String[] dirs = entryName.split("/");
		String currentDir = destinationFolder;
		for (int i = 0; i < dirs.length - 1; i++) {
			currentDir = currentDir + "//" + dirs[i];
			File directory = new File(currentDir);
			if (!directory.isDirectory()) {
				directory.mkdirs();
			}
		}
	}
}
