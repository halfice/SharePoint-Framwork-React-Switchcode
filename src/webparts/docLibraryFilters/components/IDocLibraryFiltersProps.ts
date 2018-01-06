import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IDocLibraryFiltersProps {
  LicenseData:Array<string>[];
  itemDescription:string;
  HtmlGrid:string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  checked: false;
  price:number;
  SearchItem:string;
  ColorYellowCheck:false;
  ColorRedCheck:false;
  ColorGreenCheck:false;
  SizeGreenCheck:true;
  SizeYelloCheck:true;
  SizeRedCheck:true;

}
