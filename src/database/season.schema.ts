export const seasonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name"],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required",
            },
        },
    },
};
