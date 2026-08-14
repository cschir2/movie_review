import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveNextPage();
  }, [currentPage]);

  useEffect(() => {
    retrieveRatings();
  }, []);

  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else {
      retrieveMovies();
    }
  };

  const retrieveMovies = async () => {
    try {
      const response = await MovieDataService.getAll(currentPage);

      console.log(response.data);

      setMovies(response.data.movies);
      setCurrentPage(response.data.page);
      setEntriesPerPage(response.data.entries_per_page);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveRatings = async () => {
    try {
      const response = await MovieDataService.getRatings();

      console.log(response.data);

      setRatings(["All Ratings", ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = (e) => {
    setSearchRating(e.target.value);
  };

  const find = async (query, by) => {
    try {
      const response = await MovieDataService.find(
        query,
        by,
        currentPage
      );

      console.log(response.data);

      setMovies(response.data.movies);
      setCurrentPage(response.data.page);
      setEntriesPerPage(response.data.entries_per_page);
    } catch (error) {
      console.error(error);
    }
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");

    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="g-3">
        <Col md={6}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              findByTitle();
            }}
          >
            <Form.Group controlId="searchTitle">
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </Form.Group>

            <Button
              className="mt-2"
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              findByRating();
            }}
          >
            <Form.Group controlId="searchRating">
              <Form.Select
                value={searchRating}
                onChange={onChangeSearchRating}
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              className="mt-2"
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="g-4 mt-3">
        {movies.map((movie) => (
          <Col
            key={movie._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={
                  movie.poster
                    ? `${movie.poster}/100px180`
                    : "/no-poster.png"
                }
                alt={movie.title}
                onError={(e) => {
                  e.currentTarget.src = "/no-poster.png";
                }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>

                <Card.Text>
                  <strong>Rating:</strong> {movie.rated}
                </Card.Text>

                <Card.Text>{movie.plot}</Card.Text>

                <Button
                  as={Link}
                  to={`/movies/${movie._id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  View Reviews
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <br />

      Showing page: {currentPage + 1}.

      <Button
        variant="link"
        onClick={() =>
          setCurrentPage((prevPage) => prevPage + 1)
        }
      >
        Get next {entriesPerPage} results
      </Button>
    </Container>
  );
}

export default MoviesList;