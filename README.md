Modular Blue-Green Pricing API with Configurable Routing
========================================================
Objective:
- To build a modular backend service that demonstrate blue-green deployment routing for client.

Features:
- It exposes a REST API endpoint "/pricing" that serves pricing data based on routing rules.
- The backend serves different pricing versions i.e. "blue" and "green" to users based on configurable routing rules.
- Pricing data is loaded from JSON files for simplicity without database (we can use database instead of static JSON files).
- Routing rules and percentages are configurable without hardcoding in the codebase.
- If cookieRouting is enabled and no cookie present in request data. It sends a cookie to the client.

Backend API:
- It supports configurable routing rules, selectable via a config file or environment variables, including:
- #1- Client IP-based routing:it send response pricing data based on ip address. I did not use any library just added a simple condition, which can be changed later because it's only for testing pupose(in local machine).
- #2- Header-based routing (e.g., custom header "X-Version"): It receives a value from header i.e. X-Version:"blue"/"green" and give response based on the header value.
- #3- Cookie-based routing for sticky sessions:If the cookie "pricing_version" present inside request it get the value from the cookie. (value should be "green" or "blue" else it returns "blue" always).
- #4- If all the above method fails: Generates a random number between 1 and 100, 70% traffic goes to blue environment and 30% traffic goes to green environment.

How to run project in local machine:
- open the project root folder in code editor (ex. vscode)
- 1st command: "npm install" (for first time, internet connection needed)
- 2nd command: "npm run dev" (to start the server)
