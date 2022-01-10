export interface IAlbum {
  id: string;
  name: string;
  total_tracks: number;
  images: IAlbumImage[];
}

export interface IAlbumImage {
  url: string;
}
