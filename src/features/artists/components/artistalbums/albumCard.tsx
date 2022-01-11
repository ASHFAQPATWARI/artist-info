import { IAlbum } from "interface/album";
import React from "react";

export interface IAlbumCard {
  album: IAlbum;
  handleClick: (album: IAlbum) => void;
}

/**
 * Component to render Album information in a card
 * @param {IAlbum} album
 * @param {Function} Callback when card is clicked
 */
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

export default AlbumCard;
