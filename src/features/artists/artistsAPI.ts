import { ENDPOINTS } from "config/constants";
import { Api } from "services/api";

/**
 * Function to fetch Artists
 * @param  {string} query - Search term
 */
export function fetchArtists(query: string) {
  return Api.get(ENDPOINTS.SEARCH_ARTISTS(query));
}

/**
 * Function to fetch Albums of an artist
 * @param  {string} artistId - Selected Artist Id
 */
export function fetchArtistAlbums(artistId: string) {
  return Api.get(ENDPOINTS.FETCH_ARTIST_ALBUMS(artistId));
}

/**
 * Function to fetch Tracks of an album
 * @param  {string} albumId - albumId
 */
export function fetchAlbumTracks(albumId: string) {
  return Api.get(ENDPOINTS.FETCH_ALBUM_TRACKS(albumId));
}
