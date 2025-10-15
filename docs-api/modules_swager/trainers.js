// Routes et schémas pour les Trainers
const trainerPaths = {
  '/api/trainers': {
    get: {
      tags: ['Trainers'],
      summary: 'Récupérer tous les trainers',
      description: 'Retourne la liste de tous les dresseurs Pokémon',
      responses: {
        '200': {
          description: 'Liste des trainers récupérée avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TrainerListResponse'
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Trainers'],
      summary: 'Créer un nouveau trainer',
      description: 'Ajoute un nouveau dresseur Pokémon',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TrainerCreate'
            },
            examples: {
              trainer_example: {
                summary: 'Exemple de création de trainer',
                value: {
                  name: 'Ash Ketchum',
                  age: 16,
                  pokemons: ['507f1f77bcf86cd799439011']
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Trainer créé avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TrainerResponse'
              }
            }
          }
        },
        '401': {
          description: 'Authentification requise',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/api/trainers/{id}': {
    get: {
      tags: ['Trainers'],
      summary: 'Récupérer un trainer par ID',
      description: 'Retourne les détails d\'un dresseur avec ses Pokémon',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du trainer',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Trainer trouvé',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Trainer'
              }
            }
          }
        },
        '500': {
          description: 'Erreur serveur',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Erreur serveur'
                  }
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Trainers'],
      summary: 'Mettre à jour un trainer',
      description: 'Modifie les informations d\'un dresseur existant',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du trainer',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TrainerUpdate'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Trainer mis à jour avec succès',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Trainer'
              }
            }
          }
        },
        '500': {
          description: 'Erreur serveur',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Erreur serveur'
                  }
                }
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Trainers'],
      summary: 'Supprimer un trainer',
      description: 'Supprime définitivement un dresseur',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID unique du trainer',
          schema: {
            type: 'string',
            format: 'objectId'
          },
          example: '507f1f77bcf86cd799439011'
        }
      ],
      responses: {
        '200': {
          description: 'Trainer supprimé avec succès',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Trainer supprimé avec succès'
                  }
                }
              }
            }
          }
        },
        '500': {
          description: 'Erreur serveur',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Erreur serveur'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// Schémas pour les Trainers
const trainerSchemas = {
  Trainer: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        format: 'objectId',
        description: 'Identifiant unique MongoDB',
        example: '507f1f77bcf86cd799439011'
      },
      name: {
        type: 'string',
        description: 'Nom du dresseur',
        example: 'Ash Ketchum'
      },
      age: {
        type: 'integer',
        description: 'Âge du dresseur',
        minimum: 1,
        example: 16
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              format: 'objectId'
            },
            number: {
              type: 'integer'
            },
            name: {
              type: 'string'
            },
            types: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        description: 'Liste des Pokémon du dresseur (relation populée)'
      }
    },
    required: ['name', 'age']
  },
  TrainerCreate: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Nom du dresseur',
        example: 'Ash Ketchum'
      },
      age: {
        type: 'integer',
        minimum: 1,
        description: 'Âge du dresseur',
        example: 16
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'string',
          format: 'objectId'
        },
        description: 'IDs des Pokémon à assigner',
        example: ['507f1f77bcf86cd799439011']
      }
    },
    required: ['name', 'age']
  },
  TrainerUpdate: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Red'
      },
      age: {
        type: 'integer',
        minimum: 1,
        example: 18
      },
      pokemons: {
        type: 'array',
        items: {
          type: 'string',
          format: 'objectId'
        },
        example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012']
      }
    }
  },
  TrainerListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      count: {
        type: 'integer',
        example: 1
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Trainer'
        }
      }
    },
    required: ['success', 'count', 'data']
  },
  TrainerResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        $ref: '#/components/schemas/Trainer'
      }
    },
    required: ['success', 'data']
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false
      },
      message: {
        type: 'string',
        example: 'Token d\'accès requis'
      }
    },
    required: ['success', 'message']
  }
};

module.exports = {
  trainerPaths,
  trainerSchemas
};