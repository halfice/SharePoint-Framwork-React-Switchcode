import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DocLibraryFiltersWebPartStrings';
import DocLibraryFilters from './components/DocLibraryFilters';
import { IDocLibraryFiltersProps } from './components/IDocLibraryFiltersProps';


export default class DocLibraryFiltersWebPart extends BaseClientSideWebPart<IDocLibraryFiltersProps> {

  public render(): void {
    const element: React.ReactElement<IDocLibraryFiltersProps > = React.createElement(
      DocLibraryFilters,
      {
        itemDescription:"234",
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
