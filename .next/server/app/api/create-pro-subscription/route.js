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
exports.id = "app/api/create-pro-subscription/route";
exports.ids = ["app/api/create-pro-subscription/route"];
exports.modules = {

/***/ "(rsc)/./app/api/create-pro-subscription/route.ts":
/*!**************************************************!*\
  !*** ./app/api/create-pro-subscription/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/storage */ \"(rsc)/./app/lib/storage.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./app/lib/auth.ts\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\n\n\n\n// Create Stripe instance if key is available\nlet stripe;\nif (process.env.STRIPE_SECRET_KEY) {\n    stripe = new stripe__WEBPACK_IMPORTED_MODULE_3__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n        apiVersion: '2023-10-16'\n    });\n}\nasync function POST(request) {\n    try {\n        // Check if Stripe is configured\n        if (!stripe) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Stripe payment processing is not configured\"\n            }, {\n                status: 500\n            });\n        }\n        // Get current user\n        const user = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getCurrentUser)(request);\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Authentication required\"\n            }, {\n                status: 401\n            });\n        }\n        if (!user.email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User has no email address\"\n            }, {\n                status: 400\n            });\n        }\n        // Set number of suggestions for Pro plan\n        const PRO_SUGGESTION_COUNT = 30;\n        // Create or get Stripe customer\n        let customerId = user.stripeCustomerId;\n        if (!customerId) {\n            const customer = await stripe.customers.create({\n                email: user.email,\n                name: user.username\n            });\n            // Save customer ID to user\n            await _lib_storage__WEBPACK_IMPORTED_MODULE_1__.storage.updateStripeCustomerId(user.id, customer.id);\n            customerId = customer.id;\n        }\n        // Create payment intent\n        const paymentIntent = await stripe.paymentIntents.create({\n            amount: 799,\n            currency: \"usd\",\n            customer: customerId,\n            payment_method_types: [\n                \"card\"\n            ],\n            description: \"Pro Plan Subscription\"\n        });\n        // Update user's subscription tier and suggestions count\n        await _lib_storage__WEBPACK_IMPORTED_MODULE_1__.storage.updateSubscriptionTier(user.id, \"pro\", PRO_SUGGESTION_COUNT);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            clientSecret: paymentIntent.client_secret,\n            subscriptionTier: \"pro\",\n            suggestionsRemaining: PRO_SUGGESTION_COUNT\n        });\n    } catch (error) {\n        console.error(\"Error creating Pro subscription:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to create Pro subscription\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NyZWF0ZS1wcm8tc3Vic2NyaXB0aW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ0g7QUFDSTtBQUVoQjtBQUU1Qiw2Q0FBNkM7QUFDN0MsSUFBSUk7QUFDSixJQUFJQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQixFQUFFO0lBQ2pDSCxTQUFTLElBQUlELDhDQUFNQSxDQUFDRSxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQixFQUFFO1FBQ2pEQyxZQUFZO0lBQ2Q7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDTixRQUFRO1lBQ1gsT0FBT0oscURBQVlBLENBQUNXLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBOEMsR0FDdkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLG1CQUFtQjtRQUNuQixNQUFNQyxPQUFPLE1BQU1aLHlEQUFjQSxDQUFDUTtRQUVsQyxJQUFJLENBQUNJLE1BQU07WUFDVCxPQUFPZCxxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUEwQixHQUNuQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSSxDQUFDQyxLQUFLQyxLQUFLLEVBQUU7WUFDZixPQUFPZixxREFBWUEsQ0FBQ1csSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUE0QixHQUNyQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEseUNBQXlDO1FBQ3pDLE1BQU1HLHVCQUF1QjtRQUU3QixnQ0FBZ0M7UUFDaEMsSUFBSUMsYUFBYUgsS0FBS0ksZ0JBQWdCO1FBRXRDLElBQUksQ0FBQ0QsWUFBWTtZQUNmLE1BQU1FLFdBQVcsTUFBTWYsT0FBT2dCLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDO2dCQUM3Q04sT0FBT0QsS0FBS0MsS0FBSztnQkFDakJPLE1BQU1SLEtBQUtTLFFBQVE7WUFDckI7WUFFQSwyQkFBMkI7WUFDM0IsTUFBTXRCLGlEQUFPQSxDQUFDdUIsc0JBQXNCLENBQUNWLEtBQUtXLEVBQUUsRUFBRU4sU0FBU00sRUFBRTtZQUN6RFIsYUFBYUUsU0FBU00sRUFBRTtRQUMxQjtRQUVBLHdCQUF3QjtRQUN4QixNQUFNQyxnQkFBZ0IsTUFBTXRCLE9BQU91QixjQUFjLENBQUNOLE1BQU0sQ0FBQztZQUN2RE8sUUFBUTtZQUNSQyxVQUFVO1lBQ1ZWLFVBQVVGO1lBQ1ZhLHNCQUFzQjtnQkFBQzthQUFPO1lBQzlCQyxhQUFhO1FBQ2Y7UUFFQSx3REFBd0Q7UUFDeEQsTUFBTTlCLGlEQUFPQSxDQUFDK0Isc0JBQXNCLENBQUNsQixLQUFLVyxFQUFFLEVBQUUsT0FBT1Q7UUFFckQsT0FBT2hCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFDdkJzQixjQUFjUCxjQUFjUSxhQUFhO1lBQ3pDQyxrQkFBa0I7WUFDbEJDLHNCQUFzQnBCO1FBQ3hCO0lBQ0YsRUFBRSxPQUFPSixPQUFPO1FBQ2R5QixRQUFRekIsS0FBSyxDQUFDLG9DQUFvQ0E7UUFFbEQsT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUFvQyxHQUM3QztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxmaW5sZVxcRGVza3RvcFxcdmlkZS1jb2JpbmdcXGNvbmdlbmlhbC1vY3RvLWNvdXNjb3VzXFxhcHBcXGFwaVxcY3JlYXRlLXByby1zdWJzY3JpcHRpb25cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcIkAvbGliL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xyXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgU3RyaXBlIGZyb20gXCJzdHJpcGVcIjtcclxuXHJcbi8vIENyZWF0ZSBTdHJpcGUgaW5zdGFuY2UgaWYga2V5IGlzIGF2YWlsYWJsZVxyXG5sZXQgc3RyaXBlOiBTdHJpcGUgfCB1bmRlZmluZWQ7XHJcbmlmIChwcm9jZXNzLmVudi5TVFJJUEVfU0VDUkVUX0tFWSkge1xyXG4gIHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVksIHtcclxuICAgIGFwaVZlcnNpb246ICcyMDIzLTEwLTE2JyxcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgLy8gQ2hlY2sgaWYgU3RyaXBlIGlzIGNvbmZpZ3VyZWRcclxuICAgIGlmICghc3RyaXBlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiBcIlN0cmlwZSBwYXltZW50IHByb2Nlc3NpbmcgaXMgbm90IGNvbmZpZ3VyZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBHZXQgY3VycmVudCB1c2VyXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIocmVxdWVzdCk7XHJcbiAgICBcclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJBdXRoZW50aWNhdGlvbiByZXF1aXJlZFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICghdXNlci5lbWFpbCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogXCJVc2VyIGhhcyBubyBlbWFpbCBhZGRyZXNzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2V0IG51bWJlciBvZiBzdWdnZXN0aW9ucyBmb3IgUHJvIHBsYW5cclxuICAgIGNvbnN0IFBST19TVUdHRVNUSU9OX0NPVU5UID0gMzA7XHJcbiAgICBcclxuICAgIC8vIENyZWF0ZSBvciBnZXQgU3RyaXBlIGN1c3RvbWVyXHJcbiAgICBsZXQgY3VzdG9tZXJJZCA9IHVzZXIuc3RyaXBlQ3VzdG9tZXJJZDtcclxuICAgIFxyXG4gICAgaWYgKCFjdXN0b21lcklkKSB7XHJcbiAgICAgIGNvbnN0IGN1c3RvbWVyID0gYXdhaXQgc3RyaXBlLmN1c3RvbWVycy5jcmVhdGUoe1xyXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgIG5hbWU6IHVzZXIudXNlcm5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgLy8gU2F2ZSBjdXN0b21lciBJRCB0byB1c2VyXHJcbiAgICAgIGF3YWl0IHN0b3JhZ2UudXBkYXRlU3RyaXBlQ3VzdG9tZXJJZCh1c2VyLmlkLCBjdXN0b21lci5pZCk7XHJcbiAgICAgIGN1c3RvbWVySWQgPSBjdXN0b21lci5pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQ3JlYXRlIHBheW1lbnQgaW50ZW50XHJcbiAgICBjb25zdCBwYXltZW50SW50ZW50ID0gYXdhaXQgc3RyaXBlLnBheW1lbnRJbnRlbnRzLmNyZWF0ZSh7XHJcbiAgICAgIGFtb3VudDogNzk5LCAvLyAkNy45OSBpbiBjZW50c1xyXG4gICAgICBjdXJyZW5jeTogXCJ1c2RcIixcclxuICAgICAgY3VzdG9tZXI6IGN1c3RvbWVySWQsXHJcbiAgICAgIHBheW1lbnRfbWV0aG9kX3R5cGVzOiBbXCJjYXJkXCJdLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJQcm8gUGxhbiBTdWJzY3JpcHRpb25cIixcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgdXNlcidzIHN1YnNjcmlwdGlvbiB0aWVyIGFuZCBzdWdnZXN0aW9ucyBjb3VudFxyXG4gICAgYXdhaXQgc3RvcmFnZS51cGRhdGVTdWJzY3JpcHRpb25UaWVyKHVzZXIuaWQsIFwicHJvXCIsIFBST19TVUdHRVNUSU9OX0NPVU5UKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXHJcbiAgICAgIGNsaWVudFNlY3JldDogcGF5bWVudEludGVudC5jbGllbnRfc2VjcmV0LFxyXG4gICAgICBzdWJzY3JpcHRpb25UaWVyOiBcInByb1wiLFxyXG4gICAgICBzdWdnZXN0aW9uc1JlbWFpbmluZzogUFJPX1NVR0dFU1RJT05fQ09VTlRcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgUHJvIHN1YnNjcmlwdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6IFwiRmFpbGVkIHRvIGNyZWF0ZSBQcm8gc3Vic2NyaXB0aW9uXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJzdG9yYWdlIiwiZ2V0Q3VycmVudFVzZXIiLCJTdHJpcGUiLCJzdHJpcGUiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJhcGlWZXJzaW9uIiwiUE9TVCIsInJlcXVlc3QiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJ1c2VyIiwiZW1haWwiLCJQUk9fU1VHR0VTVElPTl9DT1VOVCIsImN1c3RvbWVySWQiLCJzdHJpcGVDdXN0b21lcklkIiwiY3VzdG9tZXIiLCJjdXN0b21lcnMiLCJjcmVhdGUiLCJuYW1lIiwidXNlcm5hbWUiLCJ1cGRhdGVTdHJpcGVDdXN0b21lcklkIiwiaWQiLCJwYXltZW50SW50ZW50IiwicGF5bWVudEludGVudHMiLCJhbW91bnQiLCJjdXJyZW5jeSIsInBheW1lbnRfbWV0aG9kX3R5cGVzIiwiZGVzY3JpcHRpb24iLCJ1cGRhdGVTdWJzY3JpcHRpb25UaWVyIiwiY2xpZW50U2VjcmV0IiwiY2xpZW50X3NlY3JldCIsInN1YnNjcmlwdGlvblRpZXIiLCJzdWdnZXN0aW9uc1JlbWFpbmluZyIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/create-pro-subscription/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/auth.ts":
/*!*************************!*\
  !*** ./app/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePasswords: () => (/* binding */ comparePasswords),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signJWT: () => (/* binding */ signJWT),\n/* harmony export */   verifyJWT: () => (/* binding */ verifyJWT)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"(rsc)/./app/lib/storage.ts\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! util */ \"util\");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst scryptAsync = (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(crypto__WEBPACK_IMPORTED_MODULE_2__.scrypt);\n// Function to sign a new JWT\nasync function signJWT(payload) {\n    if (!process.env.JWT_SECRET) {\n        throw new Error(\"JWT_SECRET environment variable is not set\");\n    }\n    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);\n    const token = await new jose__WEBPACK_IMPORTED_MODULE_4__.SignJWT(payload).setProtectedHeader({\n        alg: \"HS256\"\n    }).setIssuedAt().setExpirationTime(\"7d\") // 7 days expiration\n    .sign(secretKey);\n    return token;\n}\n// Function to verify a JWT\nasync function verifyJWT(token) {\n    if (!process.env.JWT_SECRET) {\n        throw new Error(\"JWT_SECRET environment variable is not set\");\n    }\n    try {\n        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_5__.jwtVerify)(token, secretKey);\n        return payload;\n    } catch (error) {\n        console.error(\"JWT verification failed:\", error);\n        return null;\n    }\n}\n// Function to get the current user from a request\nasync function getCurrentUser(req) {\n    try {\n        // Get token from cookies or authorization header\n        let token;\n        if (req) {\n            // From authorization header in API routes\n            const authHeader = req.headers.get(\"authorization\");\n            if (authHeader && authHeader.startsWith(\"Bearer \")) {\n                token = authHeader.substring(7);\n            }\n        }\n        // If not found in header, try cookies\n        if (!token) {\n            const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n            token = cookieStore.get(\"authToken\")?.value;\n        }\n        if (!token) {\n            return null;\n        }\n        // Verify the token\n        const payload = await verifyJWT(token);\n        if (!payload || !payload.userId) {\n            return null;\n        }\n        // Get the user from storage\n        const user = await _storage__WEBPACK_IMPORTED_MODULE_1__.storage.getUser(payload.userId);\n        return user || null;\n    } catch (error) {\n        console.error(\"Error getting current user:\", error);\n        return null;\n    }\n}\n// Password hashing function\nasync function hashPassword(password) {\n    const salt = (0,crypto__WEBPACK_IMPORTED_MODULE_2__.randomBytes)(16).toString('hex');\n    const derivedKey = await scryptAsync(password, salt, 64);\n    return `${derivedKey.toString('hex')}.${salt}`;\n}\n// Password comparison function\nasync function comparePasswords(supplied, stored) {\n    const [hashedPassword, salt] = stored.split('.');\n    const derivedKey = await scryptAsync(supplied, salt, 64);\n    const storedKey = Buffer.from(hashedPassword, 'hex');\n    return (0,crypto__WEBPACK_IMPORTED_MODULE_2__.timingSafeEqual)(derivedKey, storedKey);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQztBQUNIO0FBRUg7QUFFMEI7QUFDN0I7QUFFakMsTUFBTVEsY0FBY0QsK0NBQVNBLENBQUNILDBDQUFNQTtBQVNwQyw2QkFBNkI7QUFDdEIsZUFBZUssUUFBUUMsT0FBbUI7SUFDL0MsSUFBSSxDQUFDQyxRQUFRQyxHQUFHLENBQUNDLFVBQVUsRUFBRTtRQUMzQixNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFFQSxNQUFNQyxZQUFZLElBQUlDLGNBQWNDLE1BQU0sQ0FBQ04sUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQ2pFLE1BQU1LLFFBQVEsTUFBTSxJQUFJbEIseUNBQU9BLENBQUNVLFNBQzdCUyxrQkFBa0IsQ0FBQztRQUFFQyxLQUFLO0lBQVEsR0FDbENDLFdBQVcsR0FDWEMsaUJBQWlCLENBQUMsTUFBTSxvQkFBb0I7S0FDNUNDLElBQUksQ0FBQ1I7SUFFUixPQUFPRztBQUNUO0FBRUEsMkJBQTJCO0FBQ3BCLGVBQWVNLFVBQVVOLEtBQWE7SUFDM0MsSUFBSSxDQUFDUCxRQUFRQyxHQUFHLENBQUNDLFVBQVUsRUFBRTtRQUMzQixNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsWUFBWSxJQUFJQyxjQUFjQyxNQUFNLENBQUNOLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtRQUNqRSxNQUFNLEVBQUVILE9BQU8sRUFBRSxHQUFHLE1BQU1ULCtDQUFTQSxDQUFDaUIsT0FBT0g7UUFDM0MsT0FBT0w7SUFDVCxFQUFFLE9BQU9lLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDRCQUE0QkE7UUFDMUMsT0FBTztJQUNUO0FBQ0Y7QUFFQSxrREFBa0Q7QUFDM0MsZUFBZUUsZUFBZUMsR0FBaUI7SUFDcEQsSUFBSTtRQUNGLGlEQUFpRDtRQUNqRCxJQUFJVjtRQUVKLElBQUlVLEtBQUs7WUFDUCwwQ0FBMEM7WUFDMUMsTUFBTUMsYUFBYUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7WUFDbkMsSUFBSUYsY0FBY0EsV0FBV0csVUFBVSxDQUFDLFlBQVk7Z0JBQ2xEZCxRQUFRVyxXQUFXSSxTQUFTLENBQUM7WUFDL0I7UUFDRjtRQUVBLHNDQUFzQztRQUN0QyxJQUFJLENBQUNmLE9BQU87WUFDVixNQUFNZ0IsY0FBYyxNQUFNaEMscURBQU9BO1lBQ2pDZ0IsUUFBUWdCLFlBQVlILEdBQUcsQ0FBQyxjQUFjSTtRQUN4QztRQUVBLElBQUksQ0FBQ2pCLE9BQU87WUFDVixPQUFPO1FBQ1Q7UUFFQSxtQkFBbUI7UUFDbkIsTUFBTVIsVUFBVSxNQUFNYyxVQUFVTjtRQUNoQyxJQUFJLENBQUNSLFdBQVcsQ0FBQ0EsUUFBUTBCLE1BQU0sRUFBRTtZQUMvQixPQUFPO1FBQ1Q7UUFFQSw0QkFBNEI7UUFDNUIsTUFBTUMsT0FBTyxNQUFNbEMsNkNBQU9BLENBQUNtQyxPQUFPLENBQUM1QixRQUFRMEIsTUFBTTtRQUNqRCxPQUFPQyxRQUFRO0lBQ2pCLEVBQUUsT0FBT1osT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsK0JBQStCQTtRQUM3QyxPQUFPO0lBQ1Q7QUFDRjtBQUVBLDRCQUE0QjtBQUNyQixlQUFlYyxhQUFhQyxRQUFnQjtJQUNqRCxNQUFNQyxPQUFPcEMsbURBQVdBLENBQUMsSUFBSXFDLFFBQVEsQ0FBQztJQUN0QyxNQUFNQyxhQUFhLE1BQU1uQyxZQUFZZ0MsVUFBVUMsTUFBTTtJQUNyRCxPQUFPLEdBQUdFLFdBQVdELFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRUQsTUFBTTtBQUNoRDtBQUVBLCtCQUErQjtBQUN4QixlQUFlRyxpQkFBaUJDLFFBQWdCLEVBQUVDLE1BQWM7SUFDckUsTUFBTSxDQUFDQyxnQkFBZ0JOLEtBQUssR0FBR0ssT0FBT0UsS0FBSyxDQUFDO0lBQzVDLE1BQU1MLGFBQWEsTUFBTW5DLFlBQVlxQyxVQUFVSixNQUFNO0lBQ3JELE1BQU1RLFlBQVlDLE9BQU9DLElBQUksQ0FBQ0osZ0JBQWdCO0lBQzlDLE9BQU96Qyx1REFBZUEsQ0FBQ3FDLFlBQVlNO0FBQ3JDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxhdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpZ25KV1QsIGp3dFZlcmlmeSB9IGZyb20gXCJqb3NlXCI7XHJcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XHJcbmltcG9ydCB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9zdXBhYmFzZVwiO1xyXG5pbXBvcnQgeyBzY3J5cHQsIHJhbmRvbUJ5dGVzLCB0aW1pbmdTYWZlRXF1YWwgfSBmcm9tIFwiY3J5cHRvXCI7XHJcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJ1dGlsXCI7XHJcblxyXG5jb25zdCBzY3J5cHRBc3luYyA9IHByb21pc2lmeShzY3J5cHQpO1xyXG5cclxuLy8gSldUIGhlbHBlcnMgZm9yIGF1dGhlbnRpY2F0aW9uXHJcbmV4cG9ydCBpbnRlcmZhY2UgSldUUGF5bG9hZCB7XHJcbiAgdXNlcklkOiBudW1iZXI7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBleHA/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHNpZ24gYSBuZXcgSldUXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduSldUKHBheWxvYWQ6IEpXVFBheWxvYWQpIHtcclxuICBpZiAoIXByb2Nlc3MuZW52LkpXVF9TRUNSRVQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldFwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNlY3JldEtleSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcclxuICBjb25zdCB0b2tlbiA9IGF3YWl0IG5ldyBTaWduSldUKHBheWxvYWQgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+KVxyXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogXCJIUzI1NlwiIH0pXHJcbiAgICAuc2V0SXNzdWVkQXQoKVxyXG4gICAgLnNldEV4cGlyYXRpb25UaW1lKFwiN2RcIikgLy8gNyBkYXlzIGV4cGlyYXRpb25cclxuICAgIC5zaWduKHNlY3JldEtleSk7XHJcblxyXG4gIHJldHVybiB0b2tlbjtcclxufVxyXG5cclxuLy8gRnVuY3Rpb24gdG8gdmVyaWZ5IGEgSldUXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlKV1QodG9rZW46IHN0cmluZyk6IFByb21pc2U8SldUUGF5bG9hZCB8IG51bGw+IHtcclxuICBpZiAoIXByb2Nlc3MuZW52LkpXVF9TRUNSRVQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkpXVF9TRUNSRVQgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgbm90IHNldFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZWNyZXRLZXkgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XHJcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgc2VjcmV0S2V5KTtcclxuICAgIHJldHVybiBwYXlsb2FkIGFzIHVua25vd24gYXMgSldUUGF5bG9hZDtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkpXVCB2ZXJpZmljYXRpb24gZmFpbGVkOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgY3VycmVudCB1c2VyIGZyb20gYSByZXF1ZXN0XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcihyZXE/OiBOZXh0UmVxdWVzdCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcclxuICB0cnkge1xyXG4gICAgLy8gR2V0IHRva2VuIGZyb20gY29va2llcyBvciBhdXRob3JpemF0aW9uIGhlYWRlclxyXG4gICAgbGV0IHRva2VuO1xyXG4gICAgXHJcbiAgICBpZiAocmVxKSB7XHJcbiAgICAgIC8vIEZyb20gYXV0aG9yaXphdGlvbiBoZWFkZXIgaW4gQVBJIHJvdXRlc1xyXG4gICAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKTtcclxuICAgICAgaWYgKGF1dGhIZWFkZXIgJiYgYXV0aEhlYWRlci5zdGFydHNXaXRoKFwiQmVhcmVyIFwiKSkge1xyXG4gICAgICAgIHRva2VuID0gYXV0aEhlYWRlci5zdWJzdHJpbmcoNyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8vIElmIG5vdCBmb3VuZCBpbiBoZWFkZXIsIHRyeSBjb29raWVzXHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gICAgICB0b2tlbiA9IGNvb2tpZVN0b3JlLmdldChcImF1dGhUb2tlblwiKT8udmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0b2tlbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWZXJpZnkgdGhlIHRva2VuXHJcbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdmVyaWZ5SldUKHRva2VuKTtcclxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC51c2VySWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSB1c2VyIGZyb20gc3RvcmFnZVxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHN0b3JhZ2UuZ2V0VXNlcihwYXlsb2FkLnVzZXJJZCk7XHJcbiAgICByZXR1cm4gdXNlciB8fCBudWxsO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2V0dGluZyBjdXJyZW50IHVzZXI6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUGFzc3dvcmQgaGFzaGluZyBmdW5jdGlvblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzaFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gIGNvbnN0IHNhbHQgPSByYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2hleCcpO1xyXG4gIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBzY3J5cHRBc3luYyhwYXNzd29yZCwgc2FsdCwgNjQpIGFzIEJ1ZmZlcjtcclxuICByZXR1cm4gYCR7ZGVyaXZlZEtleS50b1N0cmluZygnaGV4Jyl9LiR7c2FsdH1gO1xyXG59XHJcblxyXG4vLyBQYXNzd29yZCBjb21wYXJpc29uIGZ1bmN0aW9uXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wYXJlUGFzc3dvcmRzKHN1cHBsaWVkOiBzdHJpbmcsIHN0b3JlZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgY29uc3QgW2hhc2hlZFBhc3N3b3JkLCBzYWx0XSA9IHN0b3JlZC5zcGxpdCgnLicpO1xyXG4gIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBzY3J5cHRBc3luYyhzdXBwbGllZCwgc2FsdCwgNjQpIGFzIEJ1ZmZlcjtcclxuICBjb25zdCBzdG9yZWRLZXkgPSBCdWZmZXIuZnJvbShoYXNoZWRQYXNzd29yZCwgJ2hleCcpO1xyXG4gIHJldHVybiB0aW1pbmdTYWZlRXF1YWwoZGVyaXZlZEtleSwgc3RvcmVkS2V5KTtcclxufSJdLCJuYW1lcyI6WyJTaWduSldUIiwiand0VmVyaWZ5IiwiY29va2llcyIsInN0b3JhZ2UiLCJzY3J5cHQiLCJyYW5kb21CeXRlcyIsInRpbWluZ1NhZmVFcXVhbCIsInByb21pc2lmeSIsInNjcnlwdEFzeW5jIiwic2lnbkpXVCIsInBheWxvYWQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsIkVycm9yIiwic2VjcmV0S2V5IiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJ0b2tlbiIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldElzc3VlZEF0Iiwic2V0RXhwaXJhdGlvblRpbWUiLCJzaWduIiwidmVyaWZ5SldUIiwiZXJyb3IiLCJjb25zb2xlIiwiZ2V0Q3VycmVudFVzZXIiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJjb29raWVTdG9yZSIsInZhbHVlIiwidXNlcklkIiwidXNlciIsImdldFVzZXIiLCJoYXNoUGFzc3dvcmQiLCJwYXNzd29yZCIsInNhbHQiLCJ0b1N0cmluZyIsImRlcml2ZWRLZXkiLCJjb21wYXJlUGFzc3dvcmRzIiwic3VwcGxpZWQiLCJzdG9yZWQiLCJoYXNoZWRQYXNzd29yZCIsInNwbGl0Iiwic3RvcmVkS2V5IiwiQnVmZmVyIiwiZnJvbSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/storage.ts":
/*!****************************!*\
  !*** ./app/lib/storage.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SupabaseStorage: () => (/* binding */ SupabaseStorage),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supabase */ \"(rsc)/./app/lib/supabase.ts\");\n\n// Supabase Storage Implementation\nclass SupabaseStorage {\n    async getUser(id) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('id', id).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async getUserByEmail(email) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').select('*').eq('email', email).single();\n        if (error || !data) return undefined;\n        return data;\n    }\n    async createUser(insertUser) {\n        // Add current timestamp if not provided\n        const now = new Date().toISOString();\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').insert({\n            email: insertUser.email,\n            password: insertUser.password,\n            subscription_tier: insertUser.subscriptionTier,\n            suggestions_remaining: insertUser.suggestionsRemaining,\n            created_at: insertUser.createdAt\n        }).select().single();\n        if (error) {\n            console.log(insertUser);\n            throw error;\n        }\n        ;\n        return data;\n    }\n    async updateSubscriptionTier(userId, tier, suggestionsCount) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            subscriptionTier: tier,\n            suggestionsRemaining: suggestionsCount\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async decrementSuggestionsRemaining(userId) {\n        // Get the current user\n        const user = await this.getUser(userId);\n        if (!user) throw new Error('User not found');\n        // Calculate remaining suggestions (don't go below 0)\n        const remaining = Math.max(0, (user.suggestionsRemaining || 0) - 1);\n        // Update the user\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            suggestionsRemaining: remaining\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateStripeCustomerId(userId, customerId) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: customerId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async updateUserStripeInfo(userId, stripeInfo) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('users').update({\n            stripeCustomerId: stripeInfo.stripeCustomerId,\n            stripeSubscriptionId: stripeInfo.stripeSubscriptionId\n        }).eq('id', userId).select().single();\n        if (error) throw error;\n        return data;\n    }\n    async getPriceSuggestions(userId) {\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').select('*').eq('userId', userId).order('createdAt', {\n            ascending: false\n        });\n        if (error) throw error;\n        return data;\n    }\n    async createPriceSuggestion(suggestion) {\n        // Add current timestamp\n        const suggestionWithTimestamp = {\n            ...suggestion,\n            createdAt: new Date().toISOString()\n        };\n        console.log(suggestionWithTimestamp);\n        const { data, error } = await _supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from('price_suggestions').insert({\n            user_id: suggestionWithTimestamp.userId,\n            skill_type: suggestionWithTimestamp.skillType,\n            experience_level: suggestionWithTimestamp.experienceLevel,\n            project_scope: suggestionWithTimestamp.projectScope,\n            location: suggestionWithTimestamp.location,\n            target_market: suggestionWithTimestamp.targetMarket,\n            min_price: suggestionWithTimestamp.minPrice,\n            recommended_price: suggestionWithTimestamp.recommendedPrice,\n            premium_price: suggestionWithTimestamp.premiumPrice,\n            created_at: suggestionWithTimestamp.createdAt\n        }).select().single();\n        if (error) throw error;\n        return data;\n    }\n}\n// Create a storage instance\nconst storage = new SupabaseStorage();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVk7WUFBRUMsV0FBV1gsd0JBQXdCWSxRQUFRO1lBQUVDLG1CQUFtQmIsd0JBQXdCYyxnQkFBZ0I7WUFBRUMsZUFBZWYsd0JBQXdCZ0IsWUFBWTtZQUFFMUMsWUFBWTBCLHdCQUF3QnpCLFNBQVM7UUFBQSxHQUM3ZmxCLE1BQU0sR0FDTkUsTUFBTTtRQUVULElBQUlKLE9BQU8sTUFBTUE7UUFDakIsT0FBT0Q7SUFDVDtBQUNGO0FBRUEsNEJBQTRCO0FBQ3JCLE1BQU0rRCxVQUFVLElBQUlsRSxrQkFBa0IiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZmlubGVcXERlc2t0b3BcXHZpZGUtY29iaW5nXFxjb25nZW5pYWwtb2N0by1jb3VzY291c1xcYXBwXFxsaWJcXHN0b3JhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VwYWJhc2UsIFVzZXIsIEluc2VydFVzZXIsIFByaWNlU3VnZ2VzdGlvbiwgSW5zZXJ0UHJpY2VTdWdnZXN0aW9uIH0gZnJvbSAnLi9zdXBhYmFzZSc7XHJcblxyXG4vLyBFbmhhbmNlZCBpbnRlcmZhY2Ugd2l0aCBuZXcgbWV0aG9kcyBmb3IgdXNlciBtYW5hZ2VtZW50IGFuZCBwcmljaW5nXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0b3JhZ2Uge1xyXG4gIC8vIFVzZXIgbWFuYWdlbWVudFxyXG4gIGdldFVzZXIoaWQ6IG51bWJlcik6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD47XHJcbiAgZ2V0VXNlckJ5RW1haWwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlciB8IHVuZGVmaW5lZD47XHJcbiAgY3JlYXRlVXNlcih1c2VyOiBJbnNlcnRVc2VyKTogUHJvbWlzZTxVc2VyPjtcclxuICB1cGRhdGVTdWJzY3JpcHRpb25UaWVyKHVzZXJJZDogbnVtYmVyLCB0aWVyOiBzdHJpbmcsIHN1Z2dlc3Rpb25zQ291bnQ6IG51bWJlcik6IFByb21pc2U8VXNlcj47XHJcbiAgZGVjcmVtZW50U3VnZ2VzdGlvbnNSZW1haW5pbmcodXNlcklkOiBudW1iZXIpOiBQcm9taXNlPFVzZXI+O1xyXG4gIFxyXG4gIC8vIFN0cmlwZSByZWxhdGVkXHJcbiAgdXBkYXRlU3RyaXBlQ3VzdG9tZXJJZCh1c2VySWQ6IG51bWJlciwgY3VzdG9tZXJJZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPjtcclxuICB1cGRhdGVVc2VyU3RyaXBlSW5mbyh1c2VySWQ6IG51bWJlciwgc3RyaXBlSW5mbzogeyBzdHJpcGVDdXN0b21lcklkOiBzdHJpbmcsIHN0cmlwZVN1YnNjcmlwdGlvbklkOiBzdHJpbmcgfSk6IFByb21pc2U8VXNlcj47XHJcbiAgXHJcbiAgLy8gUHJpY2Ugc3VnZ2VzdGlvbnNcclxuICBnZXRQcmljZVN1Z2dlc3Rpb25zKHVzZXJJZDogbnVtYmVyKTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb25bXT47XHJcbiAgY3JlYXRlUHJpY2VTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IEluc2VydFByaWNlU3VnZ2VzdGlvbiAmIHsgXHJcbiAgICBtaW5QcmljZT86IHN0cmluZywgXHJcbiAgICByZWNvbW1lbmRlZFByaWNlPzogc3RyaW5nLCBcclxuICAgIHByZW1pdW1QcmljZT86IHN0cmluZyBcclxuICB9KTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb24+O1xyXG59XHJcblxyXG4vLyBTdXBhYmFzZSBTdG9yYWdlIEltcGxlbWVudGF0aW9uXHJcbmV4cG9ydCBjbGFzcyBTdXBhYmFzZVN0b3JhZ2UgaW1wbGVtZW50cyBJU3RvcmFnZSB7XHJcbiAgYXN5bmMgZ2V0VXNlcihpZDogbnVtYmVyKTogUHJvbWlzZTxVc2VyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAuc2VsZWN0KCcqJylcclxuICAgICAgLmVxKCdpZCcsIGlkKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvciB8fCAhZGF0YSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgIC5mcm9tKCd1c2VycycpXHJcbiAgICAgIC5zZWxlY3QoJyonKVxyXG4gICAgICAuZXEoJ2VtYWlsJywgZW1haWwpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yIHx8ICFkYXRhKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGRhdGEgYXMgVXNlcjtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVVzZXIoaW5zZXJ0VXNlcjogSW5zZXJ0VXNlcik6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgLy8gQWRkIGN1cnJlbnQgdGltZXN0YW1wIGlmIG5vdCBwcm92aWRlZFxyXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAuaW5zZXJ0KHtlbWFpbDogaW5zZXJ0VXNlci5lbWFpbCwgcGFzc3dvcmQ6IGluc2VydFVzZXIucGFzc3dvcmQsIHN1YnNjcmlwdGlvbl90aWVyOiBpbnNlcnRVc2VyLnN1YnNjcmlwdGlvblRpZXIsIHN1Z2dlc3Rpb25zX3JlbWFpbmluZzogaW5zZXJ0VXNlci5zdWdnZXN0aW9uc1JlbWFpbmluZywgY3JlYXRlZF9hdDogaW5zZXJ0VXNlci5jcmVhdGVkQXR9KVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coIGluc2VydFVzZXIpXHJcbiAgICAgIHRocm93IGVycm9yfTtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVN1YnNjcmlwdGlvblRpZXIodXNlcklkOiBudW1iZXIsIHRpZXI6IHN0cmluZywgc3VnZ2VzdGlvbnNDb3VudDogbnVtYmVyKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAudXBkYXRlKHsgXHJcbiAgICAgICAgc3Vic2NyaXB0aW9uVGllcjogdGllcixcclxuICAgICAgICBzdWdnZXN0aW9uc1JlbWFpbmluZzogc3VnZ2VzdGlvbnNDb3VudFxyXG4gICAgICB9KVxyXG4gICAgICAuZXEoJ2lkJywgdXNlcklkKVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xyXG4gICAgcmV0dXJuIGRhdGEgYXMgVXNlcjtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgZGVjcmVtZW50U3VnZ2VzdGlvbnNSZW1haW5pbmcodXNlcklkOiBudW1iZXIpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCB1c2VyXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VyKHVzZXJJZCk7XHJcbiAgICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcignVXNlciBub3QgZm91bmQnKTtcclxuICAgIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHJlbWFpbmluZyBzdWdnZXN0aW9ucyAoZG9uJ3QgZ28gYmVsb3cgMClcclxuICAgIGNvbnN0IHJlbWFpbmluZyA9IE1hdGgubWF4KDAsICh1c2VyLnN1Z2dlc3Rpb25zUmVtYWluaW5nIHx8IDApIC0gMSk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSB0aGUgdXNlclxyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IHN1Z2dlc3Rpb25zUmVtYWluaW5nOiByZW1haW5pbmcgfSlcclxuICAgICAgLmVxKCdpZCcsIHVzZXJJZClcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVN0cmlwZUN1c3RvbWVySWQodXNlcklkOiBudW1iZXIsIGN1c3RvbWVySWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3VzZXJzJylcclxuICAgICAgLnVwZGF0ZSh7IHN0cmlwZUN1c3RvbWVySWQ6IGN1c3RvbWVySWQgfSlcclxuICAgICAgLmVxKCdpZCcsIHVzZXJJZClcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFVzZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGFzeW5jIHVwZGF0ZVVzZXJTdHJpcGVJbmZvKHVzZXJJZDogbnVtYmVyLCBzdHJpcGVJbmZvOiB7IHN0cmlwZUN1c3RvbWVySWQ6IHN0cmluZywgc3RyaXBlU3Vic2NyaXB0aW9uSWQ6IHN0cmluZyB9KTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgndXNlcnMnKVxyXG4gICAgICAudXBkYXRlKHsgXHJcbiAgICAgICAgc3RyaXBlQ3VzdG9tZXJJZDogc3RyaXBlSW5mby5zdHJpcGVDdXN0b21lcklkLFxyXG4gICAgICAgIHN0cmlwZVN1YnNjcmlwdGlvbklkOiBzdHJpcGVJbmZvLnN0cmlwZVN1YnNjcmlwdGlvbklkXHJcbiAgICAgIH0pXHJcbiAgICAgIC5lcSgnaWQnLCB1c2VySWQpXHJcbiAgICAgIC5zZWxlY3QoKVxyXG4gICAgICAuc2luZ2xlKCk7XHJcbiAgICBcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICByZXR1cm4gZGF0YSBhcyBVc2VyO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBnZXRQcmljZVN1Z2dlc3Rpb25zKHVzZXJJZDogbnVtYmVyKTogUHJvbWlzZTxQcmljZVN1Z2dlc3Rpb25bXT4ge1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3ByaWNlX3N1Z2dlc3Rpb25zJylcclxuICAgICAgLnNlbGVjdCgnKicpXHJcbiAgICAgIC5lcSgndXNlcklkJywgdXNlcklkKVxyXG4gICAgICAub3JkZXIoJ2NyZWF0ZWRBdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFByaWNlU3VnZ2VzdGlvbltdO1xyXG4gIH1cclxuICBcclxuICBhc3luYyBjcmVhdGVQcmljZVN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogSW5zZXJ0UHJpY2VTdWdnZXN0aW9uICYgeyBcclxuICAgIG1pblByaWNlPzogc3RyaW5nLCBcclxuICAgIHJlY29tbWVuZGVkUHJpY2U/OiBzdHJpbmcsIFxyXG4gICAgcHJlbWl1bVByaWNlPzogc3RyaW5nIFxyXG4gIH0pOiBQcm9taXNlPFByaWNlU3VnZ2VzdGlvbj4ge1xyXG4gICAgLy8gQWRkIGN1cnJlbnQgdGltZXN0YW1wXHJcbiAgICBjb25zdCBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcCA9IHtcclxuICAgICAgLi4uc3VnZ2VzdGlvbixcclxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZyhzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcClcclxuICAgIFxyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3ByaWNlX3N1Z2dlc3Rpb25zJylcclxuICAgICAgLmluc2VydCh7dXNlcl9pZDogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAudXNlcklkLCBza2lsbF90eXBlOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5za2lsbFR5cGUsIGV4cGVyaWVuY2VfbGV2ZWw6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLmV4cGVyaWVuY2VMZXZlbCwgcHJvamVjdF9zY29wZTogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAucHJvamVjdFNjb3BlLCBsb2NhdGlvbjogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAubG9jYXRpb24sIHRhcmdldF9tYXJrZXQ6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLnRhcmdldE1hcmtldCwgbWluX3ByaWNlOiBzdWdnZXN0aW9uV2l0aFRpbWVzdGFtcC5taW5QcmljZSwgcmVjb21tZW5kZWRfcHJpY2U6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLnJlY29tbWVuZGVkUHJpY2UsIHByZW1pdW1fcHJpY2U6IHN1Z2dlc3Rpb25XaXRoVGltZXN0YW1wLnByZW1pdW1QcmljZSwgY3JlYXRlZF9hdDogc3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAuY3JlYXRlZEF0fSlcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5zaW5nbGUoKTtcclxuICAgIFxyXG4gICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcclxuICAgIHJldHVybiBkYXRhIGFzIFByaWNlU3VnZ2VzdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBhIHN0b3JhZ2UgaW5zdGFuY2VcclxuZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3VwYWJhc2VTdG9yYWdlKCk7Il0sIm5hbWVzIjpbInN1cGFiYXNlIiwiU3VwYWJhc2VTdG9yYWdlIiwiZ2V0VXNlciIsImlkIiwiZGF0YSIsImVycm9yIiwiZnJvbSIsInNlbGVjdCIsImVxIiwic2luZ2xlIiwidW5kZWZpbmVkIiwiZ2V0VXNlckJ5RW1haWwiLCJlbWFpbCIsImNyZWF0ZVVzZXIiLCJpbnNlcnRVc2VyIiwibm93IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiaW5zZXJ0IiwicGFzc3dvcmQiLCJzdWJzY3JpcHRpb25fdGllciIsInN1YnNjcmlwdGlvblRpZXIiLCJzdWdnZXN0aW9uc19yZW1haW5pbmciLCJzdWdnZXN0aW9uc1JlbWFpbmluZyIsImNyZWF0ZWRfYXQiLCJjcmVhdGVkQXQiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlU3Vic2NyaXB0aW9uVGllciIsInVzZXJJZCIsInRpZXIiLCJzdWdnZXN0aW9uc0NvdW50IiwidXBkYXRlIiwiZGVjcmVtZW50U3VnZ2VzdGlvbnNSZW1haW5pbmciLCJ1c2VyIiwiRXJyb3IiLCJyZW1haW5pbmciLCJNYXRoIiwibWF4IiwidXBkYXRlU3RyaXBlQ3VzdG9tZXJJZCIsImN1c3RvbWVySWQiLCJzdHJpcGVDdXN0b21lcklkIiwidXBkYXRlVXNlclN0cmlwZUluZm8iLCJzdHJpcGVJbmZvIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiLCJnZXRQcmljZVN1Z2dlc3Rpb25zIiwib3JkZXIiLCJhc2NlbmRpbmciLCJjcmVhdGVQcmljZVN1Z2dlc3Rpb24iLCJzdWdnZXN0aW9uIiwic3VnZ2VzdGlvbldpdGhUaW1lc3RhbXAiLCJ1c2VyX2lkIiwic2tpbGxfdHlwZSIsInNraWxsVHlwZSIsImV4cGVyaWVuY2VfbGV2ZWwiLCJleHBlcmllbmNlTGV2ZWwiLCJwcm9qZWN0X3Njb3BlIiwicHJvamVjdFNjb3BlIiwibG9jYXRpb24iLCJ0YXJnZXRfbWFya2V0IiwidGFyZ2V0TWFya2V0IiwibWluX3ByaWNlIiwibWluUHJpY2UiLCJyZWNvbW1lbmRlZF9wcmljZSIsInJlY29tbWVuZGVkUHJpY2UiLCJwcmVtaXVtX3ByaWNlIiwicHJlbWl1bVByaWNlIiwic3RvcmFnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/storage.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/supabase.ts":
/*!*****************************!*\
  !*** ./app/lib/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\n// Check for required environment variables\nif (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {\n    throw new Error(\"SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase client\");\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL3N1cGFiYXNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXFEO0FBRXJELDJDQUEyQztBQUMzQyxJQUFJLENBQUNDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWSxJQUFJLENBQUNGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQUU7SUFDL0QsTUFBTSxJQUFJQyxNQUNSO0FBRUo7QUFFQSx5QkFBeUI7QUFDbEIsTUFBTUMsV0FBV04sbUVBQVlBLENBQ2xDQyxRQUFRQyxHQUFHLENBQUNDLFlBQVksRUFDeEJGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCLEVBQzdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGZpbmxlXFxEZXNrdG9wXFx2aWRlLWNvYmluZ1xcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXGFwcFxcbGliXFxzdXBhYmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xyXG5cclxuLy8gQ2hlY2sgZm9yIHJlcXVpcmVkIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG5pZiAoIXByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCB8fCAhcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICBcIlNVUEFCQVNFX1VSTCBhbmQgU1VQQUJBU0VfQU5PTl9LRVkgbXVzdCBiZSBzZXQgZm9yIFN1cGFiYXNlIGNsaWVudFwiLFxyXG4gICk7XHJcbn1cclxuXHJcbi8vIENyZWF0ZSBTdXBhYmFzZSBjbGllbnRcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KFxyXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCxcclxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9BTk9OX0tFWVxyXG4pO1xyXG5cclxuLy8gRGVmaW5lIHR5cGVzIGZvciBkYXRhYmFzZSB0YWJsZXNcclxuZXhwb3J0IHR5cGUgVXNlciA9IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzdWJzY3JpcHRpb25UaWVyOiBzdHJpbmc7XHJcbiAgc3VnZ2VzdGlvbnNSZW1haW5pbmc6IG51bWJlcjtcclxuICBzdHJpcGVDdXN0b21lcklkPzogc3RyaW5nO1xyXG4gIHN0cmlwZVN1YnNjcmlwdGlvbklkPzogc3RyaW5nO1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJbnNlcnRVc2VyID0gT21pdDxVc2VyLCAnaWQnPjtcclxuXHJcbmV4cG9ydCB0eXBlIFByaWNlU3VnZ2VzdGlvbiA9IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIHVzZXJJZDogbnVtYmVyO1xyXG4gIHNraWxsVHlwZTogc3RyaW5nO1xyXG4gIGV4cGVyaWVuY2VMZXZlbDogc3RyaW5nO1xyXG4gIHByb2plY3RTY29wZTogc3RyaW5nO1xyXG4gIGxvY2F0aW9uPzogc3RyaW5nO1xyXG4gIHRhcmdldE1hcmtldD86IHN0cmluZztcclxuICBtaW5QcmljZTogc3RyaW5nO1xyXG4gIHJlY29tbWVuZGVkUHJpY2U6IHN0cmluZztcclxuICBwcmVtaXVtUHJpY2U6IHN0cmluZztcclxuICBjcmVhdGVkQXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSW5zZXJ0UHJpY2VTdWdnZXN0aW9uID0gT21pdDxQcmljZVN1Z2dlc3Rpb24sICdpZCcgfCAnbWluUHJpY2UnIHwgJ3JlY29tbWVuZGVkUHJpY2UnIHwgJ3ByZW1pdW1QcmljZScgfCAnY3JlYXRlZEF0Jz47Il0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInByb2Nlc3MiLCJlbnYiLCJTVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9BTk9OX0tFWSIsIkVycm9yIiwic3VwYWJhc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/supabase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-pro-subscription%2Froute&page=%2Fapi%2Fcreate-pro-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-pro-subscription%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-pro-subscription%2Froute&page=%2Fapi%2Fcreate-pro-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-pro-subscription%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_create_pro_subscription_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/create-pro-subscription/route.ts */ \"(rsc)/./app/api/create-pro-subscription/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/create-pro-subscription/route\",\n        pathname: \"/api/create-pro-subscription\",\n        filename: \"route\",\n        bundlePath: \"app/api/create-pro-subscription/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\finle\\\\Desktop\\\\vide-cobing\\\\congenial-octo-couscous\\\\app\\\\api\\\\create-pro-subscription\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_finle_Desktop_vide_cobing_congenial_octo_couscous_app_api_create_pro_subscription_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjcmVhdGUtcHJvLXN1YnNjcmlwdGlvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY3JlYXRlLXByby1zdWJzY3JpcHRpb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjcmVhdGUtcHJvLXN1YnNjcmlwdGlvbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNmaW5sZSU1Q0Rlc2t0b3AlNUN2aWRlLWNvYmluZyU1Q2NvbmdlbmlhbC1vY3RvLWNvdXNjb3VzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNEQ7QUFDekk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGZpbmxlXFxcXERlc2t0b3BcXFxcdmlkZS1jb2JpbmdcXFxcY29uZ2VuaWFsLW9jdG8tY291c2NvdXNcXFxcYXBwXFxcXGFwaVxcXFxjcmVhdGUtcHJvLXN1YnNjcmlwdGlvblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NyZWF0ZS1wcm8tc3Vic2NyaXB0aW9uL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY3JlYXRlLXByby1zdWJzY3JpcHRpb25cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2NyZWF0ZS1wcm8tc3Vic2NyaXB0aW9uL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcZmlubGVcXFxcRGVza3RvcFxcXFx2aWRlLWNvYmluZ1xcXFxjb25nZW5pYWwtb2N0by1jb3VzY291c1xcXFxhcHBcXFxcYXBpXFxcXGNyZWF0ZS1wcm8tc3Vic2NyaXB0aW9uXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-pro-subscription%2Froute&page=%2Fapi%2Fcreate-pro-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-pro-subscription%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/jose","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions","vendor-chunks/stripe","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/qs","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/object-inspect","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/call-bind","vendor-chunks/side-channel","vendor-chunks/set-function-length","vendor-chunks/hasown","vendor-chunks/has-property-descriptors","vendor-chunks/get-intrinsic","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/define-data-property"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcreate-pro-subscription%2Froute&page=%2Fapi%2Fcreate-pro-subscription%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcreate-pro-subscription%2Froute.ts&appDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cfinle%5CDesktop%5Cvide-cobing%5Ccongenial-octo-couscous&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();