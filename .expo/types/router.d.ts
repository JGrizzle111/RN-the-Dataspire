/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/Login`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/armyLists` | `/armyLists`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/battlePlans` | `/battlePlans`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/Login`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/armyLists` | `/armyLists`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/battlePlans` | `/battlePlans`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/Login${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/armyLists${`?${string}` | `#${string}` | ''}` | `/armyLists${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/battlePlans${`?${string}` | `#${string}` | ''}` | `/battlePlans${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/Home${`?${string}` | `#${string}` | ''}` | `/Home${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/Login`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/armyLists` | `/armyLists`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/battlePlans` | `/battlePlans`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownInputParams; };
    }
  }
}
