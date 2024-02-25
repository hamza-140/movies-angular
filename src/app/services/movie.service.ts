import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private backendUrl = 'http://localhost:3000'; // Replace with your backend server URL

  constructor(private http: HttpClient) { }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/movies`, movie);
  }

  searchMovies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/movies/search?q=${query}`);
  }
}
