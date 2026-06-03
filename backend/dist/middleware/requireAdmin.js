"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
// This file is deprecated. Use authMiddleware.ts instead.
// Re-exporting for backwards compatibility during transition.
var authMiddleware_1 = require("./authMiddleware");
Object.defineProperty(exports, "requireAuth", { enumerable: true, get: function () { return authMiddleware_1.requireAuth; } });
Object.defineProperty(exports, "requireAdmin", { enumerable: true, get: function () { return authMiddleware_1.requireAdmin; } });
