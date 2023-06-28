import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  formData: FormData = new FormData();
  collection: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get('https://warisannusantara01.000webhostapp.com/collection/' + params['id'])
        .subscribe(
          response => {
            this.collection = response;
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  onSubmit(event: Event) {
  event.preventDefault();
  const category = (document.getElementById('category') as HTMLInputElement).value;
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const description = (document.getElementById('description') as HTMLTextAreaElement).value;
  const date = (document.getElementById('date') as HTMLInputElement).value;
  const gambar = (document.getElementById('gambar') as HTMLInputElement).value;

  const data = {
    kategori: category,
    nama: name,
    description: description,
    date: date,
    gambar: gambar
  };

  this.route.params.subscribe(params => {
    this.http.patch('https://warisannusantara01.000webhostapp.com/collection/' + params['id'], data)
      .subscribe(
        response => {
          console.log(response);
          alert('Data berhasil diubah');

          this.router.navigate(['/collection/all']);
        },
        error => {
          console.log(error);
          alert('Data gagal diubah');
        }
      );
  });
}

}
