import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http: HttpClient) { }

  uploadImage(imageBase64: string) {
    const cloudName = 'dsl5j20te';
    const apiKey = '886751729321488';
    const uploadPreset = 'yh2cp9wx';

    const formData = new FormData();
    formData.append('file', imageBase64);
    formData.append('upload_preset', uploadPreset);
    formData.append('api_key', apiKey);

    return this.http.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .pipe(map((response: any) => {
        return response.secure_url;
      }));
  }
}



/*async uploadImageToCloudinary(imageBase64 : string) {
  try {
    // Assuming you have a Cloudinary API key, API secret, and cloud name configured
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
    const formData = new FormData();
    formData.append('file', imageBase64);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Specify your upload preset


    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const responseData = await response.json();
    return {
      secureUrl: responseData.secure_url,
      publicId: responseData.public_id // If you need the public ID for future reference
    };
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary: ' + error.message);
  }
}
}
*/
