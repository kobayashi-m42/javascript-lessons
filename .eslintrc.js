module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "document": true,
        "window": true,
        "alert": true,
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {"singleQuote": true}
        ]
    }
};
