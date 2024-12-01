import React, { useState, useEffect } from 'react';

import MovieDetails from './MovieDetails';

import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/utils/supabase';

const MovieDetailsContainer = ({ movie }) => {
  const { session } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from('liked_movies')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('movie_id', movie.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking liked movies:', error);
      } else {
        setIsLiked(!!data);
      }

      setLoading(false);
    };

    checkIfLiked();
  }, [movie.id, session?.user?.id]);

  const likeMovie = async () => {
    setIsLiked(true);

    const { error } = await supabase
      .from('liked_movies')
      .insert([{ user_id: session.user.id, movie_id: movie.id }]);

    if (error) {
      console.error('Error liking movie:', error);
      setIsLiked(false);
    }
  };

  const unlikeMovie = async () => {
    setIsLiked(false);

    const { error } = await supabase
      .from('liked_movies')
      .delete()
      .eq('user_id', session.user.id)
      .eq('movie_id', movie.id);

    if (error) {
      console.error('Error unliking movie:', error);
      setIsLiked(true);
    }
  };

  const onLikeToggle = () => {
    isLiked ? unlikeMovie() : likeMovie();
  };

  return (
    <MovieDetails movie={movie} isLiked={isLiked} loading={loading} onLikeToggle={onLikeToggle} />
  );
};

export default MovieDetailsContainer;
