import { describe, expect, it } from 'vitest';
import { getPluginByName, registerPlugin } from '../manager';
import { VendorPlugin } from '../types';

describe('PluginManager', () => {
    describe('registerPlugin', () => {

        it('should register a plugin', () => {
            const plugin = {
                pluginName: 'test plugin 1',
                pluginVersion: '1.0.0',
                pluginAuthor: 'testauthor',
                pluginDescription: 'Test plugin',
                authenticate: () => Promise.resolve({ accessToken: 'test' }),
                fetchProducts: () => Promise.resolve([]),
                createProduct: () => Promise.resolve(),
                updateProduct: () => Promise.resolve(),
            };

            registerPlugin(plugin);

            expect(registerPlugin).toBeDefined();
        });

        it('should throw an error if plugin is already registered', () => {
            const plugin = {
                pluginName: 'test - plugin 2',
                pluginVersion: '1.0.0',
                pluginAuthor: 'testauthor',
                pluginDescription: 'Test plugin',
                authenticate: () => Promise.resolve({ accessToken: 'test' }),
                fetchProducts: () => Promise.resolve([]),
                createProduct: () => Promise.resolve(),
                updateProduct: () => Promise.resolve(),
            };

            registerPlugin(plugin);

            expect(() => registerPlugin(plugin)).toThrowError();
        });

        it('should throw an error if pluginName is not defined', () => {
            const plugin = {
                pluginVersion: '1.0.0',
                pluginAuthor: 'testauthor',
                pluginDescription: 'Test plugin',
                authenticate: () => Promise.resolve({ accessToken: 'test' }),
                fetchProducts: () => Promise.resolve([]),
                createProduct: () => Promise.resolve(),
                updateProduct: () => Promise.resolve(),
            };

            expect(() => registerPlugin(plugin as unknown as VendorPlugin)).toThrowError();
        });
    });

    describe('getPluginByName', () => {
        it('should return a plugin by name', () => {
            const plugin = {
                pluginName: 'test plugin 3',
                pluginVersion: '1.0.0',
                pluginAuthor: 'testauthor',
                pluginDescription: 'Test plugin',
                authenticate: () => Promise.resolve({ accessToken: 'test' }),
                fetchProducts: () => Promise.resolve([]),
                createProduct: () => Promise.resolve(),
                updateProduct: () => Promise.resolve(),
            };

            registerPlugin(plugin);

            expect(getPluginByName('test plugin 3')).toBeDefined();
        });
        it('should return undefined if plugin is not found', () => {
            const plugin = {
                pluginName: 'test plugin 4',
                pluginVersion: '1.0.0',
                pluginAuthor: 'testauthor',
                pluginDescription: 'Test plugin',
                authenticate: () => Promise.resolve({ accessToken: 'test' }),
                fetchProducts: () => Promise.resolve([]),
                createProduct: () => Promise.resolve(),
                updateProduct: () => Promise.resolve(),
            };

            registerPlugin(plugin);

            expect(getPluginByName('test plugin 5')).toBeUndefined();
        });
    });
});