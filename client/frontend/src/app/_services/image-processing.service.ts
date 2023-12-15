import {Injectable} from '@angular/core';
import {Publisher} from "../_model/publisher.model";
import {Image} from "../_model/image.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(publisher: Publisher){
    const  publisherImages: any[] =  publisher.image;

    const publisherImagesToImage: Image[] = [];

    for (let i = 0; i < publisherImages.length; i++) {
      const imageFileData =  publisherImages[i];
      const imageBlob = this.dateUrlToBlob(imageFileData.picByte, imageFileData.type);

      const  imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});


      const finalFileImage : Image = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      publisherImagesToImage.push(finalFileImage);
    }

    publisher.image = publisherImagesToImage;
    return publisher;

  }

  public createImage(publisher: Publisher){
    const publisherImage: any[] =  publisher.image;

    const imageFileData =  publisherImage[0];
    const imageBlob = this.dateUrlToBlob(imageFileData.picByte, imageFileData.type);

    const  imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

    const finalFileImage : Image = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    // @ts-ignore
    publisher.image = finalFileImage;
    return publisher;
  }

  // @ts-ignore
  public dateUrlToBlob(picBytes, imageType){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
