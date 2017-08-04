module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
				"mocha": true
    },
    "extends": [
			"eslint:recommended",
			"plugin:import/recommended"
		],
    "rules": {
        // possible errors
        "no-console": ["error", { allow: ["warn", "error"] }],

        // best practices
        "block-scoped-var": "error",
        "curly": "error",
        "default-case": "error",
        "dot-location": ["warn", "property"],
        "dot-notation": ["error", { "allowKeywords": true }],
        "eqeqeq": ["error", "smart"],
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-empty-function": "error",
        "no-empty-pattern": "error",
        "no-eval": ["error", {"allowIndirect": true}],
        "no-extra-bind": "warn",
        "no-floating-decimal": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-magic-numbers": ["error", { "ignore": [0, -1, 1] }],
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-native-reassign": "error",
        "no-new-wrappers": "error",
        "no-new": "error",
        "no-octal": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "warn",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-warning-comments": "error",
        "no-with": "error",
        "radix": "error",
        "wrap-iife": ["error", "any"],
        "yoda": "error",

        // variables
        "no-catch-shadow": "error",
        "no-delete-var": "error",
        "no-shadow-restricted-names": "error",
        "no-shadow": "error",
        "no-undef-init": "error",
        "no-undef": "error",
        "no-undefined": "warn",
        "no-unused-vars": ["error", { "args": "none" }],
        "no-use-before-define": "error",

        // node.js and commonjs
        "no-path-concat": "error",

        // ecmascript 6
        "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        "arrow-spacing": "error",
        "no-duplicate-imports": ["error", { "includeExports": true }],
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "prefer-template": "warn",
        "rest-spread-spacing": ["error", "never"],
        "template-curly-spacing": "error",

        // stylistic issues
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
        "brace-style": "error",
        "camelcase": "error",
        "comma-dangle": ["error", "never"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "computed-property-spacing": ["error", "never"],
        "func-names": ["error", "never"],
        "func-style": ["error", "expression"],
        "indent": ["error", "tab", { "SwitchCase": 1 }],
        "key-spacing": "error",
        "keyword-spacing": "error",
        "max-len": ["error", { "code": 200, "ignoreUrls": true }],
        "new-cap": ["error", { "capIsNew": false }],
        "new-parens": "error",
        "no-array-constructor": "error",
        "no-lonely-if": "error",
        "no-mixed-operators": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multiple-empty-lines": "error",
        "no-spaced-func": "error",
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
        "operator-linebreak": ["warn", "after"],
        "quote-props": ["error", "consistent"],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "semi-spacing": "error",
        "semi": ["error", "always"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "spaced-comment": ["error", "always"],

				// mocha rules
        "mocha/no-exclusive-tests": "error",
        "mocha/no-skipped-tests": "warn",
        "mocha/no-pending-tests": "warn",
        "mocha/handle-done-callback": "error",
        "mocha/no-global-tests": "error",
        "mocha/no-sibling-hooks": "error",

				// import rules
				"import/unambiguous": "off",
    },
		plugins: [
			"mocha",
			"import"
		],
		settings: {
			'import/ignore': [
				'node_modules'
			],
			'import/extensions': ['.js'],
			'import/resolver': {
				node: {
					extensions: ['.js', '.json']
				}
			}
		}
};
