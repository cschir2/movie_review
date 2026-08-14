import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieDataService from "../services/movies";
import {
  Card,
  Container,
  Image,
  Col,
  Row,
  Button,
} from "react-bootstrap";

function Movie({ user }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const getMovie = async (movieId) => {
    try {
      const response = await MovieDataService.get(movieId);
      console.log(response.data);
      setMovie(response.data);
    } catch (error) {
      console.error("Unable to retrieve movie:", error);
    }
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  console.log("Logged in user:", user);
  console.log("Movie reviews:", movie.reviews);
  const deleteReview = async (reviewId, index) => {
    try {
      await MovieDataService.deleteReview(reviewId, user.id);

      setMovie((prevState) => ({
        ...prevState,
        reviews: prevState.reviews.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image
            src={
              movie.poster
                ? `${movie.poster}/100px250`
                : "/no-poster.png"
            }
            alt={movie.title}
            fluid
            onError={(e) => {
              e.currentTarget.src = "/no-poster.png";
            }}
          />
        </Col>

        <Col md={8}>
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>

            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>

              {user && (
                <Link to={`/movies/${id}/review`}>
                  Add Review
                </Link>
              )}
            </Card.Body>
          </Card>

        <h2 className="mt-4">Reviews</h2>

        {movie.reviews?.map((review, index) => (
          <Card key={review._id || review.user_id} className="mb-3">
            <Card.Body>
              <Card.Title>
                {review.name} reviewed on{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(review.date))}
              </Card.Title>

              <Card.Text>{review.review}</Card.Text>

              {user && user.id === review.user_id && (
                <Row>
                  <Col>
                    <Link
                      to={`/movies/${id}/review`}
                      state={{ currentReview: review }}
                    >
                      Edit
                    </Link>
                  </Col>

                  <Col>
                    <Button
                      variant="link"
                      onClick={() => deleteReview(review._id, index)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;