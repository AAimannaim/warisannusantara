import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  formData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  onSubmit(event: Event) {
    event.preventDefault();
    // Retrieve form field values
    const category = (document.getElementById('category') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const gambar = (document.getElementById('gambar') as HTMLInputElement).value;

    // Set form data
    this.formData.append('kategori', category);
    this.formData.append('nama', name);
    this.formData.append('description', description);
    this.formData.append('date', date);
    this.formData.append('gambar', gambar);

    // Send form data to the API
    this.http.post('https://warisannusantara01.000webhostapp.com/collection', this.formData)
      .subscribe(
        response => {
          console.log('Success:', response);
          // Handle successful response
          alert('Collection created successfully!');
        },
        error => {
          console.log('Error:', error);
          // Handle error
          alert('Collection error!');
        }
      );
  }
}
