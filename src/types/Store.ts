import { CrewsMap } from "./CrewMap";
import { WorksMap } from "./WorksMap";

export interface StoreType {
    type: string;
    data: CrewsMap | WorksMap;
}