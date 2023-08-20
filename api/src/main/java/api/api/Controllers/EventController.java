package api.api.Controllers;

import api.api.DTO.EventFilterDTO;
import api.api.Exception.*;
import api.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import api.api.Service.*;
import api.api.Model.*;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<List<Events>> getEvents() {
        return ResponseEntity.ok(eventService.listAll());
    }

    @GetMapping("/event/{id}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<Events> getEventById(@PathVariable("id") Integer id) throws EventNotFoundException {
        return ResponseEntity.ok(eventService.get(id));
    }

    @GetMapping("/publisher/{id}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<List<Events>> getEventByPublisherId(@PathVariable("id") Integer id) throws EventNotFoundException {
        return ResponseEntity.ok(eventService.getEventByPublisherId(id));
    }

    @PostMapping("/add")
    @RolesAllowed("ROLE_PUBLISHER")
    public Events addEvent(@RequestBody Events events) {

        User authUser = userService.getCurrentUser();
        events.setUser(authUser);

        return eventService.saveEvent(events);

    }

    @DeleteMapping("delete/{id}")
    @RolesAllowed("ROLE_PUBLISHER")
    public ResponseEntity<Events> deleteEvent(@PathVariable("id") Integer id) throws EventNotFoundException {
        Events events = eventService.get(id);
        eventService.delete(id);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/user/list")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<List<Events>> listEvents(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime date_from,
                                                  @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm") LocalDateTime date_to,
                                                  @RequestParam(required = false) String category,
                                                  @RequestParam(required = false) String location) throws EventNotFoundException {
        EventFilterDTO filterDTO = new EventFilterDTO();
        filterDTO.setDateFrom(date_from);
        filterDTO.setDateTo(date_to);
        filterDTO.setCategory(category);
        filterDTO.setLocation(location);

        List<Events> events = eventService.listEventsWithFilters(filterDTO);

        return ResponseEntity.ok(events);
    }

    @GetMapping("/check")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<?> checkEventForUser() {
        boolean hasUser = eventService.hasEventByUserId();
        if (hasUser) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }


    @PostMapping("/user/register/{eventId}/")
    public ResponseEntity<String> registerUserForEvent(
            @PathVariable Integer eventId) throws UserNotFoundException, EventNotFoundException {
        User authUser = userService.getCurrentUser();
        eventService.registerUserForEvent(eventId, authUser.getId());
        return ResponseEntity.ok("User registered for event.");
    }

}