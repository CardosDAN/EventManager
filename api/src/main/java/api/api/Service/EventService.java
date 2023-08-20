package api.api.Service;

import api.api.DTO.EventFilterDTO;
import api.api.Exception.UserNotFoundException;
import api.api.Model.Events;
import api.api.Model.User;
import api.api.Repository.EventsRepository;
import api.api.Exception.EventNotFoundException;
import api.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    EventsRepository eventsRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    public List<Events> listAll() {
        return (List<Events>) eventsRepository.findAll();
    }

    public Events saveEvent(Events events) {

        return eventsRepository.save(events);
    }

    public Events get(Integer id) throws EventNotFoundException {
        Optional<Events> result = eventsRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        throw new EventNotFoundException("Could not found any event with the id: " + id);
    }

    public void updateEvent(Integer id, Events events) throws EventNotFoundException {
        Long count = eventsRepository.countById(id);
        if (count == null || count == 0) {
            throw new EventNotFoundException("Could not found any event with the id: " + id);
        }
        events.setId(id);
        eventsRepository.save(events);
    }

    public void delete(Integer id) throws EventNotFoundException {
        Long count = eventsRepository.countById(id);
        if (count == null || count == 0) {
            throw new EventNotFoundException("Could not found any event with the id: " + id);
        }
        eventsRepository.deleteById(id);
    }

    public List<Events> getEventByPublisherId(Integer id) throws EventNotFoundException {
        List<Events> result = eventsRepository.findByUserId(id);
        if (result.isEmpty()) {
            throw new EventNotFoundException("Could not found any event with the id: " + id);
        }
        return result;
    }

    public List<Events> listEventsWithFilters(EventFilterDTO filterDTO) throws EventNotFoundException {
        List<Events> result = eventsRepository.findEventsWithFilters(filterDTO);
        if (result.isEmpty()) {
            throw new EventNotFoundException("Could not found any event with the given filters");
        }
        return result;
    }

    public boolean hasEventByUserId() {
        User authUser = userService.getCurrentUser();
        return eventsRepository.existsByUserId(authUser.getId());
    }

    public void registerUserForEvent(Integer eventId, Integer userId) throws EventNotFoundException, UserNotFoundException {
        Events event = eventsRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException("Event not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        event.getParticipants().add(user);
        eventsRepository.save(event);
    }
}
