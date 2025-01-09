import { isArray, isPlainObject, mergeWith } from 'lodash-es';

export function mergeOverride(a: object, b: object): void {
    mergeWith(a, b, (objValue, srcValue) => {
        if (isArray(srcValue)) {
            return srcValue;
        }
        if (!isPlainObject(objValue) && isPlainObject(srcValue)) {
            return srcValue;
        }
    });
}
