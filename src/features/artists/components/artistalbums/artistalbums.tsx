import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  fetchArtistAlbumsAsync,
  selectAlbum,
  selectSelectedArtist,
} from "features/artists/artistsSlice";
import { IAlbum } from "interface/album";
import React, { useEffect, useState } from "react";

export default function ArtistAlbums() {
  const selectedArtist = useAppSelector(selectSelectedArtist);
  // const [loading, setloading] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAlbums = async () => {
      if (selectedArtist) {
        const albums = await dispatch(
          fetchArtistAlbumsAsync(selectedArtist.id)
        ).unwrap();
        setAlbums(albums);
      } else {
        setAlbums([]);
      }
    };
    fetchAlbums();
  }, [selectedArtist, dispatch]);

  return (
    <>
      {selectedArtist ? (
        <>
          <h5 className="text-white text-xl md:text-3xl text-left border-b border-slate-500 pb-2 my-6">
            Search Results for "{selectedArtist.name}"
          </h5>
          <AlbumsSlider albums={albums} />
        </>
      ) : null}
    </>
  );
}

export interface IAlbumsSlider {
  albums: IAlbum[];
}

const AlbumsSlider = ({ albums }: IAlbumsSlider) => {
  const dispatch = useAppDispatch();

  const handleAlbumClick = (album: IAlbum) => {
    dispatch(selectAlbum(album));
  };
  return (
    <>
      <p className="text-cyan-600 text-2xl text-left">ALBUMS</p>
      <div className="flex justify-start overflow-x-auto mt-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            handleClick={handleAlbumClick}
          />
        ))}
      </div>
    </>
  );
};

interface IAlbumCard {
  album: IAlbum;
  handleClick: (album: IAlbum) => void;
}

const AlbumCard = ({ album, handleClick }: IAlbumCard) => {
  const image = album.images[0].url;
  return (
    <button
      className="text-cyan-600 mr-6 mb-6 flex-none flex group"
      onClick={() => handleClick(album)}
    >
      <div className="" style={{ maxWidth: "200px" }}>
        <img
          className="object-cover"
          src={image}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <p className="my-2 text-xl">{album.name}</p>
        <p className="invisible group-hover:visible text-xs">
          Click for more info
        </p>
      </div>
    </button>
  );
};
