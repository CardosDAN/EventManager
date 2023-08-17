package api.api;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import api.api.Model.Role;
import api.api.Model.User;
import api.api.Repository.RoleRepository;
import api.api.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class RoleRepositoryTests {
    @Autowired private RoleRepository repo;
    @Autowired private UserRepository userRepo;

    @Test
    public void testCreateRoles() {
        Role user = new Role("ROLE_USER");
        Role publisher = new Role("ROLE_PUBLISHER");
        Role admin = new Role("ROLE_ADMIN");

        repo.saveAll(List.of(user, publisher, admin));

        long count = repo.count();
        assertEquals(3, count);
    }

    @Test
    public void testAssignRoleToUser() {
        Integer userId = 2;
        Integer roleId = 1;
        User user = userRepo.findById(userId).get();
        user.addRole(new Role(roleId));

        User updatedUser = userRepo.save(user);
        assertThat(updatedUser.getRoles()).hasSize(1);

    }

    @Test
    public void testAssignRoleToUser2() {
        Integer userId = 2;
        User user = userRepo.findById(userId).get();
        user.addRole(new Role(1));


        User updatedUser = userRepo.save(user);
        assertThat(updatedUser.getRoles()).hasSize(2);

    }
}