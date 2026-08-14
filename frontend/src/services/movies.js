import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

class MovieDataService {
  getAll(page = 0) {
    return api.get(`/movies?page=${page}`);
  }

  get(id) {
    return api.get(`/movies/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return api.get(`/movies?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return api.post("/movies/review", data);
  }

  updateReview(data) {
    return api.put("/movies/review", data);
  }

  deleteReview(id, userId) {
    return api.delete("/movies/review", {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  }

  getRatings() {
    return api.get("/movies/ratings");
  }
}

export default new MovieDataService();