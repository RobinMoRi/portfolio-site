import api from "./api";

export type GeoLocation = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    isolated_dwelling?: string;
    city_district?: string;
    city: string;
    municipality: string;
    county: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
};

export async function fetchLocationFromLongLat({
  long,
  lat,
  client = false,
}: {
  long: string;
  lat: string;
  client?: boolean;
}): Promise<GeoLocation> {
  return api.fetchApi<GeoLocation>({
    path: api.LOCATION(long, lat),
    method: "GET",
    client,
  });
}
