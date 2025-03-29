import { Plugin } from "./types";

const REGISTERED_PLUGINS: Plugin.IVendorPlugin[] = [];

/** Register a new plugin with the system */
export function registerPlugin(plugin: Plugin.IVendorPlugin) {
    if (!plugin.pluginName) {
        throw new Error('PluginName is required');
    }

    if (REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === plugin.pluginName.toLowerCase())) {
        throw new Error('Plugin already registered');
    }

    REGISTERED_PLUGINS.push(plugin);
}

/** Retrieve a plugin by name */
export function getPluginByName(name: string): Plugin.IVendorPlugin | undefined {
    return REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === name.toLowerCase());
}
