import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  movies = {};
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
      selectedGenre: genres[0],
    });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre) {
      filteredMovies =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
          : allMovies;
    } else filteredMovies = allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      sortColumn.order
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: sortedMovies.length, movies: movies };
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((data) => data._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Movie not found in the database");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = async (genre) => {
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      searchQuery: "",
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (value) => {
    this.setState({ searchQuery: value, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, selectedGenre, sortColumn, genres } =
      this.state;

    const { totalCount, movies } = this.getPagedData();

    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className="col">
            <Link className="btn btn-primary mb-4" to={`/movies/new`}>
              New Movie
            </Link>
            <p>Showing {totalCount} movies in the database</p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            {totalCount !== 0 ? (
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onSave={this.handleSave}
              />
            ) : (
              <p>There are no movies in the Database</p>
            )}
          </div>
        </div>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </main>
    );
  }
}

export default Movies;
