import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Table from "./table";
import auth from "../../services/authService";

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
  ];

  deleteButton = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    let user = auth.getCurrentUser();
    console.log(user);
    if (user && user.isAdmin) {
      this.columns.push(this.deleteButton);
    }
  }

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
