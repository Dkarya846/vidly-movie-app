import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Table from "./table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        this.props.user ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          movie.title
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => <Like movie={movie} onClick={this.props.onLike} />,
    },
    {
      key: "delete",
      content: (movie) => {
        if (this.props.user) {
          return (
            this.props.user.isAdmin && (
              <button
                className="btn btn-danger"
                onClick={() => this.props.onDelete(movie)}
              >
                Delete
              </button>
            )
          );
        }
      },
    },
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
