import "../config/envConfig";
import { MovieDb } from "moviedb-promise";

const moviedb = new MovieDb(process.env.TMDB_API_KEY || "");

export default moviedb;