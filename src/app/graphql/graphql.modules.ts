import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DefaultOptions } from 'apollo-client';
import { CommonServicesService } from '@core/services/common-services.service'
// import { environment } from '../../environments/environment';

import { environment } from '@env/environment';
import { GlobalServiceService } from '@core/services/handlers/global-service.service';
import { onError } from 'apollo-link-error';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphqlModule {
  envWcaApi: any = environment.wcaapiurl;
  envApi: any = environment.apiUrl;
  envApiImg: any = environment.apiUrlImg;
  envCourseApi: any = environment.createCourseApi;
  constructor(apollo: Apollo, httpLink: HttpLink, private gs: GlobalServiceService, private httpC: HttpClient, 
    private services : CommonServicesService) {
    const http = httpLink.create({ uri: this.envApi + 'graphql' });
    const middleware = new ApolloLink((operation, forward) => {

      // Check for token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibHhwYWRtaW4iLCJyb2xlIjoiYWRtaW
      // 4iLCJ1c2VyX2lkIjoiMTIzNGFiIiwic2VjX2tleSI6IjEyM0FhIUAjIiwiaWF0IjoxNTk4NDUwMjk3LCJleHAiOjE1OTg0NzE4OTcsImlzcyI6Imh
      // 0dHBzOi8vd3d3LmxhcnNlbnRvdWJyby5jb20vIn0.y9YcBFZc43QtAP2Wep7rSI1wHtIMkTBeseAb-n0qvpc'
      if (!token) { return forward(operation); }

      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          token,
        ),
      });
      return forward(operation);
    });

    const Errlink = onError(({ graphQLErrors, networkError, response, operation }) => {
      // console.log(operation);
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          if (message.includes('TokenExpiredError') || message.includes('JsonWebTokenError')) {
            localStorage.clear();
            this.services.getIpAddressByUrl();
            this.gs.checkLogout();
          }
        }
        );
      }
      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    const link = middleware.concat(http);

    apollo.create({
      link: Errlink.concat(link),
      cache: new InMemoryCache({
        addTypename: false
      }),
      defaultOptions,
    });
  }
}

