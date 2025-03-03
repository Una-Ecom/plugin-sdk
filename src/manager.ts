import { VendorPlugin } from "./types";

const REGISTERED_PLUGINS: VendorPlugin[] = [];

/** Register a new plugin with the system */
export function registerPlugin(plugin: VendorPlugin) {
    if (!plugin.pluginName) {
        throw new Error('PluginName is required');
    }

    if (REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === plugin.pluginName.toLowerCase())) {
        throw new Error('Plugin already registered');
    }

    REGISTERED_PLUGINS.push(plugin);
}

/** Retrieve a plugin by name */
export function getPluginByName(name: string): VendorPlugin | undefined {
    return REGISTERED_PLUGINS.find((p) => p.pluginName.toLowerCase() === name.toLowerCase());
}
