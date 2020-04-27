import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DefaultOptions } from 'apollo-client/ApolloClient';
import { environment } from '../../environments/environment';
import { ApolloLink } from 'apollo-link';
// import { environment } from '@env/environment';
import { GlobalServiceService} from '@core/services/handlers/global-service.service';
import { onError } from "apollo-link-error";

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
  constructor(apollo: Apollo, httpLink: HttpLink, private gs : GlobalServiceService) {
    const http = httpLink.create({ uri: environment.apiUrl + 'graphql' });
    const middleware = new ApolloLink((operation, forward) => {

      // Check for token
      const token = localStorage.getItem('token');
      if (!token) return forward(operation);

      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          token,
        ),
      });
      return forward(operation);
    });

    const Errlink = onError(({ graphQLErrors, networkError,response }) => {
      console.log(response)
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
         { console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          if(message == 'TokenExpiredError: jwt expired') {
            localStorage.clear();
            this.gs.checkLogout();
          }
        }
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const link = middleware.concat(http);

    apollo.create({
      link: Errlink.concat(link),
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
  }
}

