package api.api.Service;

import api.api.Model.Image;
import api.api.Model.Publisher;
import api.api.Model.User;
import api.api.Repository.PublisherRepository;
import api.api.Exception.PublisherNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PublisherService {

    @Autowired
    PublisherRepository publisherRepository;

    @Autowired
    UserService userService;


    public List<Publisher> listAll() {
        return (List<Publisher>) publisherRepository.findAll();
    }

    public void save(Publisher publisher) {
        publisherRepository.save(publisher);
    }

    public Publisher get(Integer id) throws PublisherNotFoundException {
        Optional<Publisher> result = publisherRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        throw new PublisherNotFoundException("Could not found any publisher with the id: " + id);
    }

    public void update(Integer id, Publisher publisher) throws PublisherNotFoundException {
        Long count = publisherRepository.countById(id);
        if (count == null || count == 0) {
            throw new PublisherNotFoundException("Could not found any publisher with the id: " + id);
        }
        publisher.setId(id);
        publisherRepository.save(publisher);
    }

    public void delete(Integer id) throws PublisherNotFoundException {
        Long count = publisherRepository.countById(id);
        if (count == null || count == 0) {
            throw new PublisherNotFoundException("Could not found any publisher with the id: " + id);
        }
        publisherRepository.deleteById(id);
    }

    public Set<Image> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<Image> images = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            Image image = new Image(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            images.add(image);
        }
        return images;
    }

    public boolean hasPublisherByUserId() {
        User authUser = userService.getCurrentUser();

        return publisherRepository.existsByUserId(authUser.getId());
    }

    public Publisher getPublisherByUserId(Integer userId) throws PublisherNotFoundException {
        Optional<Publisher> result = publisherRepository.findByUserId(userId);
        if (result.isPresent()) {
            return result.get();
        }
        throw new PublisherNotFoundException("Could not found any publisher with the user id: " + userId);
    }
}
