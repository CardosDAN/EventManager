package api.api.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Events {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getEvent_description() {
        return event_description;
    }

    public void setEvent_description(String event_description) {
        this.event_description = event_description;
    }

    public String getEvent_category() {
        return event_category;
    }

    public void setEvent_category(String event_category) {
        this.event_category = event_category;
    }

    public LocalDateTime getDate_from() {
        return date_from;
    }

    public void setDate_from(LocalDateTime date_from) {
        this.date_from = date_from;
    }

    public String getEvent_location() {
        return event_location;
    }

    public void setEvent_location(String event_location) {
        this.event_location = event_location;
    }


    @Override
    public String toString() {
        return "Events{" +
                "id=" + id +
                ", event_name='" + event_name + '\'' +
                ", event_description='" + event_description + '\'' +
                ", event_category='" + event_category + '\'' +
                ", date_from=" + date_from +
                ", event_location='" + event_location + '\'' +
                ", user=" + user +
                ", date_to=" + date_to +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "event_name", nullable = false)
    private String event_name;

    @Column(name = "event_description",  nullable = false)
    private String event_description;

    @Column(name = "event_category", nullable = false)
    private String event_category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "date_from", nullable = false)
    private LocalDateTime date_from;



    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "date_to", nullable = false)
    private LocalDateTime date_to;


    public LocalDateTime getDate_to() {
        return date_to;
    }

    public void setDate_to(LocalDateTime date_to) {
        this.date_to = date_to;
    }

    @Column(name = "event_location", nullable = false)
    private String event_location;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
