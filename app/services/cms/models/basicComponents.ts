export type Image = {
  url?: string;
  presentational?: boolean;
  data?: {
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText: string | null;
      ext: ".png";
    };
  };
};

export type Link = {
  url: string;
  text: string;
};
