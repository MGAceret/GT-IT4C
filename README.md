# Midterm-Exam-Laboratory
For ITElective 4 created by Matthew Gerard P. Aceret from IT4B.
This is a continuation from Lab no. 7 regarding the migration to Database created a new repository for a cleaner
output for this Midterm Examination.

Part 1 of the Laboratory:
- Created a database "blogdatabase" and its tables being the "posts" and "users"
- Altered the posts table for further modifications 
- Installed the required npms
- Created javascript files regarding users for services, controllers, and routes
- (Serivce) Added functionality for creating users, getting user by Id and by multiple.
- (Controller) Added functionalities just like the Service with the use of asyncHandler as the wrapper
- (Routes) Added links according to controller functions being POST for createUser, and GET for displaying User's Id and all users
- Modified index.js in order to allow the created javascripts to be mounted through app.use at the path of /api/users.
- Modified validator middle javascript in order to include authorId to be part of the validation
- Modified post service javascript to include authorId in creating the post via the createPost function. Additionally added an error in case the said Id does not exists
----------------------------------------------------
## Challenges:
### 1 - Get All Posts by a specific author
    - Added a functionality that allows fetching multiple that are specifically posted by a singular author
    - Used :userId as the indicator of finding the author and their posts
    - In my case, postman had responded with a 200 displayed 2 posts created by John Doe

### 2 - Associate Comments with Users
    - Had to create a comments table as comment.service.js does not create a database table.
    - Altered the table to especially include the foreign key (authorId)
    - Added a function for validating created comments
    - Modified createComment function in the service layer in order to include the user rather than just the comment
    - For controller, only added another condition of including authorId for the error
    - And router, added respective routes such as creating comment via POST, and getting user Id via GET.

### 3 - Populate Author Data in Post Responses
    - 