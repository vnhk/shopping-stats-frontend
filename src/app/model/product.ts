import {Price} from "./price";

export class Product {
  name = "{Product_Name}";
  shop = "{SHOP}";
  offerLink: string = "{OFFER_LINK}"
  imgSrc: string | undefined;
  categories: string[] = [];
  minPrice: Price | undefined;
  avgPrice: number | undefined;
  maxPrice: Price | undefined;
  prices: Price[] = [];
}
