import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSonarJs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

// hacky combination of normal and react lint rules
/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["./src/**/*.{js,mjs,cjs,ts,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    eslintPluginPrettierRecommended,
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginUnicorn.configs["flat/recommended"],
    {
        plugins: {
            "simple-import-sort": eslintPluginSimpleImportSort,
            sonarjs: eslintPluginSonarJs,
            "unused-imports": eslintPluginUnusedImports,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            quotes: ["error", "double"],
            semi: ["error", "always"],
            indent: "off",
            "linebreak-style": ["error", "unix"],
            "unicorn/prefer-spread": "off",
            "unicorn/expiring-todo-comments": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "no-unused-vars": "off",
            "sonarjs/cognitive-complexity": ["error", 15],
            "no-var": "error",
            "prefer-arrow-callback": "warn",
            "prefer-const": "error",
            "no-useless-return": "warn",
            "padding-line-between-statements": [
                "error",
                {
                    blankLine: "always",
                    prev: "*",
                    next: ["return", "if", "switch", "try", "for"],
                },
                {
                    blankLine: "always",
                    prev: ["if", "switch", "try", "const", "let"],
                    next: "*",
                },
                {
                    blankLine: "any",
                    prev: ["const", "let"],
                    next: ["const", "let"],
                },
            ],
            "object-curly-spacing": ["error", "always"],
            "unicorn/filename-case": "off",
            "unicorn/prefer-at": "off",
            "unicorn/no-array-callback-reference": "off",
            "unicorn/prefer-module": "off",
            "no-nested-ternary": "off",
            "no-unneeded-ternary": "warn",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
            "unicorn/no-array-reduce": "off",
            eqeqeq: "error",
            "prefer-destructuring": "off",
            "unicorn/no-nested-ternary": "off",
            "sonarjs/no-nested-template-literals": "off",
            "unicorn/no-useless-undefined": "off",
            "unicorn/no-null": "off",
            "unicorn/consistent-destructuring": "off",
            "unicorn/no-await-expression-member": "off",
            "sonarjs/no-duplicate-string": ["error", { threshold: 8 }],
            "unicorn/prevent-abbreviations": [
                "error",
                {
                    checkFilenames: false,
                },
            ],
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
];
