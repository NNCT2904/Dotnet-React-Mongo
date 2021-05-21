# Mongo + Dotnet + React

## Requirement

- Dotnet 5

## Working with this Repo

Clone this repo
```shell
git clone https://github.com/NNCT2904/Dotnet-React-Mongo.git
```

Navigate to the project folder with the terminal, then
```shell
dotnet restore
dotnet run
```
Note: dotnet will also install the dependencies of the React Webapp, the first run will take several minutes

## Database and API
This project uses MongoDB for data storage\
Prepare your MongoDB connection string, go to `appsettings.json` and add the following lines after `logging` section
```json
"DatabaseSettings": {
    "ConnectionString": "<Your connection string>",
    "DatabaseName": "<Your Database name>"
    }
```
Now you wana see the APIs? go to `localhost:5000/swagger`\
You can test those APIs using swagger as well!
