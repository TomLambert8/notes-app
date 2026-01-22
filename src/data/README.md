# Data Layer - Repository Pattern

Cette couche implémente le **principe de substitution de Liskov (LSP)** et **l'inversion de dépendances (DIP)** de SOLID.

## Architecture

```
Domain (Business Logic)
    ↓ depends on
INotesRepository (Interface/Contract)
    ↑ implemented by
Concrete Repositories (SQLite, API, SQL Server, etc.)
```

## Changer de source de données

Pour changer de source de données, modifiez simplement `src/config/dataSource.js` :

### Option 1: SQLite Local (par défaut)

```javascript
export const dataSourceConfig = {
  type: 'sqlite',
  options: {
    dbName: 'notes.db',
  }
};
```

### Option 2: API REST

```javascript
export const dataSourceConfig = {
  type: 'api',
  options: {
    apiUrl: 'https://api.example.com',
    apiKey: 'your-api-key', // optionnel
  }
};
```

### Option 3: SQL Server (à implémenter)

```javascript
export const dataSourceConfig = {
  type: 'sqlserver',
  options: {
    host: 'your-server.database.windows.net',
    port: 1433,
    database: 'NotesDB',
    user: 'username',
    password: 'password',
  }
};
```

## Ajouter une nouvelle implémentation

1. Créez une nouvelle classe qui implémente `INotesRepository`
2. Ajoutez-la à `RepositoryFactory.js`
3. Documentez les options de configuration

### Exemple : Implémenter MongoDB

```javascript
// src/data/mongodb/MongoNotesRepository.js
export class MongoNotesRepository {
  constructor(options) {
    this.connectionString = options.connectionString;
    // ...
  }

  async init() { /* ... */ }
  async list() { /* ... */ }
  async create(input) { /* ... */ }
  async remove(id) { /* ... */ }
  async update(id, input) { /* ... */ }
  async get(id) { /* ... */ }
}
```

Puis dans la Factory :

```javascript
case 'mongodb':
  return new MongoNotesRepository(config);
```

## Avantages de cette architecture

✅ **Substituabilité** : Changez de BDD sans toucher à la logique métier  
✅ **Testabilité** : Moquez facilement le repository dans les tests  
✅ **Flexibilité** : Ajoutez de nouvelles sources de données sans modifier le code existant  
✅ **Isolation** : Le domaine ne dépend jamais d'une technologie concrète
