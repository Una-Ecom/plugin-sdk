import { IVendorPlugin } from "./types";

const REGISTERED_PLUGINS: IVendorPlugin[] = [];

/** Register a new plugin with the system */
export function registerPlugin(plugin: IVendorPlugin) {
    if (!plugin.pluginName) {
        throw new Error('PluginName is required');
    }

    if (REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === plugin.pluginName.toLowerCase())) {
        throw new Error('Plugin already registered');
    }

    REGISTERED_PLUGINS.push(plugin);
}

/** Retrieve a plugin by name */
export function getPluginByName(name: string): IVendorPlugin | undefined {
    return REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === name.toLowerCase());
}
