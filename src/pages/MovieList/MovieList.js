import React, { useEffect, useRef, useState } from 'react';
import { Container, Flag, FormButton, Image, Input, Message } from 'semantic-ui-react';
import {
  movieListPage,
  movieItem,
  coverImage,
  searchInput,
  movieContentContainer,
  movieContent,
  movieList as movieListStyle,
  searchButton,
  loadingSpinner
} from './MovieList.module.scss';
import movieRequest from 'apis/movieRequest';
import List from 'components/List/List';
import Heading from 'components/Heading/Heading';
import Button from 'components/Button/Button';
import useInputs from 'components/hooks/useInputs';
import { ReactComponent as Wedges } from 'assets/wedges.svg';

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);

  const [inputs, setInputs] = useInputs({
    movieSearchInput: ''
  });

  let { movieSearchInput } = inputs;

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const $input = useRef(null);

  const searchMovies = async e => {
    setIsLoading(true);
    $input.current.focus();
    e.preventDefault();
    const res = await movieRequest.searchMovies(movieSearchInput, page);
    if (res.status === 'ok') {
      if (res.data.movie_count) {
        const movies = res.data.movies;
        const img = document.createElement('img');
        img.src = movies[0].medium_cover_image;
        img.onload = () => {
          setMovieList(movies);
        };
      } else setMovieList([]);
    } else console.log('request error');
    movieSearchInput = '';
    setIsLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await movieRequest.fetchMovieList();
      if (res.status === 'ok') {
        setMovieList(res.data.movies);
        setIsLoading(false);
      } else console.log('request error');
    };
    fetch();
  }, []);
  return (
    <div className={movieListPage}>
      <Heading level='1'>Movie Finder</Heading>
      <form onSubmit={searchMovies}>
        <Input
          name='movieSearchInput'
          value={movieSearchInput}
          aria-label='find movie form'
          className={searchInput}
          onChange={setInputs}
          ref={$input}
        />
        <Button className={searchButton}>Search</Button>
      </form>
      <List className={movieListStyle}>
        {movieList.length ? (
          movieList.map(movie => {
            return (
              <List.Item className={movieItem} key={movie.id}>
                <img className={coverImage} src={movie.medium_cover_image} alt={movie.title} />
                <div className={movieContentContainer}>
                  <Heading level='2'>{movie.title_long}</Heading>
                  <p className={movieContent}>
                    {movie.summary ? movie.summary : 'this movie has no summary 😥'}
                  </p>
                </div>
              </List.Item>
            );
          })
        ) : isLoading ? null : (
          <Message negative style={{ marginTop: 30 }}>
            <Message.Header>could not found matching result!</Message.Header>
            <p>please refine your search.</p>
          </Message>
        )}
      </List>
      {isLoading ? <Wedges className={loadingSpinner} /> : null}
    </div>
  );
}
