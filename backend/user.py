
class User():
    '''
    User class to define the attributes and methods of each user in the application.
    User can do the following tasks-
    1. Click on a blog - `click(blog_id)`
    2. Search for a blog - `search(query)`
    3. Like a blog - `like(blog_id)`
    4. Share a blog - `share(blog_id)`
    5. Edit a blog - `edit(blog_id)`
    6. Write a blog - `write(blog_id)`
    7. Answer questions asked in a blog - `answer(question)`
    8. Comment on blogs - `comment(blog_id)`
    9. Support other users comments - `support(comment_id)`

    Apart from this tasks, user also need to-
    1. Authenticate whether the logged in credentials are valid or not
    2. Save their user information as a new user
    '''
    
    def authenticate(self, uname, pword):
        '''
        Authenticates the user with his/her given credentials and checks its validity.
        
        args:
            `uname`: `str`, user name of the user trying to login
            `pword`: `str`, password used by the user to login
        
        returns:
            `True`/`False` depending on whether the user is saved in the db or not
        '''
        pass
    
    def save(self, uname, pword, email):
        pass
    
    def click(self):
        pass
    
    def search(self):
        pass
    
    def like(self):
        pass
    
    def share(self):
        pass
    
    def edit(self):
        pass
    
    def write(self):
        pass
    
    def answer(self):
        pass
    
    def comment(self):
        pass
    
    def support(self):
        pass
    