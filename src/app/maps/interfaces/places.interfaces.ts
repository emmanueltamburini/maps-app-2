export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:                   string;
  type:                 string;
  place_type:           string[];
  relevance:            number;
  properties:           Properties;
  text_es:              string;
  language_es:          Language;
  place_name_es:        string;
  text:                 string;
  language:             Language;
  place_name:           string;
  bbox:                 number[];
  center:               number[];
  geometry:             Geometry;
  context:              Context[];
  matching_text?:       string;
  matching_place_name?: string;
}

export interface Context {
  id:          ID;
  short_code:  ShortCode;
  wikidata:    Wikidata;
  text_es:     Text;
  language_es: Language;
  text:        Text;
  language:    Language;
}

export enum ID {
  Country8945 = "country.8945",
  Region17649 = "region.17649",
  Region197873 = "region.197873",
}

export enum Language {
  Es = "es",
}

export enum ShortCode {
  Ve = "ve",
  VeE = "VE-E",
  VeL = "VE-L",
}

export enum Text {
  Barinas = "Barinas",
  Mérida = "Mérida",
  Venezuela = "Venezuela",
}

export enum Wikidata {
  Q165582 = "Q165582",
  Q43271 = "Q43271",
  Q717 = "Q717",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  wikidata: string;
}
