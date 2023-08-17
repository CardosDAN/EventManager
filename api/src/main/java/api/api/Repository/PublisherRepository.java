package api.api.Repository;

import api.api.Model.Publisher;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Integer> {
    Long countById(Integer id);

    boolean existsByUserId(Integer userId);

    Optional<Publisher> findByUserId(Integer userId);
}
