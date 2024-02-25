import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private backendUrl = 'http://localhost:3000'; // Replace with your backend server URL

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/movies');
  }
  addMovie(newMovie: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/movies', newMovie);
  }

  // Other methods (e.g., addMovie, searchMovies) can be implemented here
}
