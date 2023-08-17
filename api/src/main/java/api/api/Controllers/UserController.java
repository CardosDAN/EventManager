package api.api.Controllers;

import api.api.Exception.*;
import api.api.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import api.api.Service.*;
import api.api.Model.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.listAll());
    }

    @GetMapping("/{id}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) throws UserNotFoundException {
        return ResponseEntity.ok(userService.get(id));
    }

    @PostMapping
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/edit/{id}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id, @RequestBody User updatedUser) throws UserNotFoundException {
        User user = userService.get(id);
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        userService.update(id, user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("delete/{id}")
    @RolesAllowed({"ROLE_USER", "ROLE_PUBLISHER"})
    public ResponseEntity<User> deleteUser(@PathVariable("id") Integer id) throws UserNotFoundException {
        User user = userService.get(id);
        userService.delete(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/{userId}/assign-role")
    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> assignRoleToUser(@PathVariable Integer userId) throws UserNotFoundException {
        User updatedUser = userService.assignRole(userId, "ROLE_PUBLISHER");
        return ResponseEntity.ok(updatedUser);
    }
}