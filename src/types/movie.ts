export interface Movie {
  id: string;
  title: string;
  category: 'Film' | 'Cartoon' | 'Tv Series' | 'Anime' | 'Tv shows';
  videoUrl: string;
  subtitleUrl: string;
  thumbnailUrl: string;
  uploadedAt: number;
}
