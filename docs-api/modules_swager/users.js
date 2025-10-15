const { type } = require("os");

// Routes et schémas pour les utilisateurs
const userPaths = {
  '/api/users/register': {
    post: {
      tags: ['Users'],
      summary: 'Créer un nouvel utilisateur',
      description: 'Inscription d\'un nouvel utilisateur dans le système',
      requestBody: {
        required: true,
        content: {
          'application/json; charset=utf-8': {
            schema: {
              $ref: '#/components/schemas/UserRegistration'
            },
            examples: {
              user_example: {
                summary: 'Exemple d\'inscription',
                value: {
                  username: 'trainer123',
                  password: 'password123',
                  email: 'trainer@pokemon.com'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Utilisateur créé avec succès',
          content: {
            'application/json; charset=utf-8': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    }
  },
  '/api/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Connexion utilisateur',
      description: 'Authentification et obtention du token JWT',
      requestBody: {
        required: true,
        content: {
          'application/json; charset=utf-8': {
            schema: {
              $ref: '#/components/schemas/UserLogin'
            },
            examples: {
              login_example: {
                summary: 'Exemple de connexion',
                value: {
                  username: 'trainer123',
                  password: 'password123'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Connexion réussie',
          content: {
            'application/json; charset=utf-8': {
              schema: {
                $ref: '#/components/schemas/LoginResponse'
              }
            }
          }
        }
      }
    }
  }
};

// Schémas pour les utilisateurs
const userSchemas = {
  User: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'Nom d\'utilisateur unique',
        example: 'trainer123'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Adresse email unique',
        example: 'trainer@pokemon.com'
      },
      password: {
        type: 'string',
        description: 'Mot de passe hashé',
        writeOnly: true
      }
    },
    required: ['username', 'email', 'password']
  },
  UserRegistration: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 30,
        description: 'Nom d\'utilisateur unique',
        example: 'trainer123'
      },
      password: {
        type: 'string',
        minLength: 6,
        description: 'Mot de passe en clair',
        example: 'password123'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Adresse email unique',
        example: 'trainer@pokemon.com'
      }
    },
    required: ['username', 'password', 'email']
  },
  UserLogin: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'Nom d\'utilisateur',
        example: 'trainer123'
      },
      password: {
        type: 'string',
        description: 'Mot de passe en clair',
        example: 'password123'
      }
    },
    required: ['username', 'password']
  },
  LoginResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Connexion réussie'
      },
      token: {
        type: 'string',
        description: 'Token JWT pour l\'authentification',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      },
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'objectId',
            example: '507f1f77bcf86cd799439011'
          },
          username: {
            type: 'string',
            example: 'trainer123'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'trainer@pokemon.com'
          }
        }
      }
    }
  }
};

module.exports = {
  userPaths,
  userSchemas
};