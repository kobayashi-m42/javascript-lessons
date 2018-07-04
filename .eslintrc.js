module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "document": true,
        "window": true,
        "alert": true,
        "fetch": true,
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {"singleQuote": true}
        ]
    }
};
