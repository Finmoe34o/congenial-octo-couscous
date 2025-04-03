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
exports.id = "app/api/auth/register/route";
exports.ids = ["app/api/auth/register/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/register/route.ts":
/*!****************************************!*\
  !*** ./app/api/auth/register/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/auth */ \"(rsc)/./app/lib/auth.ts\");\n/* harmony import */ var _lib_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/storage */ \"(rsc)/./app/lib/storage.ts\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\n\n\n\n// Validate registration request\nconst registerSchema = zod__WEBPACK_IMPORTED_MODULE_3__.z.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_3__.z.string().email({\n        message: \"Invalid email address\"\n    }),\n    password: zod__WEBPACK_IMPORTED_MODULE_3__.z.string().min(6, {\n        message: \"Password must be at least 6 characters\"\n    }),\n    confirmPassword: zod__WEBPACK_IMPORTED_MODULE_3__.z.string().min(6, {\n        message: \"Confirm password is required\"\n    })\n}).refine((data)=>data.password === data.confirmPassword, {\n    message: \"Passwords do not match\",\n    path: [\n        \"confirmPassword\"\n    ]\n});\nasync function POST(request) {\n    try {\n        // Parse and validate the request body\n        const body = await request.json();\n        const validationResult = registerSchema.safeParse(body);\n        if (!validationResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid request data\",\n                details: validationResult.error.issues\n            }, {\n                status: 400\n            });\n        }\n        const { email, password } = validationResult.data;\n        // Check if the email is already taken\n        const existingUserByEmail = await _lib_storage__WEBPACK_IMPORTED_MODULE_2__.storage.getUserByEmail(email);\n        if (existingUserByEmail) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email is already registered\"\n            }, {\n                status: 400\n            });\n        }\n        // Hash the password\n        const hashedPassword = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.hashPassword)(password);\n        // Create the user\n        const user = await _lib_storage__WEBPACK_IMPORTED_MODULE_2__.storage.createUser({\n            email,\n            password: hashedPassword,\n            subscriptionTier: \"basic\",\n            suggestionsRemaining: 5,\n            createdAt: new Date().toISOString()\n        });\n        // Create a JWT\n        const token = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.signJWT)({\n            userId: user.id,\n            email: user.email\n        });\n        // Return the user (without the password) and token\n        const { password: _, ...userWithoutPassword } = user;\n        // Create response with user data and token\n        const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ...userWithoutPassword,\n            token\n        });\n        // Set the cookie\n        response.cookies.set({\n            name: \"authToken\",\n            value: token,\n            httpOnly: true,\n            secure: \"development\" === \"production\",\n            sameSite: \"lax\",\n            path: \"/\",\n            maxAge: 60 * 60 * 24 * 7\n        });\n        return response;\n    } catch (error) {\n        console.error(\"Registration error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"An unexpected error occurred\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LWNvdXNjb3VzXFxhcHBcXGFwaVxcYXV0aFxccmVnaXN0ZXJcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xyXG5pbXBvcnQgeyBoYXNoUGFzc3dvcmQsIHNpZ25KV1QgfSBmcm9tIFwiLi4vLi4vLi4vbGliL2F1dGhcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCIuLi8uLi8uLi9saWIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xyXG5cclxuLy8gVmFsaWRhdGUgcmVnaXN0cmF0aW9uIHJlcXVlc3RcclxuY29uc3QgcmVnaXN0ZXJTY2hlbWEgPSB6Lm9iamVjdCh7XHJcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoeyBtZXNzYWdlOiBcIkludmFsaWQgZW1haWwgYWRkcmVzc1wiIH0pLFxyXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig2LCB7IG1lc3NhZ2U6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnNcIiB9KSxcclxuICBjb25maXJtUGFzc3dvcmQ6IHouc3RyaW5nKCkubWluKDYsIHsgbWVzc2FnZTogXCJDb25maXJtIHBhc3N3b3JkIGlzIHJlcXVpcmVkXCIgfSksXHJcbn0pLnJlZmluZSgoZGF0YSkgPT4gZGF0YS5wYXNzd29yZCA9PT0gZGF0YS5jb25maXJtUGFzc3dvcmQsIHtcclxuICBtZXNzYWdlOiBcIlBhc3N3b3JkcyBkbyBub3QgbWF0Y2hcIixcclxuICBwYXRoOiBbXCJjb25maXJtUGFzc3dvcmRcIl0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBQYXJzZSBhbmQgdmFsaWRhdGUgdGhlIHJlcXVlc3QgYm9keVxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IHJlZ2lzdGVyU2NoZW1hLnNhZmVQYXJzZShib2R5KTtcclxuICAgIFxyXG4gICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6IFwiSW52YWxpZCByZXF1ZXN0IGRhdGFcIiwgZGV0YWlsczogdmFsaWRhdGlvblJlc3VsdC5lcnJvci5pc3N1ZXMgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qge2VtYWlsLCBwYXNzd29yZCB9ID0gdmFsaWRhdGlvblJlc3VsdC5kYXRhO1xyXG4gICAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZW1haWwgaXMgYWxyZWFkeSB0YWtlblxyXG4gICAgXHJcbiAgICBjb25zdCBleGlzdGluZ1VzZXJCeUVtYWlsID0gYXdhaXQgc3RvcmFnZS5nZXRVc2VyQnlFbWFpbChlbWFpbCk7XHJcbiAgICBpZiAoZXhpc3RpbmdVc2VyQnlFbWFpbCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJFbWFpbCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBIYXNoIHRoZSBwYXNzd29yZFxyXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xyXG4gICAgLy8gQ3JlYXRlIHRoZSB1c2VyXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgc3RvcmFnZS5jcmVhdGVVc2VyKHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgc3Vic2NyaXB0aW9uVGllcjogXCJiYXNpY1wiLCAvLyBEZWZhdWx0IHRvIGJhc2ljIHRpZXJcclxuICAgICAgc3VnZ2VzdGlvbnNSZW1haW5pbmc6IDUsICAgIC8vIFN0YXJ0IHdpdGggNSBzdWdnZXN0aW9ucyBmb3IgZnJlZSB0aWVyXHJcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIENyZWF0ZSBhIEpXVFxyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBzaWduSldUKHtcclxuICAgICAgdXNlcklkOiB1c2VyLmlkLFxyXG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBSZXR1cm4gdGhlIHVzZXIgKHdpdGhvdXQgdGhlIHBhc3N3b3JkKSBhbmQgdG9rZW5cclxuICAgIGNvbnN0IHsgcGFzc3dvcmQ6IF8sIC4uLnVzZXJXaXRob3V0UGFzc3dvcmQgfSA9IHVzZXI7XHJcbiAgICBcclxuICAgIC8vIENyZWF0ZSByZXNwb25zZSB3aXRoIHVzZXIgZGF0YSBhbmQgdG9rZW5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAuLi51c2VyV2l0aG91dFBhc3N3b3JkLFxyXG4gICAgICB0b2tlbixcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBTZXQgdGhlIGNvb2tpZVxyXG4gICAgcmVzcG9uc2UuY29va2llcy5zZXQoe1xyXG4gICAgICBuYW1lOiBcImF1dGhUb2tlblwiLFxyXG4gICAgICB2YWx1ZTogdG9rZW4sXHJcbiAgICAgIGh0dHBPbmx5OiB0cnVlLFxyXG4gICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcclxuICAgICAgc2FtZVNpdGU6IFwibGF4XCIsXHJcbiAgICAgIHBhdGg6IFwiL1wiLFxyXG4gICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsIC8vIDcgZGF5c1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiByZXNwb25zZTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlJlZ2lzdHJhdGlvbiBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImhhc2hQYXNzd29yZCIsInNpZ25KV1QiLCJzdG9yYWdlIiwieiIsInJlZ2lzdGVyU2NoZW1hIiwib2JqZWN0IiwiZW1haWwiLCJzdHJpbmciLCJtZXNzYWdlIiwicGFzc3dvcmQiLCJtaW4iLCJjb25maXJtUGFzc3dvcmQiLCJyZWZpbmUiLCJkYXRhIiwicGF0aCIsIlBPU1QiLCJyZXF1ZXN0IiwiYm9keSIsImpzb24iLCJ2YWxpZGF0aW9uUmVzdWx0Iiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9yIiwiZGV0YWlscyIsImlzc3VlcyIsInN0YXR1cyIsImV4aXN0aW5nVXNlckJ5RW1haWwiLCJnZXRVc2VyQnlFbWFpbCIsImhhc2hlZFBhc3N3b3JkIiwidXNlciIsImNyZWF0ZVVzZXIiLCJzdWJzY3JpcHRpb25UaWVyIiwic3VnZ2VzdGlvbnNSZW1haW5pbmciLCJjcmVhdGVkQXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJ0b2tlbiIsInVzZXJJZCIsImlkIiwiXyIsInVzZXJXaXRob3V0UGFzc3dvcmQiLCJyZXNwb25zZSIsImNvb2tpZXMiLCJzZXQiLCJuYW1lIiwidmFsdWUiLCJodHRwT25seSIsInNlY3VyZSIsInByb2Nlc3MiLCJzYW1lU2l0ZSIsIm1heEFnZSIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/register/route.ts\n");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SupabaseStorage: () => (/* binding */ SupabaseStorage),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./app/lib/supabase.ts\");\n\n// Supabase Storage Implementation\nclass SupabaseStorage {\n    async getUser(id) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('id', id).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async getUserByEmail(email) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('email', email).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async createUser(insertUser) {\n        // Add current timestamp if not provided\n        const now = new Date().toISOString();\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').insert({\n            email: insertUser.email,\n            password: insertUser.password,\n            subscription_tier: insertUser.subscriptionTier,\n            suggestions_remaining: insertUser.suggestionsRemaining,\n            created_at: insertUser.createdAt\n        }).select().single();\n        if (error) {\n            console.log(insertUser);\n            throw error;\n        }\n        ;\n        return data;\n    }\n    async updateSubscriptionTier(userId, tier, suggestionsCount) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            subscriptionTier: tier,\n            suggestionsRemaining: suggestionsCount\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async decrementSuggestionsRemaining(userId) {\n        // Get the current user\n        const user = await this.getUser(userId);\n        if (!user) throw new Error('User not found');\n        // Calculate remaining suggestions (don't go below 0)\n        const remaining = Math.max(0, (user.suggestionsRemaining || 0) - 1);\n        // Update the user\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            suggestionsRemaining: remaining\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateStripeCustomerId(userId, customerId) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: customerId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateUserStripeInfo(userId, stripeInfo) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: stripeInfo.stripeCustomerId,\n            stripeSubscriptionId: stripeInfo.stripeSubscriptionId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async getPriceSuggestions(userId) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').select('*').eq('userId', userId).order('createdAt', {\n            ascending: false\n        });\n        if (error) throw error;\n        return data;\n    }\n    async createPriceSuggestion(suggestion) {\n        // Add current timestamp\n        const suggestionWithTimestamp = {\n            ...suggestion,\n            createdAt: new Date().toISOString()\n        };\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').insert(suggestionWithTimestamp).select().single();\n        if (error) throw error;\n        return data;\n    }\n}\n// Create a storage instance\nconst storage = new SupabaseStorage();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWwtb2N0by1jb3VzY291c1xcYXBwXFxsaWJcXHN0b3JhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VwYWJhc2UsIFVzZXIsIEluc2VydFVzZXIsIFByaWNlU3VnZ2VzdGlvbiwgSW5zZXJ0UHJpY2VTdWdnZXN0aW9uIH0gZnJvbSAnLi9zdXBhYmFzZSc7XHJcblxyXG4vLyBFbmhhbmNlZCBpbnRlcmZhY2Ugd2l0aCBuZXcgbWV0aG9kcyBmb3IgdXNlciBtYW5hZ2VtZW50IGFuZCBwcmljaW5nXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3JhZ2Uge1xyXG4gIC8vIFVzZXIgbWFuYWdlbWVudFxyXG4gIGdldFVzZXIoaWQ6IG51bWJlcik6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD47XHJcbiAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD47XHJcbiAgY3JlYXRlVXNlcih1c2VyOiBJbnNlcnRVc2VyKTogUHJvbWlzZTxVc2VyPjtcclxuICB1cGRhdGVTdWJzY3JpcHRpb25UaWVyKHVzZXJJZDogbnVtYmVyLCB0aWVyOiBzdHJpbmcsIHN1Z2dlc3Rpb25zQ291bnQ6IG51bWJlcik6IFByb21pc2U8VXNlcj47XHJcbiAgZGVjcmVtZW50U3VnZ2VzdGlvbnNSZW1haW5pbmcodXNlcklkOiBudW1iZXIpOiBQcm9taXNlPFVzZXI+O1xyXG4gIFxyXG4gIC8vIFN0cmlwZSByZWxhdGVkXHJcbiAgdXBkYXRlU3RyaXBlQ3VzdG9tZXJJZCh1c2VySWQ6IG51bWJlciwgY3VzdG9tZXJJZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPjtcclxuICB1cGRhdGVVc2VyU3RyaXBlSW5mbyh1c2VySWQ6IG51bWJlciwgc3RyaXBlSW5mbzogeyBzdHJpcGVDdXN0b21lcklkOiBzdHJpbmcsIHN0cmlwZVN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfSk6IFByb21pc2U8VXNlcj47XHJcbiAgXHJcbiAgLy8gUHJpY2Ugc3VnZ2VzdGlvbnNcclxuICBnZXRQcmljZVN1Z2dlc3Rpb25zKHVzZXJJZDogbnVtYmVyKTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb25bXT47XHJcbiAgY3JlYXRlUHJpY2VTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IEluc2VydFByaWNlU3VnZ2VzdGlvbiAmIHsgXHJcbiAgICBtaW5QcmljZT86IHN0cmluZywgXHJcbiAgICByZWNvbW1lbmRlZFByaWNlPzogc3RyaW5nLCBcclxuICAgIHByZW1pdW1QcmljZT86IHN0cmluZyBcclxuICB9KTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb24+O1xyXG59XHJcblxyXG4vLyBTdXBhYmFzZSBTdG9yYWdlIEltcGxlbWVudGF0aW9uXHJcbmV4cG9ydCBjbGFzcyBTdXBhYmFzZVN0b3JhZ2UgaW1wbGVtZW50cyBJU3RvcmFnZSB7XHJcbiAgYXN5bmMgZ2V0VXNlcihpZDogbnVtYmVyKTogUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAuc2VsZWN0KCcqJylcclxuICAgICAgLmVxKCdpZCcsIGlkKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvciB8fCAhZGF0YSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCd1c2VycycpXHJcbiAgICAgIC5zZWxlY3QoJyonKVxyXG4gICAgICAuZXEoJ2VtYWlsJywgZW1haWwpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yIHx8ICFkYXRhKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGRhdGEgYXMgVXNlcjtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVVzZXIoaW5zZXJ0VXNlcjogSW5zZXJ0VXNlcik6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgLy8gQWRkIGN1cnJlbnQgdGltZXN0YW1wIGlmIG5vdCBwcm92aWRlZFxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAuaW5zZXJ0KHtlbWFpbDogaW5zZXJ0VXNlci5lbWFpbCwgcGFzc3dvcmQ6IGluc2VydFVzZXIucGFzc3dvcmQsIHN1YnNjcmlwdGlvbl90aWVyOiBpbnNlcnRVc2VyLnN1YnNjcmlwdGlvblRpZXIsIHN1Z2dlc3Rpb25zX3JlbWFpbmluZzogaW5zZXJ0VXNlci5zdWdnZXN0aW9uc1JlbWFpbmluZywgY3JlYXRlZF9hdDogaW5zZXJ0VXNlci5jcmVhdGVkQXR9KVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coIGluc2VydFVzZXIpXHJcbiAgICAgIHRocm93IGVycm9yfTtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVN1YnNjcmlwdGlvblRpZXIodXNlcklkOiBudW1iZXIsIHRpZXI6IHN0cmluZywgc3VnZ2VzdGlvbnNDb3VudDogbnVtYmVyKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAudXBkYXRlKHsgXHJcbiAgICAgICAgc3Vic2NyaXB0aW9uVGllcjogdGllcixcclxuICAgICAgICBzdWdnZXN0aW9uc1JlbWFpbmluZzogc3VnZ2VzdGlvbnNDb3VudFxyXG4gICAgICB9KVxyXG4gICAgICAuZXEoJ2lkJywgdXNlcklkKVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xyXG4gICAgcmV0dXJuIGRhdGEgYXMgVXNlcjtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgZGVjcmVtZW50U3VnZ2VzdGlvbnNSZW1haW5pbmcodXNlcklkOiBudW1iZXIpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCB1c2VyXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKHVzZXJJZCk7XHJcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcignVXNlciBub3QgZm91bmQnKTtcclxuICAgIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHJlbWFpbmluZyBzdWdnZXN0aW9ucyAoZG9uJ3QgZ28gYmVsb3cgMClcclxuICAgIGNvbnN0IHJlbWFpbmluZyA9IE1hdGgubWF4KDAsICh1c2VyLnN1Z2dlc3Rpb25zUmVtYWluaW5nIHx8IDApIC0gMSk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSB0aGUgdXNlclxyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IHN1Z2dlc3Rpb25zUmVtYWluaW5nOiByZW1haW5pbmcgfSlcclxuICAgICAgLmVxKCdpZCcsIHVzZXJJZClcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVN0cmlwZUN1c3RvbWVySWQodXNlcklkOiBudW1iZXIsIGN1c3RvbWVySWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IHN0cmlwZUN1c3RvbWVySWQ6IGN1c3RvbWVySWQgfSlcclxuICAgICAgLmVxKCdpZCcsIHVzZXJJZClcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJTdHJpcGVJbmZvKHVzZXJJZDogbnVtYmVyLCBzdHJpcGVJbmZvOiB7IHN0cmlwZUN1c3RvbWVySWQ6IHN0cmluZywgc3RyaXBlU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB9KTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAudXBkYXRlKHsgXHJcbiAgICAgICAgc3RyaXBlQ3VzdG9tZXJJZDogc3RyaXBlSW5mby5zdHJpcGVDdXN0b21lcklkLFxyXG4gICAgICAgIHN0cmlwZVN1YnNjcmlwdGlvbklkOiBzdHJpcGVJbmZvLnN0cmlwZVN1YnNjcmlwdGlvbklkXHJcbiAgICAgIH0pXHJcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBnZXRQcmljZVN1Z2dlc3Rpb25zKHVzZXJJZDogbnVtYmVyKTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb25bXT4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3ByaWNlX3N1Z2dlc3Rpb25zJylcclxuICAgICAgLnNlbGVjdCgnKicpXHJcbiAgICAgIC5lcSgndXNlcklkJywgdXNlcklkKVxyXG4gICAgICAub3JkZXIoJ2NyZWF0ZWRBdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFByaWNlU3VnZ2VzdGlvbltdO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBjcmVhdGVQcmljZVN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogSW5zZXJ0UHJpY2VTdWdnZXN0aW9uICYgeyBcclxuICAgIG1pblByaWNlPzogc3RyaW5nLCBcclxuICAgIHJlY29tbWVuZGVkUHJpY2U/OiBzdHJpbmcsIFxyXG4gICAgcHJlbWl1bVByaWNlPzogc3RyaW5nIFxyXG4gIH0pOiBQcm9taXNlPFByaWNlU3VnZ2VzdGlvbj4ge1xyXG4gICAgLy8gQWRkIGN1cnJlbnQgdGltZXN0YW1wXHJcbiAgICBjb25zdCBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcCA9IHtcclxuICAgICAgLi4uc3VnZ2VzdGlvbixcclxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCdwcmljZV9zdWdnZXN0aW9ucycpXHJcbiAgICAgIC5pbnNlcnQoc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXApXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBQcmljZVN1Z2dlc3Rpb247XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcmVhdGUgYSBzdG9yYWdlIGluc3RhbmNlXHJcbmV4cG9ydCBjb25zdCBzdG9yYWdlID0gbmV3IFN1cGFiYXNlU3RvcmFnZSgpOyJdLCJuYW1lcyI6WyJzdXBhYmFzZSIsIlN1cGFiYXNlU3RvcmFnZSIsImdldFVzZXIiLCJpZCIsImRhdGEiLCJlcnJvciIsImZyb20iLCJzZWxlY3QiLCJlcSIsInNpbmdsZSIsInVuZGVmaW5lZCIsImdldFVzZXJCeUVtYWlsIiwiZW1haWwiLCJjcmVhdGVVc2VyIiwiaW5zZXJ0VXNlciIsIm5vdyIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImluc2VydCIsInBhc3N3b3JkIiwic3Vic2NyaXB0aW9uX3RpZXIiLCJzdWJzY3JpcHRpb25UaWVyIiwic3VnZ2VzdGlvbnNfcmVtYWluaW5nIiwic3VnZ2VzdGlvbnNSZW1haW5pbmciLCJjcmVhdGVkX2F0IiwiY3JlYXRlZEF0IiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVN1YnNjcmlwdGlvblRpZXIiLCJ1c2VySWQiLCJ0aWVyIiwic3VnZ2VzdGlvbnNDb3VudCIsInVwZGF0ZSIsImRlY3JlbWVudFN1Z2dlc3Rpb25zUmVtYWluaW5nIiwidXNlciIsIkVycm9yIiwicmVtYWluaW5nIiwiTWF0aCIsIm1heCIsInVwZGF0ZVN0cmlwZUN1c3RvbWVySWQiLCJjdXN0b21lcklkIiwic3RyaXBlQ3VzdG9tZXJJZCIsInVwZGF0ZVVzZXJTdHJpcGVJbmZvIiwic3RyaXBlSW5mbyIsInN0cmlwZVN1YnNjcmlwdGlvbklkIiwiZ2V0UHJpY2VTdWdnZXN0aW9ucyIsIm9yZGVyIiwiYXNjZW5kaW5nIiwiY3JlYXRlUHJpY2VTdWdnZXN0aW9uIiwic3VnZ2VzdGlvbiIsInN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wIiwic3RvcmFnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/storage.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/supabase.ts":
/*!*****************************!*\
  !*** ./app/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Check for required environment variables\nif (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {\n    throw new Error(\"SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase client\");\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXFEO0FBRXJELDJDQUEyQztBQUMzQyxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxJQUFJLENBQUNGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQUU7SUFDL0QsTUFBTSxJQUFJQyxNQUNSO0FBRUo7QUFFQSx5QkFBeUI7QUFDbEIsTUFBTUMsV0FBV04sbUVBQVlBLENBQ2xDQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFDeEJGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQzdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxzdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xyXG5cclxuLy8gQ2hlY2sgZm9yIHJlcXVpcmVkIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG5pZiAoIXByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCB8fCAhcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICBcIlNVUEFCQVNFX1VSTCBhbmQgU1VQQUJBU0VfQU5PTl9LRVkgbXVzdCBiZSBzZXQgZm9yIFN1cGFiYXNlIGNsaWVudFwiLFxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBTdXBhYmFzZSBjbGllbnRcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KFxyXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCxcclxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9BTk9OX0tFWVxyXG4pO1xyXG5cclxuLy8gRGVmaW5lIHR5cGVzIGZvciBkYXRhYmFzZSB0YWJsZXNcclxuZXhwb3J0IHR5cGUgVXNlciA9IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzdWJzY3JpcHRpb25UaWVyOiBzdHJpbmc7XHJcbiAgc3VnZ2VzdGlvbnNSZW1haW5pbmc6IG51bWJlcjtcclxuICBzdHJpcGVDdXN0b21lcklkPzogc3RyaW5nO1xyXG4gIHN0cmlwZVN1YnNjcmlwdGlvbklkPzogc3RyaW5nO1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJbnNlcnRVc2VyID0gT21pdDxVc2VyLCAnaWQnPjtcclxuXHJcbmV4cG9ydCB0eXBlIFByaWNlU3VnZ2VzdGlvbiA9IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIHVzZXJJZDogbnVtYmVyO1xyXG4gIHNraWxsVHlwZTogc3RyaW5nO1xyXG4gIGV4cGVyaWVuY2VMZXZlbDogc3RyaW5nO1xyXG4gIHByb2plY3RTY29wZTogc3RyaW5nO1xyXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xyXG4gIHRhcmdldE1hcmtldD86IHN0cmluZztcclxuICBtaW5QcmljZTogc3RyaW5nO1xyXG4gIHJlY29tbWVuZGVkUHJpY2U6IHN0cmluZztcclxuICBwcmVtaXVtUHJpY2U6IHN0cmluZztcclxuICBjcmVhdGVkQXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSW5zZXJ0UHJpY2VTdWdnZXN0aW9uID0gT21pdDxQcmljZVN1Z2dlc3Rpb24sICdpZCcgfCAnbWluUHJpY2UnIHwgJ3JlY29tbWVuZGVkUHJpY2UnIHwgJ3ByZW1pdW1QcmljZScgfCAnY3JlYXRlZEF0Jz47Il0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInByb2Nlc3MiLCJlbnYiLCJTVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9BTk9OX0tFWSIsIkVycm9yIiwic3VwYWJhc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/register/route.ts */ \"(rsc)/./app/api/auth/register/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/register/route\",\n        pathname: \"/api/auth/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/register/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\finle\\\\Desktop\\\\vide-cobing\\\\congenial-octo-couscous\\\\app\\\\api\\\\auth\\\\register\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_auth_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcmVnaXN0ZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUQ7QUFDaEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGZpbmxlXFxcXERlc2t0b3BcXFxcdmlkZS1jb2JpbmdcXFxcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHJlZ2lzdGVyXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcInN0YW5kYWxvbmVcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9yZWdpc3Rlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvcmVnaXN0ZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvcmVnaXN0ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxmaW5sZVxcXFxEZXNrdG9wXFxcXHZpZGUtY29iaW5nXFxcXGNvbmdlbmlhbC1vY3RvLWNvdXNjb3VzXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxyZWdpc3RlclxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod","vendor-chunks/@supabase","vendor-chunks/jose","vendor-chunks/whatwg-url","vendor-chunks/tr46","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fregister%2Froute&page=%2Fapi%2Fauth%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();