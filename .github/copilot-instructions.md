## Copilot Instructions – Frontend Website Builder

### Scope
Frontend-only drag-and-drop website builder.
No real backend — everything is mocked.

### Rules
* No dead UI: every button, link, and input must work
* Design: Notion-like (clean, minimal, consistent)
* Always use shadcn components, custom components only when necessary as a last resort
* Zero errors: no TypeScript or lint issues (`npm run lint` must pass)
* Any page/ui created or modified always add the dark version also



### Behavior
* UI must be state-driven
* All interactions must produce real changes
* No hardcoded/static fake behavior

### API Mocking
* Mock all APIs
* Must include: loading, success, error states
* Keep responses realistic and consistent

### Backend Contract (`http.md`)
For every feature include the routes we needed (It will help us later to create the backend):

* Method
* Endpoint
* Request example
* Response example
