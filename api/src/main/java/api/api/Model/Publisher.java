package api.api.Model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "publishers")
public class Publisher {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPublisher_description() {
        return publisher_description;
    }

    public void setPublisher_description(String publisher_description) {
        this.publisher_description = publisher_description;
    }

    @Override
    public String toString() {
        return "Publisher{" +
                "id=" + id +
                ", publisher_description='" + publisher_description + '\'' +
                ", publisher_name='" + publisher_name + '\'' +
                ", user=" + user +
                '}';
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPublisher_name() {
        return publisher_name;
    }

    public void setPublisher_name(String publisher_name) {
        this.publisher_name = publisher_name;
    }

    public Set<Image> getImage() {
        return image;
    }

    public void setImage(Set<Image> image) {
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "publisher_description", nullable = false)
    private String publisher_description;

    @Column(name = "publisher_name")
    private String publisher_name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "publisher_image",
            joinColumns = @JoinColumn(name = "publisher_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private Set<Image> image;
}
