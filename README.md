# Mini-Kanban
Kanban microservice created using node js, MongoDB, express and docker

<h2>About the project:</h2>
<p>The idea was to create a project using separate of concerns in a way that the core of the project do not have to be connected to a framework or database, so it would be easy in future if i wanted to change the framework or the database the core of my project will be intact and i wil just have to change the code in a few a few files. The other challenge of this project was thenidea of creating a dockerized application tha doens´t depends on any installed dependencies like databases or node itself.</p>

<h2>Initializing the project</h2>
<p>Start docker and run the following command in your terminal</p>

```
"docker-compose up"
```

<p>To acess the application</p>

```
//routes: boards, tasks
"http://localhost:1747/${route}"
```

<p>To acess the documentation</p>

```
http://localhost:5000/
```

[Link to access the front-end repository](https://github.com/KevinDaSilvaS/mini-kanban-front-end "kanban front end repository")

