import { CommercyfyCoreActions } from "commercyfy-core-js/api";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      commercyfyConnection: CommercyfyCoreActions;
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
