import artistsReducer, { ArtistsState, selectArtist } from "./artistsSlice";

const dummyArtist = { name: "ashfaq", id: "13456" };

describe("counter reducer", () => {
  const initialState: ArtistsState = {
    selectedArtist: null,
    selectedAlbum: null,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(artistsReducer(undefined, { type: "unknown" })).toEqual({
      selectedArtist: null,
      selectedAlbum: null,
      status: "idle",
    });
  });

  it("should handle artist selection", () => {
    const actual = artistsReducer(initialState, selectArtist(dummyArtist));
    expect(actual.selectedArtist).toEqual(dummyArtist);
  });

  it("should handle artist selection", () => {
    const actual = artistsReducer(initialState, selectArtist(dummyArtist));
    expect(actual.selectedAlbum).toEqual(null);
  });
});
