/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/Signin`; params?: Router.UnknownInputParams; } | { pathname: `/Signup`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownInputParams; } | { pathname: `/components/FileUpload`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/Signin`; params?: Router.UnknownOutputParams; } | { pathname: `/Signup`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownOutputParams; } | { pathname: `/components/FileUpload`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/Signin${`?${string}` | `#${string}` | ''}` | `/Signup${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/Home${`?${string}` | `#${string}` | ''}` | `/Home${`?${string}` | `#${string}` | ''}` | `/components/FileUpload${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/Signin`; params?: Router.UnknownInputParams; } | { pathname: `/Signup`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/Home` | `/Home`; params?: Router.UnknownInputParams; } | { pathname: `/components/FileUpload`; params?: Router.UnknownInputParams; };
    }
  }
}
