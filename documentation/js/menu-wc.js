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
                                            'data-target="#components-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' : 'data-target="#xs-components-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' :
                                            'id="xs-components-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' }>
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
                                        'data-target="#injectables-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' : 'data-target="#xs-injectables-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' :
                                        'id="xs-injectables-links-module-AppModule-347feca3d215e3e5f78c8b8e949e9cf99ca32a63e14043199e303c7201ae034eab8ddb43b0841a79cce1691b90b3059aded6acf7e48ceda5a7d7be0cf1b00bbb"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleAnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAnalyticsService</a>
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
                                            'data-target="#components-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' : 'data-target="#xs-components-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' :
                                            'id="xs-components-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
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
                                        'data-target="#directives-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' : 'data-target="#xs-directives-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' :
                                        'id="xs-directives-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
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
                                            'data-target="#pipes-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' : 'data-target="#xs-pipes-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' :
                                            'id="xs-pipes-links-module-CoreModule-eed2ad04645412daad2f92ab2e0057490e4e37f5d2cfad3e6209e08fbedca4590e4878fa655dd52ea038eaf227ff3c6377686e4add9a55e3263023081930bfca"' }>
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
                                            'data-target="#components-links-module-KnowledgeresourcesModule-2f32dc9d8d5ce74b04b784daa7fe40424c1095bb21f7ca31e861e45480612810fb84ad6535242b03f615941dd1beb6f7190300713618e4474a46d847197d88ac"' : 'data-target="#xs-components-links-module-KnowledgeresourcesModule-2f32dc9d8d5ce74b04b784daa7fe40424c1095bb21f7ca31e861e45480612810fb84ad6535242b03f615941dd1beb6f7190300713618e4474a46d847197d88ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KnowledgeresourcesModule-2f32dc9d8d5ce74b04b784daa7fe40424c1095bb21f7ca31e861e45480612810fb84ad6535242b03f615941dd1beb6f7190300713618e4474a46d847197d88ac"' :
                                            'id="xs-components-links-module-KnowledgeresourcesModule-2f32dc9d8d5ce74b04b784daa7fe40424c1095bb21f7ca31e861e45480612810fb84ad6535242b03f615941dd1beb6f7190300713618e4474a46d847197d88ac"' }>
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
                                <a href="modules/LearnerModule.html" data-type="entity-link" >LearnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LearnerModule-df16dc6e87e2c84cf42bcf0cb0cfa40e03cb916b3bfd7adefbb52a41e16f734469770e04952863b9119fcaec8ca268d8cd93278242a67cec1fff9b909d4ef6ab"' : 'data-target="#xs-components-links-module-LearnerModule-df16dc6e87e2c84cf42bcf0cb0cfa40e03cb916b3bfd7adefbb52a41e16f734469770e04952863b9119fcaec8ca268d8cd93278242a67cec1fff9b909d4ef6ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LearnerModule-df16dc6e87e2c84cf42bcf0cb0cfa40e03cb916b3bfd7adefbb52a41e16f734469770e04952863b9119fcaec8ca268d8cd93278242a67cec1fff9b909d4ef6ab"' :
                                            'id="xs-components-links-module-LearnerModule-df16dc6e87e2c84cf42bcf0cb0cfa40e03cb916b3bfd7adefbb52a41e16f734469770e04952863b9119fcaec8ca268d8cd93278242a67cec1fff9b909d4ef6ab"' }>
                                            <li class="link">
                                                <a href="components/ForbiddenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForbiddenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermsconditionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermsconditionsComponent</a>
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
                                            'data-target="#components-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' : 'data-target="#xs-components-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' :
                                            'id="xs-components-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' }>
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
                                            'data-target="#pipes-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' : 'data-target="#xs-pipes-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' :
                                            'id="xs-pipes-links-module-LoginModule-5070f957832f90f77db047cf3ede40d2bb6a1ec41c540ccb1b0958a4d0c445d0b80166b92c348bad7b813eed58833cf0abdbdf1d25fca2e1f68314f3219a42e5"' }>
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
                                            'data-target="#components-links-module-MycoursesModule-15fdb5df329a11b28fd4d5eb608986767e665703eaccddde4bcecde604827412a659529bb6ebcdf9c3cb1ccb3f28bddde736ee2426f0df183a629f22f74c8b47"' : 'data-target="#xs-components-links-module-MycoursesModule-15fdb5df329a11b28fd4d5eb608986767e665703eaccddde4bcecde604827412a659529bb6ebcdf9c3cb1ccb3f28bddde736ee2426f0df183a629f22f74c8b47"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MycoursesModule-15fdb5df329a11b28fd4d5eb608986767e665703eaccddde4bcecde604827412a659529bb6ebcdf9c3cb1ccb3f28bddde736ee2426f0df183a629f22f74c8b47"' :
                                            'id="xs-components-links-module-MycoursesModule-15fdb5df329a11b28fd4d5eb608986767e665703eaccddde4bcecde604827412a659529bb6ebcdf9c3cb1ccb3f28bddde736ee2426f0df183a629f22f74c8b47"' }>
                                            <li class="link">
                                                <a href="components/ActivitiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AskQuestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AskQuestionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssignmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarActivityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarActivityComponent</a>
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
                                                <a href="components/LearnerNewMyCourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LearnerNewMyCourseComponent</a>
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
                                <a href="components/TermsconditionsComponent.html" data-type="entity-link" >TermsconditionsComponent</a>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomEventTitleFormatter.html" data-type="entity-link" >CustomEventTitleFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocketioService.html" data-type="entity-link" >SocketioService</a>
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
                                    <a href="injectables/MockServiceService.html" data-type="entity-link" >MockServiceService</a>
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
                            <li class="link">
                                <a href="guards/LearnermycourseService.html" data-type="entity-link" >LearnermycourseService</a>
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