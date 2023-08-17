package api.api.Repository;

import api.api.DTO.EventFilterDTO;
import api.api.Model.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends  JpaRepository<Events, Integer>{
    Long countById(Integer id);

    List<Events> findByUserId(Integer id);

    @Query("SELECT e FROM Events e WHERE (:#{#filter.dateFrom} IS NULL OR e.date_from >= :#{#filter.dateFrom}) " +
            "AND (:#{#filter.dateTo} IS NULL OR e.date_to <= :#{#filter.dateTo}) " +
            "AND (:#{#filter.category} IS NULL OR e.event_category = :#{#filter.category}) " +
            "AND (:#{#filter.location} IS NULL OR e.event_location = :#{#filter.location})")
    List<Events> findEventsWithFilters(EventFilterDTO filter);

    boolean existsByUserId(Integer userId);
}
