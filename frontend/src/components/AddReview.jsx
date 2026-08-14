import { useState } from "react";
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import MovieDataService from "../services/movies";
import { Form, Button, Container } from "react-bootstrap";

function AddReview({ user }) {
  const { id } = useParams();
  const location = useLocation();

  // Get the review being edited, if one was provided
  const currentReview = location.state?.currentReview;

  const editing = Boolean(currentReview);

  const [review, setReview] = useState(
    currentReview?.review || ""
  );

  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    setReview(e.target.value);
  };

  const saveReview = async () => {
    const data = {
      review,
      name: user.name,
      user_id: user.id,
      movie_id: id,
    };

    try {
      let response;

      if (editing) {
        data.review_id = currentReview._id;

        response = await MovieDataService.updateReview(data);
      } else {
        response = await MovieDataService.createReview(data);
      }

      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Unable to save review:", error);
    }
  };

  return (
    <Container className="mt-4">
      {submitted ? (
        <div>
          <h4>
            {editing
              ? "Your review was updated successfully!"
              : "You submitted successfully!"}
          </h4>

          <Link
            to={`/movies/${id}`}
            className="btn btn-primary"
          >
            Back to Movie
          </Link>
        </div>
      ) : (
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formReview"
          >
            <Form.Label>
              {editing ? "Edit Review" : "Review"}
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              required
              value={review}
              onChange={onChangeReview}
              placeholder="Write your review..."
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={saveReview}
            disabled={!review.trim()}
          >
            {editing ? "Update Review" : "Submit"}
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default AddReview;