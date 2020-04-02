import { NgModule,isDevMode  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DefaultOptions } from 'apollo-client/ApolloClient';
import { environment } from '../../environments/environment';
// import { environment } from '@env/environment'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    if (isDevMode()) {
      apollo.create({
        link: httpLink.create({ uri: environment.apiUrl + 'graphql'}),
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
      });
    } else {
      
    }
   
  }
}
