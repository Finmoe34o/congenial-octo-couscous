/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/route.ts":
/*!*******************************!*\
  !*** ./app/api/user/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/auth */ \"(rsc)/./app/lib/auth.ts\");\n\n\nasync function GET(request) {\n    try {\n        // Get the current user\n        const user = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)(request);\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Return the user without the password\n        const { password, ...userWithoutPassword } = user;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(userWithoutPassword);\n    } catch (error) {\n        console.error(\"Error getting user:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An unexpected error occurred\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBQ1I7QUFFekMsZUFBZUUsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLHVCQUF1QjtRQUN2QixNQUFNQyxPQUFPLE1BQU1ILHlEQUFjQSxDQUFDRTtRQUNsQyxJQUFJLENBQUNDLE1BQU07WUFDVCxPQUFPSixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFlLEdBQ3hCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSx1Q0FBdUM7UUFDdkMsTUFBTSxFQUFFQyxRQUFRLEVBQUUsR0FBR0MscUJBQXFCLEdBQUdMO1FBRTdDLE9BQU9KLHFEQUFZQSxDQUFDSyxJQUFJLENBQUNJO0lBQzNCLEVBQUUsT0FBT0gsT0FBTztRQUNkSSxRQUFRSixLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPTixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQStCLEdBQ3hDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcYXBpXFx1c2VyXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGdldEN1cnJlbnRVc2VyIH0gZnJvbSBcIi4uLy4uL2xpYi9hdXRoXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCB1c2VyXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIocmVxdWVzdCk7XHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gUmV0dXJuIHRoZSB1c2VyIHdpdGhvdXQgdGhlIHBhc3N3b3JkXHJcbiAgICBjb25zdCB7IHBhc3N3b3JkLCAuLi51c2VyV2l0aG91dFBhc3N3b3JkIH0gPSB1c2VyO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXNlcldpdGhvdXRQYXNzd29yZCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIHVzZXI6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRDdXJyZW50VXNlciIsIkdFVCIsInJlcXVlc3QiLCJ1c2VyIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwicGFzc3dvcmQiLCJ1c2VyV2l0aG91dFBhc3N3b3JkIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/auth.ts":
/*!*************************!*\
  !*** ./app/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePasswords: () => (/* binding */ comparePasswords),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signJWT: () => (/* binding */ signJWT),\n/* harmony export */   verifyJWT: () => (/* binding */ verifyJWT)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"(rsc)/./app/lib/storage.ts\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! util */ \"util\");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst scryptAsync = (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(crypto__WEBPACK_IMPORTED_MODULE_2__.scrypt);\n// Function to sign a new JWT\nasync function signJWT(payload) {\n    if (!process.env.JWT_SECRET) {\n        throw new Error(\"JWT_SECRET environment variable is not set\");\n    }\n    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);\n    const token = await new jose__WEBPACK_IMPORTED_MODULE_4__.SignJWT(payload).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\") // 7 days expiration\n    .sign(secretKey);\n    return token;\n}\n// Function to verify a JWT\nasync function verifyJWT(token) {\n    if (!process.env.JWT_SECRET) {\n        throw new Error(\"JWT_SECRET environment variable is not set\");\n    }\n    try {\n        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_5__.jwtVerify)(token, secretKey);\n        return payload;\n    } catch (error) {\n        console.error(\"JWT verification failed:\", error);\n        return null;\n    }\n}\n// Function to get the current user from a request\nasync function getCurrentUser(req) {\n    try {\n        // Get token from cookies or authorization header\n        let token;\n        if (req) {\n            // From authorization header in API routes\n            const authHeader = req.headers.get(\"authorization\");\n            if (authHeader && authHeader.startsWith(\"Bearer \")) {\n                token = authHeader.substring(7);\n            }\n        }\n        // If not found in header, try cookies\n        if (!token) {\n            const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n            token = cookieStore.get(\"authToken\")?.value;\n        }\n        if (!token) {\n            return null;\n        }\n        // Verify the token\n        const payload = await verifyJWT(token);\n        if (!payload || !payload.userId) {\n            return null;\n        }\n        // Get the user from storage\n        const user = await _storage__WEBPACK_IMPORTED_MODULE_1__.storage.getUser(payload.userId);\n        return user || null;\n    } catch (error) {\n        console.error(\"Error getting current user:\", error);\n        return null;\n    }\n}\n// Password hashing function\nasync function hashPassword(password) {\n    const salt = (0,crypto__WEBPACK_IMPORTED_MODULE_2__.randomBytes)(16).toString('hex');\n    const derivedKey = await scryptAsync(password, salt, 64);\n    return `${derivedKey.toString('hex')}.${salt}`;\n}\n// Password comparison function\nasync function comparePasswords(supplied, stored) {\n    const [hashedPassword, salt] = stored.split('.');\n    const derivedKey = await scryptAsync(supplied, salt, 64);\n    const storedKey = Buffer.from(hashedPassword, 'hex');\n    return (0,crypto__WEBPACK_IMPORTED_MODULE_2__.timingSafeEqual)(derivedKey, storedKey);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyx1REFBZUEsQ0FBQ3FDLFlBQVlNO0FBQ3JDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpZ25KV1QsIGp3dFZlcmlmeSB9IGZyb20gXCJqb3NlXCI7XHJcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XHJcbmltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9zdXBhYmFzZVwiO1xyXG5pbXBvcnQgeyBzY3J5cHQsIHJhbmRvbUJ5dGVzLCB0aW1pbmdTYWZlRXF1YWwgfSBmcm9tIFwiY3J5cHRvXCI7XHJcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJ1dGlsXCI7XHJcblxyXG5jb25zdCBzY3J5cHRBc3luYyA9IHByb21pc2lmeShzY3J5cHQpO1xyXG5cclxuLy8gSldUIGhlbHBlcnMgZm9yIGF1dGhlbnRpY2F0aW9uXHJcbmV4cG9ydCBpbnRlcmZhY2UgSldUUGF5bG9hZCB7XHJcbiAgdXNlcklkOiBudW1iZXI7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBleHA/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHNpZ24gYSBuZXcgSldUXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduSldUKHBheWxvYWQ6IEpXVFBheWxvYWQpIHtcclxuICBpZiAoIXByb2Nlc3MuZW52LkpXVF9TRUNSRVQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldFwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNlY3JldEtleSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcclxuICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBTaWduSldUKHBheWxvYWQgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+KVxyXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogXCJIUzI1NlwiIH0pXHJcbiAgICAuc2V0SXNzdWVkQXQoKVxyXG4gICAgLnNldEV4cGlyYXRpb25UaW1lKFwiN2RcIikgLy8gNyBkYXlzIGV4cGlyYXRpb25cclxuICAgIC5zaWduKHNlY3JldEtleSk7XHJcblxyXG4gIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuLy8gRnVuY3Rpb24gdG8gdmVyaWZ5IGEgSldUXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlKV1QodG9rZW46IHN0cmluZyk6IFByb21pc2U8SldUUGF5bG9hZCB8IG51bGw+IHtcclxuICBpZiAoIXByb2Nlc3MuZW52LkpXVF9TRUNSRVQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZWNyZXRLZXkgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XHJcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgc2VjcmV0S2V5KTtcclxuICAgIHJldHVybiBwYXlsb2FkIGFzIHVua25vd24gYXMgSldUUGF5bG9hZDtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkpXVCB2ZXJpZmljYXRpb24gZmFpbGVkOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gYSByZXF1ZXN0XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcihyZXE/OiBOZXh0UmVxdWVzdCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcclxuICB0cnkge1xyXG4gICAgLy8gR2V0IHRva2VuIGZyb20gY29va2llcyBvciBhdXRob3JpemF0aW9uIGhlYWRlclxyXG4gICAgbGV0IHRva2VuO1xyXG4gICAgXHJcbiAgICBpZiAocmVxKSB7XHJcbiAgICAgIC8vIEZyb20gYXV0aG9yaXphdGlvbiBoZWFkZXIgaW4gQVBJIHJvdXRlc1xyXG4gICAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKTtcclxuICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgYXV0aEhlYWRlci5zdGFydHNXaXRoKFwiQmVhcmVyIFwiKSkge1xyXG4gICAgICAgIHRva2VuID0gYXV0aEhlYWRlci5zdWJzdHJpbmcoNyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8vIElmIG5vdCBmb3VuZCBpbiBoZWFkZXIsIHRyeSBjb29raWVzXHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gICAgICB0b2tlbiA9IGNvb2tpZVN0b3JlLmdldChcImF1dGhUb2tlblwiKT8udmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZnkgdGhlIHRva2VuXHJcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdmVyaWZ5SldUKHRva2VuKTtcclxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC51c2VySWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSB1c2VyIGZyb20gc3RvcmFnZVxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHN0b3JhZ2UuZ2V0VXNlcihwYXlsb2FkLnVzZXJJZCk7XHJcbiAgICByZXR1cm4gdXNlciB8fCBudWxsO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2V0dGluZyBjdXJyZW50IHVzZXI6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUGFzc3dvcmQgaGFzaGluZyBmdW5jdGlvblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzaFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gIGNvbnN0IHNhbHQgPSByYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2hleCcpO1xyXG4gIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBzY3J5cHRBc3luYyhwYXNzd29yZCwgc2FsdCwgNjQpIGFzIEJ1ZmZlcjtcclxuICByZXR1cm4gYCR7ZGVyaXZlZEtleS50b1N0cmluZygnaGV4Jyl9LiR7c2FsdH1gO1xyXG59XHJcblxyXG4vLyBQYXNzd29yZCBjb21wYXJpc29uIGZ1bmN0aW9uXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wYXJlUGFzc3dvcmRzKHN1cHBsaWVkOiBzdHJpbmcsIHN0b3JlZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgY29uc3QgW2hhc2hlZFBhc3N3b3JkLCBzYWx0XSA9IHN0b3JlZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBzY3J5cHRBc3luYyhzdXBwbGllZCwgc2FsdCwgNjQpIGFzIEJ1ZmZlcjtcclxuICBjb25zdCBzdG9yZWRLZXkgPSBCdWZmZXIuZnJvbShoYXNoZWRQYXNzd29yZCwgJ2hleCcpO1xyXG4gIHJldHVybiB0aW1pbmdTYWZlRXF1YWwoZGVyaXZlZEtleSwgc3RvcmVkS2V5KTtcclxufSJdLCJuYW1lcyI6WyJTaWduSldUIiwiand0VmVyaWZ5IiwiY29va2llcyIsInN0b3JhZ2UiLCJzY3J5cHQiLCJyYW5kb21CeXRlcyIsInRpbWluZ1NhZmVFcXVhbCIsInByb21pc2lmeSIsInNjcnlwdEFzeW5jIiwic2lnbkpXVCIsInBheWxvYWQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsIkVycm9yIiwic2VjcmV0S2V5IiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJ0b2tlbiIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldElzc3VlZEF0Iiwic2V0RXhwaXJhdGlvblRpbWUiLCJzaWduIiwidmVyaWZ5SldUIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0Q3VycmVudFVzZXIiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJjb29raWVTdG9yZSIsInZhbHVlIiwidXNlcklkIiwidXNlciIsImdldFVzZXIiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsInNhbHQiLCJ0b1N0cmluZyIsImRlcml2ZWRLZXkiLCJjb21wYXJlUGFzc3dvcmRzIiwic3VwcGxpZWQiLCJzdG9yZWQiLCJoYXNoZWRQYXNzd29yZCIsInNwbGl0Iiwic3RvcmVkS2V5IiwiQnVmZmVyIiwiZnJvbSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/storage.ts":
/*!****************************!*\
  !*** ./app/lib/storage.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SupabaseStorage: () => (/* binding */ SupabaseStorage),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./app/lib/supabase.ts\");\n\n// Supabase Storage Implementation\nclass SupabaseStorage {\n    async getUser(id) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('id', id).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async getUserByEmail(email) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('email', email).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async createUser(insertUser) {\n        // Add current timestamp if not provided\n        const now = new Date().toISOString();\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').insert({\n            email: insertUser.email,\n            password: insertUser.password,\n            subscription_tier: insertUser.subscription_tier,\n            suggestions_remaining: insertUser.suggestions_remaining,\n            created_at: insertUser.created_at\n        }).select().single();\n        if (error) {\n            throw error;\n        }\n        ;\n        return data;\n    }\n    async updateSubscriptionTier(userId, tier, suggestionsCount) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            subscription_tier: tier,\n            suggestions_remaining: suggestionsCount\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async decrementSuggestionsRemaining(userId) {\n        // Get the current user\n        const user = await this.getUser(userId);\n        if (!user) throw new Error('User not found');\n        // Calculate remaining suggestions (don't go below 0)\n        const remaining = Math.max(0, (user.suggestions_remaining || 0) - 1);\n        // Update the user\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            suggestions_remaining: remaining\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateStripeCustomerId(userId, customerId) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: customerId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateUserStripeInfo(userId, stripeInfo) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: stripeInfo.stripeCustomerId,\n            stripeSubscriptionId: stripeInfo.stripeSubscriptionId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async getPriceSuggestions(user_id) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').select('*').eq('userId', user_id).order('createdAt', {\n            ascending: false\n        });\n        if (error) throw error;\n        return data;\n    }\n    async createPriceSuggestion(suggestion) {\n        // Add current timestamp\n        const suggestionWithTimestamp = {\n            ...suggestion,\n            created_at: new Date().toISOString()\n        };\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').insert({\n            user_id: suggestionWithTimestamp.user_id,\n            skill_type: suggestionWithTimestamp.skill_type,\n            experience_level: suggestionWithTimestamp.experience_level,\n            project_scope: suggestionWithTimestamp.project_scope,\n            location: suggestionWithTimestamp.location,\n            target_market: suggestionWithTimestamp.target_market,\n            min_price: suggestionWithTimestamp.min_price,\n            recommended_price: suggestionWithTimestamp.recommended_price,\n            premium_price: suggestionWithTimestamp.premium_price,\n            created_at: suggestionWithTimestamp.created_at\n        }).select().single();\n        if (error) throw error;\n        return data;\n    }\n}\n// Create a storage instance\nconst storage = new SupabaseStorage();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUJQLHdCQUF3Qk8saUJBQWlCO1lBQzVEQyxlQUFlUix3QkFBd0JRLGFBQWE7WUFDcERoQyxZQUFZd0Isd0JBQXdCeEIsVUFBVTtRQUNoRCxHQUNDZixNQUFNLEdBQ05FLE1BQU07UUFFVCxJQUFJSixPQUFPLE1BQU1BO1FBQ2pCLE9BQU9EO0lBQ1Q7QUFDRjtBQUVBLDRCQUE0QjtBQUNyQixNQUFNbUQsVUFBVSxJQUFJdEQsa0JBQWtCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxzdG9yYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN1cGFiYXNlLCBVc2VyLCBJbnNlcnRVc2VyLCBQcmljZVN1Z2dlc3Rpb24sIEluc2VydFByaWNlU3VnZ2VzdGlvbiB9IGZyb20gJy4vc3VwYWJhc2UnO1xyXG5cclxuLy8gRW5oYW5jZWQgaW50ZXJmYWNlIHdpdGggbmV3IG1ldGhvZHMgZm9yIHVzZXIgbWFuYWdlbWVudCBhbmQgcHJpY2luZ1xyXG5leHBvcnQgaW50ZXJmYWNlIElTdG9yYWdlIHtcclxuICAvLyBVc2VyIG1hbmFnZW1lbnRcclxuICBnZXRVc2VyKGlkOiBudW1iZXIpOiBQcm9taXNlPFVzZXIgfCB1bmRlZmluZWQ+O1xyXG4gIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCB1bmRlZmluZWQ+O1xyXG4gIGNyZWF0ZVVzZXIodXNlcjogSW5zZXJ0VXNlcik6IFByb21pc2U8VXNlcj47XHJcbiAgdXBkYXRlU3Vic2NyaXB0aW9uVGllcih1c2VySWQ6IG51bWJlciwgdGllcjogc3RyaW5nLCBzdWdnZXN0aW9uc0NvdW50OiBudW1iZXIpOiBQcm9taXNlPFVzZXI+O1xyXG4gIGRlY3JlbWVudFN1Z2dlc3Rpb25zUmVtYWluaW5nKHVzZXJJZDogbnVtYmVyKTogUHJvbWlzZTxVc2VyPjtcclxuICBcclxuICAvLyBTdHJpcGUgcmVsYXRlZFxyXG4gIHVwZGF0ZVN0cmlwZUN1c3RvbWVySWQodXNlcklkOiBudW1iZXIsIGN1c3RvbWVySWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj47XHJcbiAgdXBkYXRlVXNlclN0cmlwZUluZm8odXNlcklkOiBudW1iZXIsIHN0cmlwZUluZm86IHsgc3RyaXBlQ3VzdG9tZXJJZDogc3RyaW5nLCBzdHJpcGVTdWJzY3JpcHRpb25JZDogc3RyaW5nIH0pOiBQcm9taXNlPFVzZXI+O1xyXG4gIFxyXG4gIC8vIFByaWNlIHN1Z2dlc3Rpb25zXHJcbiAgZ2V0UHJpY2VTdWdnZXN0aW9ucyh1c2VySWQ6IG51bWJlcik6IFByb21pc2U8UHJpY2VTdWdnZXN0aW9uW10+O1xyXG4gIGNyZWF0ZVByaWNlU3VnZ2VzdGlvbihzdWdnZXN0aW9uOiBJbnNlcnRQcmljZVN1Z2dlc3Rpb24gJiB7IFxyXG4gICAgbWluX3ByaWNlPzogc3RyaW5nLCBcclxuICAgIHJlY29tbWVuZGVkX3ByaWNlPzogc3RyaW5nLCBcclxuICAgIHByZW1pdW1fcHJpY2U/OiBzdHJpbmcgXHJcbiAgfSk6IFByb21pc2U8UHJpY2VTdWdnZXN0aW9uPjtcclxufVxyXG5cclxuLy8gU3VwYWJhc2UgU3RvcmFnZSBJbXBsZW1lbnRhdGlvblxyXG5leHBvcnQgY2xhc3MgU3VwYWJhc2VTdG9yYWdlIGltcGxlbWVudHMgSVN0b3JhZ2Uge1xyXG4gIGFzeW5jIGdldFVzZXIoaWQ6IG51bWJlcik6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnNlbGVjdCgnKicpXHJcbiAgICAgIC5lcSgnaWQnLCBpZClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IgfHwgIWRhdGEpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBnZXRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAuc2VsZWN0KCcqJylcclxuICAgICAgLmVxKCdlbWFpbCcsIGVtYWlsKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvciB8fCAhZGF0YSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjcmVhdGVVc2VyKGluc2VydFVzZXI6IEluc2VydFVzZXIpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIEFkZCBjdXJyZW50IHRpbWVzdGFtcCBpZiBub3QgcHJvdmlkZWRcclxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgIFxyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLmluc2VydCh7XHJcbiAgICAgICAgZW1haWw6IGluc2VydFVzZXIuZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGluc2VydFVzZXIucGFzc3dvcmQsXHJcbiAgICAgICAgc3Vic2NyaXB0aW9uX3RpZXI6IGluc2VydFVzZXIuc3Vic2NyaXB0aW9uX3RpZXIsXHJcbiAgICAgICAgc3VnZ2VzdGlvbnNfcmVtYWluaW5nOiBpbnNlcnRVc2VyLnN1Z2dlc3Rpb25zX3JlbWFpbmluZyxcclxuICAgICAgICBjcmVhdGVkX2F0OiBpbnNlcnRVc2VyLmNyZWF0ZWRfYXRcclxuICAgICAgfSkgICAgICBcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yfTtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVN1YnNjcmlwdGlvblRpZXIodXNlcklkOiBudW1iZXIsIHRpZXI6IHN0cmluZywgc3VnZ2VzdGlvbnNDb3VudDogbnVtYmVyKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAudXBkYXRlKHsgXHJcbiAgICAgICAgc3Vic2NyaXB0aW9uX3RpZXI6IHRpZXIsXHJcbiAgICAgICAgc3VnZ2VzdGlvbnNfcmVtYWluaW5nOiBzdWdnZXN0aW9uc0NvdW50XHJcbiAgICAgIH0pXHJcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBkZWNyZW1lbnRTdWdnZXN0aW9uc1JlbWFpbmluZyh1c2VySWQ6IG51bWJlcik6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHVzZXJcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLmdldFVzZXIodXNlcklkKTtcclxuICAgIGlmICghdXNlcikgdGhyb3cgbmV3IEVycm9yKCdVc2VyIG5vdCBmb3VuZCcpO1xyXG4gICAgXHJcbiAgICAvLyBDYWxjdWxhdGUgcmVtYWluaW5nIHN1Z2dlc3Rpb25zIChkb24ndCBnbyBiZWxvdyAwKVxyXG4gICAgY29uc3QgcmVtYWluaW5nID0gTWF0aC5tYXgoMCwgKHVzZXIuc3VnZ2VzdGlvbnNfcmVtYWluaW5nIHx8IDApIC0gMSk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSB0aGUgdXNlclxyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IHN1Z2dlc3Rpb25zX3JlbWFpbmluZzogcmVtYWluaW5nIH0pXHJcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyB1cGRhdGVTdHJpcGVDdXN0b21lcklkKHVzZXJJZDogbnVtYmVyLCBjdXN0b21lcklkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCd1c2VycycpXHJcbiAgICAgIC51cGRhdGUoeyBzdHJpcGVDdXN0b21lcklkOiBjdXN0b21lcklkIH0pXHJcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyB1cGRhdGVVc2VyU3RyaXBlSW5mbyh1c2VySWQ6IG51bWJlciwgc3RyaXBlSW5mbzogeyBzdHJpcGVDdXN0b21lcklkOiBzdHJpbmcsIHN0cmlwZVN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfSk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IFxyXG4gICAgICAgIHN0cmlwZUN1c3RvbWVySWQ6IHN0cmlwZUluZm8uc3RyaXBlQ3VzdG9tZXJJZCxcclxuICAgICAgICBzdHJpcGVTdWJzY3JpcHRpb25JZDogc3RyaXBlSW5mby5zdHJpcGVTdWJzY3JpcHRpb25JZFxyXG4gICAgICB9KVxyXG4gICAgICAuZXEoJ2lkJywgdXNlcklkKVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xyXG4gICAgcmV0dXJuIGRhdGEgYXMgVXNlcjtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgZ2V0UHJpY2VTdWdnZXN0aW9ucyh1c2VyX2lkOiBudW1iZXIpOiBQcm9taXNlPFByaWNlU3VnZ2VzdGlvbltdPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgncHJpY2Vfc3VnZ2VzdGlvbnMnKVxyXG4gICAgICAuc2VsZWN0KCcqJylcclxuICAgICAgLmVxKCd1c2VySWQnLCB1c2VyX2lkKVxyXG4gICAgICAub3JkZXIoJ2NyZWF0ZWRBdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFByaWNlU3VnZ2VzdGlvbltdO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBjcmVhdGVQcmljZVN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogSW5zZXJ0UHJpY2VTdWdnZXN0aW9uICYgeyBcclxuICAgIG1pbl9wcmljZT86IHN0cmluZywgXHJcbiAgICByZWNvbW1lbmRlZF9wcmljZT86IHN0cmluZywgXHJcbiAgICBwcmVtaXVtX3ByaWNlPzogc3RyaW5nIFxyXG4gIH0pOiBQcm9taXNlPFByaWNlU3VnZ2VzdGlvbj4ge1xyXG4gICAgLy8gQWRkIGN1cnJlbnQgdGltZXN0YW1wXHJcbiAgICBjb25zdCBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcCA9IHtcclxuICAgICAgLi4uc3VnZ2VzdGlvbixcclxuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgncHJpY2Vfc3VnZ2VzdGlvbnMnKVxyXG4gICAgICAuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC51c2VyX2lkLFxyXG4gICAgICAgIHNraWxsX3R5cGU6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLnNraWxsX3R5cGUsXHJcbiAgICAgICAgZXhwZXJpZW5jZV9sZXZlbDogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAuZXhwZXJpZW5jZV9sZXZlbCxcclxuICAgICAgICBwcm9qZWN0X3Njb3BlOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5wcm9qZWN0X3Njb3BlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5sb2NhdGlvbixcclxuICAgICAgICB0YXJnZXRfbWFya2V0OiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC50YXJnZXRfbWFya2V0LFxyXG4gICAgICAgIG1pbl9wcmljZTogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAubWluX3ByaWNlLFxyXG4gICAgICAgIHJlY29tbWVuZGVkX3ByaWNlOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5yZWNvbW1lbmRlZF9wcmljZSxcclxuICAgICAgICBwcmVtaXVtX3ByaWNlOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5wcmVtaXVtX3ByaWNlLFxyXG4gICAgICAgIGNyZWF0ZWRfYXQ6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLmNyZWF0ZWRfYXRcclxuICAgICAgfSlcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFByaWNlU3VnZ2VzdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JhZ2UgaW5zdGFuY2VcclxuZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3VwYWJhc2VTdG9yYWdlKCk7Il0sIm5hbWVzIjpbInN1cGFiYXNlIiwiU3VwYWJhc2VTdG9yYWdlIiwiZ2V0VXNlciIsImlkIiwiZGF0YSIsImVycm9yIiwiZnJvbSIsInNlbGVjdCIsImVxIiwic2luZ2xlIiwidW5kZWZpbmVkIiwiZ2V0VXNlckJ5RW1haWwiLCJlbWFpbCIsImNyZWF0ZVVzZXIiLCJpbnNlcnRVc2VyIiwibm93IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiaW5zZXJ0IiwicGFzc3dvcmQiLCJzdWJzY3JpcHRpb25fdGllciIsInN1Z2dlc3Rpb25zX3JlbWFpbmluZyIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVTdWJzY3JpcHRpb25UaWVyIiwidXNlcklkIiwidGllciIsInN1Z2dlc3Rpb25zQ291bnQiLCJ1cGRhdGUiLCJkZWNyZW1lbnRTdWdnZXN0aW9uc1JlbWFpbmluZyIsInVzZXIiLCJFcnJvciIsInJlbWFpbmluZyIsIk1hdGgiLCJtYXgiLCJ1cGRhdGVTdHJpcGVDdXN0b21lcklkIiwiY3VzdG9tZXJJZCIsInN0cmlwZUN1c3RvbWVySWQiLCJ1cGRhdGVVc2VyU3RyaXBlSW5mbyIsInN0cmlwZUluZm8iLCJzdHJpcGVTdWJzY3JpcHRpb25JZCIsImdldFByaWNlU3VnZ2VzdGlvbnMiLCJ1c2VyX2lkIiwib3JkZXIiLCJhc2NlbmRpbmciLCJjcmVhdGVQcmljZVN1Z2dlc3Rpb24iLCJzdWdnZXN0aW9uIiwic3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAiLCJza2lsbF90eXBlIiwiZXhwZXJpZW5jZV9sZXZlbCIsInByb2plY3Rfc2NvcGUiLCJsb2NhdGlvbiIsInRhcmdldF9tYXJrZXQiLCJtaW5fcHJpY2UiLCJyZWNvbW1lbmRlZF9wcmljZSIsInByZW1pdW1fcHJpY2UiLCJzdG9yYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/storage.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/supabase.ts":
/*!*****************************!*\
  !*** ./app/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Check for required environment variables\nif (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {\n    throw new Error(\"SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase client\");\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXFEO0FBRXJELDJDQUEyQztBQUMzQyxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxJQUFJLENBQUNGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQUU7SUFDL0QsTUFBTSxJQUFJQyxNQUNSO0FBRUo7QUFFQSx5QkFBeUI7QUFDbEIsTUFBTUMsV0FBV04sbUVBQVlBLENBQ2xDQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFDeEJGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQzdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxzdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xyXG5cclxuLy8gQ2hlY2sgZm9yIHJlcXVpcmVkIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG5pZiAoIXByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCB8fCAhcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICBcIlNVUEFCQVNFX1VSTCBhbmQgU1VQQUJBU0VfQU5PTl9LRVkgbXVzdCBiZSBzZXQgZm9yIFN1cGFiYXNlIGNsaWVudFwiLFxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBTdXBhYmFzZSBjbGllbnRcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KFxyXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCxcclxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9BTk9OX0tFWVxyXG4pO1xyXG5cclxuLy8gRGVmaW5lIHR5cGVzIGZvciBkYXRhYmFzZSB0YWJsZXNcclxuZXhwb3J0IHR5cGUgVXNlciA9IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzdWJzY3JpcHRpb25fdGllcjogc3RyaW5nO1xyXG4gIHN1Z2dlc3Rpb25zX3JlbWFpbmluZzogbnVtYmVyO1xyXG4gIHN0cmlwZV9jdXN0b21lcl9pZD86IHN0cmluZztcclxuICBzdHJpcGVfc3Vic2NyaXB0aW9uX2lkPzogc3RyaW5nO1xyXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSW5zZXJ0VXNlciA9IE9taXQ8VXNlciwgJ2lkJz47XHJcblxyXG5leHBvcnQgdHlwZSBQcmljZVN1Z2dlc3Rpb24gPSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB1c2VyX2lkOiBudW1iZXI7XHJcbiAgc2tpbGxfdHlwZTogc3RyaW5nO1xyXG4gIGV4cGVyaWVuY2VfbGV2ZWw6IHN0cmluZztcclxuICBwcm9qZWN0X3Njb3BlOiBzdHJpbmc7XHJcbiAgbG9jYXRpb24/OiBzdHJpbmc7XHJcbiAgdGFyZ2V0X21hcmtldD86IHN0cmluZztcclxuICBtaW5fcHJpY2U6IHN0cmluZztcclxuICByZWNvbW1lbmRlZF9wcmljZTogc3RyaW5nO1xyXG4gIHByZW1pdW1fcHJpY2U6IHN0cmluZztcclxuICBjcmVhdGVkX2F0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEluc2VydFByaWNlU3VnZ2VzdGlvbiA9IE9taXQ8UHJpY2VTdWdnZXN0aW9uLCAnaWQnIHwgJ21pbl9wcmljZScgfCAncmVjb21tZW5kZWRfcHJpY2UnIHwgJ3ByZW1pdW1fcHJpY2UnIHwgJ2NyZWF0ZWRfYXQnPjsiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIlNVUEFCQVNFX1VSTCIsIlNVUEFCQVNFX0FOT05fS0VZIiwiRXJyb3IiLCJzdXBhYmFzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.ts */ \"(rsc)/./app/api/user/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\finle\\\\Desktop\\\\vide-cobing\\\\congenial-octo-couscous\\\\app\\\\api\\\\user\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUM7QUFDdEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGZpbmxlXFxcXERlc2t0b3BcXFxcdmlkZS1jb2JpbmdcXFxcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcInN0YW5kYWxvbmVcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXNlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VzZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxmaW5sZVxcXFxEZXNrdG9wXFxcXHZpZGUtY29iaW5nXFxcXGNvbmdlbmlhbC1vY3RvLWNvdXNjb3VzXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/jose","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();