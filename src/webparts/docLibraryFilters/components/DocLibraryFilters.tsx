import * as React from 'react';
import styles from './DocLibraryFilters.module.scss';
import { IDocLibraryFiltersProps } from './IDocLibraryFiltersProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  SPHttpClient,
  SPHttpClientBatch,
  SPHttpClientResponse, SPHttpClientConfiguration
} from '@microsoft/sp-http';
import Switch from "react-switch";

import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ISPList {
  Title: string;
  Id: string;
  Desc: string;
}

export interface ISPLists {
  value: ISPList[];
}

export default class DocLibraryFilters extends React.Component<IDocLibraryFiltersProps, {}> {




  public state: IDocLibraryFiltersProps;

  constructor(props, context) {
    super(props, context);
    this.state = {
      LicenseData: [],
      itemDescription: "",
      HtmlGrid: "",
      spHttpClient: this.props.spHttpClient,
      siteUrl: this.props.siteUrl,
      checked: false,
      price: 0,
      SearchItem: "",
      ColorYellowCheck: false,
      ColorRedCheck: false,
      ColorGreenCheck: false,
      SizeGreenCheck: true,
      SizeYelloCheck: true,
      SizeRedCheck: true,
    }

    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');
    this.handleChange = this.handleChange.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.handleChangeColorRed = this.handleChangeColorRed.bind(this);
    this.handleChangeColorYelllo = this.handleChangeColorYelllo.bind(this);
    this.handleChangeColorGreen = this.handleChangeColorGreen.bind(this);
    this.handleChangeSizeRed = this.handleChangeSizeRed.bind(this);
    this.handleChangeSizeYello = this.handleChangeSizeYello.bind(this);
    this.handleChangeSizeGreen = this.handleChangeSizeGreen.bind(this);
  }

  public handleChange(checked) {
    this.setState({ checked });
  }

  public handleChangeColorRed(ColorRedCheck) {
    this.setState({ ColorRedCheck });
    if (ColorRedCheck==true){
      const tempvlaue:string='&$select=ID,Title,Colors,Size,Price&$filter=Colors eq'+ "'Red'";
      this._getListDatafilter(tempvlaue).then((response) => {
        this._renderList(response.value);
      });
    }else
    this._getListData().then((response) => {
      this._renderList(response.value);
    });
  }

  public handleChangeColorYelllo(ColorYellowCheck) {
    this.setState({ ColorYellowCheck });
  }
  public handleChangeColorGreen(ColorGreenCheck) {
    this.setState({ ColorGreenCheck });
  }
  public handleChangeSizeRed(SizeRedCheck) {
    this.setState({ SizeRedCheck });
  }
  public handleChangeSizeYello(SizeYelloCheck) {
    this.setState({ SizeYelloCheck });
  }
  public handleChangeSizeGreen(SizeGreenCheck) {
    this.setState({ SizeGreenCheck });
  }


 

  public onChangeSearch(event: any): void {
    this.setState({ SearchItem: event.target.value });
    const tempvlaue:string='&$select=ID,Title,Colors,Size,Price&$filter=Title eq'+ "'"+event.target.value+"'";
    this._getListDatafilter(tempvlaue).then((response) => {
      this._renderList(response.value);
    });
  }
  public render(): React.ReactElement<IDocLibraryFiltersProps> {
    return (
      <div className={styles.container}>
        <div className="container">
          <div className="col-sm-2" >
            <h1>Colors</h1>
            <Switch
              onChange={this.handleChangeColorRed}
              checked={this.state.ColorRedCheck}
              id="RedCheck"
            /> (1) Red
            <br></br>
            <Switch
              onChange={this.handleChangeColorYelllo}
              checked={this.state.ColorYellowCheck}
              id="YellowCheck"
            /> (2) Yellow
            <br></br>
            <Switch
              onChange={this.handleChangeColorGreen}
              checked={this.state.ColorGreenCheck}
              id="GreenCheck"
            /> (3) Green
            </div>

          <div className="col-sm-2" >
            <h1>Size</h1>
            <Switch
              onChange={this.handleChangeSizeRed}
              checked={this.state.SizeRedCheck}
              id="RedCheckSize"
            /> (1) Red
            <br></br>
            <Switch
              onChange={this.handleChangeSizeYello}
              checked={this.state.SizeYelloCheck}
              id="YellowCheck"
            /> (2) Yellow
            <br></br>
            <Switch
              onChange={this.handleChangeSizeGreen}
              checked={this.state.SizeGreenCheck}
              id="Green"
            /> (3) Green
          </div>
          <div className="col-sm-2" >
            <h1>Search</h1>
            <input type="text" value={this.state.SearchItem} onChange={this.onChangeSearch.bind(this)} />
            <br></br>
            <h1>Price</h1>
            <h4>
              {this.state.price}$
            </h4>
          </div>

          <div className="col-sm-2" >
            <h1>Product</h1>
            {this.state.HtmlGrid}
          </div>
        </div>


      </div>
    );
  }//render end

  private _getListDatafilter(filter): Promise<ISPLists> {
    const queryString: string = filter;
    console.log(queryString);
    return this.state.spHttpClient
      .get(`${this.state.siteUrl}/_api/web/lists/GetByTitle('Products')/items?${queryString}`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 404) {
          return [];
        } else {
          return response.json();
        }
      });
  }

  private _getListData(): Promise<ISPLists> {
    const queryString: string = 'Title,Colors,Size,Price';
    return this.state.spHttpClient
      .get(`${this.state.siteUrl}/_api/web/lists/GetByTitle('Products')/items?${queryString}`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 404) {
          return [];
        } else {
          return response.json();
        }
      });
  }
  private _renderList(items): void {

    this.setState({ LicenseData: items });
    var cnt:number=0;

    const self = this;
    var options = this.state.LicenseData.map(function (item, i) {      
      cnt=cnt+parseInt(item["Price"]);
      return <div>{item["Title"]}-{item["Colors"]}-{item["Size"]}-{item["Price"]}</div>

    });
    this.setState({ HtmlGrid: options });
    this.setState({ price:cnt   });


  }
  renderResultRows() {
    this._getListData().then((response) => {
      this._renderList(response.value);
    }).catch((err) => {

    });
  }
  componentDidMount() {
    this.setState({ price: 100 });

    if (this.state.spHttpClient == undefined || this.state.spHttpClient == null) { alert("Null") } else {
      this.renderResultRows();
    }

  }
}
