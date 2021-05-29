import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function deleteMovie(movie_id) {
  return http.delete(movieUrl(movie_id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const data = { ...movie };
    delete data._id;
    return http.put(movieUrl(movie._id), data);
  }
  return http.post(apiEndpoint, movie);
}
