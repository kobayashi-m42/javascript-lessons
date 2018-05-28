module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "document": true,
        "window": true,
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {"singleQuote": true}
        ]
    }
};
