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
        "no-console": 0,
        "no-alert": 0,
        "prettier/prettier": [
            "error",
            {"singleQuote": true}
        ]
    }
};
