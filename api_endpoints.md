`https://build-my-app.herokuapp.com/` // backend server

## **/api/account**

- any route under account is authenticated, token must be passed through header

## **/api/account/admin**

- all admin routes not developed yet. might not go with admin routes

---

## **api/account/developer**

| Method | endpont                                           | Response | description |
| :----: | :------------------------------------------------ | -------- | ----------- |
|  PUT   | `/api/account/developer/update-profile-developer` |          |             |
| DELETE | `/api/account/developer/delete-profile-developer` |          |             |
|  POST  | `/api/account/developer/submit-plan/:project_id`  |          |             |
|  PUT   | `/api/account/developer/update-plan/:plan_id`     |          |             |
| DELETE | `/api/account/developer/delete-plan/:plan_id`     |          |             |

### Response `200` `/api/developer/update-profile-developer`

#### Req.body

- any field is optional

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "email@email.com",
  "devType": "moblie", // -- ["mobile", "andriod", "iOS", "web"] --
  "skills": "skill 1, skill 2, ...",
  "linkedIn": "url",
  "gitHub": "url",
  "twitter": "url"
}
```

### Response `200` `/api/developer/delete-profile-developer`

- send token to headers
- deletes user account

### Response `200` `/api/developer/submit-plan/:plan-id`

#### Req.body

```json
{
  "name": "title of plan",
  "description": "description of plan",
  "technologiesToUse": "technology 1, technology 2, technology 3,...",
  "budget": "200",
  "dueDate": "unix time code"
}
```

### Response `200` `/api/developer/update-plan/:plan-id`

#### Req.body

- any field is optional

```json
{
  "name": "title of plan",
  "description": "description of plan",
  "technologiesToUse": "technology 1, technology 2, technology 3,...",
  "budget": "200",
  "dueDate": "unix time code",
  "planStatus": "proposal" // ["proposal", "in progress", "completed"]
}
```

### Response `200` `/api/developer/delete-plan/:plan-id`

- send token to headers
- deletes user account

---

## **/api/account/project-owner**

| Method | endpont                                                   | Response | description |
| :----: | :-------------------------------------------------------- | -------- | ----------- |
|  PUT   | `/api/account/project-owner/update-profile-project-owner` |          |             |
| DELETE | `/api/account/project-owner/delete-profile-project-owner` |          |             |
|  GET   | `/api/account/project-owner/project-page/:project_id`     |          |             |
|  POST  | `/api/account/project-owner/create-project`               |          |             |
|  PUT   | `/api/account/project-owner/update-project/:project_id`   |          |             |
|  PUT   | `/api/account/project-owner/accept-plan/:project_id`      |          |             |
| DELETE | `/api/account/project-owner/delete-project/:project_id`   |          |             |

### Response `200` `/api/account/project-owner/update-profile-project-owner`

#### Req.body

- any field is optional

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "email@email.com",
  "linkedIn": "url",
  "gitHub": "url",
  "twitter": "url"
}
```

### Response `200` `/api/account/project-owner/delete-profile-project-owner`

- send token to headers
- deletes user account

### Response `200` `/api/account/project-owner/project-page/:project_id`

- don't think this will be needed. there is an endpoint in `/api/projects` that returns a page view for a project

```json
{
  "id": "1",
  "name": "title of project",
  "description": "description of project",
  "image_url": "url", // wireframes for project
  "budget": "200",
  "dueDate": "unix time code",
  "projectStatus": "proposal",
  "paymentStatus": "unpaid",
  "user_id": "1" // project owner id
}
```

### Response `200` `/api/account/project-owner/create-project`

#### Req.body

```json
{
  "name": "title of project",
  "description": "description of project",
  "image_url": "url", // wireframes for project
  "budget": "200",
  "dueDate": "unix time code"
}
```

### Response `200` `/api/account/project-owner/update-project/:project_id`

#### Req.body

- each field is optional

```json
{
  "name": "title of project",
  "description": "description of project",
  "image_url": "url", // wireframes for project
  "budget": "200",
  "dueDate": "unix time code",
  "projectStatus": "",
  "paymentStatus": ""
}
```

### Response `200` `/api/account/project-owner/accept-plan/:project_id

#### Req.body

```json
{
  "projectStatus": "selected"
}
```

### Response `200` `/api/account/project-owner/delete-project/:project_id`

- send token to headers
- deletes user account

---

## **/api/account/onboarding**

| Method | endpont                         | Response | description |
| :----: | :------------------------------ | -------- | ----------- |
|  post  | `api/account/onboarding/signup` |          |             |
|  get   | `/api/account/onboarding/login` |          |             |

### Response `200` `/api/account/onboarding/signup`

#### Req.body

```json
{
  "firstName": "First",
  "lastName": "Last",
  "email": "email@email.com", // unique
  "role": "role", // Project Owner, Developer
  "skills": "skill 1, skill 2, skill 3...", // * list of skills for Developer
  "devType": "web", // * type for Developer, [web, android, iOS]
  "linkedIn": "url",
  "gitHub": "url",
  "twitter": "url"
}
```

`*` `Developer field`

### Response `200` `/api/account/onboarding/login`

- every time this endpoint is access the user is updated with the latest time

```json
{
  "id": 1,
  "firstName": "First",
  "lastName": "Last",
  "email": "email@email.com", // unique
  "role": "role", // Project Owner, Developer
  "skills": "skill 1, skill 2, skill 3...", // * list of skills for Developer
  "devType": "web", // * type for Developer, [web, android, iOS]
  "linkedIn": "url",
  "gitHub": "url",
  "twitter": "url"
}
```

`*` `Developer field`

---

## **/api/projects**

| Method | endpont                                           | Response | description |
| :----: | :------------------------------------------------ | -------- | ----------- |
|  GET   | `/`                                               |          |             |
|  GET   | `/api/projects/paginated-list-of-projects`        |          |             |
|  GET   | `/api/projects/plan-list-project/:project_id`     |          |             |
|  GET   | `/api/projects/plan-list-developer/:developer_id` |          |             |
|  GET   | `/api/projects/project-view/:project_id`          |          |             |
|  GET   | `/api/projects/plan-view/:plan_id`                |          |             |
|  GET   | `/api/projects/project-list/:project_owner_id`    |          |             |
|  GET   | `/api/projects/developer-feedback/:developer_id`  |          |             |

### Response `200` `/api/projects/`

```json
[
  {
    "id": "1",
    "name": "title of project",
    "description": "description of project",
    "image_url": "url", // wireframes for project
    "budget": "200",
    "dueDate": "unix time code",
    "projectStatus": "proposal",
    "paymentStatus": "unpaid",
    "user_id": "1", // project owner id
    "created_at": "unix time stamp",
    "updated_at": "unix time stamp"
  }
]
```

### Response `200` `/api/projects/paginated-list-of-projects`

- list from most recently created `created_at`
- paginated list of projects
- query fields
- `per` listed amount of projects per a page
- `page` current page viewing
- `total_pages` how many pages for a project
- `has_more` when `false` no more pages to request, when `true` there are pages left to request

```json
{
  "per": 15,
  "page": 1,
  "total_pages": 5,
  "has_more": true,
  "projects": [
    {
      "id": "1",
      "firstName": "First",
      "lastName": "Last",
      "email": "email@email.com",
      "role": "Developer",
      "skills": "skill 1, skill 2, skill 3...",
      "devType": "web", // [web, iOS, andriod]
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created_at": "YYYY MM DD hh:mm:ss"
    }
  ]
}
```

### Response `200` `/api/projects/plan-list-project/:project_id`

- project list of plans

```json
[
  {
    "id": "1",
    "name": "title of plan",
    "description": "description of plan",
    "technologiesToUse": "technology 1, technology 2, technology 3,...",
    "budget": "200",
    "dueDate": "unix time code",
    "planStatus": "proposal", // ["proposal", "in progress", "completed"]
    "user_id": "1", // developer id
    "updated_at": "YYYY MM DD hh:mm:ss"
  }
]
```

### Response `200` `/api/projects/plan-list-developer/:developer_id`

- Developer list of plans `user_id: 1`

```json
[
  {
    "id": "1",
    "name": "title of plan",
    "description": "description of plan",
    "technologiesToUse": "technology 1, technology 2, technology 3,...",
    "budget": "200",
    "dueDate": "unix time code",
    "planStatus": "proposal", // ["proposal", "in progress", "completed"]
    "user_id": "1", // developer id
    "updated_at": "YYYY MM DD hh:mm:ss"
  }
]
```

### Response `200` `/api/projects/project-view/:project_id`

- page view of a project

```json
{
  "id": "1",
  "name": "title of project",
  "description": "description of project",
  "image_url": "url", // wireframes for project
  "budget": "200",
  "dueDate": "unix time code",
  "projectStatus": "proposal",
  "paymentStatus": "unpaid",
  "user_id": "1" // project owner id
}
```

### Response `200` `/api/projects/plan-view/:plan_id`

- page view of a plan

```json
{
  "id": "1",
  "name": "title of plan",
  "description": "description of plan",
  "technologiesToUse": "technology 1, technology 2, technology 3,...",
  "budget": "200",
  "dueDate": "unix time code",
  "planStatus": "completed", // ["proposal", "in progress", "completed"]
  "user_id": "1" // developer id
}
```

### Response `200` `/api/projects/project-list/:project_owner_id`

- list of projects for project owner

```json
[
  {
    "id": "1",
    "name": "title of project",
    "description": "description of project",
    "image_url": "url", // wireframes for project
    "budget": "200",
    "dueDate": "unix time code",
    "projectStatus": "proposal", // [proposal, in progress, completed]
    "paymentStatus": "unpaid", // paid, unpaid
    "feadback": "the developer did amazing", // feed back for the developer
    "user_id": "1", // project owner id
    "created_at": "YYYY MM DD hh:mm:ss"
  }
]
```

### Response `200` `/api/projects/developer-feedback/:developer_id`

- feedback of a developer on each project

```json
{}
```

---

## **/api/users**

| Method | endpont                       | Response                                                                                 | description                                               |
| :----: | :---------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
|  GET   | `/api/users/profile/:user_id` | `200` - returns user data </br> `404` - user not found                                   | User data for profile page                                |
|  GET   | `/api/users/list-users`       | `200` - list of all users </br> `404` - users not found </br> `500` - server error       | list of all users, no specific purpose other than testing |
|  GET   | `/api/users/list-developers`  | `200` - list of developers </br> `404` - developers not found </br> `500` - server error | paginated list of developers                              |

### Response `200` `/api/users/profile/:user_id`

```json
{
  "id": "1",
  "firstName": "First",
  "lastName": "Last",
  "email": "email@email.com",
  "role": "role", // Project Owner, Developer
  "skills": "skill 1, skill 2, skill 3...", // list of skills for Developer
  "devType": "web", // type for Developer, [web, android, iOS]
  "linkedIn": "url",
  "gitHub": "url",
  "twitter": "url"
}
```

`*` `Developer field`

### Response `200` `/api/users/list-users`

```json
[
  {
    "id": "1",
    "firstName": "First",
    "lastName": "Last",
    "email": "email@email.com",
    "role": "role", // Project Owner, Developer
    "skills": "skill 1, skill 2, skill 3...", // * list of skills for Developer
    "devType": "web", // * type for Developer, [web, android, iOS]
    "linkedIn": "url",
    "gitHub": "url",
    "twitter": "url",
    "updated_at": "YYYY MM DD hh:mm:ss"
  }
]
```

`*` `Developer field`

### Response `200` `/api/users/list-developers`

- list from most recently activity updated `updated_at`
- paginated list of developers
- query fields
- `per` listed amount of projects per a page
- `page` current page viewing
- `total_pages` how many pages for a project
- `has_more` when `false` no more pages to request, when `true` there are pages left to request

```json
{
  "per": 15,
  "page": 1,
  "total_pages": 5,
  "has_more": true,
  "developers": [
    {
      "id": "1",
      "firstName": "First",
      "lastName": "Last",
      "email": "email@email.com",
      "role": "Developer",
      "skills": "skill 1, skill 2, skill 3...",
      "devType": "web", // * type for Developer, [web, android, iOS]
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "updated_at": "YYYY MM DD hh:mm:ss"
    }
  ]
}
```
