// apiService.js
import { supabase } from '~/utils/supabase';

export const apiService = {
  async initializeApp(userId) {
    try {
      const [friends, likedMovies, userProfile] = await Promise.all([
        apiService.fetchFriends(userId),
        apiService.fetchLikedMovies(userId),
        apiService.fetchUserProfile(userId),
      ]);

      return {
        friends,
        likedMovies,
        userProfile,
      };
    } catch (error) {
      console.error('Error initializing app:', error);
      return null;
    }
  },

  async fetchFriends(userId) {
    const { data, error } = await supabase
      .from('friends')
      .select('friend_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching friends:', error.message);
      return [];
    }
    return data;
  },

  async fetchLikedMovies(userId) {
    const { data, error } = await supabase
      .from('liked_movies')
      .select('movie_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching liked movies:', error.message);
      return [];
    }
    return data;
  },

  async fetchUserProfile(userId) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }
    return data;
  },
};
