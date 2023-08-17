package api.api.Controllers;

import api.api.Exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import api.api.Service.*;
import api.api.Model.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/publishers")
@CrossOrigin
public class PublisherController {

    @Autowired
    PublisherService publisherService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<Publisher>> getPublishers() {
        return ResponseEntity.ok(publisherService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publisher> getPublisherById(@PathVariable("id") Integer id) throws PublisherNotFoundException {
        return ResponseEntity.ok(publisherService.get(id));
    }

    @PostMapping(value = {"/add"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @RolesAllowed("ROLE_PUBLISHER")
    public ResponseEntity<Publisher> addPublisher(@RequestPart("publisher") Publisher publisher, @RequestPart("imageFile") MultipartFile[] file) {
        try{
            Set<Image> images = publisherService.uploadImage(file);
            publisher.setImage(images);
            User authUser = userService.getCurrentUser();
            publisher.setUser(authUser);
            publisherService.save(publisher);
            return ResponseEntity.ok(publisher);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Publisher> updatePublisher(@PathVariable("id") Integer id, @RequestBody Publisher updatedPublisher) throws PublisherNotFoundException {
        Publisher publisher = publisherService.get(id);
        publisher.setPublisher_description(updatedPublisher.getPublisher_description());
        publisherService.update(id, publisher);
        return ResponseEntity.ok(publisher);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Publisher> deletePublisher(@PathVariable("id") Integer id) throws PublisherNotFoundException {
        Publisher publisher = publisherService.get(id);
        publisherService.delete(id);
        return ResponseEntity.ok(publisher);
    }

    @GetMapping("/check")
    @RolesAllowed("ROLE_PUBLISHER")
    public ResponseEntity<?> checkPublisherForUser() {
        boolean hasEvent = publisherService.hasPublisherByUserId();
        if (hasEvent) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/publisherInfo/{userId}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<Publisher> getPublisherByUserId(@PathVariable  Integer userId) throws PublisherNotFoundException {
        Publisher publisher = publisherService.getPublisherByUserId(userId);
        return ResponseEntity.ok(publisher);
    }
}