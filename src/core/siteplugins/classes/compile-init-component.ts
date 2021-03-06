// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { CoreSitePluginsProvider } from '../providers/siteplugins';

/**
 * Base class for components that will display a component using core-compile-html and want to call a
 * componentInit function returned by the handler JS.
 */
export class CoreSitePluginsCompileInitComponent {
    content = ''; // Content.
    jsData: any; // Data to pass to the component.
    protected handlerSchema: any; // The handler data.

    constructor(protected sitePluginsProvider: CoreSitePluginsProvider) { }

    /**
     * Function called when the component is created.
     *
     * @param {any} instance The component instance.
     */
    componentCreated(instance: any): void {
        // Check if the JS defined an init function.
        if (instance && this.handlerSchema && this.handlerSchema.methodJSResult &&
                this.handlerSchema.methodJSResult.componentInit) {
            this.handlerSchema.methodJSResult.componentInit.apply(instance);
        }
    }

    /**
     * Get the handler data.
     *
     * @param {string} name The name of the handler.
     */
    getHandlerData(name: string): void {
        // Retrieve the handler data.
        const handler = this.sitePluginsProvider.getSitePluginHandler(name);

        this.handlerSchema = handler && handler.handlerSchema;

        if (this.handlerSchema) {
            // Load first template.
            if (this.handlerSchema.methodTemplates && this.handlerSchema.methodTemplates.length) {
                this.content = handler.handlerSchema.methodTemplates[0].html;
            }
        }
    }
}
