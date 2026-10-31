# Spring Boot + Angular Maven Template

[![Build](https://github.com/AlexKochev/mvn-spring-angular-app-template/actions/workflows/build.yml/badge.svg)](https://github.com/AlexKochev/mvn-spring-angular-app-template/actions/workflows/build.yml)

A starting point for new projects that need a **Java (Spring Boot) backend** and an **Angular frontend** in a single Maven multi-module repository. Clone it, rename it, and start adding features.

The Angular app is compiled during the Maven build and packaged into the Spring Boot jar, so the result is **one runnable jar** that serves both the REST API and the UI.

## Stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Backend  | Java 25, Spring Boot 4.1 (Spring MVC), Lombok |
| Frontend | Angular 22, TypeScript 6.0, SCSS, SSR/prerender, Karma + Jasmine |
| Build    | Maven (multi-module), npm / Angular CLI      |

## Prerequisites

- **JDK 25**
- **Maven 3.9+**
- **Node.js 24 LTS** on your `PATH` (Angular 22 needs Node 22.22+ or 24.15+; older versions fail the build). With nvm: `nvm install 24 && nvm alias default 24`. No global Angular CLI is needed: the build uses the project's own copy.
- Chrome, only if you run the frontend unit tests

## Project layout

```
.
├── .github/workflows/      CI: build + tests on push/PR, plus a weekly scheduled build
├── Dockerfile              Multi-stage build -> runtime image with the single jar
├── pom.xml                 Parent POM: Java version, Spring Boot BOM, module list
├── backend/                Spring Boot application
│   ├── pom.xml
│   └── src/main/java/com/kochev/application/
│       ├── Application.java
│       └── controllers/GreetingController.java   Sample REST endpoint
├── frontend/               Angular application (built first)
│   ├── pom.xml             Runs `ng build` and copies the output into the backend
│   ├── angular.json
│   ├── server.ts           Express SSR server (only used for `serve:ssr`)
│   └── src/app/            Components (nav-bar, footer, ...)
```

## Running in development

Run the two halves separately for fast feedback.

**Backend** (http://localhost:8080):

```bash
cd backend
mvn spring-boot:run
```

Try it: `curl localhost:8080/greeting?name=Ada`

**Frontend** (http://localhost:4200, live reload):

```bash
cd frontend
npm install
npm start
```

> The dev server does not proxy API calls to the backend yet. When you start calling the API from Angular, add a `proxy.json` mapping `/greeting` (or `/api`) to `http://localhost:8080` and pass it via `ng serve --proxy-config`.

## Building a single jar

From the repository root:

```bash
mvn clean package
java -jar backend/target/backend-1.0-SNAPSHOT.jar
```

The build does this, in order:

1. `frontend`: `npm ci`, then `ng build --configuration production` writes to `frontend/dist/frontend/`.
2. `frontend`: copies `dist/frontend/browser/` into `backend/src/main/resources/static/`.
3. `backend`: compiles, runs tests, and repackages everything as an executable jar.

The module order in the root `pom.xml` matters: `frontend` is listed before `backend` so the UI is in `static/` before the jar is packaged.

Notes:

- `backend/src/main/resources/static/` is generated output (git-ignored, removed by `mvn clean`). Don't edit it by hand.
- The `npm`, `npx` and `cp` executables must be on the `PATH` of the machine running Maven (macOS/Linux as written).

## Tests

```bash
mvn test                                         # backend
cd frontend && npx ng test --watch=false --browsers=ChromeHeadless   # frontend
```

## Using this as a template

1. Copy the repository and delete `.git`, then `git init`.
2. Rename `com.kochev` / `mvn-spring-angular-app` in the three `pom.xml` files and move the Java package under `backend/src/main/java`.
3. Rename the Angular project in `frontend/angular.json` and `frontend/package.json` (and the `dist/frontend` paths in `frontend/pom.xml` if you rename the project).
4. Replace `GreetingController` and the sample components with your own.

## Continuous integration

`.github/workflows/build.yml` runs the frontend tests, `mvn clean verify` and the Docker build on every push and pull request. It also runs weekly, so a dependency release that breaks the template shows up as a failing badge rather than a surprise when you start a project.

## Upgrading versions

- **Java / Spring Boot / Lombok** are set as properties in the root `pom.xml` (`java.version`, `spring-boot.version`, `lombok.version`). Dependency versions come from the Spring Boot BOM, so the backend `pom.xml` mostly lists dependencies without versions.
- **Angular**: use `ng update @angular/core @angular/cli`, one major version at a time.
- **TypeScript** must stay within the range the current Angular version supports (Angular 22 requires `>=6.0 <6.1`).

## Docker

A single multi-stage `Dockerfile` at the repo root builds everything (JDK 25, Maven, Node 24) and produces a small runtime image containing only the jar on a JRE:

```bash
docker build -t spring-angular-template .
docker run --rm -p 8080:8080 spring-angular-template
```

Then open http://localhost:8080 (UI) or http://localhost:8080/greeting (API). The image runs as a non-root user.
