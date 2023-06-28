import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections: any = {};
  selectedCategory: string = 'all';
  selectedCollectionDetails: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('category') || 'all';
      this.loadCollections();
    });
  }

  loadCollections(): void {
    this.http.get<any>('https://warisannusantara01.000webhostapp.com/collections').subscribe({
      next: (response) => {
        if (response.hasOwnProperty('semuaCollection')) {
          this.collections = response.semuaCollection;
        } else {
          this.collections = response;
        }
      },
      error: (error) => {
        console.error('Failed to retrieve collections:', error);
      }
    });
  }  

  selectedCollection(category: string): any[] {
    if (category === 'all') {
      return Object.values<any>(this.collections);
    } else {
      return Object.values<any>(this.collections).filter(
        (collection: any) => collection.kategori.toLowerCase().includes(category)
      );
    }
  }

  selectCollectionDetails(collection: any): void {
    this.selectedCollectionDetails = {
      id: collection.id, 
      name: collection.nama,
      category: collection.kategori,
      description: collection.desc,
      date: collection.date,
      image: collection.gambar,
    };
  }

  updateCollection(): void {
    const collectionId = this.selectedCollectionDetails.id;
    this.router.navigate(['collection/update', collectionId]);
  }


  
  deleteCollection(): void {
    if (!confirm('Are you sure you want to delete this collection?')) {
      return; 
    }
  
    const deleteUrl = `https://warisannusantara01.000webhostapp.com/collection/${this.selectedCollectionDetails.id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.http.delete(deleteUrl, { headers }).subscribe(
      () => {
        console.log('Collection deleted successfully:', this.selectedCollectionDetails.name);
        this.loadCollections();
      },
      error => {
        console.error('Failed to delete collection:', error);
        // Handle the error appropriately, such as displaying an error message to the user
      }
    );
  }

  // updateCollection(): void {
  //   // Make sure to perform any necessary form validation before updating the collection
    
  //   const updateUrl = `https://warisannusantara01.000webhostapp.com/collection/${this.selectedCollectionDetails.id}`;
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  //   const updatedCollection = {
  //     category: this.selectedCollectionDetails.category,
  //     name: this.selectedCollectionDetails.name,
  //     description: this.selectedCollectionDetails.description,
  //     date: this.selectedCollectionDetails.date,
  //     gambar: this.selectedCollectionDetails.gambar
  //   };
    
  //   this.http.put(updateUrl, updatedCollection, { headers }).subscribe(
  //     () => {
  //       console.log('Collection updated successfully:', this.selectedCollectionDetails.name);
  //       // Perform any additional actions after updating the collection
  //       alert('Collection updated successfully');
  //     },
  //     error => {
  //       console.error('Failed to update collection:', error);
  //       // Handle the error appropriately, such as displaying an error message to the user
  //       alert('Failed to update collection');
  //     }
  //   );
  // }
}
