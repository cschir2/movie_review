import "./App.css";
import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import AddReview from "./components/AddReview";
import Login from "./components/Login";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  function login(user = null) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chris's Movie Review
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>

            </Nav>

            <Nav>
              {user ? (
                <Nav.Link onClick={logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Routes>
      <Route path="/" element={<MoviesList />} />
      <Route path="/movies" element={<MoviesList />} />

      <Route
        path="/movies/:id"
        element={<Movie user={user} />}
      />

      <Route
        path="/movies/:id/review"
        element={<AddReview user={user} />}
      />

      <Route
        path="/login"
        element={<Login login={login} />}
      />
    </Routes>
    </>
  );
}

export default App;