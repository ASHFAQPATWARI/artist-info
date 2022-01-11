import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlbum } from "interface/album";
import { IArtist } from "interface/artist";
import { ITrack } from "interface/track";
import { RootState } from "../../app/store";
import {
  fetchAlbumTracks,
  fetchArtistAlbums,
  fetchArtists,
} from "./artistsAPI";

export interface ArtistsState {
  selectedArtist: IArtist | null;
  selectedAlbum: IAlbum | null;
  status: "idle" | "searching" | "failed";
}

const { ...initialState }: ArtistsState = {
  selectedArtist: null,
  selectedAlbum: null,
  status: "idle",
};

/**
 * Async thunk to fetch artists
 * @param  {string} query - Search query
 * @returns Artist[]
 */
export const fetchArtistsAsync = createAsyncThunk<IArtist[], string>(
  "counter/fetchArtists",
  async (query: string) => {
    const response = await fetchArtists(query);
    return response.data.artists.items;
  }
);

/**
 * Async thunk to fetch artists
 * @param  {string} artistId - Artist ID
 * @returns Albums[]
 */
export const fetchArtistAlbumsAsync = createAsyncThunk<IAlbum[], string>(
  "counter/fetchArtistAlbums",
  async (artistId: string) => {
    const response = await fetchArtistAlbums(artistId);
    return response.data.items;
  }
);

/**
 * Async thunk to fetch album tracks
 * @param  {string} albumId - Album ID
 * @returns Albums[]
 */
export const fetchAlbumTracksAsync = createAsyncThunk<ITrack[], string>(
  "counter/fetchAlbumTracks",
  async (albumId: string) => {
    const response = await fetchAlbumTracks(albumId);
    return response.data.items;
  }
);

export const artistsSlice = createSlice({
  name: "artistsInfo",
  initialState,
  reducers: {
    selectArtist: (state, action: PayloadAction<IArtist>) => {
      state.selectedArtist = action.payload;
      state.selectedAlbum = null;
    },
    selectAlbum: (state, action: PayloadAction<IAlbum>) => {
      state.selectedAlbum = action.payload;
    },
    resetSearch: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsAsync.pending, (state) => {
        state.status = "searching";
      })
      .addCase(fetchArtistsAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { selectArtist, selectAlbum, resetSearch } = artistsSlice.actions;

//  Selectors go here. Move to separate file if there are too many of them
export const selectSelectedArtist = (state: RootState) =>
  state.artistsInfo.selectedArtist;
export const selectSelectedAlbum = (state: RootState) =>
  state.artistsInfo.selectedAlbum;
export const selectStatus = (state: RootState) => state.artistsInfo.status;

export default artistsSlice.reducer;
