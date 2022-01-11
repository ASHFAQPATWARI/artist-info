import React from "react";
import Albuminfo from "./components/albuminfo/albuminfo";
import ArtistAlbums from "./components/artistalbums/artistalbums";
import SearchArtists from "./components/search/search";

// Rendering the components here directly without conditions to showcase redux selectors inside individual component
export function Artists() {
  return (
    <div>
      <SearchArtists />
      <ArtistAlbums />
      <Albuminfo />
    </div>
  );
}
