# Student API Documentation

## Base URL

```txt
http://localhost:3000
```

---

# Authentication

All Student APIs require an authenticated Clerk user session.

---

# Get Student Profile

## Endpoint

```http
GET /api/student/profile
```

## Description

Returns the currently logged-in student's profile information.

## Response

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "student@gmail.com",

    "studentProfile": {
      "studentId": "2412052",
      "course": "BTech",
      "branch": "CSE",
      "graduationYear": 2028,

      "skills": [
        "Java",
        "React"
      ],

      "bio": "Backend Developer",

      "linkedinUrl": "https://linkedin.com/in/test",

      "githubUrl": "https://github.com/test"
    }
  }
}
```

---

# Update Student Profile

## Endpoint

```http
PUT /api/student/profile
```

## Description

Updates the currently logged-in student's profile.

## Request Body

```json
{
  "studentId": "2412052",
  "course": "BTech",
  "branch": "CSE",
  "graduationYear": 2028,

  "skills": [
    "Java",
    "React"
  ],

  "bio": "Backend Developer",

  "linkedinUrl": "https://linkedin.com/in/test",

  "githubUrl": "https://github.com/test"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

## Validation Rules

### studentId

```txt
Required
```

### course

```txt
Required
```

### branch

```txt
Required
```

### graduationYear

```txt
Must be a number
```

### skills

```txt
Array of strings
```

### bio

```txt
Optional
```

### linkedinUrl

```txt
Optional
Must be a valid URL
```

### githubUrl

```txt
Optional
Must be a valid URL
```

---

# Frontend Integration Example

```ts
const response = await fetch(
  "/api/student/profile"
);

const result =
  await response.json();

console.log(
  result.data.studentProfile
);
```

---

# Status

| Feature                | Status   |
| ---------------------- | -------- |
| Student Onboarding     | Complete |
| Student Profile Read   | Complete |
| Student Profile Update | Complete |
| Student Dashboard      | Complete |
| Student API GET        | Complete |
| Student API PUT        | Complete |

```
```
