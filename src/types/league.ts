export type League = {
  id: number,
  name: string,
  slug: string,
};

export type NewLeague = Omit<League, "id">;
