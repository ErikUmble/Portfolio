import type { ConcreteComponent, DefineComponent, Raw } from "vue";

export default interface Output {
    component :  string;
    props : Record<string, any>;
}