'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lxpfrontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' : 'data-target="#xs-components-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' :
                                            'id="xs-components-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' }>
                                            <li class="link">
                                                <a href="components/AlertComponentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KnowledgePreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KnowledgePreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RedirectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedirectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' : 'data-target="#xs-injectables-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' :
                                        'id="xs-injectables-links-module-AppModule-5aeda2859de7715192debf3d8289f3bd0638164c5dc711875bf1773a22e4f4f2217e4a4a50df7dcb75ee06c20c3fe1401ba00ff7a53333d6b569efbd382211d2"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleAnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAnalyticsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SocketioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocketioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' : 'data-target="#xs-components-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' :
                                            'id="xs-components-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                            <li class="link">
                                                <a href="components/AudioPlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AudioPlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfreaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdfreaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarNotificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ToolbarNotificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideoPlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoPlayerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' : 'data-target="#xs-directives-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' :
                                        'id="xs-directives-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                        <li class="link">
                                            <a href="directives/CapslockDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapslockDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DragDropImageDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DragDropImageDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StickyHeaderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StickyHeaderDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' : 'data-target="#xs-pipes-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' :
                                            'id="xs-pipes-links-module-CoreModule-a7466be2c02d9ae8552e12ebf35dcea6e4e3bbf14c5a050c7a27026f7494bd0e7af0efd935120034bd230c0558c78933f72ad0c2286f6a4fe4dd18bfe85c09d2"' }>
                                            <li class="link">
                                                <a href="pipes/SearchPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GraphqlModule.html" data-type="entity-link" >GraphqlModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KnowledgeresourcesModule.html" data-type="entity-link" >KnowledgeresourcesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KnowledgeresourcesModule-b648987400229f31180d2f0760a22aaf5cb06defed6100801cc9f227d50861f3cd25fc7d3e0ae68251171e8d37c73b1454c255b5b9b89340471cd7244b69bcf9"' : 'data-target="#xs-components-links-module-KnowledgeresourcesModule-b648987400229f31180d2f0760a22aaf5cb06defed6100801cc9f227d50861f3cd25fc7d3e0ae68251171e8d37c73b1454c255b5b9b89340471cd7244b69bcf9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KnowledgeresourcesModule-b648987400229f31180d2f0760a22aaf5cb06defed6100801cc9f227d50861f3cd25fc7d3e0ae68251171e8d37c73b1454c255b5b9b89340471cd7244b69bcf9"' :
                                            'id="xs-components-links-module-KnowledgeresourcesModule-b648987400229f31180d2f0760a22aaf5cb06defed6100801cc9f227d50861f3cd25fc7d3e0ae68251171e8d37c73b1454c255b5b9b89340471cd7244b69bcf9"' }>
                                            <li class="link">
                                                <a href="components/KnowledgeLandingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KnowledgeLandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KnowledgeResourceHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KnowledgeResourceHomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LandingPageModule.html" data-type="entity-link" >LandingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LandingPageModule-3c7c4a3915ef7eb5d60b3db2f3d44da4b8331f7abdefd576176b318b2a3b4fbfb935561f79f4187cd76c932731fcf831cbab9afb3f7a6ab4f7dd8205b6311e7d"' : 'data-target="#xs-components-links-module-LandingPageModule-3c7c4a3915ef7eb5d60b3db2f3d44da4b8331f7abdefd576176b318b2a3b4fbfb935561f79f4187cd76c932731fcf831cbab9afb3f7a6ab4f7dd8205b6311e7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LandingPageModule-3c7c4a3915ef7eb5d60b3db2f3d44da4b8331f7abdefd576176b318b2a3b4fbfb935561f79f4187cd76c932731fcf831cbab9afb3f7a6ab4f7dd8205b6311e7d"' :
                                            'id="xs-components-links-module-LandingPageModule-3c7c4a3915ef7eb5d60b3db2f3d44da4b8331f7abdefd576176b318b2a3b4fbfb935561f79f4187cd76c932731fcf831cbab9afb3f7a6ab4f7dd8205b6311e7d"' }>
                                            <li class="link">
                                                <a href="components/LearnerNewMyCourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LearnerNewMyCourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MycourseItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MycourseItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LearnerModule.html" data-type="entity-link" >LearnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LearnerModule-1e0d133fd7ee40c7ef09b7c2012c981dce7abaaa0f45ae1b0535df6a6872477e1a88710d38c14a01167a03ea9a45b4307528e7c30976750d2c7deab7b68f3382"' : 'data-target="#xs-components-links-module-LearnerModule-1e0d133fd7ee40c7ef09b7c2012c981dce7abaaa0f45ae1b0535df6a6872477e1a88710d38c14a01167a03ea9a45b4307528e7c30976750d2c7deab7b68f3382"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LearnerModule-1e0d133fd7ee40c7ef09b7c2012c981dce7abaaa0f45ae1b0535df6a6872477e1a88710d38c14a01167a03ea9a45b4307528e7c30976750d2c7deab7b68f3382"' :
                                            'id="xs-components-links-module-LearnerModule-1e0d133fd7ee40c7ef09b7c2012c981dce7abaaa0f45ae1b0535df6a6872477e1a88710d38c14a01167a03ea9a45b4307528e7c30976750d2c7deab7b68f3382"' }>
                                            <li class="link">
                                                <a href="components/ForbiddenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForbiddenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideoPreviewModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoPreviewModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAllnotificationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAllnotificationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' : 'data-target="#xs-components-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' :
                                            'id="xs-components-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetpasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetpasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' : 'data-target="#xs-pipes-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' :
                                            'id="xs-pipes-links-module-LoginModule-482897fd45fa663d265f7a4943bbca683845cd96eafb0a70db5c207a68036cb23f883c48bfc4bf0e864371fa489a9dc79d7cdbea338b50f8dcd6c93e56bfd23e"' }>
                                            <li class="link">
                                                <a href="pipes/MaskingPipePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaskingPipePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MycoursesModule.html" data-type="entity-link" >MycoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MycoursesModule-d3a722397be757fdd069e0e99d16e217a953c42e2b1d2859c396f809f9dec215b3e4eef63951a310c99c9b455179ef11398a20bd1f47198a87b2fa77e9e3d3fa"' : 'data-target="#xs-components-links-module-MycoursesModule-d3a722397be757fdd069e0e99d16e217a953c42e2b1d2859c396f809f9dec215b3e4eef63951a310c99c9b455179ef11398a20bd1f47198a87b2fa77e9e3d3fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MycoursesModule-d3a722397be757fdd069e0e99d16e217a953c42e2b1d2859c396f809f9dec215b3e4eef63951a310c99c9b455179ef11398a20bd1f47198a87b2fa77e9e3d3fa"' :
                                            'id="xs-components-links-module-MycoursesModule-d3a722397be757fdd069e0e99d16e217a953c42e2b1d2859c396f809f9dec215b3e4eef63951a310c99c9b455179ef11398a20bd1f47198a87b2fa77e9e3d3fa"' }>
                                            <li class="link">
                                                <a href="components/ActivitiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AskQuestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AskQuestionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarActivityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarActivityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseGalleryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseGalleryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoursedetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursedetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiscussionForumComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscussionForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InstructorLedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InstructorLedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerformancePageMobileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerformancePageMobileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProgressionReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressionReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectMobileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectMobileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionanswerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionanswerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuizReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpskillCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpskillCalendarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordModule.html" data-type="entity-link" >PasswordModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordRoutingModule.html" data-type="entity-link" >PasswordRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipeModule.html" data-type="entity-link" >PipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipeModule-c359a3a2d6693e536fdcb1fed1d2307502bee04a3d4c4794c42e881ad7f9a6b0d33bb51718df9ec00abccb85319e10f192c7152c466555cc2e15db73da12f91d"' : 'data-target="#xs-pipes-links-module-PipeModule-c359a3a2d6693e536fdcb1fed1d2307502bee04a3d4c4794c42e881ad7f9a6b0d33bb51718df9ec00abccb85319e10f192c7152c466555cc2e15db73da12f91d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipeModule-c359a3a2d6693e536fdcb1fed1d2307502bee04a3d4c4794c42e881ad7f9a6b0d33bb51718df9ec00abccb85319e10f192c7152c466555cc2e15db73da12f91d"' :
                                            'id="xs-pipes-links-module-PipeModule-c359a3a2d6693e536fdcb1fed1d2307502bee04a3d4c4794c42e881ad7f9a6b0d33bb51718df9ec00abccb85319e10f192c7152c466555cc2e15db73da12f91d"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterPipeWithoutUnique.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterPipeWithoutUnique</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterPipeforselect.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterPipeforselect</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SortPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SortPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AlertComponentComponent.html" data-type="entity-link" >AlertComponentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AudioPlayerComponent.html" data-type="entity-link" >AudioPlayerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/KnowledgePreviewComponent.html" data-type="entity-link" >KnowledgePreviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VideoPlayerComponent.html" data-type="entity-link" >VideoPlayerComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/CapslockDirective.html" data-type="entity-link" >CapslockDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/StickyHeaderDirective.html" data-type="entity-link" >StickyHeaderDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertServiceService.html" data-type="entity-link" >AlertServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonServicesService.html" data-type="entity-link" >CommonServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigsLoaderService.html" data-type="entity-link" >ConfigsLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDateFormatter.html" data-type="entity-link" >CustomDateFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDateFormatter-1.html" data-type="entity-link" >CustomDateFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomEventTitleFormatter.html" data-type="entity-link" >CustomEventTitleFormatter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalServiceService.html" data-type="entity-link" >GlobalServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsService.html" data-type="entity-link" >GoogleAnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/knowledgeService.html" data-type="entity-link" >knowledgeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LearnerServicesService.html" data-type="entity-link" >LearnerServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketioService.html" data-type="entity-link" >SocketioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link" >ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/FakeBackendInterceptor.html" data-type="entity-link" >FakeBackendInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/InterceptorService.html" data-type="entity-link" >InterceptorService</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/JwtInterceptor.html" data-type="entity-link" >JwtInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsLoggedInAuthGuard.html" data-type="entity-link" >IsLoggedInAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Configs.html" data-type="entity-link" >Configs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement.html" data-type="entity-link" >PeriodicElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/playback.html" data-type="entity-link" >playback</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/MaskingPipePipe.html" data-type="entity-link" >MaskingPipePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});