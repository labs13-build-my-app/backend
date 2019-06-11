`https://build-my-app.herokuapp.com` // backend server

- /api/users
  - all endpoints are `get` requests
- /api/projects
  - all endoints are `get` request
- /api/plans
  - I am not full sure about this route need to double check on it I think all plans might be under just project route
- /api/account

* authencticated route must send token through header
* /api/account/admin
  - admin route
* /api/account/developer
  - developer route
* /api/account/project-owner
  - project-owner route
* /api/account/onboarding
  - onboarding route

- authenticated route provide token in header
- /api/account/admin

  - `/api/account/admin/test-admin`
  - `/api/account/admin/create-admin`
  - `/api/account/admin/sign-in`
  - `/api/account/admin/dashboard-admin`
  - `/api/account/admin/project-view/:id`
  - `/api/account/admin/project-status-update/:id`
  - `/api/account/admin/process-payment/:id`

- authenticated route provide token in header
- /api/account/developer

  - `/api/account/developer/test-developer`
  - `/api/account/developer/dashboard-developer/:id`
  - `/api/account/developer/update-profile-developer`
  - `/api/account/developer/delete-profile-developer`
  - `/api/account/developer/submit-plan-developer`
  - `/api/account/developer/update-plan-developer`
  - `/api/account/developer/delete-plan-developer`
  - `/api/account/developer/message-developer`

- authenticated route provide token in header
- /api/account/project-owner

  - `/api/account/project-owner/test-project-owner`
  - `/api/account/project-owner/dashboard-project-owner`
  - `/api/account/project-owner/update-profile-project-owner`
  - `/api/account/project-owner/delete-profile-project-owner`
  - `/api/account/project-owner/create-project-project-owner`
  - `/api/account/project-owner/update-project-project-owner`
  - `/api/account/project-owner/delete-project-project-owner`
  - `/api/account/project-owner/submit-payment/:id`
  - `/api/account/project-owner/message-project-owner`

- authenticated route provide token in header
- /api/account/onboarding/
  - `/api/account/onboarding/test-onboarding`
  - `/api/account/onboarding/signup`
  - `/api/account/onboarding/login`

/api/projects

- `/api/projects/test-projects`
- `/api/projects/list-all-projects`
- `/api/projects/plan-list`
- `/api/projects/project-owner`
- `/api/projects/submitted-plan/:id`
- `/api/projects/project/:id`

/api/users

- `/api/users/test-users`
- `/api/users/list-all-users`
- `/api/users/developers`
- `/api/users/project-owners`
- `/api/users/developer/:developer-id`
- `/api/users/project-owner/:project-owner-id`

## **list of routes**

- /api/users
- /api/projects
- /api/plans

- /api/account/admin
- /api/account/developer
- /api/account/project-owner
- /api/account/onboarding

---

## **/api/account/admin**

- `api/account/admin/test-admin`
  - sends a string for testing this route.
- `api/account/admin/create-admin`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/admin/sign-in`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/admin/dashboard-admin`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/admin/project-view/:id`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/admin/project-status-update/:id`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/admin/process-payment/:id`
  - ```json
    {
      "": "" // schema not drafted
    }
    ```

---

## **api/account/developer**

- `api/account/developer/test-developer`
  - sends a string for testing this route.
- `api/account/developer/dashboard-developer`
  - list of plans by developer
  - get request
  - ```json
    {
      "id": "0",
      "name": "title",
      "description": "details of my plan to your project",
      "technologiesToUse": "tech 1, tech 2, ...",
      "budget": "700", // -- interger type --
      "dueDate": "195456534554", // -- unix time code --
      "plansStatus": "submited", // -- ["submitted", "in progress", "completed"] --
      "user_id": "2", // -- id of user that submitted plan --
      "project_id": "33" // -- id of project that this plan is submitted to --
    }
    ```
- `api/account/developer/update-profile-developer`
  - update profile of developer
  - all are optional fields
  - post request
  - ```json
    {
      "sub": "authID",
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "devType": "moblie", // -- ["mobile", "andriod", "iOS", "web"] --
      "skills": "skill 1, skill 2, ...",
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```
- `api/account/developer/delete-profile-developer`
  - no schema for this
  - send token to headers
- `api/account/developer/submit-plan-developer/:project_id`
  - all fields required
  - post request
  - ```json
    {
      "name": "title of plan",
      "description": "description of plan",
      "technologiesToUse": "technology 1, technology 2, technology 3, ...",
      "budget": "200",
      "dueDate": "unix time code",
      "plansStatus": "submitted" // ["submitted", "in progress", "completed"]
    }
    ```
- `api/account/developer/update-plan-developer`
  - all fields optional
  - post request
  - ```json
    {
      "name": "title of plan",
      "description": "description of plan",
      "technologiesToUse": "technology 1, technology 2, technology 3, ...",
      "budget": "200",
      "dueDate": "unix time code",
      "plansStatus": "submitted" // ["submitted", "in progress", "completed"]
    }
    ```
- `api/account/developer/delete-plan-developer/:id`
  - rules to delete
  - "user_id": "1" === the developer id
  - planStatus === submitted
- `api/account/developer/message-developer`
  - no table for messages yet. need to look into twilo documentation
  - ```json
    {
      "": "" // schema not drafted
    }
    ```

---

## **api/account/project-owner**

- `api/account/project-owner/test-project-owner`
  - sends a string for testing this route.
- `api/account/project-owner/dashboard-project-owner`
  - ```json
    {
      "id": "1",
      "name": "title of project",
      "description": "description of project",
      "image_url": "url", // wireframes for project
      "budget": "200",
      "dueDate": "unix time code",
      "projectStatus": "proposal", // proposal, in progress, completed
      "paymentStatus": "unpaid", // paid, unpaid
      "feadback": "the developer did amazing", // feed back for the developer
      "user_id": "1", // project owner id
      "created_at": "unix time stamp",
      "updated_at": "unix time stamp"
    }
    ```
- `api/account/project-owner/update-profile-project-owner`
  - ```json
    {
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```
- `api/account/project-owner/delete-profile-project-owner`
  - no schema for this
  - send token to headers
- `api/account/project-owner/create-project-project-owner`
  - ```json
    {
      "name": "title of project",
      "description": "description of project",
      "image_url": "url", // wireframes for project
      "budget": "200",
      "dueDate": "unix time code",
      "projectStatus": "proposal", // must be set to proposal on creation
      "paymentStatus": "unpaid", // must be set to unpaid on creation
      "user_id": "1" // project owner id
    }
    ```
- `api/account/project-owner/update-project-project-owner`
  - ```json
    {
      "name": "title of project",
      "description": "description of project",
      "image_url": "url", // wireframes for project
      "budget": "200",
      "dueDate": "unix time code"
    }
    ```
- `api/account/project-owner/delete-project-project-owner`
  - rules to delete
  - "user_id": "1" === the developer id
  - projectStatus === submitted
  - paymentStatus === unpaid
- `api/account/project-owner/submit-payment/:id`
  - no table for this need to look into strip documentaiton before implementation
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `api/account/project-owner/message-project-owner`
  - no table for messages yet. need to look into twilo documentation before implementation
  - ```json
    {
      "": "" // schema not drafted
    }
    ```

---

## **api/account/onboarding**

- `api/account/onboarding/test-onboarding`
  - sends a string for testing this route.
- `api/account/onboarding/signup`

  - Developer Schema
  - ```json
    {
      "id": "0",
      "sub": "authID",
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "role": "Developer", // ["Developer", "Project Owner"]
      "devType": "moblie", // ["mobile", "andriod", "iOS", "web"]
      "skills": "skill 1, skill 2, ...",
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```
  - Project Owner Schema
  - ```json
    {
      "id": "0",
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "role": "Project Owner", // ["Developer", "Project Owner"]
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```

- `api/account/onboarding/login`
  - Developer Schema
  - ```json
    {
      "id": "0",
      "sub": "authID",
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "role": "Developer", // ["Developer", "Project Owner"]
      "devType": "moblie", // ["mobile", "andriod", "iOS", "web"]
      "skills": "skill 1, skill 2, ...",
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created_at": "date",
      "updated_at": "date"
    }
    ```
  - Project Owner Schema
  - ```json
    {
      "id": "0",
      "email": "email@email.com",
      "firstName": "name",
      "lastName": "name",
      "role": "Project Owner", // ["Developer", "Project Owner"]
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created_at": "date",
      "updated_at": "date"
    }
    ```

---

## **/api/projects**

- `/api/projects/test-projects`
  - sends a string for testing this route.
- `/api/projects/list-all-projects`
  - array of project owner projects
  - ```json
    {
      "id": "1",
      "name": "title of project",
      "description": "description of project",
      "image_url": "url", // wireframes for project
      "budget": "200",
      "dueDate": "unix time code",
      "projectStatus": "proposal", // proposal, in progress, completed
      "paymentStatus": "unpaid", // paid, unpaid
      "feadback": "the developer did amazing", // feed back for the developer
      "user_id": "1", // project owner id
      "created_at": "unix time stamp",
      "updated_at": "unix time stamp"
    }
    ```
- `/api/projects/plan-list`
  - array of developer plans
  - ```json
    {
      "id": "1",
      "name": "title of plan",
      "description": "description of plan",
      "technologiesToUse": "technology 1, technology 2, technology 3,...",
      "budget": "200",
      "dueDate": "unix time code",
      "plan Status", // not sure what this will be used for yet
      "user_id": "1", // developer id
      "created_at": "unix time stamp",
      "updated_at": "unix time stamp"
      }
    ```
- `/api/projects/project-owner`
  - I don't think this goes here will double check
  - ```json
    {
      "": "" // schema not drafted
    }
    ```
- `/api/projects/submitted-plan/:id`
  - plan page
  - ```json
    {
      "id": "1",
      "name": "title of plan",
      "description": "description of plan",
      "technologiesToUse": "technology 1, technology 2, technology 3,...",
      "budget": "200",
      "dueDate": "unix time code",
      "plan Status", // not sure what this will be used for yet
      "user_id": "1", // developer id
      }
    ```
- `/api/projects/project/:id`
  - ```json
    {
      "id": "1",
      "name": "title of project",
      "description": "description of project",
      "image_url": "url", // wireframes for project
      "budget": "200",
      "dueDate": "unix time code",
      "projectStatus": "proposal", // proposal, in progress, completed
      "paymentStatus": "unpaid", // paid, unpaid
      "feadback": "the developer did amazing", // feed back for the developer
      "user_id": "1" // project owner id
    }
    ```

---

## **/api/users**

- `/api/users/test-users`
  - sends a string for testing this route.
- `/api/users/list-all-users`
  - arry of users
  - ```json
    {
      "id": "1",
      "firstName": "some name",
      "lastName": "some name",
      "email": "email@email.com",
      "role": "role", // Admin, Project Owner, Developer
      "skills": "skill 1, skill 2, skill 3...", // list of skills for developer
      "devType": "web", // devtype for developer, web, android, iOS
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created-At": "unix time stamp"
    }
    ```
- `/api/users/developers`
  - incomplete draft
  - list of developers
  - devloper page
  - ```json
    {
      "id": "1",
      "firstName": "some name",
      "lastName": "some name",
      "email": "email@email.com",
      "role": "role", // Developer
      "skills": "skill 1, skill 2, skill 3...", // list of skills for developer
      "devType": "web", // devtype for developer, web, android, iOS
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created-At": "unix time stamp"
    }
    ```
- `/api/users/project-owners`
  - incomplete draft
  - list of poject owners
  - ```json
    {
      "id": "1",
      "firstName": "some name",
      "lastName": "some name",
      "email": "email@email.com",
      "role": "role", // Project Owner
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url",
      "created-At": "unix time stamp"
    }
    ```
- `/api/users/developer/:developer-id`
  - incomplete draft
  - project owner page by id
  - devloper page
  - ```json
    {
      "id": "1",
      "firstName": "some name",
      "lastName": "some name",
      "email": "email@email.com",
      "role": "role", // Developer
      "skills": "skill 1, skill 2, skill 3...", // list of skills for developer
      "devType": "web", // devtype for developer, web, android, iOS
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```
- `/api/users/project-owner/:project-owner-id`
  - incomplete draft
  - project owner page by id
  - ```json
    {
      "id": "1",
      "firstName": "some name",
      "lastName": "some name",
      "email": "email@email.com",
      "role": "role", // Project Owner
      "linkedIn": "url",
      "gitHub": "url",
      "twitter": "url"
    }
    ```
