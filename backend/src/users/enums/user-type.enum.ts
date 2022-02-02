import { registerEnumType } from "@nestjs/graphql";

export enum UserType {
    Basic,
    Extended,
    Advanced,
}
registerEnumType(UserType, {
    name: 'UserType',
    description: 'Level of authorization',
    valuesMap: {
        Basic: {
            description: 'Persoms inspections',
        },
        Extended: {
            description: 'Basic + pair / un-pair',
        },
        Advanced: {
            description: 'Extended + create, edit & remove users',
        },
    },
});