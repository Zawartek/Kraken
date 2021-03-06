package com.kraken.gcfa.services;

import com.kraken.gcfa.entity.Documentation;
import com.kraken.gcfa.entity.DocumentationType;
import com.kraken.gcfa.exceptions.StorageException;
import com.kraken.gcfa.repository.DocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 10/04/2017.
 * gcfa-back
 */
@Service
public class DocumentationService {

	private final String DOCUMENTATION_FOLDER = "files/documentation";

	private final Path rootLocation = Paths.get(DOCUMENTATION_FOLDER);

	@Autowired
	private StorageService storageService;

	@Autowired
	private DocumentationRepository documentationRepository;

	public List<Documentation> listAll() {
		return documentationRepository.findAll();
	}

	public void storeFile(MultipartFile file, DocumentationType type) throws StorageException {

		String rawFilename = file.getOriginalFilename();
		String fileType = storageService.getFiletype(rawFilename);
		if (!storageService.hasExtensions(rawFilename, Arrays.asList(".pdf", ".doc", ".docx", ".xls", ".xlsx"))) {
			throw new StorageException(String.format("The file Type %s is not expected ", fileType));
		}

		String path = storageService.storeFile(file, rootLocation);

		Documentation documentation = new Documentation();
		documentation.setName(storageService.getFilename(rawFilename));
		documentation.setCreation(new Date());
		documentation.setPath(path);
		documentation.setType(type);
		documentation.setFileType(fileType);
		documentationRepository.save(documentation);
	}

	public Documentation getDocument(Long fileId) throws StorageException {
		Documentation doc = documentationRepository.findOne(fileId);
		if (doc != null) {
			return doc;
		} else {
			throw new StorageException(String.format("The file with id %d was not found", fileId));
		}
	}

	public File getFile(Documentation doc) throws StorageException {
		return storageService.getFile(doc.getPath());
	}

	public Documentation deleteFile(Long fileId) throws StorageException {
		Documentation doc = documentationRepository.findOne(fileId);
		storageService.deleteFile(doc.getPath());
		documentationRepository.delete(doc);
		return doc;
	}
}
