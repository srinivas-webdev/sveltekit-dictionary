export type Phrase = {
  name: string;
  type: string;
  meanings: {
    [key: string]: string[]
  };
  relatedWords?: string []
};