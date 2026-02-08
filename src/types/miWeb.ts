export interface MiWeb {
  header: {
    title: string;
    textColor: string;
    textFamily: string;
    backgroundColor: string;
  };
  cards: {
  count: number,
  backgroundColor: string,
  textColor: string,
  textFamily: string,
  textAlign: "start" | "center" | "end",
  items: Array<{
    title: string
    description: string
    imageUrl?: string
  }>
};

}
