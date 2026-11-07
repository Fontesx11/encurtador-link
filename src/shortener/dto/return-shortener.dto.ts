import { Link } from "../entities/link.entity";

export class ShortenerLinkResponseDto {
   original_link: string
   short_code: string
   clicks: number

  constructor(link: Link) {
    this.original_link = link.originalLink;
    this.short_code = link.shortCode;
    this.clicks = link.clickCount;
   
  }
}

export interface ShortenResponse {
  short_url: string
  original_url: string
}

export interface MessageResponse {
  message: string
}
