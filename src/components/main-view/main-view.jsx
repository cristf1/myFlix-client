import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

{
  /*import images from '../images';*/
}

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      //user: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://cristine-myflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
        console.log(this.state.movies);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;
    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          <Routes>
            <Route exact path="/" element={<p>Test</p>}
              render={() => {
                return (
                  <div>
                    <h2>Contact</h2>
                    <p>Name: {name}</p>
                    <p>Adress: {address}</p>
                  </div>
                );
              }}

            /* return movies.map(m => (
               <Col md={3} key={m._id}>
                 <MovieCard movie={m} />
               </Col>
             )) */
            /*  if (!user)
                   return (
                     <Col>
                       <LoginView
                         movies={movies}
                         onLoggedIn={(user) => this.onLoggedIn(user)}
                       />
                     </Col>
                   );
                 if (movies.length === 0) return <div className='main-view' />;
               }}*/
            />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path="/genres/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
          </Routes>
        </Row>
      </Router >
    );
  }
}


/*movies.map((movie) => (
  <Col id='background' sm={6} md={4} lg={3} key={movie._id}>
    <MovieCard movieData={movie} />
  </Col>
))
}
</Row >
); 

<button
onClick={() => {
  this.onLoggedOut();
}}
>
Logout
</button>;
}
}*/
