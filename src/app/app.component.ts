import { Component, OnInit } from '@angular/core';
import { MovieService } from './elasticsearch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  movie = {
    title: '',
    budget: '',
    genre: '',
    releaseDate: '',
    director: '',
  };
  searchQuery: string = ''; // Store search query
  title = 'My Movie App';
  movies: any[] = [];
  filteredMovies: any[] = []; // Store filtered movies
  newMovieTitle: string = '';
  newMovie = {
    title: this.newMovieTitle,
  };
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    // this.loadMovies();
    this.loadDummyMovies();
  }
  add() {
    this.movieService.addMovie(this.movie).subscribe({
      next: (response) => {
        console.log('Movie added successfully:', response);
        this.loadMovies();

        // Reset the newMovie object for adding another movie
        // Optionally, you can perform any other operations after adding the movie
      },
      error: (error) => {
        console.error('Error adding movie:', error);
        // Optionally, you can handle the error here
      },
    });
  }

  loadDummyMovies() {
    // Sample dummy movies
    this.movies = [
      {
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        releaseDate: '1994-09-10',
      },
      {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        releaseDate: '1972-03-24',
      },
      {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        releaseDate: '2008-07-18',
      },
      {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        releaseDate: '1994-10-14',
      },
      {
        title: "Schindler's List",
        director: 'Steven Spielberg',
        releaseDate: '1993-11-30',
      },
      // Add more dummy movies as needed
    ];

    // Initially, display all movies
    this.filteredMovies = [...this.movies];
  }
  loadMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filteredMovies = [...this.movies]; // Initially, display all movies
        console.log(movies);
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      },
    });
  }
  searchMovies($event: any) {
    this.searchQuery = $event.target.value; // Update the search query
    console.log('Search query:', this.searchQuery);
    if (this.searchQuery.trim() === '') {
      // If search query is empty, show all movies
      this.filteredMovies = [...this.movies];
    } else {
      // Filter movies based on search query
      this.filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
      console.log('Filtered movies:', this.filteredMovies);
    }
  }
}
