package api.api.Service;

import api.api.Model.Role;
import api.api.Model.User;
import api.api.Repository.RoleRepository;
import api.api.Repository.UserRepository;
import api.api.Exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;


    public List<User> listAll() {
        return (List<User>) userRepository.findAll();
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public User get(Integer id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        throw new UserNotFoundException("Could not found any user with the id: " + id);
    }

    public void update(Integer id, User user) throws UserNotFoundException {
        Long count = userRepository.countById(id);
        if (count == null || count == 0) {
            throw new UserNotFoundException("Could not found any user with the id: " + id);
        }
        user.setId(id);
        userRepository.save(user);
    }

    public void delete(Integer id) throws UserNotFoundException {
        Long count = userRepository.countById(id);
        if (count == null || count == 0) {
            throw new UserNotFoundException("Could not found any user with the id: " + id);
        }
        userRepository.deleteById(id);
    }

    public User getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        return userRepository.findUserByEmail(email);
    }


    public User assignRole(Integer userId, String roleName) throws UserNotFoundException {
        User user = get(userId);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        return userRepository.save(user);
    }
}
