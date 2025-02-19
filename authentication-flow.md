# Authentication Flow Document

1. User login with credentials
2. Check credentials against database using Prisma
3. If correct => create JWT for user (includes ID, role)
4. JWT is sent to server with every request.
5. JWT used to create session with user details
6. Session allows app to ID user without re-login
7. JWT can expire after set time (30 days)
