import { Position } from "@/interfaces/player.interface";

export const playerSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "number", "position"],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required",
            },
            number: {
                bsonType: "int",
                description: "'number' is required"
            },
            position: {
                bsonType: "string",
                description: "'position' is required",
                enum: [Position.PointGuard, Position.ShootingGuard, Position.SmallForward, Position.PowerForward, Position.Center],
            },
        },
    },
};
