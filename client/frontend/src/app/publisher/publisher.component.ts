import {Component, OnInit} from '@angular/core';
import {Publisher} from "../_model/publisher.model";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {PublisherService} from "../_services/publisher.service";
import {Image} from "../_model/image.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  constructor(private publisherService: PublisherService,
              private sanitizer: DomSanitizer, private router: Router) {
  }


  ngOnInit(): void {
    this.publisherService.checkEntry().subscribe(
      (response: any) => {
        if (response === true) {
          console.log("You already have a user_id in publishers table", response);
          this.router.navigate(['/home']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error) {
          console.log('Error:', error);
        }
      }
    );
  }


  publisher: Publisher = {
    publisher_name: '',
    publisher_description: '',
    image: []
  }

  addPublisher(PublisherForm: NgForm) {

    const publisherFormData = this.prepareFormData(this.publisher);

    this.publisherService.addPublisher(publisherFormData).subscribe(
      (response: Publisher) => {
        console.log(response);
        PublisherForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );

  }

  prepareFormData(publisher: Publisher):
    FormData {
    const formData = new FormData();
    formData.append(
      'publisher',
      new Blob([JSON.stringify(publisher)], {type: 'application/json'})
    );
    for (let i = 0; i < publisher.image.length; i++) {
      formData.append('imageFile', publisher.image[i].file, publisher.image[i].file.name);
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0]

      const image: Image = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)
        )
      }
      this.publisher.image.push(image);
    }
  }

  removeImage(i: number) {
    this.publisher.image.splice(i, 1);
  }


}
