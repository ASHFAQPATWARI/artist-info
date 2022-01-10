export const TOKEN_KEY = "access_token";
export const SPOTIFY_URL = "https://api.spotify.com/v1";

export const ENDPOINTS = {
  GET_TOKEN: "https://spotify-token-193.herokuapp.com/token",
  SEARCH_ARTISTS: (query: string) => `/search?type=artist&q=${query}`,
  FETCH_ARTIST_ALBUMS: (artistId: string) => `/artists/${artistId}/albums`,
  FETCH_ALBUM_TRACKS: (albumId: string) => `/albums/${albumId}/tracks`,
};
